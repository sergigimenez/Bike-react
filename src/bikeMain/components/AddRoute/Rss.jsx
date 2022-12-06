import { Facebook, InsertLink, Instagram, Twitter } from '@mui/icons-material'
import { InputAdornment, TextField } from '@mui/material'
import React from 'react'

export const Rss = ({ linkWeb, instagram, facebook, twitter, onInputChange, isSubmit}) => {

  const { validations } = isSubmit

  const { linkWebValid, instagramValid, twitterValid, facebookValid} = validations

  return (
    <>
      <div className='offset-2 col-8 d-flex flex-column align-items-center justify-content-evenly' style={{ height: "80%" }} >
        <TextField
          label="Web"
          name='linkWeb'
          value={linkWeb}
          onChange={onInputChange}
          sx={{ m: 1, width: '40ch' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <InsertLink />
              </InputAdornment>
            ),
          }}
          error={!!linkWebValid}
          helperText={(!!linkWebValid ? linkWebValid : '')}
        />
        <TextField
          label="Instagram"
          name='instagram'
          value={instagram}
          onChange={onInputChange}
          sx={{ m: 1, width: '40ch' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Instagram />
              </InputAdornment>
            ),
          }}
          error={!!instagramValid}
          helperText={(!!instagramValid ? instagramValid : '')}
        />
        <TextField
          label="Facebook"
          name='facebook'
          value={facebook}
          onChange={onInputChange}
          sx={{ m: 1, width: '40ch' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Facebook />
              </InputAdornment>
            ),
          }}
          error={!!facebookValid}
          helperText={(!!facebookValid ? facebookValid : '')}
        />
        <TextField
          label="Twitter"
          name='twitter'
          value={twitter}
          onChange={onInputChange}
          sx={{ m: 1, width: '40ch' }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Twitter />
              </InputAdornment>
            ),
          }}
          error={!!twitterValid}
          helperText={(!!twitterValid ? twitterValid : '')}
        />
      </div>
    </>
  )
}
