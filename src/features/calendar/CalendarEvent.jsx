export default function CalendarEvent({ event }) {
  return (
    <div className={`calendar-event ${event.order.status}`}>
      <div className='calendar-event-dot'></div>

      <div className='calendar-event-content'>
        <p className='calendar-event-title'>{event.title}</p>

        <span className='calendar-event-price'>
          €{event.order.finalTotal.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
