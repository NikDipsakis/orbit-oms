import OrderCard from './OrderCard';

export default function OrdersList({
  orders,
  selectedOrderId,
  setSelectedOrderId,
  onUpdateStatus
}) {
  return (
    <section>
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          isSelected={selectedOrderId === order.id}
          onSelect={() =>
            setSelectedOrderId(selectedOrderId === order.id ? null : order.id)
          }
          onUpdateStatus={onUpdateStatus}
        />
      ))}
    </section>
  );
}
