import { useState, useEffect } from 'react';
import { Users, Mail, Phone, Calendar, Download, Search, RefreshCw, MapPin, Video, Link2 } from 'lucide-react';

interface WebinarRegistration {
  id: string;
  name: string;
  email: string;
  mobile: string;
  country: string;
  webinar_id: string;
  referrer_code: string | null;
  created_at: string;
  referrer_name?: string;
}

// Map webinar IDs to names, dates, and status
const webinarInfo: Record<string, { name: string; date: string; status: 'current' | 'previous' }> = {
  'dec-2025': { name: 'ندوة ديسمبر 2025', date: '13 ديسمبر 2025', status: 'current' },
};

export function WebinarDashboard() {
  const [registrations, setRegistrations] = useState<WebinarRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'current' | 'previous'>('current');

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      const response = await fetch(
        `${supabaseUrl}/rest/v1/webinar_registrations?select=*&order=created_at.desc`,
        {
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        console.error('Error fetching registrations:', response.statusText);
      } else {
        const data = await response.json();

        // Fetch referrer names for registrations with referrer_code
        const referrerCodes = [...new Set(data.filter((r: WebinarRegistration) => r.referrer_code).map((r: WebinarRegistration) => r.referrer_code))];

        if (referrerCodes.length > 0) {
          const profilesResponse = await fetch(
            `${supabaseUrl}/rest/v1/profiles?referral_code=in.(${referrerCodes.map(c => `"${c}"`).join(',')})&select=referral_code,full_name`,
            {
              headers: {
                'apikey': supabaseKey,
                'Authorization': `Bearer ${supabaseKey}`,
                'Content-Type': 'application/json',
              },
            }
          );

          if (profilesResponse.ok) {
            const profiles = await profilesResponse.json();
            const referrerMap = new Map(profiles.map((p: { referral_code: string; full_name: string }) => [p.referral_code, p.full_name]));

            // Add referrer names to registrations
            data.forEach((reg: WebinarRegistration) => {
              if (reg.referrer_code && referrerMap.has(reg.referrer_code)) {
                reg.referrer_name = referrerMap.get(reg.referrer_code) as string;
              }
            });
          }
        }

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

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Mobile', 'Country', 'Webinar Name', 'Webinar Date', 'Referrer Code', 'Registered At'];
    const csvContent = [
      headers.join(','),
      ...filteredRegistrations.map(reg =>
        [
          `"${reg.name}"`,
          reg.email,
          reg.mobile,
          `"${reg.country}"`,
          `"${webinarInfo[reg.webinar_id]?.name || reg.webinar_id}"`,
          `"${webinarInfo[reg.webinar_id]?.date || '-'}"`,
          reg.referrer_code || '-',
          new Date(reg.created_at).toLocaleString()
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
    return matchesSearch;
  });

  // Filter by tab (current/previous)
  const filteredByTab = filteredRegistrations.filter(reg => {
    const info = webinarInfo[reg.webinar_id];
    return info?.status === activeTab;
  });

  // Count registrations by status for tab badges
  const currentCount = registrations.filter(reg => webinarInfo[reg.webinar_id]?.status === 'current').length;
  const previousCount = registrations.filter(reg => webinarInfo[reg.webinar_id]?.status === 'previous').length;

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

      {/* Stats Card */}
      <div className="bg-gradient-to-br from-[#1a1f4d]/60 to-[#2d1b4e]/40 rounded-xl p-6 border border-purple-500/20">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-purple-500/20 flex items-center justify-center">
            <Users className="w-7 h-7 text-purple-400" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">{activeTab === 'current' ? 'Current' : 'Previous'} Registrations</p>
            <p className="text-white text-3xl font-bold">{activeTab === 'current' ? currentCount : previousCount}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-3">
        <button
          onClick={() => setActiveTab('current')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-300 ${
            activeTab === 'current'
              ? 'bg-gradient-to-r from-purple-600/40 to-blue-600/40 border-2 border-purple-500/70 text-white'
              : 'bg-black/40 border border-purple-500/30 text-gray-400 hover:bg-purple-500/20 hover:text-white'
          }`}
        >
          Current
          <span className={`px-2 py-0.5 rounded-full text-xs ${
            activeTab === 'current' ? 'bg-purple-500/30' : 'bg-gray-600/30'
          }`}>
            {currentCount}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('previous')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-300 ${
            activeTab === 'previous'
              ? 'bg-gradient-to-r from-purple-600/40 to-blue-600/40 border-2 border-purple-500/70 text-white'
              : 'bg-black/40 border border-purple-500/30 text-gray-400 hover:bg-purple-500/20 hover:text-white'
          }`}
        >
          Previous
          <span className={`px-2 py-0.5 rounded-full text-xs ${
            activeTab === 'previous' ? 'bg-purple-500/30' : 'bg-gray-600/30'
          }`}>
            {previousCount}
          </span>
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, email, or phone..."
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
        ) : filteredByTab.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">No {activeTab} webinar registrations found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-purple-500/20">
                  <th className="text-left px-6 py-4 text-gray-400 font-medium text-sm">Name</th>
                  <th className="text-left px-6 py-4 text-gray-400 font-medium text-sm">Email</th>
                  <th className="text-left px-6 py-4 text-gray-400 font-medium text-sm">Mobile</th>
                  <th className="text-left px-6 py-4 text-gray-400 font-medium text-sm">Country</th>
                  <th className="text-left px-6 py-4 text-gray-400 font-medium text-sm">Webinar</th>
                  <th className="text-left px-6 py-4 text-gray-400 font-medium text-sm">Referrer</th>
                  <th className="text-left px-6 py-4 text-gray-400 font-medium text-sm">Registered</th>
                </tr>
              </thead>
              <tbody>
                {filteredByTab.map((reg) => (
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
                      <div className="flex items-center gap-2 text-gray-300 text-sm">
                        <MapPin className="w-4 h-4" />
                        {reg.country}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="flex items-center gap-2 text-white font-medium">
                          <Video className="w-4 h-4 text-purple-400" />
                          {webinarInfo[reg.webinar_id]?.name || reg.webinar_id}
                        </div>
                        <p className="text-gray-500 text-xs mt-1">
                          {webinarInfo[reg.webinar_id]?.date || '-'}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {reg.referrer_code ? (
                        <div className="text-sm">
                          {reg.referrer_name && (
                            <p className="text-white font-medium">{reg.referrer_name}</p>
                          )}
                          <div className="flex items-center gap-2 text-[#f5a623]">
                            <Link2 className="w-4 h-4" />
                            {reg.referrer_code}
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-500 text-sm">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <Calendar className="w-4 h-4" />
                        {new Date(reg.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
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
        Showing {filteredByTab.length} of {activeTab === 'current' ? currentCount : previousCount} {activeTab} webinar registrations
      </div>
    </div>
  );
}
