// CalendarPanel.jsx

import { useState } from 'react';

import products from '../../data/products.js';

export default function CalendarPanel({
  selectedDate,
  selectedOrders = [],
}) {
  const [expandedOrderId, setExpandedOrderId] =
    useState(null);

  const formattedDate =
    selectedDate.toLocaleDateString(
      'en-US',
      {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      }
    );

  return (
    <aside className='calendar-side-panel'>
      <div className='calendar-panel-header'>
        <h2>{formattedDate}</h2>

        <p>
          {selectedOrders.length}{' '}
          Orders
        </p>
      </div>

      <div className='calendar-panel-scroll'>
        {selectedOrders.map((order) => (
          <div
            key={order.id}
            className='calendar-single-order'
          >
            {/* ===== SUMMARY ROW ===== */}

            <div
              className='calendar-order-summary'
              onClick={() => {
                setExpandedOrderId(
                  expandedOrderId ===
                    order.id
                    ? null
                    : order.id
                );
              }}
            >
              <div>
                <h3>
                  {
                    order.customer.name
                  }
                </h3>

                <p>
                  {order.finalTotal.toFixed(
                    2
                  )}{' '}
                  €
                </p>
              </div>

              <span
                className={`status-badge status-${order.status}`}
              >
                {order.status}
              </span>
            </div>

            {/* ===== EXPANDABLE DETAILS ===== */}

            <div
              className={`calendar-order-details ${
                expandedOrderId ===
                order.id
                  ? 'open'
                  : ''
              }`}
            >
              <div className='calendar-order-info'>
                <p>
                  <strong>
                    Phone:
                  </strong>{' '}
                  {
                    order.customer.phone
                  }
                </p>

                <p>
                  <strong>
                    Address:
                  </strong>{' '}
                  {
                    order.customer
                      .address
                  }
                </p>

                <p>
                  <strong>
                    Total:
                  </strong>{' '}
                  {order.finalTotal.toFixed(
                    2
                  )}{' '}
                  €
                </p>

                <p>
                  <strong>
                    Status:
                  </strong>{' '}
                  <span
                    className={`status-badge status-${order.status}`}
                  >
                    {
                      order.status
                    }
                  </span>
                </p>
              </div>

              <div className='calendar-products'>
                <h3>Products</h3>

                {order.products.map(
                  (product) => {
                    const productInfo =
                      products.find(
                        (item) =>
                          item.id ===
                          product.id
                      );

                    return (
                      <div
                        key={
                          product.id
                        }
                        className='calendar-product-row'
                      >
                        <p>
                          {
                            productInfo?.name
                          }
                        </p>

                        <p>
                          x
                          {
                            product.quantity
                          }
                        </p>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}