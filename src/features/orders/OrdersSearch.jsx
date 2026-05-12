export default function OrdersSearch({ searchQuery, setSearchQuery }) {
  return (
    <div className="orders-search">
      <input
        type="text"
        placeholder="Search customer, phone or AFM..."
        value={searchQuery}
        autoFocus={false}
        spellCheck={false}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}
