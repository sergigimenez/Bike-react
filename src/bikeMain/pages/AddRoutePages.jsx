import { Button } from '@mui/material'
import { useState } from 'react'
import { Menu } from '../components/AddRoute/Menu/Menu'
import { Rss, Configuracion, Preview, DragAndDrop } from '../components/AddRoute'
import { BikeLayout } from '../layout/BikeLayout'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { setCard } from '../../store/Card/cardSlice'

const formData = {
  titulo: '',
  distancia: '',
  desnivel: '',
  fecha: '',
  precio: '',
  linkWeb: '',
  instagram: '',
  facebook: '',
  twitter: '',
  img: ''
}

const formValidations = {
  titulo: [(value) => value.length > 0, 'No puede estar vacio'],
  distancia: [(value) => value.length > 0, 'No puede estar vacio'],
  desnivel: [(value) => value.length > 0, 'No puede estar vacio'],
  fecha: [(value) => value.length > 0, 'No puede estar vacio'],
  precio: [(value) => value.length > 0, 'No puede estar vacio'],
  linkWeb: [(value) => value.includes('www.'), 'tiene que incluir www.'],
  instagram: [(value) => value.includes('@'), 'tiene que incluir @'],
  twitter: [(value) => value.includes('@'), 'tiene que incluir @'],
  facebook: [(value) => value.length > 0, 'No puede estar vacio'],
}

export const AddRoutePages = () => {

  const theme = useSelector(state => state.theme)
  const { primary, secondary } = theme

  const [activeStep, setActiveStep] = useState(0)
  const dispatch = useDispatch()

  const {
    formState, onInputChange, onResetForm,
    tituloValid, distanciaValid, fechaValid,
    precioValid, desnivelValid, linkWebValid, instagramValid,
    facebookValid, twitterValid
  } = useForm(formData, formValidations)

  const validations = [
    {
      tituloValid,
      distanciaValid,
      fechaValid,
      precioValid,
      desnivelValid
    },
    {
      linkWebValid,
      instagramValid,
      facebookValid,
      twitterValid
    }
  ]

  const [isSubmit, setIsSubmit] = useState(
    {
      step_0: { status: false, validations: validations[0], sumbit: false },
      step_1: { status: false, validations: validations[1], sumbit: false },
      step_2: { status: false, validations: [], sumbit: false },
      step_3: { status: false, validations: [], sumbit: false }
    })

  useEffect(() => {

  }, [isSubmit])

  const [statusForm, setStatusForm] = useState(false)

  if (!statusForm && isSubmit['step_0'].status && isSubmit['step_1'].status && isSubmit['step_2'].status) {
    setStatusForm(true)
  }


  /*set route */
  const [route, setRoute] = useState('')

  const  {titulo, distancia, desnivel, fecha, precio, linkWeb, instagram, facebook, twitter, img} = formState

  useEffect(() => {
    (statusForm) &&
      setRoute({
        img: img,
        titleCard: titulo,
        info: [
          ['Distancia', distancia],
          ['Desnivel', desnivel],
          ['Fecha', fecha],
          ['Precio', precio]
        ],
        stateComents: '100 Likes - 9 comentarios',
        comments: []
      })
  }, [statusForm, formState])
  /*set route */

  const icons = [
    { text: "Configuracion", tabComponent: <Configuracion formData={formData} onInputChange={onInputChange} isSubmit={isSubmit.step_0} /> },
    { text: "Redes Sociales", tabComponent: <Rss formData={formData} onInputChange={onInputChange} isSubmit={isSubmit.step_1} /> },
    { text: "Imagen", tabComponent: <DragAndDrop secondary={secondary} formState={formState} onInputChange={onInputChange} /> },
    { text: "Preview", tabComponent: <Preview theme={theme} route={route} /> }
  ]

  const handleStep = (step) => {
    onSubmit() ? setActiveStep(step) : ''
  };

  const handleNextStep = () => {
    onSubmit() ? setActiveStep(activeStep + 1) : ''
  }

  const handlePreviuosStep = () => {
    onSubmit() ? setActiveStep(activeStep - 1) : ''
  }

  const handleAddRoute = () => {
    (statusForm) &&
      dispatch(setCard(route))
  }

  const onSubmit = (event) => {
    typeof event != "undefined" ? event.preventDefault() : ''
    for (const key in isSubmit) {
      if (key.includes(activeStep)) {
        let status = true
        for (const validation in validations[activeStep]) {
          if ((status && validations[activeStep][validation]) || typeof validations[activeStep] == "undefined") {
            status = false
          }
        }
        setIsSubmit({ ...isSubmit, [key]: { status, validations: validations[activeStep], sumbit: true } })
        //status = true
        return status
      }
    }
  }

  return (
    <>
      <BikeLayout title='AddRoute'>

        <div className='card' style={{ padding: 10 }}>
          <div className='container'>
            <div className='row'>
              <div className='col-12' style={{ marginTop: 10 }}>
                <Menu handleStep={handleStep} activeStep={activeStep} icons={icons}></Menu>
              </div>
              <div className='col-12' style={{ marginTop: 10, minHeight: 600 }}>
                <form onSubmit={onSubmit} style={{ height: "90%" }}>
                  {icons.map((icon, index) => (
                    <div key={index} style={{ height: "100%" }} hidden={activeStep !== index}>
                      <>
                        {icon.tabComponent}
                      </>
                    </div>
                  ))}
                </form>
                <div className='offset-8 col-4 d-flex justify-content-evenly'>
                  <Button
                    hidden={!(activeStep <= icons.length && activeStep != 0)}
                    variant="contained"
                    sx={{ backgroundColor: primary, '&:hover': { backgroundColor: primary } }}
                    onClick={handlePreviuosStep}
                  >Anterior</Button>
                  <Button
                    hidden={!(activeStep >= 0 && (activeStep < icons.length - 1))}
                    variant="contained"
                    sx={{ backgroundColor: primary, '&:hover': { backgroundColor: primary } }}
                    onClick={handleNextStep}
                  >Siguiente</Button>
                  <Button
                    hidden={!(activeStep >= 0 && (activeStep == icons.length - 1))}
                    variant="contained"
                    disabled={!statusForm}
                    sx={{ backgroundColor: primary, '&:hover': { backgroundColor: primary } }}
                    onClick={handleAddRoute}
                  >Add</Button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </BikeLayout>
    </>
  )
}