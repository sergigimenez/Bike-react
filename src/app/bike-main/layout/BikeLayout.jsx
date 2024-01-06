import { useMediaQuery } from "@mui/material"
import { useState } from "react"
import { useSelector } from "react-redux"
import { DesktopLayout } from "./DesktopLayout"
import { MobileLayout } from "./MobileLayout"
import { Add, CalendarMonthOutlined, DirectionsBikeOutlined, DirectionsBikeRounded, LeaderboardRounded, PeopleAltRounded } from '@mui/icons-material'

export const BikeLayout = ({ children, title = '', noPadding }) => {

    const theme = useSelector(state => state.theme)
    const [stateMenu, setStateMenu] = useState(false)
    const mediaQuery = useMediaQuery('(min-width:1000px)');
    const menuItems = [
        { id: 'Rutas', customTag: <DirectionsBikeRounded/>, navigate: "route" },
        { id: 'Estaditicas', customTag: <LeaderboardRounded/>, navigate: "profile" },
        { id: 'Amigos', customTag: <PeopleAltRounded/>, navigate: "main" },
        { id: 'Calendario', customTag: <CalendarMonthOutlined/>, navigate: "main" },
        { id: 'Añadir Ruta', customTag: <Add/>, navigate: "addRoute" }
    ]

    const onHandleClickMenu = () => {
        (stateMenu)
            ? setStateMenu(false)
            : setStateMenu(true)
    }

    const objLayout = {
        stateMenu,
        theme,
        children,
        menuItems,
        onHandleClickMenu,
        noPadding
    }

    return (
        <>
            {(mediaQuery) ? <DesktopLayout objLayout={objLayout} /> : <MobileLayout objLayout={objLayout} />}
        </>
    )
}