import { Autocomplete, Button, Chip, Slider, TextField } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSerch } from '../../../hooks/useSearch'
import { searchCard } from '../../../store/Card/thunks'

export const Searcher = ({ numPage, routes }) => {

    const dispatch = useDispatch()

    const {
        marksDesnivel,
        marksDistancia,
        provincias,
        titleCard,
        onFocusGetProvincias,
        onFocusGetTitleCarreras,
        fieldProvincias,
        setFieldProvinciasHook,
        fieldTitleCarreras,
        setFieldTitleCarrerasHook,
        fieldDistancia,
        handleSliderDistanciaHook,
        fieldDesnivel,
        handleSliderDesnivelHook
    } = useSerch()

    useEffect(() => {
        if (routes.statusSearch == "searched") {
            dispatch(searchCard(numPage, fieldProvincias, fieldTitleCarreras, fieldDistancia, fieldDesnivel))
        }
    }, [numPage])


    const onHandleSerchRaces = () => {
        dispatch(searchCard(numPage, fieldProvincias, fieldTitleCarreras, fieldDistancia, fieldDesnivel))
    }

    return (
        <>
            <Autocomplete
                multiple
                limitTags={2}
                id="multiple-limit-tags"
                freeSolo
                options={provincias}
                getOptionLabel={(option) => option.provincia}
                onChange={(e, value) => setFieldProvinciasHook(value)}
                onFocus={(e) => onFocusGetProvincias()}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => {
                        return (
                            <Chip variant="outlined" label={option.provincia} {...getTagProps({ index })} />
                        )
                    })
                }
                renderInput={(params) => (
                    <TextField {...params} variant="filled" label="Provincias" placeholder="Favorites" />
                )}
                sx={{ width: '500px' }}
            />

            <Autocomplete
                id="multiple-limit-tags_2"
                freeSolo
                options={titleCard}
                getOptionLabel={(option) => option.titleCard}
                onChange={(e, value) => setFieldTitleCarrerasHook(value)}
                onFocus={(e) => onFocusGetTitleCarreras()}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => {
                        return (
                            <Chip variant="outlined" label={option.titleCard} {...getTagProps({ index })} />
                        )
                    })
                }
                renderInput={(params) => (
                    <TextField {...params} variant="filled" label="Nombre de la carrera" placeholder="Favorites" />
                )}
                sx={{ width: '500px' }}
            />

            <Slider
                value={fieldDistancia}
                onChange={handleSliderDistanciaHook}
                valueLabelDisplay="auto"
                disableSwap
                step={5}
                marks={marksDistancia}
                min={0}
                max={150}
                sx={{ width: '500px' }}
            />

            <Slider
                value={fieldDesnivel}
                onChange={handleSliderDesnivelHook}
                valueLabelDisplay="auto"
                disableSwap
                step={5}
                marks={marksDesnivel}
                min={0}
                max={3000}
                sx={{ width: '500px' }}
            />
            <br></br>
            <Button onClick={onHandleSerchRaces}>Buscar Carreras</Button>
        </>
    )
}