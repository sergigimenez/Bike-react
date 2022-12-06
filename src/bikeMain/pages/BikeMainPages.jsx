import { useSelector } from "react-redux"
import { BikeLayout } from "../layout/BikeLayout"

export const BikeMainPages = () => {
  const theme = useSelector(state => state.theme)
  return (
    <>
      <BikeLayout title={'MAIN'}>
        <></>
      </BikeLayout>
    </>
  )
}
