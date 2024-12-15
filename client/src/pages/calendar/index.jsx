
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { useQuests } from "@/queries/useQuests"
import LoadingSpinner from "@/components/custom-ui/loading-spinner";
import AddQuestModal from "@/pages/dashboard/_components/add-quest-modal";
// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.

export default function CalendarPage() {
  const localizer = momentLocalizer(moment);
  const { getQuests } = useQuests();
  const { isPending, error, data } = getQuests();

  if (isPending){
      return (
        <div className="flex justify-center items-center w-full">
          <LoadingSpinner/>
        </div>
      );
    }

  if (error){
    return (
      <div className="flex justify-center items-center p-20">
        Sorry, an error has occured. {error.message}
      </div> 
    );
  }

  const events = data.map(quest => ({
    start: moment(quest.dueDate).toDate(),
    end: moment(quest.dueDate).add(1, 'hour').toDate(), 
    title: quest.title,
    desc: quest.description,
    difficulty: quest.difficulty,
    status: quest.status,
    questType: quest.questType
  }));
  console.log(events)
  return(
    <div>
      <div className='flex justify-end'>
        <AddQuestModal/>
      </div>
      
      <div className='h-[600px] mt-4'>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          eventPropGetter={(event) => ({
            className: `quest-${event.difficulty.toLowerCase()} quest-${event.status.toLowerCase()}`,
            style: {
              textDecoration: event.status === 'COMPLETED' ? 'line-through' : 'none',
              opacity: event.status === 'COMPLETED' ? 0.7 : 1
            }
          })}
          tooltipAccessor={(event) => `${event.desc} (${event.difficulty})`}
          formats={{
            eventTimeRangeFormat: () => '',
          }}
          components={{
            event: (props) => (
              <div className="rbc-event-content">
                {props.title}
                {props.event.status === 'COMPLETED' && 
                  <span className="ml-1">✓</span>
                }
              </div>
            ),
          }}
        />
      </div>
    </div>
    
  )
 }