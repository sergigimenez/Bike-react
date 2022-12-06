import { InputAdornment, TextField } from '@mui/material'

export const Configuracion = ({ titulo, distancia, desnivel, fecha, precio, onInputChange, isSubmit }) => {

  const { validations } = isSubmit

  const { tituloValid, distanciaValid, fechaValid, precioValid, desnivelValid } = validations

  return (
    <>
      <div className='offset-2 col-8 d-flex align-items-center' style={{ height: "20%" }} >
        <TextField
          variant="standard"
          fullWidth
          label="Titulo"
          name='titulo'
          value={titulo}
          onChange={onInputChange}
          error={!!tituloValid}
          helperText={(!!tituloValid ? tituloValid : '')}
        />
      </div>
      <div className='offset-2 col-8 d-flex flex-column align-items-center' style={{ height: "80%" }} >
        <TextField
          label="Distancia"
          name='distancia'
          type="number"
          value={distancia}
          onChange={onInputChange}
          sx={{ m: 1, width: '40ch' }}
          InputProps={{
            endAdornment: <InputAdornment position="start">km</InputAdornment>,
          }}
          error={!!distanciaValid}
          helperText={(!!distanciaValid ? distanciaValid : '')}
        />
        <TextField
          label="Desnivel"
          name='desnivel'
          type="number"
          value={desnivel}
          onChange={onInputChange}
          sx={{ m: 1, width: '40ch' }}
          InputProps={{
            endAdornment: <InputAdornment position="start">mts +</InputAdornment>,
          }}
          error={!!desnivelValid}
          helperText={(!!desnivelValid ? desnivelValid : '')}
        />
        <TextField
          label="Fecha"
          name='fecha'
          value={fecha}
          onChange={onInputChange}
          sx={{ m: 1, width: '40ch' }}
          InputProps={{
            endAdornment: <InputAdornment position="start">dd/mm/aa</InputAdornment>,
          }}
          error={!!fechaValid}
          helperText={(!!fechaValid ? fechaValid : '')}
        />
        <TextField
          label="Precio"
          name='precio'
          type="number"
          value={precio}
          onChange={onInputChange}
          sx={{ m: 1, width: '40ch' }}
          InputProps={{
            endAdornment: <InputAdornment position="start">€</InputAdornment>,
          }}
          error={!!precioValid}
          helperText={(!!precioValid ? precioValid : '')}
        />
      </div>
    </>
  )
}
