import { useState } from "react";

import OrdersList from "../features/orders/OrdersList.jsx";
import OrderFilters from "../features/orders/OrderFilters.jsx";
import OrderForm from "../features/orders/OrderForm.jsx";
import OrdersSearch from "../features/orders/OrdersSearch.jsx";

export default function Orders({ orders, onAdd, onUpdate, onUpdateStatus }) {
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const [editingOrder, setEditingOrder] = useState(null);

  const [selectedStatus, setSelectedStatus] = useState("all");

  const [searchQuery, setSearchQuery] = useState("");

const normalizedSearch = searchQuery.toLowerCase()

  const visibleOrders = orders.filter((order) => {
    const matchesStatus =
      selectedStatus === "all" ? true : order.status === selectedStatus;

    const matchesSearch =
      (order.customer.name || "")
        .toString()
        .toLowerCase()
        .includes(normalizedSearch) ||
      (order.customer.phone || "")
        .toString()
        .toLowerCase()
        .includes(normalizedSearch) ||
      (order.customer.afm || "")
        .toString()
        .toLowerCase()
        .includes(normalizedSearch);

    return matchesStatus && matchesSearch;
  });

  function updateOrderHandler(updatedOrder) {
    onUpdate(updatedOrder);

    setEditingOrder(null);
  }

  return (
    <section>
      <h1>Orders</h1>
      <OrdersSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {editingOrder && (
        <OrderForm
          onAdd={onAdd}
          onUpdate={updateOrderHandler}
          onClose={() => setEditingOrder(null)}
          initialData={editingOrder}
        />
      )}

      <OrderFilters filter={selectedStatus} setFilter={setSelectedStatus} />

      {visibleOrders.length === 0 ? (
        <p>No Matching orders</p>
      ) : (
        <OrdersList
          orders={visibleOrders}
          selectedOrderId={selectedOrderId}
          setSelectedOrderId={setSelectedOrderId}
          onUpdateStatus={onUpdateStatus}
          setEditingOrder={setEditingOrder}
        />
      )}
    </section>
  );
}
