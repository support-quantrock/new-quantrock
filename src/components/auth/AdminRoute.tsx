import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface AdminRouteProps {
  children: React.ReactNode;
}

export function AdminRoute({ children }: AdminRouteProps) {
  const { user, profile, loading } = useAuth();

  // Show loading while auth is loading or profile is not yet fetched
  if (loading || (user && !profile)) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0A0F1C] via-[#1a1f4d] to-[#0A0F1C] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Check if user is admin
  if (!user || profile?.role !== 'admin') {
    console.log('AdminRoute: Access denied. Role:', profile?.role);
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
