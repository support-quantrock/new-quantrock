import { useState, useEffect } from 'react';
import { Users, Search, RefreshCw, Shield, User, Mail, Calendar } from 'lucide-react';

interface UserProfile {
  id: string;
  full_name: string | null;
  email?: string;
  referral_code: string;
  role: 'user' | 'admin';
  created_at: string;
}

export function UsersManagement() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      const response = await fetch(
        `${supabaseUrl}/rest/v1/profiles?select=*&order=created_at.desc`,
        {
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        console.error('Error fetching users:', response.statusText);
      } else {
        const data = await response.json();
        setUsers(data || []);
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateUserRole = async (userId: string, newRole: 'user' | 'admin') => {
    setUpdating(userId);
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      const response = await fetch(
        `${supabaseUrl}/rest/v1/profiles?id=eq.${userId}`,
        {
          method: 'PATCH',
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal',
          },
          body: JSON.stringify({ role: newRole, updated_at: new Date().toISOString() }),
        }
      );

      if (!response.ok) {
        console.error('Error updating user role:', response.statusText);
      } else {
        setUsers(prev =>
          prev.map(user =>
            user.id === userId ? { ...user, role: newRole } : user
          )
        );
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setUpdating(null);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      (user.full_name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      user.referral_code.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const stats = {
    total: users.length,
    admins: users.filter(u => u.role === 'admin').length,
    users: users.filter(u => u.role === 'user').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Users Management</h1>
          <p className="text-gray-400 mt-1">Manage user roles and permissions</p>
        </div>
        <button
          onClick={fetchUsers}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-[#1a1f4d]/60 to-[#2d1b4e]/40 rounded-xl p-4 border border-purple-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-gray-400 text-xs">Total Users</p>
              <p className="text-white text-xl font-bold">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#1a1f4d]/60 to-[#2d1b4e]/40 rounded-xl p-4 border border-red-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <p className="text-gray-400 text-xs">Admins</p>
              <p className="text-white text-xl font-bold">{stats.admins}</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#1a1f4d]/60 to-[#2d1b4e]/40 rounded-xl p-4 border border-blue-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <User className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-gray-400 text-xs">Regular Users</p>
              <p className="text-white text-xl font-bold">{stats.users}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name or referral code..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
        />
      </div>

      {/* Table */}
      <div className="bg-gradient-to-br from-[#1a1f4d]/60 to-[#2d1b4e]/40 rounded-xl border border-purple-500/20 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="w-8 h-8 text-purple-400 animate-spin" />
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">No users found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-purple-500/20">
                  <th className="text-left px-6 py-4 text-gray-400 font-medium text-sm">User</th>
                  <th className="text-left px-6 py-4 text-gray-400 font-medium text-sm">Referral Code</th>
                  <th className="text-left px-6 py-4 text-gray-400 font-medium text-sm">Joined</th>
                  <th className="text-left px-6 py-4 text-gray-400 font-medium text-sm">Current Role</th>
                  <th className="text-left px-6 py-4 text-gray-400 font-medium text-sm">Change Role</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-purple-500/10 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          user.role === 'admin'
                            ? 'bg-gradient-to-br from-red-500 to-orange-500'
                            : 'bg-gradient-to-br from-purple-500 to-blue-500'
                        }`}>
                          {user.role === 'admin' ? (
                            <Shield className="w-5 h-5 text-white" />
                          ) : (
                            <span className="text-white font-bold text-sm">
                              {user.full_name?.charAt(0)?.toUpperCase() || 'U'}
                            </span>
                          )}
                        </div>
                        <div>
                          <span className="text-white font-medium block">{user.full_name || 'Unknown'}</span>
                          <span className="text-gray-500 text-xs">{user.id.slice(0, 8)}...</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-300 font-mono text-sm bg-black/30 px-2 py-1 rounded">
                        {user.referral_code}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <Calendar className="w-4 h-4" />
                        {new Date(user.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {user.role === 'admin' ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30">
                          <Shield className="w-3 h-3" /> Admin
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
                          <User className="w-3 h-3" /> User
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={user.role}
                        onChange={(e) => updateUserRole(user.id, e.target.value as 'user' | 'admin')}
                        disabled={updating === user.id}
                        className="px-3 py-1.5 bg-black/40 border border-purple-500/30 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500 disabled:opacity-50"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                      {updating === user.id && (
                        <RefreshCw className="inline-block w-4 h-4 ml-2 text-purple-400 animate-spin" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Footer Stats */}
      <div className="text-center text-gray-400 text-sm">
        Showing {filteredUsers.length} of {users.length} users
      </div>
    </div>
  );
}
