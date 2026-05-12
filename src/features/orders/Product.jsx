export default function Product({ item, onAdd, onRemove ,quantity}) {
  
    return (
    <div>
      {item.name} <button onClick={onRemove}>➖</button>
      {quantity}
      <button onClick={onAdd}>➕</button>
    </div>
  );
}
