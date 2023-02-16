import { Pagination, Stack } from '@mui/material'
import React, { useEffect, useMemo } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleSetRoutes } from '../../store/Card/thunks'
import { Card } from '../components/Card/Card'
import { Searcher } from '../components/Searcher/Searcher'
import { BikeLayout } from '../layout/BikeLayout'

export const RoutePages = () => {
  const [numPage, setNumPage] = useState(1)

  const dispatch = useDispatch()

  const theme = useSelector(state => state.theme)
  const routes = useSelector(state => state.card)
  const [pages, setPages] = useState(45)

  useEffect(() => {
    if(routes.statusSearch == "not-searched"){
      dispatch(handleSetRoutes(numPage))
    }
  }, [numPage])

  useEffect(() => {
    if(routes.statusSearch == "searched"){
      setPages(routes.totalResults)
      setNumPage(1)
    }
  }, [routes.totalResults])
  
  const CardMemorized = useMemo(() => {
      if (typeof routes.cards[0] != "undefined") {
        return routes.cards.map(route => (
          <Card key={route.id + (Math.random() + 1).toString(36).substring(7)} route={route} theme={theme}></Card>
        ))
      } else {
        return <></>
      }
  }, [routes.cards])

  const handleChangeNumPage = function(event, value){
    setNumPage(value)
  }


  return (
    <>
      <BikeLayout title={'route'}>

        <Searcher numPage={numPage} routes={routes}/>

        {
          <div>{CardMemorized}</div>
        }

        

        <Stack spacing={2}>
          <Pagination count={pages} showFirstButton showLastButton page={numPage} onChange={handleChangeNumPage} />
        </Stack>
      </BikeLayout>
    </>
  )
}
