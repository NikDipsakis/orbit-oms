// App.jsx

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

import AppLayout from './app/AppLayout.jsx';

import Orders from './pages/Orders.jsx';
import NewOrder from './pages/NewOrder.jsx';
import CalendarPage from './pages/CalendarPage.jsx';

export default function App() {
  const [orders, setOrders] = useState([]);

  function addOrderHandler(newOrder) {
    setOrders((prevOrders) => [
      ...prevOrders,
      {
        ...newOrder,
        id: Math.random(),
      },
    ]);
  }

  function updateOrderStatusHandler(id, status) {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        if (order.id === id) {
          return {
            ...order,
            status: status,
          };
        }

        return order;
      }),
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/dashboard' />} />

        <Route path='/' element={<AppLayout />}>
          <Route path='dashboard' element={<h1>Dashboard</h1>} />

          <Route
            path='orders'
            element={
              <Orders
                orders={orders}
                onUpdateStatus={updateOrderStatusHandler}
              />
            }
          />

          <Route
            path='orders/new'
            element={<NewOrder onAddOrder={addOrderHandler} />}
          />
          <Route path='calendar' element={<CalendarPage orders={orders} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
