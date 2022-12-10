import { useEffect } from 'react'
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

  return (
    <>
      <BikeLayout title={'route'}>
        {
          routes.cards.map(route => (
            <Card key={route.id+(Math.random() + 1).toString(36).substring(7)} route={route} theme={theme}></Card>
          ))
        }
      </BikeLayout>
    </>
  )
}
