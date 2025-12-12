import { useState, useEffect, useRef } from 'react';
import { Users, Mail, Phone, Calendar, Download, Search, RefreshCw, MapPin, Video, Link2, ChevronLeft, ChevronRight } from 'lucide-react';

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

// Map webinar IDs to names and actual dates (YYYY-MM-DD format)
const webinarDates: Record<string, { name: string; date: string; displayDate: string }> = {
  'dec-2025': { name: 'ندوة ديسمبر 2025', date: '2025-12-13', displayDate: '13 ديسمبر 2025' },
};

// Generate calendar dates for the date picker
const generateCalendarDates = () => {
  const dates: { date: Date; hasWebinar: boolean; webinarId: string | null; registrationCount?: number }[] = [];
  const today = new Date();

  // Generate dates from 30 days ago to 60 days ahead
  for (let i = -30; i <= 60; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    // Check if this date has a webinar
    const dateStr = date.toISOString().split('T')[0];
    const webinarEntry = Object.entries(webinarDates).find(([_, info]) => info.date === dateStr);

    dates.push({
      date,
      hasWebinar: !!webinarEntry,
      webinarId: webinarEntry ? webinarEntry[0] : null
    });
  }

  return dates;
};

export function WebinarDashboard() {
  const [registrations, setRegistrations] = useState<WebinarRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [calendarDates, setCalendarDates] = useState(generateCalendarDates());
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Find and select the first webinar date on mount
  useEffect(() => {
    const firstWebinarDate = calendarDates.find(d => d.hasWebinar);
    if (firstWebinarDate) {
      setSelectedDate(firstWebinarDate.date.toISOString().split('T')[0]);
    }
  }, []);

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

        // Update calendar dates with registration counts
        const updatedDates = calendarDates.map(d => {
          if (d.webinarId) {
            const count = data.filter((r: WebinarRegistration) => r.webinar_id === d.webinarId).length;
            return { ...d, registrationCount: count };
          }
          return d;
        });
        setCalendarDates(updatedDates);
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

  // Scroll calendar left/right
  const scrollCalendar = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Center on selected date when it changes
  useEffect(() => {
    if (selectedDate && scrollContainerRef.current) {
      const selectedElement = scrollContainerRef.current.querySelector(`[data-date="${selectedDate}"]`);
      if (selectedElement) {
        selectedElement.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [selectedDate]);

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Mobile', 'Country', 'Webinar Name', 'Webinar Date', 'Referrer Code', 'Registered At'];
    const csvContent = [
      headers.join(','),
      ...filteredByDate.map(reg =>
        [
          `"${reg.name}"`,
          reg.email,
          reg.mobile,
          `"${reg.country}"`,
          `"${webinarDates[reg.webinar_id]?.name || reg.webinar_id}"`,
          `"${webinarDates[reg.webinar_id]?.displayDate || '-'}"`,
          reg.referrer_code || '-',
          new Date(reg.created_at).toLocaleString()
        ].join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `webinar-registrations-${selectedDate || 'all'}.csv`;
    link.click();
  };

  const filteredRegistrations = registrations.filter(reg => {
    const matchesSearch =
      reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.mobile.includes(searchTerm);
    return matchesSearch;
  });

  // Filter by selected date
  const filteredByDate = filteredRegistrations.filter(reg => {
    if (!selectedDate) return true;
    const webinarInfo = webinarDates[reg.webinar_id];
    return webinarInfo?.date === selectedDate;
  });

  // Get count for selected date
  const selectedDateCount = selectedDate
    ? registrations.filter(reg => webinarDates[reg.webinar_id]?.date === selectedDate).length
    : registrations.length;

  // Get selected webinar info
  const selectedWebinar = selectedDate
    ? Object.entries(webinarDates).find(([_, info]) => info.date === selectedDate)
    : null;

  // Format day name
  const getDayName = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
  };

  // Format month name
  const getMonthName = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
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

      {/* Calendar Date Picker */}
      <div className="bg-gradient-to-br from-[#1a1f4d]/60 to-[#2d1b4e]/40 rounded-xl p-4 border border-purple-500/20">
        <div className="flex items-center gap-2">
          {/* Left Arrow */}
          <button
            onClick={() => scrollCalendar('left')}
            className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Scrollable Calendar */}
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-x-auto scrollbar-hide flex gap-3 py-2 px-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {calendarDates.map((dateInfo, index) => {
              const dateStr = dateInfo.date.toISOString().split('T')[0];
              const isSelected = selectedDate === dateStr;
              const isToday = dateStr === new Date().toISOString().split('T')[0];

              return (
                <button
                  key={index}
                  data-date={dateStr}
                  onClick={() => dateInfo.hasWebinar && setSelectedDate(dateStr)}
                  disabled={!dateInfo.hasWebinar}
                  className={`flex-shrink-0 w-20 sm:w-24 rounded-xl p-3 sm:p-4 text-center transition-all duration-300 ${
                    isSelected
                      ? 'bg-[#22c55e] text-white shadow-lg shadow-green-500/30 scale-105'
                      : dateInfo.hasWebinar
                        ? 'bg-white/10 hover:bg-white/20 text-white cursor-pointer'
                        : 'bg-black/20 text-gray-500 cursor-not-allowed opacity-50'
                  } ${isToday && !isSelected ? 'ring-2 ring-purple-500/50' : ''}`}
                >
                  <div className={`text-[10px] sm:text-xs font-medium mb-1 ${isSelected ? 'text-white' : 'text-gray-400'}`}>
                    {getDayName(dateInfo.date)}
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold mb-1">
                    {dateInfo.date.getDate()}
                  </div>
                  <div className={`text-[10px] sm:text-xs font-medium ${isSelected ? 'text-white' : 'text-gray-400'}`}>
                    {getMonthName(dateInfo.date)}
                  </div>
                  {dateInfo.hasWebinar && dateInfo.registrationCount !== undefined && (
                    <div className={`mt-1 text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-white/20' : 'bg-purple-500/30 text-purple-300'
                    }`}>
                      {dateInfo.registrationCount} reg
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scrollCalendar('right')}
            className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
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
            <p className="text-gray-400 text-sm">
              {selectedWebinar ? selectedWebinar[1].name : 'All'} Registrations
            </p>
            <p className="text-white text-3xl font-bold">{selectedDateCount}</p>
            {selectedWebinar && (
              <p className="text-purple-400 text-xs mt-1">{selectedWebinar[1].displayDate}</p>
            )}
          </div>
        </div>
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
        ) : filteredByDate.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">No registrations found for selected date</p>
            {selectedDate && (
              <p className="text-gray-500 text-sm mt-2">
                Try selecting a different webinar date
              </p>
            )}
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
                {filteredByDate.map((reg) => (
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
                          {webinarDates[reg.webinar_id]?.name || reg.webinar_id}
                        </div>
                        <p className="text-gray-500 text-xs mt-1">
                          {webinarDates[reg.webinar_id]?.displayDate || '-'}
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
        Showing {filteredByDate.length} of {selectedDateCount} registrations
        {selectedWebinar && ` for ${selectedWebinar[1].name}`}
      </div>
    </div>
  );
}
