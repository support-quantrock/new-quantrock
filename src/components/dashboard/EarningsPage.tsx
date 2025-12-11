import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  Wallet,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase, Referral } from '../../lib/supabase';

interface EarningsStats {
  totalEarnings: number;
  pendingEarnings: number;
  paidEarnings: number;
  thisMonthEarnings: number;
}

interface EarningTransaction {
  id: string;
  amount: number;
  status: string;
  type: 'commission' | 'payout';
  date: string;
  referredUser?: string;
}

export function EarningsPage() {
  const { user, profile } = useAuth();
  const [stats, setStats] = useState<EarningsStats>({
    totalEarnings: 0,
    pendingEarnings: 0,
    paidEarnings: 0,
    thisMonthEarnings: 0,
  });
  const [transactions, setTransactions] = useState<EarningTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      // Fetch referrals with earnings
      const { data: referralsData } = await supabase
        .from('referrals')
        .select(`
          *,
          referred_user:profiles!referrals_referred_user_id_fkey(full_name)
        `)
        .eq('referrer_id', user?.id)
        .order('created_at', { ascending: false });

      if (referralsData) {
        // Calculate stats
        const total = referralsData.reduce((sum, r) => sum + (r.commission_amount || 0), 0);
        const pending = referralsData
          .filter(r => r.status === 'pending')
          .reduce((sum, r) => sum + (r.commission_amount || 0), 0);
        const paid = referralsData
          .filter(r => r.status === 'paid')
          .reduce((sum, r) => sum + (r.commission_amount || 0), 0);

        // This month earnings
        const thisMonth = new Date();
        thisMonth.setDate(1);
        thisMonth.setHours(0, 0, 0, 0);
        const thisMonthEarnings = referralsData
          .filter(r => new Date(r.created_at) >= thisMonth)
          .reduce((sum, r) => sum + (r.commission_amount || 0), 0);

        setStats({
          totalEarnings: total,
          pendingEarnings: pending,
          paidEarnings: paid,
          thisMonthEarnings,
        });

        // Transform to transactions
        const txns: EarningTransaction[] = referralsData.map(r => ({
          id: r.id,
          amount: r.commission_amount || 0,
          status: r.status,
          type: 'commission',
          date: r.created_at,
          referredUser: (r.referred_user as any)?.full_name,
        }));

        setTransactions(txns);
      }
    } catch (error) {
      console.error('Error fetching earnings:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      label: 'Total Earnings',
      value: `$${stats.totalEarnings.toFixed(2)}`,
      icon: DollarSign,
      color: 'green',
      bgColor: 'bg-green-500/10',
    },
    {
      label: 'Pending',
      value: `$${stats.pendingEarnings.toFixed(2)}`,
      icon: Clock,
      color: 'amber',
      bgColor: 'bg-amber-500/10',
    },
    {
      label: 'Paid Out',
      value: `$${stats.paidEarnings.toFixed(2)}`,
      icon: CheckCircle,
      color: 'blue',
      bgColor: 'bg-blue-500/10',
    },
    {
      label: 'This Month',
      value: `$${stats.thisMonthEarnings.toFixed(2)}`,
      icon: TrendingUp,
      color: 'purple',
      bgColor: 'bg-purple-500/10',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Earnings</h1>
        <p className="text-gray-400">Track your commissions and payouts</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gradient-to-br from-[#1a1f4d]/60 to-[#2d1b4e]/40 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-purple-500/20"
          >
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl ${stat.bgColor} flex items-center justify-center mb-2 sm:mb-3`}>
              <stat.icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: stat.color === 'green' ? '#22c55e' : stat.color === 'amber' ? '#f59e0b' : stat.color === 'blue' ? '#3b82f6' : '#a855f7' }} />
            </div>
            <p className="text-gray-400 text-xs sm:text-sm">{stat.label}</p>
            <p className="text-lg sm:text-2xl font-bold text-white">{loading ? '...' : stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Earnings Overview Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-gradient-to-br from-[#1a1f4d]/60 to-[#2d1b4e]/40 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-purple-500/20"
      >
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
            <Wallet className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white">Commission Structure</h2>
            <p className="text-gray-400 text-xs sm:text-sm">How you earn from referrals</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {/* Per Signup - Hidden */}
          {/* <div className="bg-black/20 rounded-xl p-4">
            <p className="text-gray-400 text-sm mb-1">Per Signup</p>
            <p className="text-2xl font-bold text-green-400">$5.00</p>
            <p className="text-gray-500 text-xs mt-1">When user completes signup</p>
          </div> */}
          <div className="bg-black/20 rounded-xl p-3 sm:p-4">
            <p className="text-gray-400 text-xs sm:text-sm mb-1">Per Active User</p>
            <p className="text-xl sm:text-2xl font-bold text-blue-400">$1.00</p>
            <p className="text-gray-500 text-[10px] sm:text-xs mt-1">Per subscription</p>
          </div>
          <div className="bg-black/20 rounded-xl p-3 sm:p-4">
            <p className="text-gray-400 text-xs sm:text-sm mb-1">Recurring</p>
            <p className="text-xl sm:text-2xl font-bold text-purple-400">10%</p>
            <p className="text-gray-500 text-[10px] sm:text-xs mt-1">Of user's subscription fees</p>
          </div>
        </div>
      </motion.div>

      {/* Transaction History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-gradient-to-br from-[#1a1f4d]/60 to-[#2d1b4e]/40 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-purple-500/20"
      >
        <h2 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">Transaction History</h2>

        {transactions.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <DollarSign className="w-12 h-12 sm:w-16 sm:h-16 text-gray-600 mx-auto mb-3 sm:mb-4" />
            <p className="text-gray-400 mb-2 text-sm sm:text-base">No transactions yet</p>
            <p className="text-gray-500 text-xs sm:text-sm">Start referring users to earn commissions!</p>
          </div>
        ) : (
          <div className="space-y-2 sm:space-y-3">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-3 sm:p-4 bg-black/20 rounded-xl hover:bg-purple-500/5 transition-colors"
              >
                <div className="flex items-center gap-2 sm:gap-4">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${
                    tx.type === 'commission' ? 'bg-green-500/20' : 'bg-red-500/20'
                  }`}>
                    {tx.type === 'commission' ? (
                      <ArrowDownRight className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm sm:text-base">
                      {tx.type === 'commission' ? 'Referral Commission' : 'Payout'}
                    </p>
                    <p className="text-gray-500 text-[10px] sm:text-sm">
                      {tx.referredUser && <span className="hidden sm:inline">From {tx.referredUser} • </span>}
                      {new Date(tx.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-sm sm:text-base ${tx.type === 'commission' ? 'text-green-400' : 'text-red-400'}`}>
                    {tx.type === 'commission' ? '+' : '-'}${tx.amount.toFixed(2)}
                  </p>
                  <span className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full ${
                    tx.status === 'paid' ? 'bg-blue-500/20 text-blue-400' :
                    tx.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                    'bg-amber-500/20 text-amber-400'
                  }`}>
                    {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
