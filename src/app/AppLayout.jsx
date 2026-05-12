import { Outlet } from 'react-router-dom';
import Sidebar from '../components/SideBar.jsx';
import Topbar from '../components/TopBar.jsx';

function AppLayout() {
  return (
    <div className='layout'>
      <Sidebar />

      <div className='main'>
        <Topbar />

        <div className='content'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
