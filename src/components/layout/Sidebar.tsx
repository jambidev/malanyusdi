import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Map, CalendarCheck, Plane as Plant, Sprout, Bug, Users, DollarSign, BarChart3, Settings, ChevronRight } from 'lucide-react';
import { useSidebar } from '../../contexts/SidebarContext';
import { useAuth } from '../../contexts/AuthContext';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
}

const NavItem = ({ to, icon, label, isCollapsed }: NavItemProps) => (
  <NavLink
    to={to}
    className={({ isActive }) => `
      flex items-center px-4 py-3 text-gray-700 rounded-lg
      ${isActive 
        ? 'bg-[#2D5F2D]/10 text-[#2D5F2D] font-medium' 
        : 'hover:bg-gray-100'
      }
      ${isCollapsed ? 'justify-center' : 'justify-start'}
      transition-all duration-200
    `}
  >
    <div className={`${isCollapsed ? 'mr-0' : 'mr-3'}`}>
      {icon}
    </div>
    {!isCollapsed && <span>{label}</span>}
  </NavLink>
);

const Sidebar = () => {
  const { isOpen, close } = useSidebar();
  const { user } = useAuth();

  // Close sidebar on mobile when clicking outside
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        close();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [close]);

  // Define navigation items
  const navItems = [
    { to: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/field-mapping', icon: <Map size={20} />, label: 'Field Mapping' },
    { to: '/task-scheduling', icon: <CalendarCheck size={20} />, label: 'Task Scheduling' },
    { to: '/harvest-management', icon: <Plant size={20} />, label: 'Harvest Management' },
    { to: '/fertilizer-management', icon: <Sprout size={20} />, label: 'Fertilizer Management' },
    { to: '/pest-control', icon: <Bug size={20} />, label: 'Pest Control' },
    { to: '/workforce', icon: <Users size={20} />, label: 'Workforce' },
    { to: '/financial', icon: <DollarSign size={20} />, label: 'Financial' },
    { to: '/reports', icon: <BarChart3 size={20} />, label: 'Reports' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-20 md:hidden"
          onClick={close}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-30 h-full bg-white border-r border-gray-200
          transition-all duration-300 ease-in-out
          ${isOpen ? 'w-64' : 'w-20'} 
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="flex items-center justify-between p-4">
          {isOpen ? (
            <div className="flex items-center">
              <div className="w-10 h-10 bg-[#2D5F2D] rounded-lg flex items-center justify-center">
                <Plant size={24} className="text-white" />
              </div>
              <h2 className="ml-2 text-xl font-bold text-[#2D5F2D]">Malanyusdi</h2>
            </div>
          ) : (
            <div className="w-10 h-10 mx-auto bg-[#2D5F2D] rounded-lg flex items-center justify-center">
              <Plant size={24} className="text-white" />
            </div>
          )}
        </div>

        {/* User info */}
        {isOpen && user && (
          <div className="px-4 py-3 border-t border-b border-gray-200">
            <div className="flex items-center">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
              ) : (
                <div className="w-10 h-10 bg-[#4A7C59] rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">{user.name.charAt(0)}</span>
                </div>
              )}
              <div className="ml-3">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="mt-4 px-2 space-y-1">
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              isCollapsed={!isOpen}
            />
          ))}
        </nav>

        {/* Settings at bottom */}
        <div className="absolute bottom-0 w-full p-2 border-t border-gray-200">
          <NavItem
            to="/settings"
            icon={<Settings size={20} />}
            label="Settings"
            isCollapsed={!isOpen}
          />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;