import {
  Calendar as BigCalendar,
  dateFnsLocalizer,
} from 'react-big-calendar';

import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';

import { enUS } from 'date-fns/locale';

import 'react-big-calendar/lib/css/react-big-calendar.css';

import { useState } from 'react';

import CalendarPanel from '../features/calendar/CalendarPanel';

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

export default function Calendar({
  orders,
}) {
  const [selectedDate, setSelectedDate] =
    useState(null);

  const calendarEvents = orders.map(
    (order) => ({
      title: order.customer.name,

      start: new Date(
        order.customer.deliveryDate
      ),

      end: new Date(
        order.customer.deliveryDate
      ),

      order,
    })
  );

  const selectedOrders = selectedDate
    ? orders.filter((order) => {
        const orderDate = new Date(
          order.customer.deliveryDate
        );

        return (
          orderDate.toDateString() ===
          selectedDate.toDateString()
        );
      })
    : [];

  return (
    <section>
      <h1>Calendar</h1>

      <BigCalendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor='start'
        endAccessor='end'
        style={{ height: 700 }}
        selectable
        onSelectSlot={(slotInfo) => {
          setSelectedDate(slotInfo.start);
        }}
        onSelectEvent={(event) => {
          setSelectedDate(event.start);
        }}
      />

      {selectedDate && (
        <CalendarPanel
          selectedDate={selectedDate}
          selectedOrders={
            selectedOrders
          }
        />
      )}
    </section>
  );
}