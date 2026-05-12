// Sidebar.jsx

import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className='sidebar'>
      <h1 className='sidebar-logo'>OMS</h1>

      <nav className='sidebar-nav'>
        <Link to='/dashboard'>Dashboard</Link>

        <Link to='/orders/new'>Νέα Παραγγελία</Link>

        <Link to='/orders'>Παραγγελίες</Link>

        <Link to='/calendar'>Ημερολόγιο</Link>

        <Link to='/customers'>Καρτέλα Πελάτη</Link>
      </nav>

      <div className='sidebar-divider'>
        <span>admin</span>
      </div>

      <nav className='sidebar-nav secondary'>
        <Link to='/pricing'>Κοστολόγιο</Link>

        <Link to='/analytics'>Analytics</Link>

        <Link to='/daily-plan'>Πρόγ. Ημέρας</Link>

        <Link to='/users'>Χρήστες</Link>
      </nav>
    </aside>
  );
}