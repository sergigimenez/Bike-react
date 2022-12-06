import { ImageList, ImageListItem, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { Card } from '../Card/Card'

const itemData = [
    {
        img: 'https://res.cloudinary.com/dhvkbs4lv/image/upload/v1662490537/journal/gpmjnizqesojh55zxtzb.jpg',
        title: 'Breakfast',
        rows: 2,
        cols: 2,
    },
    {
        img: 'https://res.cloudinary.com/dhvkbs4lv/image/upload/v1662490537/journal/uzffumdxewnrzmievmqb.jpg',
        title: 'Burger',
    },
    {
        img: 'https://res.cloudinary.com/dhvkbs4lv/image/upload/v1662490537/journal/igtetpkxkuywuy6xomqz.jpg',
        title: 'Camera',
    },
    {
        img: 'https://res.cloudinary.com/dhvkbs4lv/image/upload/v1662490537/journal/fobjmsddkwg5gsp75pqz.jpg',
        title: 'Coffee',
        cols: 2,
    },
    {
        img: 'https://res.cloudinary.com/dhvkbs4lv/image/upload/v1662490536/journal/fjzcx9xzyoxoddbngpvw.jpg',
        title: 'Hats',
        cols: 2,
    },
    {
        img: 'https://res.cloudinary.com/dhvkbs4lv/image/upload/v1662490512/journal/dcyyrxambvic7pl4oxag.jpg',
        title: 'Honey',
        rows: 2,
        cols: 2,
    },
    {
        img: 'https://res.cloudinary.com/dhvkbs4lv/image/upload/v1662490537/journal/uzffumdxewnrzmievmqb.jpg',
        title: 'Burger',
    },
    {
        img: 'https://res.cloudinary.com/dhvkbs4lv/image/upload/v1662490512/journal/obdkhzsigdu7nerh89iv.jpg',
        title: 'Fern',
    },
    {
        img: 'https://res.cloudinary.com/dhvkbs4lv/image/upload/v1662490535/journal/qt1d5e6bix3phyyqevdo.jpg',
        title: 'Tomato basil',
    },
    {
        img: 'https://res.cloudinary.com/dhvkbs4lv/image/upload/v1665687079/journal/E4_L2_HL-4168_hiqy09.jpg',
        title: 'Sea star',
    },
    {
        img: 'https://res.cloudinary.com/dhvkbs4lv/image/upload/v1665687167/journal/sportograf-139082030_esaz72.jpg',
        title: 'Bike',
        cols: 2,
    },
];

function srcset(image, size, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${size * rows
            }&fit=crop&auto=format&dpr=2 2x`,
    };
}

export const Main = () => {

    const routes = useSelector(state => state.card)
    const theme = useSelector(state => state.theme)

    return (
        <div className='col-lg-12 d-flex justify-between flex-column flex-lg-row'>
            <div className='col-lg-6 col-12 d-flex flex-column'>
                <div className='offset-1 col-10'>
                    <div className='card'>
                        <ul style={{ listStyle: 'none' }}>
                            <li className='d-flex align-items-center'>
                                <Typography variant='h6'>Carreras Finalizadas:</Typography>
                                <Typography variant='subtitle1'>5</Typography>
                            </li>
                            <li className='d-flex align-items-center'>
                                <Typography variant='h6'>Kilometros totales:</Typography>
                                <Typography variant='subtitle1'>1500</Typography>
                            </li>
                            <li className='d-flex align-items-center'>
                                <Typography variant='h6'>Desnivel acumulado:</Typography>
                                <Typography variant='subtitle1'>5300m+</Typography>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='offset-1 col-10' style={{ marginTop: 40 }}>
                    <ImageList
                        sx={{ width: "100%", height: 550, border: "2px solid", borderRadius: "15px" }}
                        variant="quilted"
                        cols={4}
                        rowHeight={121}
                    >
                        {itemData.map((item, index) => (
                            <ImageListItem key={index} cols={item.cols || 1} rows={item.rows || 1}>
                                <img
                                    {...srcset(item.img, 121, item.rows, item.cols)}
                                    alt={item.title}
                                    loading="lazy"
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
            </div>
            <div className='col-12 offset-lg-0 col-lg-6 d-flex flex-column align-items-center' style={{ maxHeight: 800, overflow: 'overlay' }}>
                {
                    routes.cards.map(route => (
                        <Card key={route.id + (Math.random() + 1).toString(36).substring(7)} route={route} theme={theme} cardStyleMobile={true}></Card>
                    ))
                }
            </div>
        </div>
    )
}
