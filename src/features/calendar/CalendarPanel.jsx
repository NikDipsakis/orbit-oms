// CalendarPanel.jsx

import products from '../../data/products.js';

export default function CalendarPanel({ selectedDate, selectedOrders = [] }) {
  return (
    <div className='calendar-order-panel'>
      <div className='calendar-order-header'>
        <h2>Orders for {selectedDate?.toLocaleDateString()}</h2>

        <p className='status-badge status-pending'>
          {selectedOrders.length} Orders
        </p>
      </div>

      {selectedOrders.map((order) => (
        <div key={order.id} className='calendar-single-order'>
          <div className='calendar-order-info'>
            <p>
              <strong>Customer:</strong> {order.customer.name}
            </p>

            <p>
              <strong>Phone:</strong> {order.customer.phone}
            </p>

            <p>
              <strong>Address:</strong> {order.customer.address}
            </p>

            <p>
              <strong>Total:</strong> {order.finalTotal.toFixed(2)} €
            </p>

            <p>
              <strong>Status:</strong>{' '}
              <span className={`status-badge status-${order.status}`}>
                {order.status}
              </span>
            </p>
          </div>

          <div className='calendar-products'>
            <h3>Products</h3>

            {order.products.map((product) => {
              const productInfo = products.find(
                (item) => item.id === product.id,
              );

              return (
                <div key={product.id} className='calendar-product-row'>
                  <p>{productInfo?.name}</p>

                  <p>x{product.quantity}</p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
