import { Grid, Typography } from "@mui/material"
import { useSelector } from "react-redux"

export const AuthLayout = ({ children, title = '' }) => {

    const {primary, background} = useSelector(state => state.theme)

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '100vh', backgroundColor: primary, padding: 4 }}
        >
            <Grid 
                item
                className='box-shadow'
                xs={3}
                sx={{ width: {md: 450},  backgroundColor: background, padding: 3, borderRadius: 2 }}
            >
                <Typography variant='h5' sx={{ mb: 1 }}>{title}</Typography>

                {children}

            </Grid>
        </Grid>
    )
}
