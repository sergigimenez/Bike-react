import { Button, Grid, TextField, Typography, Box, Modal, Fade, Backdrop } from "@mui/material"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useForm } from "../../hooks/useForm";
import { createAccountWithEmailPassword } from "../../store/auth/thunks";

const formData = {
    name: '',
    email: '',
    repeatEmail: '',
    password: '',
    repeatPassword: ''
}

const formValidations = {
    name: [(value) => value.length > 0, 'No puede estar vacio'],
    email: [(value) => value.includes('@'), 'tiene que incluir @'],
    repeatEmail: [(value) => value.includes('@'), 'tiene que incluir @'],
    password: [(value) => value.length >= 6, 'El password debe de ser de 6 caracteres'],
    repeatPassword: [(value) => value.length >= 6, 'El password debe de ser de 6 caracteres'],
}

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

    const [isSubmited, setSubmited] = useState(false)
    const { errorMessage } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const {
        formState,
        email,
        repeatEmail,
        password,
        name,
        emailValid,
        repeatPassword,
        repeatEmailValid,
        nameValid,
        passwordValid,
        repeatPasswordValid,
        isFormValid,
        onInputChange, onResetForm
    } = useForm(formData, formValidations)

    const onSubmit = (event) => {
        event.preventDefault();

    }

    const onHandleCreateAccount = () => {
        setSubmited(true)
        if (!isFormValid) return
        dispatch(createAccountWithEmailPassword(email, password, repeatEmail, repeatPassword, name))
    }

    useEffect(() => {
        if (errorMessage !== undefined) {
            Swal.fire('Error en el login', errorMessage, 'error')
        }
    }, [errorMessage])

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
            ><form onSubmit={(event) => onSubmit(event)}>
                    <Fade in={state}>

                        <Box sx={style}>
                            <Grid item xs={12} sx={{ mt: 2 }} >
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    label="Nombre de usuario"
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={onInputChange}
                                    error={!!nameValid && isSubmited}
                                    helperText={!!isSubmited && nameValid}
                                />
                            </Grid>

                            <Grid item xs={12} sx={{ mt: 2 }} >
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    label="Email"
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={onInputChange}
                                    error={!!emailValid && isSubmited}
                                    helperText={!!isSubmited && emailValid}
                                />
                            </Grid>

                            <Grid item xs={12} sx={{ mt: 2 }} >
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    label="Confirma el email"
                                    type="email"
                                    name="repeatEmail"
                                    value={repeatEmail}
                                    onChange={onInputChange}
                                    error={!!repeatEmailValid && isSubmited}
                                    helperText={!!isSubmited && repeatEmailValid}
                                />
                            </Grid>

                            <Grid item xs={12} sx={{ mt: 2 }} >
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    label="Password"
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={onInputChange}
                                    error={!!passwordValid && isSubmited}
                                    helperText={!!isSubmited && passwordValid}
                                />
                            </Grid>

                            <Grid item xs={12} sx={{ mt: 2 }} >
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    label="Repite la contraseña"
                                    type="password"
                                    name="repeatPassword"
                                    value={repeatPassword}
                                    onChange={onInputChange}
                                    error={!!repeatPasswordValid && isSubmited}
                                    helperText={!!isSubmited && repeatPasswordValid}
                                />
                            </Grid>


                            <Grid container sx={{ mb: 2, mt: 1 }} spacing={2} >
                                <Grid item xs={12}>
                                    <Button variant="contained" fullWidth sx={{ backgroundColor: primary }} onClick={onHandleCreateAccount}>
                                        <Typography>Crear Cuenta</Typography>
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>

                    </Fade>
                </form>
            </Modal>

        </>
    )
}
