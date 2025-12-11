import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  DollarSign,
  User,
  LogOut,
  X,
  ChevronRight,
  Video
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', adminOnly: false },
  { path: '/dashboard/referrals', icon: Users, label: 'Referrals', adminOnly: false },
  { path: '/dashboard/earnings', icon: DollarSign, label: 'Earnings', adminOnly: false },
  { path: '/dashboard/webinars', icon: Video, label: 'Webinars', adminOnly: true },
  { path: '/dashboard/profile', icon: User, label: 'Profile', adminOnly: false },
];

export function DashboardSidebar({ isOpen, onClose }: DashboardSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, profile } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-gradient-to-b from-[#0A0F1C] to-[#1a1f4d]
          border-r border-purple-500/20
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-purple-500/20">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2">
                <img src="/media/logo_png-2.png" alt="Quantrock" className="h-8" />
              </Link>
              <button
                onClick={onClose}
                className="lg:hidden p-2 rounded-lg hover:bg-purple-500/10 transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-purple-500/20">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-purple-500/10">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <span className="text-white font-bold">
                  {profile?.full_name?.charAt(0)?.toUpperCase() || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">
                  {profile?.full_name || 'User'}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {profile?.referral_code || 'No code'}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems
              .filter((item) => !item.adminOnly || profile?.role === 'admin')
              .map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                      ${isActive
                        ? 'bg-gradient-to-r from-purple-600/30 to-blue-600/20 text-white border border-purple-500/30'
                        : 'text-gray-400 hover:text-white hover:bg-purple-500/10'
                      }
                    `}
                  >
                    <item.icon className={`w-5 h-5 ${isActive ? 'text-purple-400' : ''}`} />
                    <span className="font-medium">{item.label}</span>
                    {isActive && <ChevronRight className="w-4 h-4 ml-auto text-purple-400" />}
                  </Link>
                );
              })}
          </nav>

          {/* Sign Out */}
          <div className="p-4 border-t border-purple-500/20">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
