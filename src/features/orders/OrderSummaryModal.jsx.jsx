import products from "../../data/products";

export default function OrderSummaryModal({ order, onConfirm, onClose }) {
  if (!order) return null;
  return (
    <div className="modal-overlay">
      <div className="summary-modal">
        <h2>Order Summary</h2>

        <div className="summary-section">
          <p>
            <strong>Customer:</strong> {order.customer.name}
          </p>

          <p>
            <strong>Address:</strong> {order.customer.address}
          </p>
        </div>

        <div className="summary-products">
          {order.products.map((item) => {
            const product = products.find((p) => p.id === item.id);

            return (
              <div key={item.id} className="summary-product-row">
                <span>{product?.name}</span>

                <span>x{item.quantity}</span>
              </div>
            );
          })}
        </div>

        <h3>Total: €{order.finalTotal.toFixed(2)}</h3>

        <div className="summary-actions">
          <button onClick={onConfirm}>Confirm Order</button>

          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
