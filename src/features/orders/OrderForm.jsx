import { useState, useEffect } from "react";
import customers from "../../data/costumers.js";
import products from "../../data/products.js";

import CustomerInputs from "./CustomerInputs.jsx";
import ProductSelector from "./ProductSelector.jsx";
import TotalsSection from "./TotalsSection.jsx";
import OrderSummary from "./OrderSummaryModal.jsx.jsx";
import CreateCustomerModal from "./CreateCustomerModal.jsx";
import OrderSummaryModal from "./OrderSummaryModal.jsx.jsx";

const defaultCustomerData = {
  name: "",
  address: "",
  deliveryDate: "",
  storeType: "",
  phone: "",
  mobile: "",
  ownerName: "",
  comments: "",
  afm: "",
};

export default function OrderForm({ onAdd, onUpdate, onClose, initialData }) {
  const [customerData, setCustomerData] = useState(
    initialData ? initialData.customer : defaultCustomerData,
  );

  const [productQuantities, setProductQuantities] = useState(() => {
    if (initialData) {
      return products.map((product) => {
        const existingProduct = initialData.products.find(
          (item) => item.id === product.id,
        );

        return {
          id: product.id,
          quantity: existingProduct?.quantity || 0,
        };
      });
    }

    return [
      { id: 1, quantity: 0 },
      { id: 2, quantity: 0 },
      { id: 3, quantity: 0 },
      { id: 4, quantity: 0 },
      { id: 5, quantity: 0 },
      { id: 6, quantity: 0 },
    ];
  });

  const [searchSuggestion, setSearchSuggestion] = useState([]);
  const [vat, setVat] = useState(true);
  const [total, setTotal] = useState(0);
  const [duplicateCustomer, setDuplicateCustomer] = useState(null);
  const [showCreateCustomerModal, setShowCreateCustomerModal] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [validationError, setValidationError] = useState("");

  const vatAmount = vat ? total * 0.24 : 0;
  const finalTotal = total + vatAmount;
  const isEditing = Boolean(initialData);

  function changeHandler(e) {
    const { name, value } = e.target;

    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "name" || name === "afm") {
      if (value !== "") {
        const results = customers.filter(
          (customer) =>
            customer.name.toLowerCase().includes(value.toLowerCase()) ||
            customer.afm
              ?.toString()
              .toLowerCase()
              .includes(value.toLowerCase()),
        );

        setSearchSuggestion(results);
      } else {
        setSearchSuggestion([]);
      }
    }
  }

  function handleSuggestionEnter(e) {
    if (e.key === "Enter" && searchSuggestion.length > 0) {
      e.preventDefault();

      const customer = searchSuggestion[0];

      setCustomerData({
        name: customer.name || "",
        address: customer.address || "",
        deliveryDate: customer.deliveryDate || "",
        storeType: customer.storeType || "",
        phone: customer.phone || "",
        mobile: customer.mobile || "",
        ownerName: customer.ownerName || "",
        comments: customer.comments || "",
        afm: customer.afm || "",
      });

      setSearchSuggestion([]);
    }
  }

  function quantityHandler(id, operator) {
    setProductQuantities((prevItems) =>
      prevItems.map((item) => {
        if (item.id !== id) {
          return item;
        }

        if (operator === "+") {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }

        if (operator === "-") {
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

  function customerExists() {
    return customers.some((customer) => {
      const sameAfm =
        customerData.afm?.trim() &&
        customer.afm?.trim() === customerData.afm?.trim();

      const samePhone =
        customerData.phone?.trim() &&
        customer.phone?.trim() === customerData.phone?.trim();

      const sameMobile =
        customerData.mobile?.trim() &&
        customer.mobile?.trim() === customerData.mobile?.trim();

      return sameAfm || samePhone || sameMobile;
    });
  }

  useEffect(() => {
    calculateOrderTotal();
  }, [productQuantities]);

  useEffect(() => {
    const existingCustomer = customers.find((customer) => {
      const sameAfm =
        customerData.afm?.trim() &&
        customer.afm?.trim() === customerData.afm?.trim();

      const samePhone =
        customerData.phone?.trim() &&
        customer.phone?.trim() === customerData.phone?.trim();

      const sameMobile =
        customerData.mobile?.trim() &&
        customer.mobile?.trim() === customerData.mobile?.trim();

      return sameAfm || samePhone || sameMobile;
    });

    setDuplicateCustomer(existingCustomer || null);
  }, [customerData.afm, customerData.phone, customerData.mobile]);

  function buildOrder() {
    return {
      id: initialData ? initialData.id : crypto.randomUUID(),

      customer: customerData,

      products: productQuantities.filter((item) => item.quantity > 0),

      subtotal: total,

      vat,

      vatAmount,

      finalTotal,

      status: initialData ? initialData.status : "pending",

      createdAt: initialData ? initialData.createdAt : new Date().toISOString(),
    };
  }

  function validateOrder() {
    const hasProducts = productQuantities.some((item) => item.quantity > 0);

    if (!customerData.name.trim()) {
      setValidationError("Customer name required");

      return false;
    }

    if (!customerData.address.trim()) {
      setValidationError("Address required");

      return false;
    }

    if (!hasProducts) {
      setValidationError("Add at least one product");

      return false;
    }

    setValidationError("");

    return true;
  }

  function submitHandler() {
    if (!validateOrder()) {
      return;
    }

    if (isEditing) {
      onUpdate(buildOrder());

      onClose?.();

      return;
    }

    if (!customerExists()) {
      setShowCreateCustomerModal(true);

      return;
    }

    setShowSummaryModal(true);
  }

  function createCustomerAndContinue() {
    customers.push({
      ...customerData,
    });

    setDuplicateCustomer({
      ...customerData,
    });

    setShowCreateCustomerModal(false);

    setShowSummaryModal(true);
  }

  function confirmOrder() {
    onAdd(buildOrder());

    setShowSummaryModal(false);

    resetForm();

    onClose?.();
  }

  function resetForm() {
    setCustomerData(defaultCustomerData);

    setProductQuantities([
      { id: 1, quantity: 0 },
      { id: 2, quantity: 0 },
      { id: 3, quantity: 0 },
      { id: 4, quantity: 0 },
      { id: 5, quantity: 0 },
      { id: 6, quantity: 0 },
    ]);

    setSearchSuggestion([]);

    setDuplicateCustomer(null);

    setValidationError("");

    setShowCreateCustomerModal(false);

    setShowSummaryModal(false);
  }

  return (
    <>
      <CustomerInputs
        data={customerData}
        changeHandler={changeHandler}
        searchSuggestion={searchSuggestion}
        setSearchSuggestion={setSearchSuggestion}
        setCustomerData={setCustomerData}
        handleSuggestionEnter={handleSuggestionEnter}
      />
      {duplicateCustomer && (
        <div className="duplicate-warning">
          <p>Customer already exists: {duplicateCustomer.name}</p>
        </div>
      )}
      {validationError && (
        <div className="validation-error">{validationError}</div>
      )}
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

      <button onClick={submitHandler}>
        {isEditing ? "Save Changes" : "Add Order"}
      </button>
      <button onClick={() => onClose?.()}>Cancel</button>
      {showCreateCustomerModal && (
        <CreateCustomerModal
          customerName={customerData.name}
          onConfirm={createCustomerAndContinue}
          onClose={() => setShowCreateCustomerModal(false)}
        />
      )}
      {showSummaryModal && (
        <OrderSummaryModal
          order={showSummaryModal ? buildOrder() : null}
          onConfirm={confirmOrder}
          onClose={() => setShowSummaryModal(false)}
        />
      )}
      <OrderSummary />
    </>
  );
}
