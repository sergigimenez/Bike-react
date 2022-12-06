import { IconButton } from '@mui/material'
import React from 'react'
import {useNavigate } from 'react-router-dom'

export const SideBarDesktop = ({ styleColor, stateMenu, menuItems }) => {
    const { color } = styleColor
    const navigate = useNavigate()

    const onHandleClickMenu = (item) => {
        navigate(`/bike/${item.navigate}`)
    }

    return (
        <>
            <ul className="list-group list-group-flush">
                {
                    menuItems.map(item => (
                        <li
                            key={item.id}
                            className="list-group-item sidebarItemActive"
                            style={{ backgroundColor: 'transparent' }}
                        >
                            <IconButton style={{ color: color }} onClick={() => {onHandleClickMenu(item)}}>
                                {(item.customTag)}
                            </IconButton>
                            {(stateMenu) ? item.id : ''}
                        </li>
                    ))
                }
            </ul>
        </>
    )
}
