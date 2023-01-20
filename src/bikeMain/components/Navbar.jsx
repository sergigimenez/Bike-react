import { AccountCircle, Logout, Notifications, NotificationsActive, Search } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, IconButton, InputAdornment, TextField, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { startLogout } from '../../store/auth/thunks';

export const Navbar = ({ styleColor, onHandleClickMenu, isLayout }) => {
    const { color } = styleColor
    const [isNotification, setIsNotification] = useState(false)

    const onHandleClick = () => {
        onHandleClickMenu()
    }

    const dispatch = useDispatch()

    const onHandleLogout = () => {
        dispatch(startLogout())
    }

    const classNavbar = isLayout == "desktop"
        ? "col-offset-8 col-4 justify-content-center"
        : "col-offset-11 col-1 justify-content-end"
    return (
        <>
            <Toolbar style={{ color: color }}>
                <div className='col-3 d-flex flex-row align-items-center'>
                    <IconButton sx={{ color: color }} onClick={onHandleClick}>
                        <MenuIcon></MenuIcon>
                    </IconButton>
                    <Typography sx={{ ml: 1 }}>BikeApp</Typography>
                </div>
                <div className='col-9'>
                    <div className='row justify-content-end align-items-center'>
                        <div className={`d-flex ${classNavbar} flex-row align-items-center`}>
                        {
                            (isLayout == "desktop")
                                ? <TextField
                                    hiddenLabel
                                    variant="filled"
                                    size="small"
                                    sx={{ input: { color: color }, width: '15ch', mr: 1 }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start" sx={{ color: color }}>
                                                <Search />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                : ''
                        }

                        {
                            (isNotification)
                                ? <NotificationsActive sx={{ mr: 1 }} />
                                : <Notifications sx={{ mr: 1 }} />
                        }
                        |
                        <Avatar sx={{ width: 24, height: 24, ml: 1, mr: 1 }} alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                        |
                        <IconButton sx={{ color: color }} onClick={onHandleLogout}>
                            <Logout></Logout>
                        </IconButton>
                    </div>
                </div>
            </div>
        </Toolbar>
        </>
    )
}
