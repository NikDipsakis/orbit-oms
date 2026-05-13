import products from '../../data/products.js';

export default function CalendarEventModal({ order, onUpdateStatus, onClose }) {
  console.log(onUpdateStatus);
  return (
    <div className='calendar-modal-overlay'>
      <div onClick={(e) => e.stopPropagation()} className='calendar-modal'>
        {/* HEADER */}
        <div className='calendar-modal-header'>
          <div>
            <h2>{order.customer.name}</h2>

            <p>{order.customer.address}</p>
          </div>

          <button onClick={onClose} className='calendar-modal-close'>
            ✕
          </button>
        </div>

        {/* STATUS + TOTAL */}
        <div className='calendar-modal-top'>
          <div className={`calendar-status ${order.status}`}>
            {order.status}
          </div>

          <div className='calendar-total'>€{order.finalTotal.toFixed(2)}</div>
        </div>

        {/* CUSTOMER INFO */}
        <div className='calendar-modal-section'>
          <h3>Customer Information</h3>

          <div className='calendar-info-grid'>
            <div className='calendar-info-card'>
              <span>Phone</span>
              <p>{order.customer.phone}</p>
            </div>

            <div className='calendar-info-card'>
              <span>Mobile</span>
              <p>{order.customer.mobile}</p>
            </div>

            <div className='calendar-info-card'>
              <span>AFM</span>
              <p>{order.customer.afm}</p>
            </div>

            <div className='calendar-info-card'>
              <span>Store Type</span>
              <p>{order.customer.storeType}</p>
            </div>
          </div>
        </div>

        {/* PRODUCTS */}
        <div className='calendar-modal-section'>
          <h3>Products</h3>

          <div className='calendar-products'>
            {order.products.map((product) => (
              <div className='calendar-product-row' key={product.id}>
                <div>
                  <p>{products.find((p) => p.id === product.id)?.name}</p>
                </div>

                <strong>x{product.quantity}</strong>
              </div>
            ))}
          </div>
        </div>

        {/* COMMENTS */}
        <div className='calendar-modal-section'>
          <h3>Comments</h3>

          <div className='calendar-comments'>
            {order.customer.comments || 'No comments'}
          </div>
        </div>

        {/* TOTALS */}
        <div className='calendar-modal-section'>
          <h3>Totals</h3>

          <div className='calendar-totals'>
            <div>
              <span>Subtotal</span>
              <strong>€{order.subtotal.toFixed(2)}</strong>
            </div>

            <div>
              <span>VAT</span>
              <strong>€{order.vatAmount.toFixed(2)}</strong>
            </div>

            <div className='final-total'>
              <span>Total</span>
              <strong>€{order.finalTotal.toFixed(2)}</strong>
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className='calendar-modal-actions'>
          <button
            onClick={() => {
              onUpdateStatus(order.id, 'pending');
              onClose();
            }}
            className='pending-btn'
          >
            Pending
          </button>

          <button
            onClick={() => {
              onUpdateStatus(order.id, 'completed');
              onClose();
            }}
            className='completed-btn'
          >
            Completed
          </button>

          <button
            onClick={() => {
              onUpdateStatus(order.id, 'cancelled');
              onClose();
            }}
            className='cancelled-btn'
          >
            Cancelled
          </button>
        </div>
      </div>
    </div>
  );
}
