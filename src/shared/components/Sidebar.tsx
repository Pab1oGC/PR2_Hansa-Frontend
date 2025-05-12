import React from 'react';
import { FiHome, FiFolder } from 'react-icons/fi';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarNavigation: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { id: 1, icon: <FiHome className="w-5 h-5" />, label: "Inicio", path: "#" },
    { id: 2, icon: <FiFolder className="w-5 h-5" />, label: "Mi Repositorio", path: "#" },
  ];

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <>
      {/* Fondo oscuro solo cuando abierto y en móviles */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.4)] z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >


        {/* Perfil */}
        <div className="flex flex-col items-center py-4 border-b border-gray-200 dark:border-gray-700 mt-16">
          <div className="relative w-24 h-24 mb-2 overflow-hidden rounded-full ring-4 ring-gray-100 dark:ring-gray-700">
            <img
              src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";
              }}
            />
          </div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">{user.username}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">@pablogutierrrez0</p>
        </div>

        {/* Navegación */}
        <nav className="px-4 py-6">
          <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.path}
                    className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 group"
                  >
                    <span className="group-hover:text-[var(--color-primary)] dark:group-hover:text-blue-400">
                      {item.icon}
                    </span>
                    <span className="ml-3 font-medium group-hover:text-[var(--color-primary)] dark:group-hover:text-blue-400">
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
        </nav>
      </aside>
    </>
  );
};

export default SidebarNavigation;
