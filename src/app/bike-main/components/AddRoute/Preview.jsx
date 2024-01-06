import { Card } from '../Card/Card'

export const Preview = ({ theme, route}) => {

  return (
    <div className='dragAndDrop col-12 d-flex flex-column align-items-center justify-content-evenly' style={{ height: "80%" }} >
      {
        (route) ? <Card route={route} theme={theme}></Card> : 'Hay algun fallo en el formulario'
      }
    </div>

  )
}
