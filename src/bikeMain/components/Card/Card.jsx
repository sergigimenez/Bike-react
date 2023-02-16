import { Avatar, Button, ButtonGroup, IconButton, Link, Popper, Typography, useMediaQuery } from '@mui/material';
import { CardAvatarGroup } from './CardAvatarGroup'
import { ArrowDropDown, Comment, Facebook, Favorite, InsertLink, Instagram, ThumbUp, Twitter, YouTube } from '@mui/icons-material';
import { FollowModule } from './FollowModule';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likeRouteByUser, uploadImage } from '../../../store/Card/thunks';
import { useEffect } from 'react';
import { ModalComentarios } from './ModalComentarios';

const styles = {
    desktop: {
        card: {
            height: 300,
            maxWidth: 795
        },
        cardContainer_1: {
            height: "100%",
            minWidth: 250,
            maxWidth: "250px"
        },
        cardContainer_2: {
            height: "250px"
        }
    },
    mobile: {
        card: {
            height: "auto",
            maxWidth: 375
        },
        cardContainer_1: {
            height: "250px",
            minWidth: 250,
            maxWidth: ""
        },
        cardContainer_2: {
            height: "250px"
        }
    }
}
export const Card = ({ theme, route, cardStyleMobile }) => {
    const { primary, title, secondary, background } = theme
    const { img, titleCard, info, stateComents, comments, id } = route

    const dispatch = useDispatch();
    const user = useSelector(state => state.auth)

    var isVisible = 'hidden'
    if (comments.length >= 1) {
        var { id:idComentario, userComent, dateComent, textComent } = comments[0]
        isVisible = 'visible'
    }

    const mediaQuery = useMediaQuery('(min-width:785px)');
    const style = (mediaQuery && !cardStyleMobile) ? styles.desktop : styles.mobile;
    const { card, cardContainer_1, cardContainer_2 } = style

    const classNameMobile = cardStyleMobile ? 'classNameMobile' : '';

    const [open, setOpen] = useState(false)
    const handleOpen = () => {setOpen(true)}
    const handleClose = () => {setOpen(false)}

    const onFormatData = (keyElement, valueInfo) => {
        if (keyElement == "Distancia") {
            valueInfo = valueInfo.map((value, index) => {
                return valueInfo.length - 1 != index ? value + "/" : value + " km"
            }).toString().replaceAll(",", '')
        }

        if (keyElement == "Desnivel") {
            valueInfo = valueInfo.map((value, index) => {
                return valueInfo.length - 1 != index ? value + "/" : value + " mts +"
            }).toString().replaceAll(",", '')
        }

        if (keyElement == "Fecha") {
            valueInfo = new Date(valueInfo).toLocaleDateString()
        }

        if (keyElement == "Web") {
            valueInfo = <Button key={(Math.random() + 10).toString(36).substring(7)} style={{ color: primary }} target="_blank" href={valueInfo}><InsertLink /></Button>
        }

        if (keyElement == "Facebook") {
            valueInfo = <Button key={(Math.random() + 10).toString(36).substring(7)} style={{ color: primary }} target="_blank" href={valueInfo}><Facebook /></Button>
        }

        if (keyElement == "Instagram") {
            valueInfo = <Button key={(Math.random() + 10).toString(36).substring(7)} style={{ color: primary }} target="_blank" href={valueInfo}><Instagram /></Button>
        }

        if (keyElement == "Twitter") {
            valueInfo = <Button key={(Math.random() + 10).toString(36).substring(7)} style={{ color: primary }} target="_blank" href={valueInfo}><Twitter /></Button>
        }

        if (keyElement == "Youtube") {
            valueInfo = <Button key={(Math.random() + 10).toString(36).substring(7)} style={{ color: primary }} target="_blank" href={valueInfo}><YouTube /></Button>
        }

        return valueInfo
    }

    const [cardLiked, setCardLiked] = useState(!!user.cardsLiked.find(cardUser => { return cardUser == id }) ? background : '')

    useEffect(() => {
        setCardLiked(!!user.cardsLiked.find(cardUser => { return cardUser == id }) ? background : '')
    }, [user.cardsLiked])

    const onLike = (idCard) => {
        dispatch(likeRouteByUser(idCard))
        return user.cardsLiked.includes(idCard) ? background : ''
    }

    const onUploadImage = (files) => {
        console.log(files.target.files[0])
        dispatch(uploadImage(files.target.files[0], titleCard, id))
    }


    return (
        <>
            <div className={`card cardMediaQuery row d-flex flex-row align-items-center ${classNameMobile}`} style={{ height: card.height, margin: 5, border: "0.1px solid black", borderRadius: 10, maxWidth: card.maxWidth, minWidth: 325 }}>
                <div className='col-sm-12 col-md-4 d-flex flex-column justify-content-center' style={{ height: cardContainer_1.height, minWidth: cardContainer_1.minWidth, maxWidth: cardContainer_1.maxWidth }}>
                    <img src={img} style={{ height: "65%", width: "100%", objectFit: "contain", backgroundColor: secondary }}></img>
                    {
                        (img.toString() == "vacio") &&
                        <input type="file" onChange={(files) => { onUploadImage(files) }} accept="image/*"></input>
                    }
                    <div className='d-flex justify-content-between' style={{ marginTop: "5px" }}>
                        {
                            (cardStyleMobile || !mediaQuery) &&
                            <div className='col-md-5 d-flex justify-content-center'>
                                <Button variant='outlined' sx={{ color: "black", mr: 0.5 }}><ThumbUp /></Button>
                                <Button variant="filled" sx={{ color: "black", ml: 0.5 }}><Comment /></Button>
                            </div>
                        }
                        <ButtonGroup variant='text' size='small'>
                            {
                                Object.keys(info).map(keyElement => {
                                    if (
                                        (keyElement == "Web" && info[keyElement][0] != null) ||
                                        (keyElement == "Facebook" && info[keyElement][0] != null) || 
                                        (keyElement == "Instagram" && info[keyElement][0] != null) ||
                                        (keyElement == "Twitter" && info[keyElement][0] != null) ||
                                        (keyElement == "Youtube" && info[keyElement][0] != null)
                                    ) {
                                        return (
                                            onFormatData(keyElement, info[keyElement])
                                        )
                                    }
                                })
                            }
                        </ButtonGroup>
                    </div>
                </div>
                {(cardStyleMobile || !mediaQuery) && <CardAvatarGroup stateComents={stateComents} mediaQuery={mediaQuery} cardStyleMobile={cardStyleMobile} id={id} onLike={onLike} cardLiked={cardLiked}></CardAvatarGroup>}
                <div className='col-sm-12 col-md-8 d-flex flex-column justify-content-evenly' style={{ height: cardContainer_2.height }}>
                    <FollowModule primary={primary} secondary={secondary} titleCard={titleCard} id={id}></FollowModule>
                    <ul className="list-group list-group-horizontal lastElememtNoneBorderRight" style={{ marginBottom: "5px", maxWidth: "500px" }}>
                        {
                            Object.keys(info).map(keyElement => {
                                if (
                                    (keyElement == "Distancia" && info[keyElement][0] != null) ||
                                    (keyElement == "Desnivel" && info[keyElement][0] != null) ||
                                    (keyElement == "Fecha" && info[keyElement][0] != null) ||
                                    (keyElement == "Poblacion" && info[keyElement][0] != null)
                                ) {
                                    return (
                                        <li
                                            className="list-group-item d-flex flex-column align-items-end justify-content-center"
                                            style={{ borderLeft: 0, borderTop: 0, borderBottom: 0, height: "50px", padding: "8px 8px" }}
                                            key={keyElement}
                                        >
                                            <Typography variant='h6' sx={{ color: title, mb: 0, fontSize: "1rem" }}>{keyElement}</Typography>
                                            <Typography variant='p' sx={{ fontSize: "0.8rem", mt: "-8px" }}>{onFormatData(keyElement, info[keyElement])}</Typography>
                                        </li>
                                    )
                                }
                            })
                        }
                    </ul>
                    {(mediaQuery && !cardStyleMobile) && <CardAvatarGroup stateComents={stateComents} mediaQuery={mediaQuery} isVisible={isVisible} id={id} onLike={onLike} cardLiked={cardLiked}></CardAvatarGroup>}
                    <div className='container'>
                        <div className='row d-flex justify-content-between'>
                            <div className='col-sm-6 col-md-5 d-flex'>
                                <Avatar sx={{ width: 25, height: 25, mr: 0.5, visibility: isVisible }} />
                                <Typography variant='subtitle2'>{(typeof userComent == 'undefined' ? '' : userComent)}</Typography>
                            </div>
                            <div className='col-sm-6 offset-md-4 col-md-3 d-flex justify-content-end'>
                                <Typography variant='caption'>{(typeof dateComent == 'undefined' ? '' : dateComent)}</Typography>
                            </div>
                            <div className='d-flex justify-content-between align-items-center'>
                                <Typography variant='body2'>{(typeof textComent == 'undefined' ? '' : textComent)} </Typography>
                                <IconButton sx={{ color: 'red', visibility: isVisible }}><Favorite sx={{ width: 18, height: 18 }} /></IconButton>
                            </div>
                        </div>
                    </div>
                    <Typography variant="caption" sx={{ visibility: 'visible' }}>
                        <ArrowDropDown />
                        <Link onClick={handleOpen} >Ver mas comentarios</Link>
                        <ModalComentarios onHandleClose={handleClose} state={open} primary={primary} background={background}></ModalComentarios>
                    </Typography>
                </div>
            </div>
        </>
    )
}