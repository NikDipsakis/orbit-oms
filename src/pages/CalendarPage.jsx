// Calendar.jsx

import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';

import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';

import { enUS } from 'date-fns/locale';

import { useState } from 'react';

import CalendarPanel from '../features/calendar/CalendarPanel';
import CalendarToolbar from '../features/calendar/CalendarToolbar';
import CalendarEvent from '../features/calendar/CalendarEvent';
import CalendarEventModal from '../features/calendar/CalendarEventModal';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
// console.log(withDragAndDrop);

const DnDCalendar = withDragAndDrop.default
  ? withDragAndDrop.default(BigCalendar)
  : withDragAndDrop(BigCalendar);

export default function Calendar({ orders, onUpdate, onUpdateStatus }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [calendarView, setCalendarView] = useState('month');
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);

  const calendarEvents = orders.map((order) => ({
    id: order.id,

    title: order.customer.name,

    start: new Date(order.customer.deliveryDate),

    end: new Date(order.customer.deliveryDate),

    allDay: true,

    order,
  }));

  const selectedOrders = selectedDate
    ? orders.filter((order) => {
        const orderDate = new Date(order.customer.deliveryDate);

        return orderDate.toDateString() === selectedDate.toDateString();
      })
    : [];

  function eventDropHandler({ event, start }) {
    const updatedOrder = {
      ...event.order,

      customer: {
        ...event.order.customer,

        deliveryDate: start.toISOString(),
      },
    };

    onUpdate(updatedOrder);
  }

  return (
    <section className='calendar-page'>
      <h1>Calendar</h1>

      <div className='calendar-layout'>
        <div className='calendar-main'>
          <DnDCalendar
            localizer={localizer}
            events={calendarEvents}
            startAccessor='start'
            endAccessor='end'
            style={{ height: 750 }}
            selectable
            onSelectSlot={(slotInfo) => {
              setSelectedDate(slotInfo.start);
            }}
            onSelectEvent={(event) => {
              setSelectedEvent(event.order);
            }}
            onEventDrop={eventDropHandler}
            draggableAccessor={() => true}
            components={{ toolbar: CalendarToolbar, event: CalendarEvent }}
            view={calendarView}
            onView={(newView) => {
              setCalendarView(newView);
            }}
            showMultiDayTimes={false}
            date={calendarDate}
            dayPropGetter={(date) => {
              const today = new Date();

              const isToday = date.toDateString() === today.toDateString();

              return {
                className: isToday ? 'calendar-today-cell' : '',
              };
            }}
            onNavigate={(newDate) => {
              setCalendarDate(newDate);
            }}
          />
        </div>

        {selectedDate && (
          <CalendarPanel
            selectedDate={selectedDate}
            selectedOrders={selectedOrders}
          />
        )}
        {selectedEvent && (
          <CalendarEventModal
            order={selectedEvent}
            onClose={() => setSelectedEvent(null)}
            onUpdateStatus={onUpdateStatus}
          />
        )}
      </div>
    </section>
  );
}
