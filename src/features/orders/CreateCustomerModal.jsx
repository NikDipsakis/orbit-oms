export default function CreateCustomerModal({
  customerName,
  onConfirm,
  onClose,
}) {
  return (
    <div className="create-customer-overlay" onClick={onClose}>
      <div
        className="create-customer-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="create-customer-icon">+</div>

        <h2>Customer Not Found</h2>

        <p>
          The customer <strong>{customerName}</strong> does not exist.
        </p>

        <span>Create customer and submit order?</span>

        <div className="create-customer-actions">
          <button type="button" className="create-btn" onClick={onConfirm}>
            Create & Submit
          </button>

          <button type="button" className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
