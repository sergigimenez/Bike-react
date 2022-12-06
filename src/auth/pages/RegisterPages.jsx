import { Apple, Email, Facebook, Google } from "@mui/icons-material"
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { Link as RouterLink } from 'react-router-dom'
import { ModalRegister } from "../components/ModalRegister"
import { useState } from "react"
import { useSelector } from "react-redux"

export const RegisterPages = () => {

  const [open, setOpen] = useState(false)
  const handleOpen = () => { setOpen(true) }
  const handleClose = () => { setOpen(false) }

  const {primary, secondary, background} = useSelector(state => state.theme)

  return (
    <AuthLayout title="Registrarse con: ">
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button variant="contained" fullWidth sx={{backgroundColor: primary}}>
              <Google />
              <Typography sx={{ ml: 1 }}>Google</Typography>
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" fullWidth sx={{backgroundColor: primary}}>
              <Facebook />
              <Typography sx={{ ml: 1 }}>Facebook</Typography>
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" fullWidth sx={{backgroundColor: primary}}>
              <Apple />
              <Typography sx={{ ml: 1 }}>Apple</Typography>
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" fullWidth onClick={handleOpen} sx={{backgroundColor: primary}}>
              <Email />
              <Typography sx={{ ml: 1 }}>Email</Typography>
            </Button>
            <ModalRegister onHandleClose={handleClose} state={open} primary={primary} background={background}></ModalRegister>
          </Grid>

          <Grid container justifyContent="center" sx={{ mt: 1 }}>
            <Link component={RouterLink} to="/auth/login" variant="subtitle2" sx={{color: secondary}}>¿Ya tienes cuenta?</Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}
