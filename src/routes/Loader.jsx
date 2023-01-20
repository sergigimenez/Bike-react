import {CircularProgress, Stack} from "@mui/material";

export const Loader = () => {
    //TODO PAUSAR CARGA UNOS SEGUNDOS
    return (
        <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
            <CircularProgress color="secondary" />
        </Stack>
    )
}