import { Button, Grid, TextField, Typography, Box, Modal, Fade, Backdrop } from "@mui/material"



export const ModalRegister = ({ onHandleClose, state, primary, background }) => {

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
                        <Grid item xs={12} sx={{ mt: 2 }} >
                            <TextField
                                fullWidth
                                variant="filled"
                                label="Email"
                                type="email"
                            />
                        </Grid>

                        <Grid item xs={12} sx={{ mt: 2 }} >
                            <TextField
                                fullWidth
                                variant="filled"
                                label="Confirma el email"
                                type="email"
                            />
                        </Grid>

                        <Grid item xs={12} sx={{ mt: 2 }} >
                            <TextField
                                fullWidth
                                variant="filled"
                                label="Contraseña"
                                type="password"
                            />
                        </Grid>

                        <Grid item xs={12} sx={{ mt: 2 }} >
                            <TextField
                                fullWidth
                                variant="filled"
                                label="Repite la contraseña"
                                type="password"
                            />
                        </Grid>


                        <Grid container sx={{ mb: 2, mt: 1 }} spacing={2} >
                            <Grid item xs={12}>
                                <Button variant="contained" fullWidth sx={{ backgroundColor: primary }}><Typography>Crear Cuenta</Typography></Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}
