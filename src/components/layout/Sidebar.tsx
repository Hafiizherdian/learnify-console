
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ListPlus, 
  Library,
  FileQuestion, 
  UserCircle, 
  Settings,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type NavItemProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
};

const NavItem = ({ to, icon, label, isActive }: NavItemProps) => {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => 
        cn(
          "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
          isActive 
            ? "bg-brand-blue text-white" 
            : "text-gray-600 hover:text-brand-blue hover:bg-blue-50"
        )
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
};

type SidebarProps = {
  collapsed: boolean;
  toggleSidebar: () => void;
};

const Sidebar = ({ collapsed, toggleSidebar }: SidebarProps) => {
  return (
    <div className={cn(
      "flex flex-col h-screen bg-white border-r border-gray-200 transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <FileQuestion className="h-6 w-6 text-brand-blue" />
            <h1 className="text-xl font-bold text-brand-blue">Learnify</h1>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar} 
          className={cn("rounded-full", collapsed && "mx-auto")}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        {collapsed ? (
          <>
            <div className="flex justify-center py-2">
              <NavLink to="/dashboard" className={({ isActive }) => 
                cn("p-2 rounded-md", isActive ? "text-brand-blue bg-blue-50" : "text-gray-500 hover:text-brand-blue")
              }>
                <LayoutDashboard className="h-5 w-5" />
              </NavLink>
            </div>
            <div className="flex justify-center py-2">
              <NavLink to="/create" className={({ isActive }) => 
                cn("p-2 rounded-md", isActive ? "text-brand-blue bg-blue-50" : "text-gray-500 hover:text-brand-blue")
              }>
                <ListPlus className="h-5 w-5" />
              </NavLink>
            </div>
            <div className="flex justify-center py-2">
              <NavLink to="/questions" className={({ isActive }) => 
                cn("p-2 rounded-md", isActive ? "text-brand-blue bg-blue-50" : "text-gray-500 hover:text-brand-blue")
              }>
                <Library className="h-5 w-5" />
              </NavLink>
            </div>
          </>
        ) : (
          <>
            <NavItem 
              to="/dashboard" 
              icon={<LayoutDashboard className="h-5 w-5" />} 
              label="Dasbor" 
            />
            <NavItem 
              to="/create" 
              icon={<ListPlus className="h-5 w-5" />} 
              label="Buat Pertanyaan" 
            />
            <NavItem 
              to="/questions" 
              icon={<Library className="h-5 w-5" />} 
              label="Bank Pertanyaan" 
            />
          </>
        )}
      </div>
      
      <div className="border-t border-gray-200 p-3">
        {collapsed ? (
          <div className="flex justify-center">
            <Button variant="ghost" size="icon" className="rounded-full">
              <UserCircle className="h-5 w-5 text-gray-500" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-3 px-3 py-2">
            <UserCircle className="h-5 w-5 text-gray-500" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-700 truncate">Akun Pengguna</p>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Settings className="h-4 w-4 text-gray-500" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
