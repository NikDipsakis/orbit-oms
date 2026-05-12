import OrderForm from '../features/orders/OrderForm';
export default function NewOrder({ onAddOrder }) {
  return (
    <section>
      <OrderForm onAdd={onAddOrder} />
    </section>
  );
}
