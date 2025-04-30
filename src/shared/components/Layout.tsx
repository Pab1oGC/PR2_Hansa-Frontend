import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarNavigation from './Sidebar';

const Layout: React.FC = () => {
  return (
    <div className="layout-container">
      {/* Sidebar */}
      <SidebarNavigation />

      {/* Main Content */}
      <main>
        <Outlet /> {/* Aquí se renderizan las rutas hijas */}
      </main>
    </div>
  );
};

export default Layout;