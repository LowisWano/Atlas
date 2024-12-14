
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { toDate } from 'date-fns'

// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.

export default function CalendarPage() {
  const localizer = momentLocalizer(moment)
  const events = [
    {
      start: moment("2024-12-14T10:00:00").toDate(),
      end: moment("2024-12-14T11:00:00").toDate(),
      title: "WEBDEV GRIND"
    },
    {
      start: moment("2024-12-15T10:00:00").toDate(),
      end: moment("2024-12-15T11:00:00").toDate(),
      title: "MORE WEBDEV GRIND"
    }
  ]

  return(
    <div className='h-[600px]'>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
    
  )
 }