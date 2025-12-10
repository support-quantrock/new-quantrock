import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Users, Mail, Phone, Calendar, Download, Search, RefreshCw, CheckCircle, XCircle, Clock } from 'lucide-react';

interface WebinarRegistration {
  id: string;
  name: string;
  email: string;
  mobile: string;
  webinar_id: string;
  registered_at: string;
  status: 'registered' | 'attended' | 'no_show' | 'cancelled';
}

export function WebinarDashboard() {
  const [registrations, setRegistrations] = useState<WebinarRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('webinar_registrations')
        .select('*')
        .order('registered_at', { ascending: false });

      if (error) {
        console.error('Error fetching registrations:', error);
      } else {
        setRegistrations(data || []);
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('webinar_registrations')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) {
        console.error('Error updating status:', error);
      } else {
        setRegistrations(prev =>
          prev.map(reg =>
            reg.id === id ? { ...reg, status: newStatus as WebinarRegistration['status'] } : reg
          )
        );
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Mobile', 'Webinar ID', 'Registered At', 'Status'];
    const csvContent = [
      headers.join(','),
      ...filteredRegistrations.map(reg =>
        [
          `"${reg.name}"`,
          reg.email,
          reg.mobile,
          reg.webinar_id,
          new Date(reg.registered_at).toLocaleString(),
          reg.status
        ].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `webinar-registrations-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const filteredRegistrations = registrations.filter(reg => {
    const matchesSearch =
      reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.mobile.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || reg.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: registrations.length,
    registered: registrations.filter(r => r.status === 'registered').length,
    attended: registrations.filter(r => r.status === 'attended').length,
    noShow: registrations.filter(r => r.status === 'no_show').length,
    cancelled: registrations.filter(r => r.status === 'cancelled').length,
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'registered':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
            <Clock className="w-3 h-3" /> مسجل
          </span>
        );
      case 'attended':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            <CheckCircle className="w-3 h-3" /> حضر
          </span>
        );
      case 'no_show':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
            <XCircle className="w-3 h-3" /> لم يحضر
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
            <XCircle className="w-3 h-3" /> ملغي
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Webinar Registrations</h1>
          <p className="text-gray-400 mt-1">Manage webinar attendees and track registrations</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchRegistrations}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-gradient-to-br from-[#1a1f4d]/60 to-[#2d1b4e]/40 rounded-xl p-4 border border-purple-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-gray-400 text-xs">Total</p>
              <p className="text-white text-xl font-bold">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#1a1f4d]/60 to-[#2d1b4e]/40 rounded-xl p-4 border border-blue-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-gray-400 text-xs">Registered</p>
              <p className="text-white text-xl font-bold">{stats.registered}</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#1a1f4d]/60 to-[#2d1b4e]/40 rounded-xl p-4 border border-green-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-gray-400 text-xs">Attended</p>
              <p className="text-white text-xl font-bold">{stats.attended}</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#1a1f4d]/60 to-[#2d1b4e]/40 rounded-xl p-4 border border-red-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <p className="text-gray-400 text-xs">No Show</p>
              <p className="text-white text-xl font-bold">{stats.noShow}</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-[#1a1f4d]/60 to-[#2d1b4e]/40 rounded-xl p-4 border border-gray-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gray-500/20 flex items-center justify-center">
              <XCircle className="w-5 h-5 text-gray-400" />
            </div>
            <div>
              <p className="text-gray-400 text-xs">Cancelled</p>
              <p className="text-white text-xl font-bold">{stats.cancelled}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 bg-black/40 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
        >
          <option value="all">All Status</option>
          <option value="registered">Registered</option>
          <option value="attended">Attended</option>
          <option value="no_show">No Show</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-gradient-to-br from-[#1a1f4d]/60 to-[#2d1b4e]/40 rounded-xl border border-purple-500/20 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="w-8 h-8 text-purple-400 animate-spin" />
          </div>
        ) : filteredRegistrations.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">No registrations found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-purple-500/20">
                  <th className="text-left px-6 py-4 text-gray-400 font-medium text-sm">Name</th>
                  <th className="text-left px-6 py-4 text-gray-400 font-medium text-sm">Email</th>
                  <th className="text-left px-6 py-4 text-gray-400 font-medium text-sm">Mobile</th>
                  <th className="text-left px-6 py-4 text-gray-400 font-medium text-sm">Registered</th>
                  <th className="text-left px-6 py-4 text-gray-400 font-medium text-sm">Status</th>
                  <th className="text-left px-6 py-4 text-gray-400 font-medium text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRegistrations.map((reg) => (
                  <tr key={reg.id} className="border-b border-purple-500/10 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {reg.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="text-white font-medium">{reg.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <a href={`mailto:${reg.email}`} className="text-gray-300 hover:text-purple-400 flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {reg.email}
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <a href={`tel:${reg.mobile}`} className="text-gray-300 hover:text-purple-400 flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {reg.mobile}
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <Calendar className="w-4 h-4" />
                        {new Date(reg.registered_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(reg.status)}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={reg.status}
                        onChange={(e) => updateStatus(reg.id, e.target.value)}
                        className="px-3 py-1.5 bg-black/40 border border-purple-500/30 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500"
                      >
                        <option value="registered">Registered</option>
                        <option value="attended">Attended</option>
                        <option value="no_show">No Show</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
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
        Showing {filteredRegistrations.length} of {registrations.length} registrations
      </div>
    </div>
  );
}
