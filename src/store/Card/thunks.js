import {
  clearCards,
  setCard,
  setProvincias,
  setPoblaciones,
  setTitleCard,
  setStatusSearch,
  setTotalResults,
  updateLikesOneCard,
  updateImage,
  addCommentSlice,
  deleteCommentSlice,
  setCardByHash,
} from "./cardSlice";
import { onFollowCards, onLikeCards } from "../auth/authSlice";
import { bikeMernApi } from "../../api/index.js";
import { async } from "@firebase/util";

/*Cargar las rutas de la BD*/
export const handleSetRoutes = (numPage) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await bikeMernApi.get(
        `/cards/num/${(numPage - 1) * 25}`
      );

      dispatch(clearCards());

      dispatch(setCard(data.msg));
    } catch (e) {
      console.log(e.response.data.error); //TODO GESTIONAR ERRORES AL LEER CARDS
    }
  };
};
/*Cargar las rutas de la BD*/

/*Obetener todas las provincias*/

export const getProvinciasThunks = () => {
  return async (dispatch) => {
    try {
      const { data } = await bikeMernApi.get("/cards/provincias");

      dispatch(setProvincias(data.resp));
    } catch (e) {
      console.log(e.response.data.error); //TODO GESTIONAR ERRORES AL LEER CARDS
    }
  };
};

/*Obetener todas las poblaciones*/

export const getPoblacionesThunks = () => {
  return async (dispatch) => {
    try {
      const { data } = await bikeMernApi.get("/cards/poblaciones");

      dispatch(setPoblaciones(data.resp));
    } catch (e) {
      console.log(e.response.data.error); //TODO GESTIONAR ERRORES AL LEER CARDS
    }
  };
};

/*Obetener todas las poblaciones*/

/*Obetener todos los titulos de las carreras*/

export const getTitleCardThunks = () => {
  return async (dispatch) => {
    try {
      const { data } = await bikeMernApi.get("/cards/titleCard");

      dispatch(setTitleCard(data.resp));
    } catch (e) {
      //console.log(e.response.data.error);
    }
  };
};

/*Obetener todos los titulos de las carreras*/

/*Añadir nueva ruta a la BD */
export const searchCard = (
  numPage,
  fieldProvincias,
  fieldPoblaciones,
  fieldTitleCarreras,
  fieldDistancia,
  fieldDesnivel,
  fieldDate
) => {
  return async (dispatch) => {
    try {
      let query = {
        params: {
          provincias:
            fieldProvincias.length != 0
              ? fieldProvincias.map((prov) => prov.sigla)
              : [],
          poblacion:
            fieldPoblaciones.length != 0
              ? fieldPoblaciones.map((pob) => pob.poblacion)
              : [],
          titleCard:
            fieldTitleCarreras != null ? fieldTitleCarreras.titleCard : null,
          distancia: {
            gte: fieldDistancia[0] == 0 ? null : fieldDistancia[0],
            lte: fieldDistancia[1] == 150 ? null : fieldDistancia[1],
          },
          desnivel: {
            gte: fieldDesnivel[0] == 0 ? null : fieldDesnivel[0],
            lte: fieldDesnivel[1] == 3000 ? null : fieldDesnivel[1],
          },
          fecha:
            fieldDate != null
              ? new Date(fieldDate).toLocaleDateString("en-US").toString()
              : null,
        },
      };

      const { data } = await bikeMernApi.post(
        `/cards/search/${(numPage - 1) * 25}`,
        query
      );

      dispatch(clearCards());
      dispatch(setStatusSearch());
      dispatch(setTotalResults(Math.ceil(data.totalResults)));

      dispatch(setCard(data.resp));
    } catch (e) {
      console.log(e.response.data.error); //TODO GESTIONAR ERRORES AL AÑADIR CARDS
    }
  };
};
/*Añadir nueva ruta a la BD */

/*Añadir nueva ruta a la BD */
export const setCardAPI = (route) => {
  return async (dispatch) => {
    try {
      const { data } = await bikeMernApi.post("/cards", route);
      dispatch(setCard(data.payload));
    } catch (e) {
      console.log(e.response.data.error); //TODO GESTIONAR ERRORES AL AÑADIR CARDS
    }
  };
};
/*Añadir nueva ruta a la BD */

/*Upload Image */
export const uploadImage = (file, titulo, idCard) => {
  return async (dispatch) => {
    let respParsed = "";

    if (!file) throw new Error("No tenemos ningun archivo que subir");
    const resp = fileUpload(file, titulo);

    await resp.then((resp) => {
      respParsed = resp;
    });

    const { data } = await bikeMernApi.post("/cards/uploadImage", {
      cardId: idCard,
      newImage: respParsed,
    });

    dispatch(updateImage(data));

    return resp;
  };
};

