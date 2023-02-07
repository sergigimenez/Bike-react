import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProvinciasThunks, getTitleCardThunks, getPoblacionesThunks } from "../store/Card/thunks"

export const useSerch = () => {

    const dispatch = useDispatch()
    const { provincias, poblaciones,  titleCard } = useSelector(state => state.card)
    const [fieldProvincias, setFieldProvincias] = useState([])
    const [fieldPoblaciones, setFieldPoblaciones] = useState([])
    const [fieldTitleCarreras, setFieldTitleCarreras] = useState([])
    const [fieldDistancia, setDistancia] = useState([null, null])
    const [fieldDesnivel, setDesnivel] = useState([null, null])

    const minDesnivel = 100
    const minDistancia = 5
    
    const marksDistancia = [
        {
            value: 0,
            label: "0km"
        },
        {
            value: 25,
            label: "25km"
        },
        {
            value: 50,
            label: "50km"
        },
        {
            value: 75,
            label: "75km"
        },
        {
            value: 100,
            label: "100km"
        },
        {
            value: 125,
            label: "125km"
        },
        {
            value: 150,
            label: "mas de 150km"
        }
    ]
    const marksDesnivel = [
        {
            value: 0,
            label: "0 +mts"
        },
        {
            value: 500,
            label: "500 +mts"
        },
        {
            value: 1000,
            label: "1000 +mts"
        },
        {
            value: 1500,
            label: "1500 +mts"
        },
        {
            value: 2000,
            label: "2000 +mts"
        },
        {
            value: 2500,
            label: "2500 +mts"
        },
        {
            value: 3000,
            label: "3000 +mts"
        }
    ]

    const onFocusGetProvincias = () => {
        provincias.length <= 0 ? dispatch(getProvinciasThunks()) : null
    }
    const onFocusGetTitleCarreras = () => {
        titleCard.length <= 0 ? dispatch(getTitleCardThunks()) : null
    }
    const onFocusGetPoblaciones = () => {
        titleCard.length <= 0 ? dispatch(getPoblacionesThunks()) : null
    }

    const setFieldProvinciasHook = (value) => {
        setFieldProvincias(value)
    }

    const setFieldPoblacionesHook = (value) => {
        setFieldPoblaciones(value)
    }

    const setFieldTitleCarrerasHook = (value) => {
        setFieldTitleCarreras(value)
    }

    const handleSliderDistanciaHook = (event, distancia, activeThumb) => {
        if (!Array.isArray(distancia)) {
            return;
        }

        if (distancia[1] - distancia[0] < minDistancia) {
            if (activeThumb === 0) {
                const clamped = Math.min(distancia[0], 100 - minDistancia);
                setDistancia([clamped, clamped + minDistancia]);
            } else {
                const clamped = Math.max(distancia[1], minDistancia);
                setDistancia([clamped - minDistancia, clamped]);
            }
        } else {
            setDistancia(distancia);
        }
    };

    const handleSliderDesnivelHook = (event, desnivel, activeThumb) => {
        if (!Array.isArray(desnivel)) {
            return;
        }

        if (desnivel[1] - desnivel[0] < minDesnivel) {
            if (activeThumb === 0) {
                const clamped = Math.min(desnivel[0], 100 - minDesnivel);
                setDesnivel([clamped, clamped + minDesnivel]);
            } else {
                const clamped = Math.max(desnivel[1], minDesnivel);
                setDesnivel([clamped - minDesnivel, clamped]);
            }
        } else {
            setDesnivel(desnivel);
        }
    };

    return {
        marksDesnivel,
        marksDistancia,
        provincias,
        poblaciones,
        titleCard,
        onFocusGetProvincias,
        onFocusGetPoblaciones,
        onFocusGetTitleCarreras,
        fieldProvincias,
        setFieldProvinciasHook,
        fieldPoblaciones,
        setFieldPoblacionesHook,
        fieldTitleCarreras,
        setFieldTitleCarrerasHook,
        fieldDistancia,
        handleSliderDistanciaHook,
        fieldDesnivel,
        handleSliderDesnivelHook
    }
}