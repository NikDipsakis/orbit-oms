import { useState, useEffect } from 'react';
import customers from '../../data/costumers.js';
import products from '../../data/products.js';

import CustomerInputs from './CustomerInputs.jsx';
import ProductSelector from './ProductSelector.jsx';
import TotalsSection from './TotalsSection.jsx';
import OrderSummary from './OrderSummary.jsx';

export default function OrderForm({ onAdd, onClose }) {
  const [customerData, setCustomerData] = useState({
    name: '',
    address: '',
    deliveryDate: '',
    storeType: '',
    phone: '',
    mobile: '',
    ownerName: '',
    comments: '',
    afm: '',
  });

  const [productQuantities, setProductQuantities] = useState([
    { id: 1, quantity: 0 },
    { id: 2, quantity: 0 },
    { id: 3, quantity: 0 },
    { id: 4, quantity: 0 },
    { id: 5, quantity: 0 },
    { id: 6, quantity: 0 },
  ]);

  const [searchSuggestion, setSearchSuggestion] = useState([]);
  const [vat, setVat] = useState(true);
  const [total, setTotal] = useState(0);
  const vatAmount = vat ? total * 0.24 : 0;
  const finalTotal = total + vatAmount;

  function changeHandler(e) {
    const { name, value } = e.target;

    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'name') {
      if (value !== '') {
        const results = customers.filter((customer) =>
          customer.name.toLowerCase().includes(value.toLowerCase()),
        );

        setSearchSuggestion(results);
      } else {
        setSearchSuggestion([]);
      }
    }
  }

  function quantityHandler(id, operator) {
    setProductQuantities((prevItems) =>
      prevItems.map((item) => {
        if (item.id !== id) {
          return item;
        }

        if (operator === '+') {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }

        if (operator === '-') {
          return {
            ...item,
            quantity: item.quantity > 0 ? item.quantity - 1 : 0,
          };
        }

        return item;
      }),
    );
  }

  function calculateOrderTotal() {
    const subtotal = products.reduce((sum, product) => {
      const item = productQuantities.find((q) => q.id === product.id);

      const quantity = item ? item.quantity : 0;

      return sum + quantity * product.price;
    }, 0);

    setTotal(subtotal);
  }

  useEffect(() => {
    calculateOrderTotal();
  }, [productQuantities]);

  function createOrderHandler() {
    const order = {
      id: crypto.randomUUID(),
      customer: customerData,
      products: productQuantities.filter((item) => item.quantity > 0),
      subtotal: total,
      vat,
      vatAmount,
      finalTotal,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    onAdd(order);

    console.log(order);
  }

  return (
    <>
      <CustomerInputs
        data={customerData}
        changeHandler={changeHandler}
        searchSuggestion={searchSuggestion}
        setSearchSuggestion={setSearchSuggestion}
        setCustomerData={setCustomerData}
      />

      <ProductSelector
        productQuantities={productQuantities}
        quantityHandler={quantityHandler}
      />

      <TotalsSection
        total={total}
        vat={vat}
        setVat={setVat}
        vatAmount={vatAmount}
        finalTotal={finalTotal}
      />

      <button onClick={createOrderHandler}>Add Order</button>
      <button onClick={onClose}>Cancel</button>
      <OrderSummary />
    </>
  );
}
