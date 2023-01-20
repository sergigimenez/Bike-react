import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleSetRoutes } from '../../store/Card/thunks'
import { Card } from '../components/Card/Card'
import { BikeLayout } from '../layout/BikeLayout'

export const RoutePages = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(handleSetRoutes())
  }, [])

  const theme = useSelector(state => state.theme)
  const routes = useSelector(state => state.card)

  const CardMemorized = useMemo(() => {
    return routes.cards.slice(25, 30).map(route => (
      <Card key={route.id+(Math.random() + 1).toString(36).substring(7)} route={route} theme={theme}></Card>
    ))
  }, [routes])

  return (
    <>
      <BikeLayout title={'route'}>
        {
          <div>{CardMemorized}</div>
        }
      </BikeLayout>
    </>
  )
}
