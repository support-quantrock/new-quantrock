import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Users,
  DollarSign,
  MousePointer,
  TrendingUp,
  Copy,
  CheckCircle,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase, Referral } from '../../lib/supabase';

interface Stats {
  totalReferrals: number;
  totalEarnings: number;
  totalClicks: number;
  pendingEarnings: number;
}

export function DashboardHome() {
  const { user, profile } = useAuth();
  const [stats, setStats] = useState<Stats>({
    totalReferrals: 0,
    totalEarnings: 0,
    totalClicks: 0,
    pendingEarnings: 0,
  });
  const [recentReferrals, setRecentReferrals] = useState<Referral[]>([]);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  const referralLink = profile?.referral_code
    ? `${window.location.origin}/signup?ref=${profile.referral_code}`
    : '';

  useEffect(() => {
    if (user) {
      fetchStats();
      fetchRecentReferrals();
    }
  }, [user]);

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

      // Fetch clicks count
      const { count: clickCount } = await supabase
        .from('referral_clicks')
        .select('*', { count: 'exact', head: true })
        .eq('referral_code', profile?.referral_code);

      setStats({
        totalReferrals: referralCount || 0,
        totalEarnings,
        totalClicks: clickCount || 0,
        pendingEarnings,
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

  const copyReferralLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const statCards = [
    {
      label: 'Total Referrals',
      value: stats.totalReferrals,
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/10',
    },
    {
      label: 'Total Earnings',
      value: `$${stats.totalEarnings.toFixed(2)}`,
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500/10',
    },
    {
      label: 'Link Clicks',
      value: stats.totalClicks,
      icon: MousePointer,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gradient-to-br from-[#1a1f4d]/60 to-[#2d1b4e]/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} style={{ color: stat.color.includes('purple') ? '#a855f7' : stat.color.includes('green') ? '#22c55e' : stat.color.includes('blue') ? '#3b82f6' : '#f59e0b' }} />
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-white">
              {loading ? '...' : stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Referral Link Card */}
      <motion.div
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
      </motion.div>

      {/* Recent Referrals & Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Referrals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-gradient-to-br from-[#1a1f4d]/60 to-[#2d1b4e]/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">Recent Referrals</h2>
            <Link
              to="/dashboard/referrals"
              className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {recentReferrals.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">No referrals yet</p>
              <p className="text-gray-500 text-sm">Share your link to start earning!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentReferrals.map((referral) => (
                <div
                  key={referral.id}
                  className="flex items-center justify-between p-3 bg-black/20 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <span className="text-purple-400 font-bold">
                        {(referral.referred_user as any)?.full_name?.charAt(0)?.toUpperCase() || '?'}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        {(referral.referred_user as any)?.full_name || 'Anonymous'}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {new Date(referral.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    referral.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                    referral.status === 'paid' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-amber-500/20 text-amber-400'
                  }`}>
                    {referral.status}
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
          className="bg-gradient-to-br from-[#1a1f4d]/60 to-[#2d1b4e]/40 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20"
        >
          <h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              to="/dashboard/referrals"
              className="flex items-center justify-between p-4 bg-black/20 rounded-xl hover:bg-purple-500/10 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-white font-medium">View Referrals</p>
                  <p className="text-gray-500 text-sm">See all your referrals</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-purple-400 transition-colors" />
            </Link>

            <Link
              to="/dashboard/earnings"
              className="flex items-center justify-between p-4 bg-black/20 rounded-xl hover:bg-purple-500/10 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-white font-medium">View Earnings</p>
                  <p className="text-gray-500 text-sm">Track your commissions</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-purple-400 transition-colors" />
            </Link>

            <a
              href="/app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-black/20 rounded-xl hover:bg-purple-500/10 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <ExternalLink className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-medium">Download App</p>
                  <p className="text-gray-500 text-sm">Get the Quantrock app</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-purple-400 transition-colors" />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
