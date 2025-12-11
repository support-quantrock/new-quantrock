import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Calendar,
  Save,
  AlertCircle,
  CheckCircle,
  Key,
  Shield,
  Copy,
  Video
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function ProfilePage() {
  const { user, profile, updateProfile, error, clearError } = useAuth();
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const webinarReferralLink = profile?.referral_code
    ? `${window.location.origin}/webinars?ref=${profile.referral_code}`
    : '';

  const copyWebinarLink = async () => {
    try {
      await navigator.clipboard.writeText(webinarReferralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccess(false);
    clearError();

    const { error } = await updateProfile({ full_name: fullName });

    if (!error) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }

    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Profile</h1>
        <p className="text-gray-400">Manage your account settings</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="md:col-span-1"
        >
          <div className="bg-gradient-to-br from-[#1a1f4d]/60 to-[#2d1b4e]/40 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-purple-500/20 text-center">
            {/* Avatar */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <span className="text-white font-bold text-2xl sm:text-3xl">
                {profile?.full_name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-white mb-1">
              {profile?.full_name || 'User'}
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 truncate">{user?.email}</p>

            {/* Webinar Referral Link */}
            <div className="bg-black/20 rounded-xl p-3 sm:p-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Video className="w-3 h-3 sm:w-4 sm:h-4 text-[#f5a623]" />
                <p className="text-gray-400 text-[10px] sm:text-xs">Webinar Referral Link</p>
              </div>
              <p className="text-[#f5a623] text-[10px] sm:text-xs break-all mb-2">
                {webinarReferralLink || 'N/A'}
              </p>
              <button
                onClick={copyWebinarLink}
                className="flex items-center justify-center gap-1 sm:gap-2 w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-[#f5a623] hover:bg-[#e09515] text-white text-xs sm:text-sm font-medium rounded-lg transition-colors"
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                    Copy Link
                  </>
                )}
              </button>
            </div>

            {/* Member Since */}
            <div className="mt-3 sm:mt-4 flex items-center justify-center gap-1 sm:gap-2 text-gray-500 text-xs sm:text-sm">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>
                Member since {profile?.created_at
                  ? new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                  : 'N/A'
                }
              </span>
            </div>
          </div>
        </motion.div>

        {/* Settings Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-2 space-y-4 sm:space-y-6"
        >
          {/* Personal Info */}
          <div className="bg-gradient-to-br from-[#1a1f4d]/60 to-[#2d1b4e]/40 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-purple-500/20">
            <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
              Personal Information
            </h3>

            {/* Success Message */}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-3 sm:mb-4 p-3 sm:p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center gap-2 sm:gap-3"
              >
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                <p className="text-green-400 text-xs sm:text-sm">Profile updated successfully!</p>
              </motion.div>
            )}

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-3 sm:mb-4 p-3 sm:p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-2 sm:gap-3"
              >
                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
                <p className="text-red-400 text-xs sm:text-sm">{error}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-black/40 border border-purple-500/30 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              {/* Email (Read-only) */}
              <div>
                <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={user?.email || ''}
                    readOnly
                    className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-black/20 border border-purple-500/20 rounded-xl text-gray-400 text-sm cursor-not-allowed"
                  />
                </div>
                <p className="text-gray-500 text-[10px] sm:text-xs mt-1">Email cannot be changed</p>
              </div>

              {/* Save Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-sm sm:text-base font-medium rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                    Save Changes
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Security Settings */}
          <div className="bg-gradient-to-br from-[#1a1f4d]/60 to-[#2d1b4e]/40 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-purple-500/20">
            <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
              Security
            </h3>

            <div className="space-y-3 sm:space-y-4">
              {/* Change Password */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-black/20 rounded-xl gap-3 sm:gap-0">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <Key className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm sm:text-base">Password</p>
                    <p className="text-gray-500 text-xs sm:text-sm">Change your password</p>
                  </div>
                </div>
                <a
                  href="/forgot-password"
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 text-sm font-medium rounded-lg transition-colors text-center"
                >
                  Change
                </a>
              </div>

              {/* Two Factor Auth (Coming Soon) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-black/20 rounded-xl opacity-50 gap-3 sm:gap-0">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm sm:text-base">Two-Factor Authentication</p>
                    <p className="text-gray-500 text-xs sm:text-sm">Add an extra layer of security</p>
                  </div>
                </div>
                <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-500/20 text-gray-400 text-sm font-medium rounded-lg text-center">
                  Coming Soon
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