export const fileUpload = async (file, titulo) => {
  if (!file) throw new Error("No tenemos ningun archivo que subir");

  const cloudUrl = "https://api.cloudinary.com/v1_1/dhvkbs4lv/upload";

  const fromData = new FormData();
  fromData.append("upload_preset", "react-bike");
  fromData.append("file", file);
  fromData.append("public_id", titulo);

  try {
    const resp = await fetch(cloudUrl, {
      method: "POST",
      body: fromData,
    });

    if (!resp.ok) throw new Error("No se puede subir la imagen");

    const cloudResp = await resp.json();

    return cloudResp.secure_url;
  } catch (error) {
    throw new Error(error.message);
  }
};
/*Upload Image */

/*Follow & Unfollow Route */
export const followCardByUser = (idCard) => {
  return async (dispatch, getState) => {
    try {
      await bikeMernApi.post("/cards/follow", {
        uid: getState().auth.uid,
        cards: [idCard],
      });

      const { data } = await bikeMernApi.post("/cards/user", {
        uid: getState().auth.uid,
      });

      dispatch(onFollowCards(data.usuarioCards));
    } catch (e) {
      console.log(e.response.data.error); //TODO GESTIONAR ERRORES AL FOLLOW CARDS
    }
  };
};

export const unfollowCardByUser = (idCard) => {
  return async (dispatch, getState) => {
    try {
      await bikeMernApi.post("/cards/unfollow", {
        uid: getState().auth.uid,
        cards: [idCard],
      });

      const { data } = await bikeMernApi.post("/cards/user", {
        uid: getState().auth.uid,
      });

      dispatch(onFollowCards(data.usuarioCards));
    } catch (e) {
      console.log(e.response.data.error); //TODO GESTIONAR ERRORES AL UNFOLLOW CARDS
    }
  };
};

/*Follow & Unfollow Route */

/*Like Route */

export const likeRouteByUser = (idCard) => {
  return async (dispatch, getState) => {
    try {
      const resp = await bikeMernApi.post("/cards/like", {
        uid: getState().auth.uid,
        cardId: idCard,
      });

      dispatch(
        updateLikesOneCard({ idCard, totalLikes: resp.data.totalLikes })
      );

      const { data } = await bikeMernApi.post("/cards/user", {
        uid: getState().auth.uid,
      });
      dispatch(onLikeCards(data.cardsLiked));
    } catch (e) {
      console.log(e.response.data.error); //TODO GESTIONAR ERRORES AL UNFOLLOW CARDS
    }
  };
};

/*Like Route */

/*Añadir, editar y eliminar comentarios */

export const addComment = ({ fieldComent }, idCard) => {
  return async (dispatch, getState) => {
    try {
      const { uid, displayName } = getState().auth;

      const resp = await bikeMernApi.post("/cards/comment", {
        uid: uid,
        cardId: idCard,
        comment: {
          userComent: displayName,
          textComent: fieldComent,
          dateComent: new Date(),
        },
      });

      dispatch(
        addCommentSlice({
          comentario: resp.data.comentario,
          idCard: idCard,
          totalComentario: resp.data.totalComentario,
        })
      );
    } catch (e) {
      console.log(e.response.data.error); //TODO GESTIONAR ERRORES AL UNFOLLOW CARDS
    }
  };
};

export const deleteComment = (deleteCommentId, idCard) => {
  return async (dispatch, getState) => {
    try {
      const { uid } = getState().auth;
      const resp = await bikeMernApi.delete("/cards/comment", {
        data: {
          uid: uid,
          comment: {
            id: deleteCommentId,
          },
        },
      });

      console.log({
        uid: uid,
        deleteCommentId: deleteCommentId,
        idCard: idCard,
        totalComentario: resp.data.totalComentario,
      });

      !!resp.data &&
        dispatch(
          deleteCommentSlice({
            uid: uid,
            deleteCommentId: deleteCommentId,
            idCard: idCard,
            totalComentario: resp.data.totalComentario,
          })
        );
    } catch (e) {
      console.log(e.response.data.error); //TODO GESTIONAR ERRORES AL UNFOLLOW CARDS
    }
  };
};

/*Añadir, editar y eliminar comentarios */

/*Get carrera by Hash */
export const getCardByHash = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await bikeMernApi.get(`/cards/id/${id}`);
      dispatch(setCardByHash(data.msg));
    } catch (e) {
      //console.log(e.response.data.error);
    }
  };
};
/*Get carrera by Hash */
