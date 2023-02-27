import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Autocomplete, Button, Chip, Slider, Switch, TextField, useMediaQuery } from '@mui/material'
import { Stack } from '@mui/system'
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSerch } from '../../../hooks/useSearch'
import { searchCard } from '../../../store/Card/thunks'
import { Typography } from 'antd';
import 'dayjs/locale/es';
import { Search } from '@mui/icons-material';

export const Searcher = ({ numPage, routes }) => {
    dayjs.locale('es')
    const mediaQuery = useMediaQuery('(min-width:785px)');
    const {primary} = useSelector(state => state.theme)

    const [fieldDate, setDate] = useState(null)

    const handleChange = (newValue) => {
        fieldDate == null ? setDate(dayjs(new Date()).format()) : setDate(newValue);
    };

    const dispatch = useDispatch()

    const {
        marksDesnivel,
        marksDistancia,
        provincias,
        titleCard,
        poblaciones,
        onFocusGetProvincias,
        onFocusGetTitleCarreras,
        onFocusGetPoblaciones,
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
    } = useSerch()

    useEffect(() => {
        if (routes.statusSearch == "searched") {
            dispatch(searchCard(numPage, fieldProvincias, fieldPoblaciones, fieldTitleCarreras, fieldDistancia, fieldDesnivel, fieldDate))
        }
    }, [numPage])


    const onHandleSerchRaces = () => {
        dispatch(searchCard(numPage, fieldProvincias, fieldPoblaciones, fieldTitleCarreras, fieldDistancia, fieldDesnivel, fieldDate))
    }

    return (
        <>
            <div className='row' style={{ marginTop: 10 }}>
                <div className='col-12 d-flex justify-content-center'>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                            variant="filled"
                            label="Dia de la carrera"
                            inputFormat="DD/MM/YYYY"
                            value={fieldDate}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </div>
                <div className='col-12 d-flex justify-content-center'>
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
                        sx={{ width: '50%' }}
                    />

                    <Autocomplete
                        multiple
                        limitTags={2}
                        id="multiple-limit-tags_3"
                        freeSolo
                        options={poblaciones}
                        getOptionLabel={(option) => option.poblacion}
                        onChange={(e, value) => setFieldPoblacionesHook(value)}
                        onFocus={(e) => onFocusGetPoblaciones()}
                        renderTags={(value, getTagProps) =>
                            value.map((option, index) => {
                                return (
                                    <Chip variant="outlined" label={option.poblacion} {...getTagProps({ index })} />
                                )
                            })
                        }
                        renderInput={(params) => (
                            <TextField {...params} variant="filled" label="Poblaciones" placeholder="Favorites" />
                        )}
                        sx={{ width: '50%' }}
                    />
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
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
                        sx={{ width: '100%' }}
                    />
                </div>
                <div className='col-12 d-flex justify-content-center' style={{ overflow: "hidden" }}>
                    <div className='col-8 d-flex align-items-center'>
                        <Typography style={{ display: "flex", alignItems: "center" }}>
                            {
                                fieldDistancia[0] != null ? fieldDistancia[0] + " km" : "0 km"
                            }
                        </Typography>
                        <Slider
                            value={fieldDistancia}
                            onChange={handleSliderDistanciaHook}
                            valueLabelDisplay="auto"
                            disableSwap
                            step={5}
                            min={0}
                            max={150}
                            sx={{ width: mediaQuery ? "500px" : "210px", ml: 2, mr: 2 }}
                        />
                        <Typography style={{ display: "flex", alignItems: "center" }}>
                            {
                                fieldDistancia[1] != null ? fieldDistancia[1] + " km" : "150 km"
                            }
                        </Typography>
                    </div>
                    <div className='col-4 d-flex align-items-center'>
                        <Switch defaultChecked></Switch>
                        <Typography>Fecha Confirmada</Typography>
                    </div>
                </div>
                <div className='col-12 d-flex justify-content-center' style={{ overflow: "hidden" }}>
                    <div className='col-8 d-flex align-items-center'>
                        <Typography style={{ display: "flex", alignItems: "center" }}>
                            {
                                fieldDesnivel[0] != null ? fieldDesnivel[0] + " m +" : "0 m +"
                            }
                        </Typography>
                        <Slider
                            value={fieldDesnivel}
                            onChange={handleSliderDesnivelHook}
                            valueLabelDisplay="auto"
                            disableSwap
                            step={5}
                            min={0}
                            max={3000}
                            sx={{ width: mediaQuery ? "500px" : "210px", ml: 2, mr: 2 }}
                        />
                        <Typography style={{ display: "flex", alignItems: "center" }}>
                            {
                                fieldDesnivel[1] != null ? fieldDesnivel[1] + " m +" : "3000 m +"
                            }
                        </Typography>
                    </div>
                    <div className='col-4 d-flex align-items-center'>
                        <Button
                            size="small" variant='contained' style={{backgroundColor: primary}}
                            endIcon={<Search />}
                            onClick={onHandleSerchRaces}>
                            Buscar Carreras
                        </Button>
                    </div>

                </div>
            </div>

            <div className='d-flex align-items-center'>
                <p style={{ margin: 0, fontSize: 13 }}>Total Resultados: ({routes.totalResults})</p>
            </div>
        </>
    )
}