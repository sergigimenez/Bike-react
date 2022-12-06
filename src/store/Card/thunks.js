import { setCard } from "./cardSlice"

const iniRoutes = [
    {
        id: 1,
        img: `/assets/cbr.jpg`,
        titleCard: 'Catalunya Bike Race',
        info: [
            ['Distancia', '50km'],
            ['Desnivel', '1700m+'],
            ['Fecha', '30/09/2022'],
            ['Precio', '35.5€']
        ],
        stateComents: '26 Likes - 2 comentarios',
        comments: [
            {
                id: 1,
                nameComent: 'Sergi Gimenez',
                dateComent: '21/09/2021',
                textComent: '3 dias en el corazon de Catalunya'
            }
        ]
    },
    {
        id: 2,
        img: `/assets/cln_triste.jpg`,
        titleCard: 'Colina Triste',
        info: [
            ['Distancia', '90km'],
            ['Desnivel', '2300m+'],
            ['Fecha', '16/05/2023'],
            ['Precio', '135.5€']
        ],
        stateComents: '100 Likes - 9 comentarios',
        comments: [
            {
                id: 1,
                nameComent: 'Cristobal Catalan',
                dateComent: '24/03/2022',
                textComent: 'Una carrera muy exigente'
            }
        ]
    }
]

export const handleSetRoutes = () => {
    return async (dispatch, getState) => {
        iniRoutes.forEach(route => {
            dispatch(setCard(route))
        })
    }
}

/*Upload Image */
export const uploadImage = (file, titulo) => {
    return async (dispatch) => {
        if (!file) throw new Error('No tenemos ningun archivo que subir')
        const resp = fileUpload(file, titulo)
        return resp
    }
}

export const fileUpload = async (file, titulo) => {
    if (!file) throw new Error('No tenemos ningun archivo que subir')

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dhvkbs4lv/upload'

    const fromData = new FormData();
    fromData.append('upload_preset', 'react-bike')
    fromData.append('file', file)
    fromData.append('public_id', titulo)

    try {
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: fromData
        })

        if (!resp.ok) throw new Error('No se puede subir la imagen')

        const cloudResp = await resp.json()

        return cloudResp.secure_url
    } catch (error) {
        throw new Error(error.message)
    }
}
/*Upload Image */