// TotalsSection.jsx

export default function TotalsSection({
  total,
  vat,
  setVat,
  vatAmount,
  finalTotal,
}) {
  return (
    <div className='total'>
      <label>
        <input
          type='checkbox'
          checked={vat}
          onChange={() => setVat((prev) => !prev)}
        />
        VAT 24%
      </label>

      <p>Subtotal: {total.toFixed(2)} €</p>

      <p>
        VAT: {vat ? vatAmount.toFixed(2) + ' €' : '-'}
      </p>

      <p>Total: {finalTotal.toFixed(2)} €</p>
    </div>
  );
}