import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Users,
  DollarSign,
  TrendingUp,
  Copy,
  CheckCircle,
  ArrowRight,
  ExternalLink,
  Video,
  Share2,
  QrCode,
  Save,
  Loader2
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase, Referral } from '../../lib/supabase';

interface Stats {
  totalReferrals: number;
  completedReferrals: number;
  totalEarnings: number;
  totalClicks: number;
  pendingEarnings: number;
  webinarRegistrations: number;
}

interface WebinarReferral {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

export function DashboardHome() {
  const { user, profile } = useAuth();
  const [stats, setStats] = useState<Stats>({
    totalReferrals: 0,
    completedReferrals: 0,
    totalEarnings: 0,
    totalClicks: 0,
    pendingEarnings: 0,
    webinarRegistrations: 0,
  });
  const [recentReferrals, setRecentReferrals] = useState<Referral[]>([]);
  const [webinarReferrals, setWebinarReferrals] = useState<WebinarReferral[]>([]);
  const [copied, setCopied] = useState(false);
  const [copiedWebinar, setCopiedWebinar] = useState(false);
  const [showWebinarQR, setShowWebinarQR] = useState(false);
  const [loading, setLoading] = useState(true);
  const [redirectUrl, setRedirectUrl] = useState('');
  const [savingRedirectUrl, setSavingRedirectUrl] = useState(false);
  const [redirectUrlSaved, setRedirectUrlSaved] = useState(false);

  const referralLink = profile?.referral_code
    ? `${window.location.origin}/signup?ref=${profile.referral_code}`
    : '';

  const webinarReferralLink = profile?.referral_code
    ? `${window.location.origin}/webinars?ref=${profile.referral_code}`
    : '';

  useEffect(() => {
    if (user) {
      fetchStats();
      fetchRecentReferrals();
      fetchWebinarReferrals();
    }
  }, [user]);

  // Load redirect URL from profile
  useEffect(() => {
    if (profile?.custom_url) {
      setRedirectUrl(profile.custom_url);
    }
  }, [profile]);

  const fetchStats = async () => {
    try {
      // Fetch referrals count
      const { count: referralCount } = await supabase
        .from('referrals')
        .select('*', { count: 'exact', head: true })
        .eq('referrer_id', user?.id);

      // Fetch total earnings
      const { data: earningsData } = await supabase
        .from('referrals')
        .select('commission_amount, status')
        .eq('referrer_id', user?.id);

      const totalEarnings = earningsData?.reduce((sum, r) => sum + (r.commission_amount || 0), 0) || 0;
      const pendingEarnings = earningsData
        ?.filter(r => r.status === 'pending')
        .reduce((sum, r) => sum + (r.commission_amount || 0), 0) || 0;
      const completedReferrals = earningsData
        ?.filter(r => r.status === 'completed' || r.status === 'paid').length || 0;

      // Fetch clicks count
      const { count: clickCount } = await supabase
        .from('referral_clicks')
        .select('*', { count: 'exact', head: true })
        .eq('referral_code', profile?.referral_code);

      // Fetch webinar registrations count (people who registered using this user's referral code)
      const { count: webinarCount } = await supabase
        .from('webinar_registrations')
        .select('*', { count: 'exact', head: true })
        .eq('referrer_code', profile?.referral_code);

      setStats({
        totalReferrals: referralCount || 0,
        completedReferrals,
        totalEarnings,
        totalClicks: clickCount || 0,
        pendingEarnings,
        webinarRegistrations: webinarCount || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentReferrals = async () => {
    try {
      const { data } = await supabase
        .from('referrals')
        .select(`
          *,
          referred_user:profiles!referrals_referred_user_id_fkey(full_name, created_at)
        `)
        .eq('referrer_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(5);

      setRecentReferrals(data || []);
    } catch (error) {
      console.error('Error fetching recent referrals:', error);
    }
  };

  const fetchWebinarReferrals = async () => {
    if (!profile?.referral_code) return;

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      const response = await fetch(
        `${supabaseUrl}/rest/v1/webinar_registrations?referrer_code=eq.${profile.referral_code}&select=id,name,email,created_at&order=created_at.desc&limit=5`,
        {
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setWebinarReferrals(data || []);
      }
    } catch (error) {
      console.error('Error fetching webinar referrals:', error);
    }
  };

  const copyReferralLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const copyWebinarLink = async () => {
    try {
      await navigator.clipboard.writeText(webinarReferralLink);
      setCopiedWebinar(true);
      setTimeout(() => setCopiedWebinar(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const shareWebinarLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join our Free Webinar',
          text: 'Join our free webinar on investment strategies!',
          url: webinarReferralLink,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      copyWebinarLink();
    }
  };

  const saveRedirectUrl = async () => {
    if (!user) return;

    setSavingRedirectUrl(true);
    setRedirectUrlSaved(false);

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      const response = await fetch(
        `${supabaseUrl}/rest/v1/profiles?id=eq.${user.id}`,
        {
          method: 'PATCH',
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal',
          },
          body: JSON.stringify({
            custom_url: redirectUrl.trim() || null,
            updated_at: new Date().toISOString()
          }),
        }
      );

      if (response.ok) {
        setRedirectUrlSaved(true);
        setTimeout(() => setRedirectUrlSaved(false), 2000);
      } else {
        console.error('Failed to save redirect URL');
      }
    } catch (error) {
      console.error('Error saving redirect URL:', error);
    } finally {
      setSavingRedirectUrl(false);
    }
  };

  const statCards = [
    {
      label: 'Total webinar referrals',
      value: stats.webinarRegistrations,
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500/10',
    },
    {
      label: 'Total Earnings',
      value: `$${stats.totalEarnings.toFixed(2)}`,
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500/10',
    },
    {
      label: 'Pending Earnings',
      value: `$${stats.pendingEarnings.toFixed(2)}`,
      icon: TrendingUp,
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-500/10',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Welcome back, {profile?.full_name?.split(' ')[0] || 'User'}!
        </h1>
        <p className="text-gray-400">
          Here's an overview of your referral performance
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gradient-to-br from-[#1a1f4d]/60 to-[#2d1b4e]/40 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-purple-500/20"
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} style={{ color: stat.color.includes('orange') ? '#f97316' : stat.color.includes('purple') ? '#a855f7' : stat.color.includes('green') ? '#22c55e' : stat.color.includes('blue') ? '#3b82f6' : '#f59e0b' }} />
              </div>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm mb-1">{stat.label}</p>
            <p className="text-xl sm:text-2xl font-bold text-white">
              {loading ? '...' : stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Referral Link Card - Hidden */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-gradient-to-br from-[#1a1f4d]/60 to-[#2d1b4e]/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white mb-1">Your Referral Link</h2>
            <p className="text-gray-400 text-sm">Share this link to earn commissions on referrals</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 md:flex-none">
              <div className="flex items-center gap-2 px-4 py-3 bg-black/40 rounded-xl border border-purple-500/30">
                <span className="text-gray-300 text-sm truncate max-w-[200px] md:max-w-[300px]">
                  {referralLink || 'Loading...'}
                </span>
              </div>
            </div>
            <button
              onClick={copyReferralLink}
              className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-xl transition-all duration-300"
            >
              {copied ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span className="hidden sm:inline">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  <span className="hidden sm:inline">Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div> */}

      {/* Webinar Referral Link Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45 }}
        className="bg-gradient-to-br from-[#1a1f4d]/60 to-[#2d1b4e]/40 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-purple-500/20"
      >
        <h2 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
          <Video className="w-4 h-4 sm:w-5 sm:h-5 text-[#f5a623]" />
          Webinar Referral Link
        </h2>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          {/* Webinar Link */}
          <div className="space-y-3 sm:space-y-4">
            {/* Webinar Referral Link */}
            <div>
              <label className="block text-xs sm:text-sm text-gray-400 mb-2">Webinar Registration Link</label>
              <div className="flex items-center gap-2">
                <div className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-black/40 rounded-xl border border-purple-500/30 text-gray-300 text-xs sm:text-sm truncate">
                  {webinarReferralLink}
                </div>
                <button
                  onClick={copyWebinarLink}
                  className="px-3 sm:px-4 py-2.5 sm:py-3 bg-[#f5a623] hover:bg-[#e09515] text-white rounded-xl transition-colors"
                >
                  {copiedWebinar ? <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" /> : <Copy className="w-4 h-4 sm:w-5 sm:h-5" />}
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={shareWebinarLink}
                className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-r from-[#f5a623] to-purple-600 hover:from-[#e09515] hover:to-purple-700 text-white text-sm sm:text-base font-medium rounded-xl transition-all"
              >
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden xs:inline">Share</span> <span className="hidden sm:inline">Webinar Link</span>
              </button>
              <button
                onClick={() => setShowWebinarQR(!showWebinarQR)}
                className="px-3 sm:px-4 py-2.5 sm:py-3 bg-black/40 border border-purple-500/30 hover:bg-purple-500/10 text-white rounded-xl transition-colors"
              >
                <QrCode className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            <p className="text-gray-500 text-xs sm:text-sm">
              Share this link to invite people to register for the upcoming webinar with your referral code.
            </p>
          </div>

          {/* Webinar QR Code */}
          <div className={`flex items-center justify-center ${showWebinarQR ? '' : 'hidden md:flex'}`}>
            <div className="bg-white p-3 sm:p-4 rounded-xl">
              <QRCodeSVG
                value={webinarReferralLink}
                size={150}
                level="H"
                includeMargin={true}
                className="w-[120px] h-[120px] sm:w-[180px] sm:h-[180px]"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Your App Referral Link Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.48 }}
        className="bg-gradient-to-br from-[#1a1f4d]/60 to-[#2d1b4e]/40 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-[#f5a623]/30"
      >
        <h2 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
          <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-[#f5a623]" />
          Your App Referral Link
        </h2>

        <div className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-xs sm:text-sm text-gray-400 mb-2">
              Where should users be redirected after registering via your webinar link?
            </label>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <input
                type="url"
                value={redirectUrl}
                onChange={(e) => setRedirectUrl(e.target.value)}
                placeholder="https://your-website.com/thank-you"
                className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-black/40 rounded-xl border border-purple-500/30 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#f5a623]"
              />
              <button
                onClick={saveRedirectUrl}
                disabled={savingRedirectUrl}
                className="px-4 py-2.5 sm:py-3 bg-[#f5a623] hover:bg-[#e09515] disabled:bg-gray-600 text-white rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {savingRedirectUrl ? (
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                ) : redirectUrlSaved ? (
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
                <span className="sm:hidden">Save</span>
              </button>
            </div>
          </div>
          <p className="text-gray-500 text-xs sm:text-sm">
            When someone registers for the webinar using your referral link, they will be redirected to this URL after successful registration. Leave empty to redirect to the app download page.
          </p>
        </div>
      </motion.div>

      {/* Recent Webinar Referrals & Quick Actions */}
      <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Webinar Referrals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-gradient-to-br from-[#1a1f4d]/60 to-[#2d1b4e]/40 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-purple-500/20"
        >
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Video className="w-4 h-4 sm:w-5 sm:h-5 text-[#f5a623]" />
              Recent Webinar Referrals
            </h2>
            <Link
              to="/dashboard/referrals"
              className="text-purple-400 hover:text-purple-300 text-xs sm:text-sm flex items-center gap-1"
            >
              View all <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </Link>
          </div>

          {webinarReferrals.length === 0 ? (
            <div className="text-center py-6 sm:py-8">
              <Video className="w-10 h-10 sm:w-12 sm:h-12 text-gray-600 mx-auto mb-2 sm:mb-3" />
              <p className="text-gray-400 text-sm">No webinar referrals yet</p>
              <p className="text-gray-500 text-xs sm:text-sm">Share your webinar link to get referrals!</p>
            </div>
          ) : (
            <div className="space-y-2 sm:space-y-3">
              {webinarReferrals.map((referral) => (
                <div
                  key={referral.id}
                  className="flex items-center justify-between p-2.5 sm:p-3 bg-black/20 rounded-xl"
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#f5a623]/20 flex items-center justify-center">
                      <span className="text-[#f5a623] font-bold text-sm sm:text-base">
                        {referral.name?.charAt(0)?.toUpperCase() || '?'}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm sm:text-base">
                        {referral.name || 'Anonymous'}
                      </p>
                      <p className="text-gray-500 text-[10px] sm:text-xs">
                        {new Date(referral.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className="px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium bg-green-500/20 text-green-400">
                    Registered
                  </span>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-gradient-to-br from-[#1a1f4d]/60 to-[#2d1b4e]/40 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-purple-500/20"
        >
          <h2 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">Quick Actions</h2>
          <div className="space-y-2 sm:space-y-3">
            <Link
              to="/dashboard/referrals"
              className="flex items-center justify-between p-3 sm:p-4 bg-black/20 rounded-xl hover:bg-purple-500/10 transition-colors group"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm sm:text-base">View Referrals</p>
                  <p className="text-gray-500 text-xs sm:text-sm">See all your referrals</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 group-hover:text-purple-400 transition-colors" />
            </Link>

            <Link
              to="/dashboard/earnings"
              className="flex items-center justify-between p-3 sm:p-4 bg-black/20 rounded-xl hover:bg-purple-500/10 transition-colors group"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm sm:text-base">View Earnings</p>
                  <p className="text-gray-500 text-xs sm:text-sm">Track your commissions</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 group-hover:text-purple-400 transition-colors" />
            </Link>

            <a
              href="/app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 sm:p-4 bg-black/20 rounded-xl hover:bg-purple-500/10 transition-colors group"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm sm:text-base">Download App</p>
                  <p className="text-gray-500 text-xs sm:text-sm">Get the Quantrock app</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 group-hover:text-purple-400 transition-colors" />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
