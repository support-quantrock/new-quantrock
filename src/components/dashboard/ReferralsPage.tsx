import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Copy,
  CheckCircle,
  MousePointer,
  UserPlus,
  Link as LinkIcon,
  Share2,
  QrCode,
  Video,
  ExternalLink,
  Save,
  Loader2
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase, Referral } from '../../lib/supabase';

interface ReferralStats {
  totalReferrals: number;
  completedReferrals: number;
  pendingReferrals: number;
  totalClicks: number;
}

export function ReferralsPage() {
  const { user, profile } = useAuth();
  const [stats, setStats] = useState<ReferralStats>({
    totalReferrals: 0,
    completedReferrals: 0,
    pendingReferrals: 0,
    totalClicks: 0,
  });
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [copied, setCopied] = useState(false);
  const [copiedWebinar, setCopiedWebinar] = useState(false);
  const [showQR, setShowQR] = useState(false);
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
      fetchData();
    }
  }, [user]);

  // Load redirect URL from profile
  useEffect(() => {
    if (profile?.custom_url) {
      setRedirectUrl(profile.custom_url);
    }
  }, [profile]);

  const fetchData = async () => {
    try {
      // Fetch referrals
      const { data: referralsData } = await supabase
        .from('referrals')
        .select(`
          *,
          referred_user:profiles!referrals_referred_user_id_fkey(id, full_name, created_at)
        `)
        .eq('referrer_id', user?.id)
        .order('created_at', { ascending: false });

      setReferrals(referralsData || []);

      // Calculate stats
      const total = referralsData?.length || 0;
      const completed = referralsData?.filter(r => r.status === 'completed' || r.status === 'paid').length || 0;
      const pending = referralsData?.filter(r => r.status === 'pending').length || 0;

      // Fetch clicks
      const { count: clickCount } = await supabase
        .from('referral_clicks')
        .select('*', { count: 'exact', head: true })
        .eq('referral_code', profile?.referral_code);

      setStats({
        totalReferrals: total,
        completedReferrals: completed,
        pendingReferrals: pending,
        totalClicks: clickCount || 0,
      });
    } catch (error) {
      console.error('Error fetching referrals:', error);
    } finally {
      setLoading(false);
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

  const copyReferralCode = async () => {
    try {
      await navigator.clipboard.writeText(profile?.referral_code || '');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join Quantrock',
          text: 'Join Quantrock and start your investment journey!',
          url: referralLink,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      copyReferralLink();
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
    { label: 'Total Referrals', value: stats.totalReferrals, icon: Users, color: 'purple' },
    { label: 'Completed', value: stats.completedReferrals, icon: CheckCircle, color: 'green' },
    { label: 'Pending', value: stats.pendingReferrals, icon: UserPlus, color: 'amber' },
    { label: 'Link Clicks', value: stats.totalClicks, icon: MousePointer, color: 'blue' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Referrals</h1>
        <p className="text-gray-400">Track and manage your referrals</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gradient-to-br from-[#1a1f4d]/60 to-[#2d1b4e]/40 backdrop-blur-sm rounded-2xl p-5 border border-purple-500/20"
          >
            <div className={`w-10 h-10 rounded-xl bg-${stat.color}-500/20 flex items-center justify-center mb-3`}>
              <stat.icon className={`w-5 h-5 text-${stat.color}-400`} style={{ color: stat.color === 'purple' ? '#a855f7' : stat.color === 'green' ? '#22c55e' : stat.color === 'amber' ? '#f59e0b' : '#3b82f6' }} />
            </div>
            <p className="text-gray-400 text-sm">{stat.label}</p>
            <p className="text-2xl font-bold text-white">{loading ? '...' : stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Referral Link Section - Hidden */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-gradient-to-br from-[#1a1f4d]/60 to-[#2d1b4e]/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20"
      >
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <LinkIcon className="w-5 h-5 text-purple-400" />
          Your Referral Link
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Referral Link</label>
              <div className="flex items-center gap-2">
                <div className="flex-1 px-4 py-3 bg-black/40 rounded-xl border border-purple-500/30 text-gray-300 text-sm truncate">
                  {referralLink}
                </div>
                <button
                  onClick={copyReferralLink}
                  className="px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors"
                >
                  {copied ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Referral Code</label>
              <div className="flex items-center gap-2">
                <div className="flex-1 px-4 py-3 bg-black/40 rounded-xl border border-purple-500/30 text-white font-mono text-lg">
                  {profile?.referral_code || 'Loading...'}
                </div>
                <button
                  onClick={copyReferralCode}
                  className="px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors"
                >
                  <Copy className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={shareLink}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-xl transition-all"
              >
                <Share2 className="w-5 h-5" />
                Share Link
              </button>
              <button
                onClick={() => setShowQR(!showQR)}
                className="px-4 py-3 bg-black/40 border border-purple-500/30 hover:bg-purple-500/10 text-white rounded-xl transition-colors"
              >
                <QrCode className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className={`flex items-center justify-center ${showQR ? '' : 'hidden md:flex'}`}>
            <div className="bg-white p-4 rounded-xl">
              <QRCodeSVG
                value={referralLink}
                size={180}
                level="H"
                includeMargin={true}
              />
            </div>
          </div>
        </div>
      </motion.div> */}

      {/* Webinar Referral Link Section - Moved to Dashboard */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45 }}
        className="bg-gradient-to-br from-[#1a1f4d]/60 to-[#2d1b4e]/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20"
      >
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Video className="w-5 h-5 text-[#f5a623]" />
          Webinar Referral Link
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Webinar Registration Link</label>
              <div className="flex items-center gap-2">
                <div className="flex-1 px-4 py-3 bg-black/40 rounded-xl border border-purple-500/30 text-gray-300 text-sm truncate">
                  {webinarReferralLink}
                </div>
                <button
                  onClick={copyWebinarLink}
                  className="px-4 py-3 bg-[#f5a623] hover:bg-[#e09515] text-white rounded-xl transition-colors"
                >
                  {copiedWebinar ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={shareWebinarLink}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#f5a623] to-purple-600 hover:from-[#e09515] hover:to-purple-700 text-white font-medium rounded-xl transition-all"
              >
                <Share2 className="w-5 h-5" />
                Share Webinar Link
              </button>
              <button
                onClick={() => setShowWebinarQR(!showWebinarQR)}
                className="px-4 py-3 bg-black/40 border border-purple-500/30 hover:bg-purple-500/10 text-white rounded-xl transition-colors"
              >
                <QrCode className="w-5 h-5" />
              </button>
            </div>

            <p className="text-gray-500 text-sm">
              Share this link to invite people to register for the upcoming webinar with your referral code.
            </p>
          </div>

          <div className={`flex items-center justify-center ${showWebinarQR ? '' : 'hidden md:flex'}`}>
            <div className="bg-white p-4 rounded-xl">
              <QRCodeSVG
                value={webinarReferralLink}
                size={180}
                level="H"
                includeMargin={true}
              />
            </div>
          </div>
        </div>
      </motion.div> */}

      {/* Your App Referral Link Section - Moved to Dashboard */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.48 }}
        className="bg-gradient-to-br from-[#1a1f4d]/60 to-[#2d1b4e]/40 backdrop-blur-sm rounded-2xl p-6 border border-[#f5a623]/30"
      >
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <ExternalLink className="w-5 h-5 text-[#f5a623]" />
          Your App Referral Link
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Where should users be redirected after registering via your webinar link?
            </label>
            <div className="flex items-center gap-2">
              <input
                type="url"
                value={redirectUrl}
                onChange={(e) => setRedirectUrl(e.target.value)}
                placeholder="https://your-website.com/thank-you"
                className="flex-1 px-4 py-3 bg-black/40 rounded-xl border border-purple-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-[#f5a623]"
              />
              <button
                onClick={saveRedirectUrl}
                disabled={savingRedirectUrl}
                className="px-4 py-3 bg-[#f5a623] hover:bg-[#e09515] disabled:bg-gray-600 text-white rounded-xl transition-colors flex items-center gap-2"
              >
                {savingRedirectUrl ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : redirectUrlSaved ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <Save className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
          <p className="text-gray-500 text-sm">
            When someone registers for the webinar using your referral link, they will be redirected to this URL after successful registration. Leave empty to redirect to the app download page.
          </p>
        </div>
      </motion.div> */}

      {/* Referrals Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.55 }}
        className="bg-gradient-to-br from-[#1a1f4d]/60 to-[#2d1b4e]/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20"
      >
        <h2 className="text-lg font-bold text-white mb-4">Referral History</h2>

        {referrals.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 mb-2">No referrals yet</p>
            <p className="text-gray-500 text-sm">Share your link to start earning commissions!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-purple-500/20">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">User</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Date</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">Status</th>
                  <th className="text-right py-3 px-4 text-gray-400 font-medium text-sm">Commission</th>
                </tr>
              </thead>
              <tbody>
                {referrals.map((referral) => (
                  <tr key={referral.id} className="border-b border-purple-500/10 hover:bg-purple-500/5">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                          <span className="text-purple-400 font-bold">
                            {(referral.referred_user as any)?.full_name?.charAt(0)?.toUpperCase() || '?'}
                          </span>
                        </div>
                        <span className="text-white">
                          {(referral.referred_user as any)?.full_name || 'Anonymous'}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-400">
                      {new Date(referral.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        referral.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                        referral.status === 'paid' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-amber-500/20 text-amber-400'
                      }`}>
                        {referral.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right text-white font-medium">
                      ${referral.commission_amount?.toFixed(2) || '0.00'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}
