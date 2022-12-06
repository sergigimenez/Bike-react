import { Google } from "@mui/icons-material"
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { Link as RouterLink } from 'react-router-dom'
import { useForm } from "../../hooks/useForm"
import { useState } from "react"
import { startGoogleSignIn } from "../../store/auth/thunks"
import { useDispatch, useSelector } from "react-redux"

const formData = {
  email: '',
  password: '',
}

const formValidations = {
  email: [(value) => value.includes('@'), 'el correo debe tener una @'],
  password: [(value) => value.length >= 6, 'el password debe de tener mas de 6 letras'],
}

export const LoginPages = () => {

  const {
    formState,
    email,
    password,
    isFormValid,
    emailValid,
    passwordValid,
    onInputChange,
    onResetForm,
  } = useForm(formData, formValidations)

  const [isSubmited, setSubmited] = useState(false)

  const onSubmit = (event) => {
    event.preventDefault();
    setSubmited(true)
    if (!isFormValid) return
    console.log(formState)
  }


  const dispatch = useDispatch()
  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn())
  }

  const {primary, secondary} = useSelector(state => state.theme)

  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit}>
        <Grid container>
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
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && isSubmited}
              helperText={!!isSubmited && passwordValid}
            />
          </Grid>

          <Grid container sx={{ mb: 2, mt: 1 }} spacing={2} >
            <Grid item xs={12}>
              <Button variant="contained" fullWidth type='sumbit' sx={{backgroundColor: primary}}><Typography>Sign In</Typography></Button>
            </Grid>

            <Grid item xs={12}>
              <Button variant="contained" fullWidth onClick={onGoogleSignIn} sx={{backgroundColor: primary}}>
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container justifyContent="space-between">
            <Link component={RouterLink} to="/auth/register" variant="subtitle2" sx={{color: secondary}}>Crear una cuenta</Link>
            <Link variant="subtitle2" sx={{color: secondary}} >¿Has olvidado tu contraseña?</Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}

