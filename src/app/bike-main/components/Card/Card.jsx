import {
  Avatar,
  Button,
  ButtonGroup,
  IconButton,
  Link,
  Popper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { CardAvatarGroup } from "./CardAvatarGroup";
import {
  ArrowDropDown,
  Comment,
  Facebook,
  Favorite,
  InsertLink,
  Instagram,
  ThumbUp,
  Twitter,
  YouTube,
} from "@mui/icons-material";
import { FollowModule } from "./FollowModule";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeRouteByUser, uploadImage } from "../../../../store/Card/thunks";
import { useEffect } from "react";
import { ModalComentarios } from "./ModalComentarios";

const styles = {
  desktop: {
    card: {
      height: 300,
      maxWidth: 752,
    },
    cardContainer_1: {
      height: "100%",
      minWidth: 250,
      maxWidth: "250px",
    },
    cardContainer_2: {
      height: "250px",
    },
  },
  mobile: {
    card: {
      height: "auto",
      maxWidth: 375,
    },
    cardContainer_1: {
      height: "250px",
      minWidth: 250,
      maxWidth: "",
    },
    cardContainer_2: {
      height: "250px",
    },
  },
};
export const Card = ({ theme, route, cardStyleMobile }) => {
  const { primary, title, secondary, background } = theme;
  const { img, titleCard, info, stateComents, id, nameURL } = route;

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const { cardsState } = useSelector((state) => state.card);

  const { comments } = cardsState.find((cs) => {
    return cs.idCard == id;
  });

  var isVisible = "hidden";
  if (comments.length >= 1) {
    var {
      id: idComentario,
      userComent,
      dateComent,
      textComent,
    } = comments[Math.floor(Math.random() * comments.length)];
    isVisible = "visible";
  }

  const mediaQuery = useMediaQuery("(min-width:785px)");
  const style = mediaQuery && !cardStyleMobile ? styles.desktop : styles.mobile;
  const { card, cardContainer_1, cardContainer_2 } = style;

  const classNameMobile = cardStyleMobile ? "classNameMobile" : "";

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [typeModal, setTypeModal] = useState();

  const onHandleOpen = (type) => {
    setTypeModal(type);
    handleOpen();
  };

  const onFormatData = (keyElement, valueInfo) => {
    if (keyElement == "Distancia") {
      valueInfo = valueInfo
        .map((value, index) => {
          return valueInfo.length - 1 != index ? value + " / " : value + " km";
        })
        .toString()
        .replaceAll(",", "");
    }

    if (keyElement == "Desnivel") {
      valueInfo = valueInfo
        .map((value, index) => {
          return valueInfo.length - 1 != index
            ? value + " / "
            : value + " mts +";
        })
        .toString()
        .replaceAll(",", "");
    }

    if (keyElement == "Fecha") {
      valueInfo = new Date(valueInfo).toLocaleDateString();
    }

    if (keyElement == "Web") {
      valueInfo = (
        <Button
          key={(Math.random() + 10).toString(36).substring(7)}
          style={{ color: primary }}
          target="_blank"
          href={valueInfo}
        >
          <InsertLink />
        </Button>
      );
    }

    if (keyElement == "Facebook") {
      valueInfo = (
        <Button
          key={(Math.random() + 10).toString(36).substring(7)}
          style={{ color: primary }}
          target="_blank"
          href={valueInfo}
        >
          <Facebook />
        </Button>
      );
    }

    if (keyElement == "Instagram") {
      valueInfo = (
        <Button
          key={(Math.random() + 10).toString(36).substring(7)}
          style={{ color: primary }}
          target="_blank"
          href={valueInfo}
        >
          <Instagram />
        </Button>
      );
    }

    if (keyElement == "Twitter") {
      valueInfo = (
        <Button
          key={(Math.random() + 10).toString(36).substring(7)}
          style={{ color: primary }}
          target="_blank"
          href={valueInfo}
        >
          <Twitter />
        </Button>
      );
    }

    if (keyElement == "Youtube") {
      valueInfo = (
        <Button
          key={(Math.random() + 10).toString(36).substring(7)}
          style={{ color: primary }}
          target="_blank"
          href={valueInfo}
        >
          <YouTube />
        </Button>
      );
    }

    return valueInfo;
  };

  /*const [cardLiked, setCardLiked] = useState(
    !!user.cardsLiked.find((cardUser) => {
      return cardUser == id;
    })
      ? background
      : ""
  );

  useEffect(() => {
    setCardLiked(
      !!user.cardsLiked.find((cardUser) => {
        return cardUser == id;
      })
        ? background
        : ""
    );
  }, [user.cardsLiked]);*/

  const onLike = (idCard) => {
    dispatch(likeRouteByUser(idCard));
    return user.cardsLiked.includes(idCard) ? background : "";
  };

  const onUploadImage = (files) => {
    dispatch(uploadImage(files.target.files[0], titleCard, id));
  };

  return (
    <>
      <div
        className={`card cardMediaQuery row d-flex flex-row align-items-center ${classNameMobile}`}
        style={{
          height: card.height,
          margin: 5,
          border: "0.1px solid black",
          borderRadius: 10,
          maxWidth: card.maxWidth,
          minWidth: 325,
        }}
      >
        <div
          className="col-sm-12 col-md-4 d-flex flex-column justify-content-center"
          style={{
            height: cardContainer_1.height,
            minWidth: cardContainer_1.minWidth,
            maxWidth: cardContainer_1.maxWidth,
          }}
        >
          <img
            src={img}
            style={{
              height: "65%",
              width: "100%",
              objectFit: "contain",
              backgroundColor: "rgba(236, 236, 228, 0.30)",
            }}
          ></img>
          {img.toString() == "vacio" && (
            <input
              type="file"
              onChange={(files) => {
                onUploadImage(files);
              }}
              accept="image/*"
            ></input>
          )}
          <div
            className="d-flex justify-content-between"
            style={{ marginTop: "5px" }}
          >
            <ButtonGroup variant="text" size="small">
              {Object.keys(info).map((keyElement) => {
                if (
                  (keyElement == "Web" && info[keyElement][0] != null) ||
                  (keyElement == "Facebook" && info[keyElement][0] != null) ||
                  (keyElement == "Instagram" && info[keyElement][0] != null) ||
                  (keyElement == "Twitter" && info[keyElement][0] != null) ||
                  (keyElement == "Youtube" && info[keyElement][0] != null)
                ) {
                  return onFormatData(keyElement, info[keyElement]);
                }
              })}
            </ButtonGroup>
          </div>
        </div>
        <div
          className="col-sm-12 col-md-8 d-flex flex-column justify-content-start"
          style={{ height: cardContainer_2.height }}
        >
          <FollowModule
            primary={primary}
            secondary={secondary}
            titleCard={titleCard}
            id={id}
            nameURL={nameURL}
          ></FollowModule>
          <ul
            className="list-group list-group-horizontal lastElememtNoneBorderRight"
            style={{ marginBottom: "5px", maxWidth: "500px", flexWrap: "wrap" }}
          >
            {Object.keys(info).map((keyElement) => {
              if (
                (keyElement == "Distancia" && info[keyElement][0] != null) ||
                (keyElement == "Desnivel" && info[keyElement][0] != null) ||
                (keyElement == "Fecha" && info[keyElement][0] != null) ||
                (keyElement == "Poblacion" && info[keyElement][0] != null)
              ) {
                return (
                  <li
                    className="list-group-item d-flex flex-column align-items-start justify-content-start"
                    style={{
                      //maxWidth: 80,
                      borderLeft: 0,
                      borderTop: 0,
                      borderBottom: 0,
                      height: "50px",
                      padding: "4px",
                    }}
                    key={keyElement}
                  >
                    <Typography
                      variant="h6"
                      sx={{ color: title, mb: 0, fontSize: "0.9rem" }}
                    >
                      {keyElement}
                    </Typography>
                    <Typography
                      variant="p"
                      sx={{
                        fontSize: "0.8rem",
                        mt: "-8px",
                        inlineSize: 75,
                        width: "auto",
                      }}
                    >
                      {onFormatData(keyElement, info[keyElement])}
                    </Typography>
                  </li>
                );
              }
            })}
          </ul>
          <div>
            <Typography
              variant="p"
              sx={{
                fontSize: "0.9rem",
                mt: "-8px",
                inlineSize: 75,
                width: "auto",
              }}
            >
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis
              rem molestiae a exercitationem praesentium aut mollitia, numquam
              quia debitis blanditiis eveniet similique repudiandae aliquid,
              perferendis laborum ipsa? Dolorum, laudantium voluptate.
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};
