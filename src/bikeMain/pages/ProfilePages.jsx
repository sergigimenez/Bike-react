import { Avatar, Tab, Tabs, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Main, Amigos, Post } from '../components/Profile'
import { BikeLayout } from '../layout/BikeLayout'
import { ProfileLayout } from '../layout/ProfileLayout'

const tabsInfo = [
  { name: "Main", Component: <Main /> },
  { name: "Amigos", Component: <Amigos /> },
  { name: "Post", Component: <Post /> }
]

export const ProfilePages = () => {

  const [tabActive, setTabActive] = useState(0)

  const handleChange = (event, newTabActive) => {
    setTabActive(newTabActive)
  }

  const theme = useSelector(state => state.theme)

  const mediaQuery = useMediaQuery('(min-width:1000px)');

  const classStyle = mediaQuery ? 'container-fluid' : 'row';

  return (
    <>
    <title>Perfil Usuario</title>
      <BikeLayout title={'profile'} noPadding={true}>
        <ProfileLayout>
          <div className={`${classStyle}`}>
            <div className='col-12' style={{ backgroundColor: theme.background }}>
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 90, height: 90, marginTop: "-100px",position: 'absolute' }}
                className='offset-xl-1 col-xl-10 col-12'
              />
              <div className='offset-xl-1 col-xl-10 col-12' style={{ backgroundColor: theme.backgroundCard, marginTop: 50 }}>
                <div className='row'>
                  <Tabs value={tabActive} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="MAIN" />
                    <Tab label="AMIGOS" />
                    <Tab label="POST/PUBLICACIONES" />
                  </Tabs>
                  {tabsInfo.map((tab, index) => (
                    <div key={index} hidden={tabActive !== index} className="container-fluid" style={{ marginTop: 20 }}>
                      <>
                        {tab.Component}
                      </>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ProfileLayout>
      </BikeLayout>
    </>
  )
}
