import { AccountCircle, Delete, Edit, Favorite } from "@mui/icons-material";
import { Modal, Fade, Backdrop, Box, Avatar, Typography, IconButton, TextField, Button } from "@mui/material"
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from '../../../hooks/useForm'
import { addComment, deleteComment } from "../../../store/Card/thunks";

const formData = {
  fieldComent: ''
}

const formValidations = {
  fieldComent: [(value) => value.length > 0, 'No puede estar vacio'],
}

export const ModalComentarios = ({ onHandleClose, state, idCard, typeModal, theme, mediaQuery }) => {

  const { primary, background, secondary } = theme
  const dispatch = useDispatch();

  const { uid: uidUser } = useSelector(state => state.auth)
  const [isSubmited, setSubmited] = useState(false)
  const { formState, fieldComent, fieldComentValid, isFormValid, onInputChange } = useForm(formData, formValidations)

  const onSubmit = (event) => {
    event.preventDefault();
    setSubmited(true)
    if (!isFormValid) return
  }

  const onHandleComment = () => {
    if (!isFormValid) return
    dispatch(addComment(formState, idCard))
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 750,
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    backgroundColor: background,
    maxWidth: mediaQuery ? 750 : 325,
    padding: mediaQuery ? "32px" : "12px"
  };

  const { cards, cardsState } = useSelector(state => state.card)

  const [comentarios, setComentarios] = useState(() => {
    return cards.find(card => {
      return card.id == idCard
    }).comments
  })

  useEffect(() => {
    setComentarios(
      cardsState.find(card => {
        return card.idCard == idCard
      }).comments
    )
  }, [cardsState])

  const onHandleDeleteComment = (id) => {
    dispatch(deleteComment(id, idCard))
  }

  const onHandleEditComment = () => {

  }

  return (
    <>
      <Modal
        open={state}
        onClose={onHandleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={state} >
          <Box sx={style}>
            {
              typeModal == "addComment" &&
              <form onSubmit={onSubmit}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', flexFlow: 'column' }}>
                  <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField
                    label="Comentario"
                    variant="standard"
                    fullWidth
                    sx={{ mb: 1 }}
                    type="text"
                    name="fieldComent"
                    value={fieldComent}
                    onChange={onInputChange}
                    error={!!fieldComentValid && isSubmited}
                    helperText={!!isSubmited && fieldComentValid}
                  />
                  <div>
                    <Button size="small" variant="elevated" sx={{ backgroundColor: secondary, mr: 1 }} onClick={onHandleClose}>Cancelar</Button>
                    <Button size="small" disabled={!isFormValid} variant="elevated" sx={{ backgroundColor: secondary }} onClick={onHandleComment} >Comentar</Button>
                  </div>
                </Box>
              </form>
            }
            {
              typeModal == "viewComment" &&
              <div className='container'>
                {
                  comentarios.toReversed().map(comentario => {
                    const { userComent, dateComent, textComent, id, uid } = comentario
                    let isVisible = uid == uidUser ? 'inline-flex' : 'none'
                    return (
                      <div key={id} className='row d-flex justify-content-between'>
                        <div className='col-sm-6 col-md-5 d-flex'>
                          <Avatar sx={{ width: 25, height: 25, mr: 0.5 }} />
                          <Typography variant='subtitle2'>{(typeof userComent == 'undefined' ? '' : userComent)}</Typography>
                        </div>
                        <div className='col-sm-6 offset-md-4 col-md-3 d-flex justify-content-end'>
                          <Typography variant='caption'>{(typeof dateComent == 'undefined' ? '' : new Date(dateComent).toLocaleDateString())}</Typography>
                        </div>
                        <div className='d-flex justify-content-between align-items-center'>
                          <Typography variant='body2'>{(typeof textComent == 'undefined' ? '' : textComent)} </Typography>
                          <div>
                            <IconButton sx={{ color: 'red' }}><Favorite sx={{ width: 18, height: 18 }} /></IconButton>
                            <IconButton sx={{ color: 'black', display: isVisible }} onClick={() => { onHandleDeleteComment(id) }}>
                              <Delete sx={{ width: 18, height: 18 }} />
                            </IconButton>
                            <IconButton sx={{ color: 'black', display: isVisible }} onClick={onHandleEditComment}>
                              <Edit sx={{ width: 18, height: 18 }} />
                            </IconButton>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            }
          </Box>
        </Fade>
      </Modal>
    </>
  )
}
