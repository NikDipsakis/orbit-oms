// ProductSelector.jsx

import products from '../../data/products.js';
import Product from './Product.jsx';

export default function ProductSelector({
  productQuantities,
  quantityHandler,
}) {
  return (
    <section>
      {products.map((product) => (
        <Product
          key={product.id}
          item={product}
          onRemove={() => quantityHandler(product.id, '-')}
          onAdd={() => quantityHandler(product.id, '+')}
          quantity={
            productQuantities.find((item) => item.id === product.id)
              ?.quantity || 0
          }
        />
      ))}
    </section>
  );
}