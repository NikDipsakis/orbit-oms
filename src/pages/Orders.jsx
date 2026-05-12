import { useState } from 'react';

import OrdersList from '../features/orders/OrdersList.jsx';
import OrderFilters from '../features/orders/OrderFilters.jsx';

export default function Orders({ orders , onUpdateStatus }) {
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('all');

  // setSelectedStatus('all');
  const filteredOrders = orders.filter(
    (order) => order.status === selectedStatus,
  );

  const visibleOrders = selectedStatus === 'all' ? orders : filteredOrders



  return (
    <section>
      <h1>Orders</h1>
      <OrderFilters filter={selectedStatus} setFilter={setSelectedStatus} />
      {orders.length === 0 ? (
        <p>No Orders Yet</p>
      ) : (
        <OrdersList
          orders={visibleOrders}
          selectedOrderId={selectedOrderId}
          setSelectedOrderId={setSelectedOrderId}
          onUpdateStatus = {onUpdateStatus}
        />
      )}
      {console.log(filteredOrders)}
    </section>
  );
}
