import { Comment, ThumbUp } from '@mui/icons-material';
import { Avatar, AvatarGroup, Button, Typography } from '@mui/material'

export const CardAvatarGroup = ({ stateComents, mediaQuery, isVisible, cardStyleMobile }) => {
    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col-xs-12 col-sm-12 col-md-8 d-flex justify-content-start' style={{visibility: isVisible}}>
                        <AvatarGroup sx={{ display: "flex", alignItems: "center" }}>
                            <Avatar alt="Remy Sharp" sx={{ width: 20, height: 20 }} />
                            <Avatar alt="Travis Howard" sx={{ width: 20, height: 20 }} />
                            <Avatar alt="Agnes Walker" sx={{ width: 20, height: 20 }} />
                            <Avatar alt="Trevor Henderson" sx={{ width: 20, height: 20 }} />
                        </AvatarGroup>
                        <Typography variant='caption' sx={{ display: 'flex', alignItems: 'end', margin: "0 2px" }}>{stateComents}</Typography>
                    </div>
                    {
                        (mediaQuery && !cardStyleMobile) &&
                        <div className='col-md-4 d-flex justify-content-center'>
                            <Button variant='outlined' sx={{ color: "black", mr: 0.5 }}><ThumbUp /></Button>
                            <Button variant="outlined" sx={{ color: "black", ml: 0.5 }}><Comment /></Button>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
