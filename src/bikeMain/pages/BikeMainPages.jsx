import { Calendar } from 'antd';
import { useSelector } from "react-redux"
import { BikeLayout } from "../layout/BikeLayout"
import dayjs from 'dayjs';
import 'dayjs/locale/es';

export const BikeMainPages = () => {
  dayjs.locale('es')

  const { primary, title, secondary, background, backgroundCard, color } = useSelector(state => state.theme)

  const { cards } = useSelector(state => state.auth)

  const dateCellRenderBigCalendar = (value) => {

    let listData = []
    cards.find(card => {
      if (new Date(card.date).toLocaleDateString() == value.format('DD/MM/YYYY').toString()) {
        listData.push({ "content": card.title })
      }
    })

    if (listData.length > 0) {
      return (
        <ul className='eventsCalendarBig' style={{ fontSize: "11px", paddingLeft: "1rem", wordBreak: "break-word" }}>
          {listData.map((item) => (
            <li key={item.content}>
              <span>{item.content}</span>
            </li>
          ))}
        </ul>
      );
    }
  }

  const monthCellRenderBigCalendar = (value) => {
    let listData = []
    cards.find(card => {
      if (new Date(card.date).getMonth() == value.month()) {
        listData.push({ "content": card.title })
      }
    })

    if (listData.length > 0) {
      return (
        <ul className='eventsCalendarBig' style={{ fontSize: "11px", paddingLeft: "1rem", wordBreak: "break-word" }}>
          {listData.map((item) => (
            <li key={item.content}>
              <span>{item.content}</span>
            </li>
          ))}
        </ul>
      );
    }
  }

  return (
    <>
      <title>Calendario de Carreras</title>
      <BikeLayout title={'MAIN'}>
        <Calendar
          dateCellRender={dateCellRenderBigCalendar}
          monthCellRender={monthCellRenderBigCalendar}
          mode="year"
          style={{width: 350, borderRadius: 5, border: "1px solid black"}}
        />
      </BikeLayout>
    </>
  )
}