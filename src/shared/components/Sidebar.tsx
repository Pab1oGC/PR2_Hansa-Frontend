import { useState } from "react";
import { FiHome, FiFolder, FiMenu, FiX } from "react-icons/fi";

const SidebarNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { id: 1, icon: <FiHome className="w-5 h-5" />, label: "Inicio", path: "#" },
    { id: 2, icon: <FiFolder className="w-5 h-5" />, label: "Mi Repositorio", path: "#" }
  ];

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-gray-800 text-white lg:hidden focus:outline-none focus:ring-2 focus:ring-gray-600"
        aria-label="Toggle Sidebar"
      >
        {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Profile Section */}
        <div className="flex flex-col items-center py-8 border-b border-gray-200 dark:border-gray-700">
          <div className="relative w-24 h-24 mb-4 overflow-hidden rounded-full ring-4 ring-gray-100 dark:ring-gray-700">
            <img
              src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";
              }}
            />
          </div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Pablo Gutierrez</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">@pablogutierrrez0</p>
        </div>

        {/* Navigation Menu */}
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