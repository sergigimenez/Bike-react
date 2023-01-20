import { Avatar, Button, ButtonGroup, IconButton, Link, Popper, Typography, useMediaQuery } from '@mui/material';
import { CardAvatarGroup } from './CardAvatarGroup'
import { ArrowDropDown, Comment, Facebook, Favorite, InsertLink, Instagram, ThumbUp, Twitter} from '@mui/icons-material';
import { FollowModule } from './FollowModule';
import React from 'react';

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
    const { primary, title, secondary } = theme
    const { img, titleCard, info, stateComents, comments, id } = route

    var isVisible = 'hidden'
    if(comments.length >= 1){
        var { nameComent, dateComent, textComent } = comments[0]
        isVisible = 'visible'
    }

    const mediaQuery = useMediaQuery('(min-width:785px)');
    const style = (mediaQuery && !cardStyleMobile) ? styles.desktop : styles.mobile;
    const { card, cardContainer_1, cardContainer_2 } = style

    const classNameMobile = cardStyleMobile ? 'classNameMobile' : '';

    return (
        <>
            <div className={`card cardMediaQuery row d-flex flex-row align-items-center ${classNameMobile}`} style={{ height: card.height, margin: 5, border: "0.1px solid black", borderRadius: 10, maxWidth: card.maxWidth, minWidth: 325 }}>
                <div className='col-sm-12 col-md-4 d-flex flex-column justify-content-center' style={{ height: cardContainer_1.height, minWidth: cardContainer_1.minWidth, maxWidth: cardContainer_1.maxWidth }}>
                    <img src={img} style={{ height: "65%", width: "100%", objectFit: "cover" }}></img>
                    <div className='d-flex justify-content-between' style={{ marginTop: "5px" }}>
                        {
                            (cardStyleMobile || !mediaQuery) &&
                            <div className='col-md-5 d-flex justify-content-center'>
                                <Button variant='filled' sx={{ color: "black", mr: 0.5 }}><ThumbUp /></Button>
                                <Button variant="filled" sx={{ color: "black", ml: 0.5 }}><Comment /></Button>
                            </div>
                        }
                        <ButtonGroup variant='text' size='small'>
                            <Button style={{ color: primary }}><InsertLink /></Button>
                            <Button style={{ color: primary }}><Instagram /></Button>
                            <Button style={{ color: primary }}><Facebook /></Button>
                            <Button style={{ color: primary }}><Twitter /></Button>
                        </ButtonGroup>
                    </div>
                </div>
                {(cardStyleMobile || !mediaQuery) && <CardAvatarGroup stateComents={stateComents} mediaQuery={mediaQuery} cardStyleMobile={cardStyleMobile}></CardAvatarGroup>}
                <div className='col-sm-12 col-md-8 d-flex flex-column justify-content-evenly' style={{ height: cardContainer_2.height }}>
                    <FollowModule primary={primary} secondary={secondary} titleCard={titleCard} id={id}></FollowModule>
                    <ul className="list-group list-group-horizontal justify-content-around lastElememtNoneBorderRight" style={{ marginBottom: "5px", maxWidth: "400px" }}>
                        {
                            Object.keys(info).map(keyElement => {
                                if(keyElement == "Distancia" || keyElement == "Desnivel" || keyElement == "Fecha" || keyElement == "Poblacion"){
                                    return (
                                        <li
                                            className="list-group-item d-flex flex-column align-items-end justify-content-center"
                                            style={{ borderLeft: 0, borderTop: 0, borderBottom: 0, height: "50px", padding: "8px 8px" }}
                                            key={keyElement}
                                        >
                                            <Typography variant='h6' sx={{ color: title, mb: 0, fontSize: "1rem" }}>{keyElement}</Typography>
                                            <Typography variant='p' sx={{ fontSize: "0.8rem", mt: "-8px" }}>{info[keyElement]}</Typography>
                                        </li>
                                    )
                                }
                            })
                        }
                    </ul>
                    {(mediaQuery && !cardStyleMobile) && <CardAvatarGroup stateComents={stateComents} mediaQuery={mediaQuery} isVisible={isVisible}></CardAvatarGroup>}
                    <div className='container'>
                        <div className='row d-flex justify-content-between'>
                            <div className='col-sm-6 col-md-5 d-flex'>
                                <Avatar sx={{ width: 25, height: 25, mr: 0.5 , visibility: isVisible}} />
                                <Typography variant='subtitle2'>{(typeof nameComent == 'undefined' ? '' : nameComent)}</Typography>
                            </div>
                            <div className='col-sm-6 offset-md-4 col-md-3 d-flex justify-content-end'>
                                <Typography variant='caption'>{(typeof dateComent == 'undefined' ? '' : dateComent)}</Typography>
                            </div>
                            <div className='d-flex justify-content-between align-items-center'>
                                <Typography variant='body2'>{(typeof textComent == 'undefined' ? '' : textComent)} </Typography>
                                <IconButton sx={{ color: 'red', visibility: isVisible}}><Favorite sx={{ width: 18, height: 18}} /></IconButton>
                            </div>
                        </div>
                    </div>
                    <Typography variant="caption" sx={{visibility: 'visible'}}><ArrowDropDown /><Link>Ver mas comentarios</Link></Typography>
                </div>
            </div>
        </>
    )
}