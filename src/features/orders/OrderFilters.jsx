export default function OrderFilters({ filter, setFilter }) {
  return (
    <>
      <button onClick={()=>setFilter('all')}>All</button>
      <button onClick={()=>setFilter('pending')}>Pending</button>
      <button onClick={()=>setFilter('completed')}>Completed</button>
      <button onClick={()=>setFilter('cancelled')}>Cancelled</button>
      <button onClick={()=>setFilter('no-answer')}>No-Answer</button>
    </>
  );
}
