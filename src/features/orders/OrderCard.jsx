import products from '../../data/products.js';

export default function OrderCard({ order, isSelected, onSelect, onUpdateStatus }) {
  return (
    <div onClick={onSelect}>
      <p>{order.customer.name}</p>

      <p>{order.customer.deliveryDate}</p>

      <p className={`status-${order.status}`}>{order.status}</p>

      {isSelected && (
        <div>
          <p>{order.customer.phone}</p>

          <p>{order.customer.address}</p>

          <button onClick={() => onUpdateStatus(order.id, 'pending')}>Pending</button>
          <button onClick={() => onUpdateStatus(order.id, 'completed')}>
            Completed
          </button>
          <button onClick={() => onUpdateStatus(order.id, 'cancelled')}>
            Cancelled
          </button>

          {order.products.map((orderedProduct) => {
            const product = products.find(
              (item) => item.id === orderedProduct.id,
            );
            return (
              <div key={orderedProduct.id}>
                <p>
                  {product?.name} - {orderedProduct.quantity}
                </p>
              </div>
            );
          })}

          <p>{order.finalTotal.toFixed(2)} €</p>

          <p>{order.customer.comments}</p>
        </div>
      )}
    </div>
  );
}
