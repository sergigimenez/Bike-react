import { Apple, Facebook, Google } from "@mui/icons-material";
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { Link as RouterLink } from "next/link";
import { useForm } from "../../hooks/useForm";
import { useEffect, useState } from "react";
import {
  startGoogleSignIn,
  startLoginWithEmailPassword,
  startFacebookSignIn,
} from "../../store/auth/thunks";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Loader } from "../../routes/Loader";

const formData = {
  email: "",
  password: "",
};

const formValidations = {
  email: [(value) => value.includes("@"), "el correo debe tener una @"],
  password: [
    (value) => value.length >= 6,
    "el password debe de tener mas de 6 letras",
  ],
};

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
  } = useForm(formData, formValidations);

  const [isSubmited, setSubmited] = useState(false);
  const { primary, secondary } = useSelector((state) => state.theme);
  const { errorMessage, status } = useSelector((state) => state.auth);

  const onSubmit = (event) => {
    event.preventDefault();
    setSubmited(true);
    if (!isFormValid) return;
  };

  const dispatch = useDispatch();
  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  };

  const onFacebookSignIn = () => {
    dispatch(startFacebookSignIn());
  };

  const onStartLoginWithEmailPassword = () => {
    if (!isFormValid) return;
    dispatch(startLoginWithEmailPassword(formState));
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire("Error en el login", errorMessage, "error");
    }
  }, [errorMessage]);

  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
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

          <Grid item xs={12} sx={{ mt: 2 }}>
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

          <Grid container sx={{ mb: 2, mt: 1 }} spacing={2}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                type="sumbit"
                sx={{ backgroundColor: primary }}
                onClick={onStartLoginWithEmailPassword}
              >
                <Typography>Sign In</Typography>
              </Button>
            </Grid>

            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button
                variant="contained"
                onClick={onGoogleSignIn}
                sx={{ backgroundColor: primary }}
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
              <Button
                variant="contained"
                onClick={onFacebookSignIn}
                sx={{ backgroundColor: primary }}
              >
                <Facebook />
                <Typography sx={{ ml: 1 }}>Facebook</Typography>
              </Button>
              <Button variant="contained" sx={{ backgroundColor: primary }}>
                <Apple />
                <Typography sx={{ ml: 1 }}>Apple</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container justifyContent="space-between">
            <Link
              component={RouterLink}
              href="/auth/register"
              variant="subtitle2"
              sx={{ color: secondary }}
            >
              Crear una cuenta
            </Link>
            <Link variant="subtitle2" sx={{ color: secondary }}>
              ¿Has olvidado tu contraseña?
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
