-- Quantrock Database Schema
-- Run this in your Supabase SQL Editor: https://app.supabase.com/project/wbyvcwavyiqdxcbgakve/sql

-- =====================================================
-- 1. PROFILES TABLE (extends auth.users)
-- =====================================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  referral_code TEXT UNIQUE NOT NULL,
  referrer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster referral code lookups
CREATE INDEX IF NOT EXISTS idx_profiles_referral_code ON profiles(referral_code);

-- =====================================================
-- 2. REFERRALS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  referred_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'paid')),
  commission_amount DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(referrer_id, referred_user_id)
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_referrals_referrer_id ON referrals(referrer_id);
CREATE INDEX IF NOT EXISTS idx_referrals_referred_user_id ON referrals(referred_user_id);

-- =====================================================
-- 3. REFERRAL CLICKS TABLE (for tracking link clicks)
-- =====================================================
CREATE TABLE IF NOT EXISTS referral_clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referral_code TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster click counting
CREATE INDEX IF NOT EXISTS idx_referral_clicks_code ON referral_clicks(referral_code);

-- =====================================================
-- 4. ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE referral_clicks ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Allow public to view referral codes (for validation during signup)
CREATE POLICY "Anyone can check referral codes" ON profiles
  FOR SELECT USING (true);

-- Referrals policies
CREATE POLICY "Users can view own referrals" ON referrals
  FOR SELECT USING (auth.uid() = referrer_id);

CREATE POLICY "Users can insert referrals" ON referrals
  FOR INSERT WITH CHECK (true);

-- Referral clicks policies (public can insert clicks)
CREATE POLICY "Anyone can insert clicks" ON referral_clicks
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view clicks for their code" ON referral_clicks
  FOR SELECT USING (true);

-- =====================================================
-- 5. TRIGGER: Auto-create profile on user signup
-- =====================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  new_referral_code TEXT;
BEGIN
  -- Generate unique referral code
  new_referral_code := 'QR' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 6));

  -- Ensure uniqueness
  WHILE EXISTS (SELECT 1 FROM profiles WHERE referral_code = new_referral_code) LOOP
    new_referral_code := 'QR' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 6));
  END LOOP;

  INSERT INTO public.profiles (id, full_name, referral_code)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    new_referral_code
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- 6. TRIGGER: Update updated_at timestamp
-- =====================================================
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS profiles_updated_at ON profiles;
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- =====================================================
-- 7. ADD custom_url COLUMN TO PROFILES (for webinar redirect)
-- =====================================================
-- Run this if you already have the profiles table:
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS custom_url TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin'));

-- =====================================================
-- DONE! Your schema is ready.
-- =====================================================
