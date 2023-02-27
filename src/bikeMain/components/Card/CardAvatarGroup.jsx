import { Comment, ThumbUp } from '@mui/icons-material';
import { Avatar, AvatarGroup, Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ModalComentarios } from './ModalComentarios';

export const CardAvatarGroup = ({ stateComents, mediaQuery, isVisible, cardStyleMobile, onLike, cardLiked, id, theme }) => {

    const [open, setOpen] = useState(false)
    const handleOpen = () => {setOpen(true)}
    const handleClose = () => {setOpen(false)}
    
    const onHandleLike = (id, event) => {
        onLike(id)
    }

    const { cardsState } = useSelector(state => state.card)

    const onHandleSetTextCard = () => {
        let { likes, comentarios } = cardsState.find(card => {
            return card.idCard == id
        })
        return `${likes} likes - ${comentarios} comentarios`
    }

    useEffect(() => {
        onHandleSetTextCard()
    }, [cardLiked])


    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col-xs-12 col-sm-12 col-md-8 d-flex justify-content-start' style={{ visibility: 'visible' }}>
                        <AvatarGroup sx={{ display: "flex", alignItems: "center" }}>
                            <Avatar alt="Remy Sharp" sx={{ width: 20, height: 20 }} />
                            <Avatar alt="Travis Howard" sx={{ width: 20, height: 20 }} />
                            <Avatar alt="Agnes Walker" sx={{ width: 20, height: 20 }} />
                            <Avatar alt="Trevor Henderson" sx={{ width: 20, height: 20 }} />
                        </AvatarGroup>
                        <Typography variant='caption' sx={{ display: 'flex', alignItems: 'end', margin: "0 2px" }}>{onHandleSetTextCard()}</Typography>
                    </div>
                    {
                        (mediaQuery && !cardStyleMobile) &&
                        <div className='col-md-4 d-flex justify-content-center'>
                            <Button onClick={(event) => onHandleLike(id, event)} variant='outlined' sx={{ color: "black", mr: 0.5, backgroundColor: cardLiked }}><ThumbUp /></Button>
                            <Button variant="outlined" sx={{ color: "black", ml: 0.5 }} onClick={handleOpen}>
                                <Comment />
                            </Button>
                            <ModalComentarios onHandleClose={handleClose} state={open} theme={theme} mediaQuery={mediaQuery} idCard={id} typeModal={"addComment"}></ModalComentarios>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
