export default function CalendarToolbar({ label, onNavigate, onView, view }) {
  return (
    <div className='calendar-toolbar'>
      <section className='calendar-toolbar-left'>
        <button
          className='calendar-toolbar-btn'
          onClick={() => onNavigate('TODAY')}
        >
          Today
        </button>
        <button
          className='calendar-toolbar-btn'
          onClick={() => onNavigate('PREV')}
        >
          ←
        </button>
        <button
          className='calendar-toolbar-btn'
          onClick={() => onNavigate('NEXT')}
        >
          →
        </button>
      </section>

      <section className='calendar-toolbar-center'>
        <h2>{label}</h2>
      </section>
      <section className='calendar-toolbar-right'>
        <button
          className={`calendar-toolbar-btn ${view === 'month' ? 'active' : ''}`}
          onClick={() => onView('month')}
        >
          Month
        </button>
        <button
          className={`calendar-toolbar-btn ${view === 'week' ? 'active' : ''}`}
          onClick={() => onView('week')}
        >
          Week
        </button>
        <button
          className={`calendar-toolbar-btn ${view === 'day' ? 'active' : ''}`}
          onClick={() => onView('day')}
        >
          Day
        </button>
        <button
          className={`calendar-toolbar-btn ${view === 'agenda' ? 'active' : ''}`}
          onClick={() => onView('agenda')}
        >
          Agenda
        </button>
      </section>
    </div>
  );
}
