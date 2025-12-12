import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, Wifi, DollarSign, CheckCircle, Loader2 } from 'lucide-react';
import { PageLayout } from './PageLayout';

export function WebinarPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [referralCode, setReferralCode] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    country: 'المملكة العربية السعودية',
    countryCode: '+966'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeShare, setAgreeShare] = useState(false);

  // Extract referral code from URL and track click
  useEffect(() => {
    const ref = searchParams.get('ref');
    if (ref) {
      const code = ref.toUpperCase();
      setReferralCode(code);

      // Track the click in referral_clicks table
      const trackClick = async () => {
        try {
          const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
          const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

          await fetch(`${supabaseUrl}/rest/v1/referral_clicks`, {
            method: 'POST',
            headers: {
              'apikey': supabaseKey,
              'Authorization': `Bearer ${supabaseKey}`,
              'Content-Type': 'application/json',
              'Prefer': 'return=minimal'
            },
            body: JSON.stringify({
              referral_code: code
            })
          });
        } catch (err) {
          console.error('Error tracking click:', err);
        }
      };

      trackClick();
    }
  }, [searchParams]);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Webinar date: December 13, 2025 at 8:30 PM Riyadh time (UTC+3)
    const webinarDate = new Date('2025-12-13T20:30:00+03:00');

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = webinarDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted - handleSubmit called');
    console.log('Form data:', formData);

    setIsLoading(true);
    setError(null);

    try {
      console.log('Inserting into webinar_registrations...');

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      console.log('Using Supabase URL:', supabaseUrl);

      const response = await fetch(`${supabaseUrl}/rest/v1/webinar_registrations`, {
        method: 'POST',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          mobile: `${formData.countryCode}${formData.mobile}`,
          country: formData.country,
          webinar_id: 'dec-2025',
          referrer_code: referralCode || null
        })
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Insert error:', errorText);
        setError(`حدث خطأ أثناء التسجيل: ${errorText}`);
      } else {
        console.log('Registration successful!');
        setIsSubmitted(true);

        // Handle redirect based on referral code
        if (referralCode) {
          try {
            // Fetch the referrer's custom_url by their referral code
            const profileResponse = await fetch(
              `${supabaseUrl}/rest/v1/profiles?referral_code=eq.${referralCode}&select=custom_url`,
              {
                headers: {
                  'apikey': supabaseKey,
                  'Authorization': `Bearer ${supabaseKey}`,
                  'Content-Type': 'application/json',
                },
              }
            );

            if (profileResponse.ok) {
              const profiles = await profileResponse.json();
              if (profiles && profiles.length > 0 && profiles[0].custom_url) {
                // Redirect to the referrer's custom URL after a short delay
                setTimeout(() => {
                  window.location.href = profiles[0].custom_url;
                }, 2000);
                return;
              }
            }
          } catch (err) {
            console.error('Error fetching referrer profile:', err);
          }
        }

        // Default redirect to /app if no referral code or no custom_url
        setTimeout(() => {
          navigate('/app');
        }, 2000);
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-[#1a1040] overflow-x-hidden w-full">
        {/* Top Banner Image */}
        <div className="pt-24 sm:pt-28 max-w-7xl mx-auto px-4 sm:px-6">
          <img
            src="/media/Gemini_Generated_Image_tfyv6dtfyv6dtfyv.jpg"
            alt="Webinar Banner - استراتيجيات كبار المستثمرين"
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        {/* Hero Section */}
        <div
          className="relative pb-8 sm:pb-16 bg-[#1a1040]"
        >

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-start">

              {/* Right Side - Content (shows first on mobile) */}
              <div className="order-1 lg:order-2 text-right" dir="rtl">
                {/* Badge */}
                <div className="inline-block mb-3 sm:mb-4 pt-4 sm:pt-6">
                  <span className="text-[#f5a623] text-base sm:text-lg font-medium">
                    دعوة لحضور ندوة
                  </span>
                </div>

                {/* Main Title */}
                <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                  استراتيجيات كبـــار المستثمرين والبنوك الاستثمارية
                </h1>

                {/* Description Text */}
                <div className="text-gray-300 leading-relaxed text-xs sm:text-base mb-3 sm:mb-6">
                  <p className="mb-3">تعرف على استراتيجيات كبار المستثمرين والبنوك الاستثمارية التي تحرّك الأسواق قبل الجميع، من خلال محتوى عميق وعملي يشمل:</p>
                  <ul className="space-y-1.5 sm:space-y-2 mb-3">
                    <li>🏦 تحليل استراتيجيات البنوك الاستثمارية الكبرى وكيف تؤثر على اتجاه السوق</li>
                    <li>📊 رصد تحركات صناديق التحوط وبيوت الخبرة قبل انعكاسها على الأسعار</li>
                    <li>🕵️‍♂️ كشف صفقات المطلعين والكونغرس وما تعنيه للمستثمر الذكي</li>
                    <li>💰 متابعة تدفّق السيولة لحظة بلحظة لمعرفة أين يتجه المال</li>
                    <li>🤖 أقوى التحليلات بالذكاء الاصطناعي لرؤية أعمق وقرارات أدق</li>
                  </ul>
                  <p>كل ذلك لتمنحك أفضلية حقيقية في السوق، وقرارات استثمارية أذكى، وخطوات واثقة نحو النجاح في عالم الاستثمار.</p>
                </div>

                {/* Info Bar - 2 columns */}
                <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6">
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2 bg-white/5 rounded-lg p-2 sm:p-3">
                    <DollarSign className="w-4 h-4 sm:w-6 sm:h-6 text-[#f5a623] flex-shrink-0" />
                    <span className="text-white font-medium text-xs sm:text-base">مجاناً</span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2 bg-white/5 rounded-lg p-2 sm:p-3">
                    <Calendar className="w-4 h-4 sm:w-6 sm:h-6 text-[#f5a623] flex-shrink-0" />
                    <span className="text-white text-xs sm:text-base">السبت 13 ديسمبر</span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2 bg-white/5 rounded-lg p-2 sm:p-3">
                    <Clock className="w-4 h-4 sm:w-6 sm:h-6 text-[#f5a623] flex-shrink-0" />
                    <span className="text-white text-xs sm:text-base">08:30 م الرياض</span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2 bg-white/5 rounded-lg p-2 sm:p-3">
                    <Wifi className="w-4 h-4 sm:w-6 sm:h-6 text-[#f5a623] flex-shrink-0" />
                    <span className="text-white text-xs sm:text-base">عبر الإنترنت</span>
                  </div>
                </div>


                {/* Countdown Timer - Mobile only */}
                <div className="flex lg:hidden justify-center gap-2 sm:gap-4 mb-6 sm:mb-8" dir="ltr">
                  <div className="bg-gradient-to-b from-[#2a1f5c] to-[#1a1040] rounded-lg p-2 sm:p-4 min-w-[55px] sm:min-w-[80px] text-center border border-purple-500/30 shadow-lg">
                    <div className="text-xl sm:text-4xl font-bold text-white">{String(timeLeft.days).padStart(2, '0')}</div>
                    <div className="text-[9px] sm:text-xs text-gray-400 mt-1">أيام</div>
                  </div>
                  <div className="bg-gradient-to-b from-[#2a1f5c] to-[#1a1040] rounded-lg p-2 sm:p-4 min-w-[55px] sm:min-w-[80px] text-center border border-purple-500/30 shadow-lg">
                    <div className="text-xl sm:text-4xl font-bold text-white">{String(timeLeft.hours).padStart(2, '0')}</div>
                    <div className="text-[9px] sm:text-xs text-gray-400 mt-1">ساعات</div>
                  </div>
                  <div className="bg-gradient-to-b from-[#2a1f5c] to-[#1a1040] rounded-lg p-2 sm:p-4 min-w-[55px] sm:min-w-[80px] text-center border border-purple-500/30 shadow-lg">
                    <div className="text-xl sm:text-4xl font-bold text-white">{String(timeLeft.minutes).padStart(2, '0')}</div>
                    <div className="text-[9px] sm:text-xs text-gray-400 mt-1">دقائق</div>
                  </div>
                  <div className="bg-gradient-to-b from-[#2a1f5c] to-[#1a1040] rounded-lg p-2 sm:p-4 min-w-[55px] sm:min-w-[80px] text-center border border-purple-500/30 shadow-lg">
                    <div className="text-xl sm:text-4xl font-bold text-white">{String(timeLeft.seconds).padStart(2, '0')}</div>
                    <div className="text-[9px] sm:text-xs text-gray-400 mt-1">ثواني</div>
                  </div>
                </div>

                {/* Promo Banner - Desktop only */}
                <div className="hidden sm:flex mt-6 bg-gradient-to-r from-[#10b981] via-[#3b82f6] to-[#8b5cf6] rounded-lg p-4 items-center justify-center gap-3 border border-white/20">
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
                    🎁
                  </div>
                  <div className="text-center">
                    <p className="text-white font-bold">مفاجأت كبيرة!</p>
                    <p className="text-gray-300 text-sm">بانتظاركم في نهاية الندوة</p>
                    <p className="text-[#f5a623] font-bold">اختيار فائز بجائزة اشتراك بريميوم في كوانتروك</p>
                  </div>
                </div>

                {/* Instructor Section - Desktop only */}
                <div className="hidden lg:block mt-6 bg-gradient-to-r from-[#f5a623] to-[#8b5cf6] rounded-lg p-[2px]" dir="rtl">
                <div className="bg-[#1a1040] backdrop-blur rounded-lg p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#f5a623] to-[#e09515] p-1 flex-shrink-0">
                      <div className="w-full h-full rounded-full overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-[#1a2744] to-[#2a3754] flex items-center justify-center">
                          <svg className="w-8 h-8 text-[#f5a623]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 text-right">
                      <p className="text-[#f5a623] text-xs mb-1">المحاضر</p>
                      <h3 className="text-base font-bold text-white">أ. أحمد العزازي</h3>
                      <p className="text-gray-300 text-xs leading-relaxed mt-1">
                        محاضر ومصمّم برامج تدريبية في الأسهم الأمريكية والفوركس
                      </p>
                    </div>
                  </div>
                </div>
                </div>
              </div>

              {/* Promo Banner - Mobile only (above form) */}
              <div className="sm:hidden order-2 flex bg-gradient-to-r from-[#10b981] via-[#3b82f6] to-[#8b5cf6] rounded-lg p-3 items-center justify-center gap-3 border border-white/20" dir="rtl">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  🎁
                </div>
                <div className="text-center">
                  <p className="text-white font-bold text-sm">مفاجأت كبيرة!</p>
                  <p className="text-gray-300 text-xs">بانتظاركم في نهاية الندوة</p>
                  <p className="text-[#f5a623] font-bold text-xs">اختيار فائز بجائزة اشتراك بريميوم في كوانتروك</p>
                </div>
              </div>

              {/* Instructor Section - Mobile only */}
              <div className="lg:hidden order-2 mt-4 bg-gradient-to-r from-[#f5a623] to-[#8b5cf6] rounded-lg p-[2px]" dir="rtl">
              <div className="bg-[#1a1040] backdrop-blur rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#f5a623] to-[#e09515] p-1 flex-shrink-0">
                    <div className="w-full h-full rounded-full overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-[#1a2744] to-[#2a3754] flex items-center justify-center">
                        <svg className="w-7 h-7 text-[#f5a623]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 text-right">
                    <p className="text-[#f5a623] text-[10px] mb-0.5">المحاضر</p>
                    <h3 className="text-sm font-bold text-white">أ. أحمد العزازي</h3>
                    <p className="text-gray-300 text-[10px] leading-relaxed mt-0.5">
                      محاضر ومصمّم برامج تدريبية في الأسهم الأمريكية والفوركس
                    </p>
                  </div>
                </div>
              </div>
              </div>

              {/* Left Side - Registration Form (shows third on mobile) */}
              <div className="order-3 lg:order-1 w-full">
                {/* Countdown Timer - Desktop only (above form) */}
                <div className="hidden lg:flex flex-col items-center pt-6 mb-6">
                  <div className="flex justify-center gap-4" dir="ltr">
                    <div className="bg-gradient-to-b from-[#2a1f5c] to-[#1a1040] rounded-lg p-4 min-w-[80px] text-center border border-purple-500/30 shadow-lg">
                      <div className="text-4xl font-bold text-white">{String(timeLeft.days).padStart(2, '0')}</div>
                      <div className="text-xs text-gray-400 mt-1">أيام</div>
                    </div>
                    <div className="bg-gradient-to-b from-[#2a1f5c] to-[#1a1040] rounded-lg p-4 min-w-[80px] text-center border border-purple-500/30 shadow-lg">
                      <div className="text-4xl font-bold text-white">{String(timeLeft.hours).padStart(2, '0')}</div>
                      <div className="text-xs text-gray-400 mt-1">ساعات</div>
                    </div>
                    <div className="bg-gradient-to-b from-[#2a1f5c] to-[#1a1040] rounded-lg p-4 min-w-[80px] text-center border border-purple-500/30 shadow-lg">
                      <div className="text-4xl font-bold text-white">{String(timeLeft.minutes).padStart(2, '0')}</div>
                      <div className="text-xs text-gray-400 mt-1">دقائق</div>
                    </div>
                    <div className="bg-gradient-to-b from-[#2a1f5c] to-[#1a1040] rounded-lg p-4 min-w-[80px] text-center border border-purple-500/30 shadow-lg">
                      <div className="text-4xl font-bold text-white">{String(timeLeft.seconds).padStart(2, '0')}</div>
                      <div className="text-xs text-gray-400 mt-1">ثواني</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#f5a623] via-[#c77dff] to-[#7b2cbf] rounded-lg shadow-2xl overflow-hidden max-w-md mx-auto p-[2px] sm:p-1">
                  <div className="bg-[#1a1f35] rounded-lg overflow-hidden">
                  {/* Form Header */}
                  <div className="bg-gradient-to-r from-[#f5a623]/20 to-[#7b2cbf]/20 p-4 sm:p-6 pb-2 text-center border-b border-purple-500/30">
                    <h3 className="text-lg sm:text-xl font-bold text-white" dir="rtl">بيانات التسجيل في الندوة</h3>
                    <p className="text-gray-400 text-xs sm:text-sm mt-1" dir="rtl">بادر بالحجز الآن الأماكن محدودة</p>
                    <div className="w-16 h-1 bg-[#f5a623] mx-auto mt-3"></div>
                  </div>

                  {/* Form Body */}
                  <div className="p-4 sm:p-6">
                    {!isSubmitted ? (
                      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4" dir="rtl">
                        <div>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-purple-500/30 rounded bg-black/40 text-white placeholder-gray-400 focus:outline-none focus:border-[#f5a623] focus:ring-1 focus:ring-[#f5a623] transition-all text-right text-sm sm:text-base"
                            placeholder="الاسم بالكامل"
                          />
                        </div>

                        <div>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-purple-500/30 rounded bg-black/40 text-white placeholder-gray-400 focus:outline-none focus:border-[#f5a623] focus:ring-1 focus:ring-[#f5a623] transition-all text-right text-sm sm:text-base"
                            placeholder="البريد الالكتروني"
                          />
                        </div>

                        <div className="flex gap-2">
                          <input
                            type="tel"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            required
                            className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 border border-purple-500/30 rounded bg-black/40 text-white placeholder-gray-400 focus:outline-none focus:border-[#f5a623] focus:ring-1 focus:ring-[#f5a623] transition-all text-right text-sm sm:text-base"
                            placeholder="الهاتف"
                          />
                          <select
                            name="countryCode"
                            value={formData.countryCode}
                            onChange={handleChange}
                            className="px-2 sm:px-3 py-2.5 sm:py-3 border border-purple-500/30 rounded bg-black/40 text-white focus:outline-none focus:border-[#f5a623] focus:ring-1 focus:ring-[#f5a623] transition-all text-xs sm:text-sm"
                          >
                            <option value="+971">🇦🇪 +971</option>
                            <option value="+966">🇸🇦 +966</option>
                            <option value="+965">🇰🇼 +965</option>
                            <option value="+974">🇶🇦 +974</option>
                            <option value="+973">🇧🇭 +973</option>
                            <option value="+968">🇴🇲 +968</option>
                            <option value="+20">🇪🇬 +20</option>
                            <option value="+962">🇯🇴 +962</option>
                          </select>
                        </div>

                        <div>
                          <select
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-purple-500/30 rounded text-white focus:outline-none focus:border-[#f5a623] focus:ring-1 focus:ring-[#f5a623] transition-all text-right bg-black/40 text-sm sm:text-base"
                          >
                            <option value="الإمارات العربية المتحدة">الإمارات العربية المتحدة</option>
                            <option value="المملكة العربية السعودية">المملكة العربية السعودية</option>
                            <option value="الكويت">الكويت</option>
                            <option value="قطر">قطر</option>
                            <option value="البحرين">البحرين</option>
                            <option value="عمان">عمان</option>
                            <option value="مصر">مصر</option>
                            <option value="الأردن">الأردن</option>
                            <option value="أخرى">أخرى</option>
                          </select>
                        </div>

                        {/* Checkboxes */}
                        <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-300">
                          <label className="flex items-start gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={agreeTerms}
                              onChange={(e) => setAgreeTerms(e.target.checked)}
                              className="mt-0.5 sm:mt-1 w-4 h-4 text-[#f5a623] border-gray-300 rounded focus:ring-[#f5a623]"
                            />
                            <span>أوافق على شروط وأحكام وسياسة الخصوصية لموقع QUANTROCK</span>
                          </label>
                          <label className="flex items-start gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={agreeShare}
                              onChange={(e) => setAgreeShare(e.target.checked)}
                              className="mt-0.5 sm:mt-1 w-4 h-4 text-[#f5a623] border-gray-300 rounded focus:ring-[#f5a623]"
                            />
                            <span className="text-xs">أقر بأنني قمت وقبلت مشاركة بياناتي مع الشركات الراعية لفعاليات الموقع</span>
                          </label>
                        </div>

                        {error && (
                          <div className="bg-red-500/20 border border-red-500/30 text-red-400 px-3 sm:px-4 py-2 sm:py-3 rounded text-xs sm:text-sm">
                            {error}
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={isLoading}
                          className="w-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 hover:from-green-600 hover:via-blue-600 hover:to-purple-700 disabled:opacity-70 text-white font-bold py-3 sm:py-3.5 px-6 rounded transition-all duration-300 text-base sm:text-lg flex items-center justify-center gap-2 shadow-lg"
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              جاري التسجيل...
                            </>
                          ) : (
                            'سجل الآن'
                          )}
                        </button>
                      </form>
                    ) : (
                      <div className="text-center py-6 sm:py-8" dir="rtl">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                          <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-400" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">تم التسجيل بنجاح!</h3>
                        <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                          شكراً لتسجيلك. سنرسل لك تفاصيل الندوة على بريدك الإلكتروني.
                        </p>
                        <button
                          onClick={() => setIsSubmitted(false)}
                          className="text-[#f5a623] hover:text-[#e09515] font-medium transition-colors"
                        >
                          تسجيل شخص آخر
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </PageLayout>
  );
}
