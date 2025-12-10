import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu, Bell } from 'lucide-react';
import { DashboardSidebar } from './DashboardSidebar';
import { useAuth } from '../../contexts/AuthContext';

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { profile } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0F1C] via-[#1a1f4d] to-[#0A0F1C]">
      <div className="flex">
        {/* Sidebar */}
        <DashboardSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Top Header */}
          <header className="sticky top-0 z-30 bg-[#0A0F1C]/95 backdrop-blur-md border-b border-purple-500/20">
            <div className="flex items-center justify-between px-4 lg:px-8 py-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-purple-500/10 transition-colors"
              >
                <Menu className="w-6 h-6 text-gray-400" />
              </button>

              {/* Page Title - Hidden on mobile */}
              <div className="hidden lg:block">
                <h1 className="text-xl font-bold text-white">Dashboard</h1>
              </div>

              {/* Right Side */}
              <div className="flex items-center gap-4">
                {/* Notifications */}
                <button className="relative p-2 rounded-lg hover:bg-purple-500/10 transition-colors">
                  <Bell className="w-5 h-5 text-gray-400" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-purple-500 rounded-full" />
                </button>

                {/* User Avatar */}
                <div className="hidden sm:flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {profile?.full_name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <span className="text-gray-300 font-medium">
                    {profile?.full_name?.split(' ')[0] || 'User'}
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-4 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
