import { Modal, Fade, Backdrop, Box } from "@mui/material"

export const ModalComentarios = ({ onHandleClose, state, primary, background }) => {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    backgroundColor: background
  };

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
        <Fade in={state}>
          <Box sx={style}>
            <h1>ModalComentarios</h1>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}
