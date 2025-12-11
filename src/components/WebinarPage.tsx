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
    country: 'الإمارات العربية المتحدة'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeShare, setAgreeShare] = useState(false);

  // Extract referral code from URL
  useEffect(() => {
    const ref = searchParams.get('ref');
    if (ref) {
      setReferralCode(ref.toUpperCase());
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
          mobile: formData.mobile,
          country: formData.country,
          webinar_id: 'dec-2025'
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
      <div className="min-h-screen bg-[#1a2744]">
        {/* Top Banner Image */}
        <div className="pt-16 sm:pt-20 max-w-7xl mx-auto px-4 sm:px-6">
          <img
            src="/media/Gemini_Generated_Image_tfyv6dtfyv6dtfyv.jpg"
            alt="Webinar Banner - استراتيجيات كبار المستثمرين"
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        {/* Hero Section */}
        <div
          className="relative pb-8 sm:pb-16"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1610375461246-83df859d849d?w=1920&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-[#1a2744]/90"></div>

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
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                  استراتيجيات كبـــار المستثمرين والبنوك الاستثمارية
                </h1>

                {/* Info Bar - centered */}
                <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-[#f5a623]" />
                    <span className="text-white font-medium text-sm sm:text-base">مجاناً</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-[#f5a623]" />
                    <span className="text-white text-sm sm:text-base">السبت 13 ديسمبر</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-[#f5a623]" />
                    <span className="text-white text-sm sm:text-base">08:30 م بتوقيت الرياض</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wifi className="w-5 h-5 sm:w-6 sm:h-6 text-[#f5a623]" />
                    <span className="text-white text-sm sm:text-base">عبر الإنترنت</span>
                  </div>
                </div>

                {/* Countdown Timer */}
                <div className="flex justify-center gap-3 sm:gap-4 mb-6 sm:mb-8" dir="ltr">
                  <div className="bg-gradient-to-b from-[#2a1f5c] to-[#1a1040] rounded-lg p-3 sm:p-4 min-w-[60px] sm:min-w-[80px] text-center border border-purple-500/30 shadow-lg">
                    <div className="text-2xl sm:text-4xl font-bold text-white">{String(timeLeft.days).padStart(2, '0')}</div>
                    <div className="text-[10px] sm:text-xs text-gray-400 mt-1">أيام</div>
                  </div>
                  <div className="bg-gradient-to-b from-[#2a1f5c] to-[#1a1040] rounded-lg p-3 sm:p-4 min-w-[60px] sm:min-w-[80px] text-center border border-purple-500/30 shadow-lg">
                    <div className="text-2xl sm:text-4xl font-bold text-white">{String(timeLeft.hours).padStart(2, '0')}</div>
                    <div className="text-[10px] sm:text-xs text-gray-400 mt-1">ساعات</div>
                  </div>
                  <div className="bg-gradient-to-b from-[#2a1f5c] to-[#1a1040] rounded-lg p-3 sm:p-4 min-w-[60px] sm:min-w-[80px] text-center border border-purple-500/30 shadow-lg">
                    <div className="text-2xl sm:text-4xl font-bold text-white">{String(timeLeft.minutes).padStart(2, '0')}</div>
                    <div className="text-[10px] sm:text-xs text-gray-400 mt-1">دقائق</div>
                  </div>
                  <div className="bg-gradient-to-b from-[#2a1f5c] to-[#1a1040] rounded-lg p-3 sm:p-4 min-w-[60px] sm:min-w-[80px] text-center border border-purple-500/30 shadow-lg">
                    <div className="text-2xl sm:text-4xl font-bold text-white">{String(timeLeft.seconds).padStart(2, '0')}</div>
                    <div className="text-[10px] sm:text-xs text-gray-400 mt-1">ثواني</div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
                  قم بتسجيل حضورك الآن في هذه الندوة المميّزة ولا تفوّت فرصة الاستفادة من أمهر الخبراء في التداول بالسوق الأمريكي
                </p>

                {/* Description Text - Hidden on mobile */}
                <div className="hidden sm:block bg-white/5 backdrop-blur rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 border border-white/10">
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                    تعرف على استراتيجيات كبار المستثمرين والبنوك الاستثمارية في السوق الأمريكي.
                    سنتناول تحركات صناديق التحوط وبيوت الخبرة والبنوك، صفقات المطلعين والكونغرس،
                    تدفق السيولة، وأقوى التحليلات المالية بالذكاء الاصطناعي.
                  </p>
                </div>

                {/* Sponsor - Hidden on mobile */}
                <div className="hidden sm:block text-center">
                  <p className="text-gray-400 mb-3">برعاية</p>
                  <div className="inline-block">
                    <div className="bg-[#1a3a5c] px-6 py-3 rounded-lg">
                      <span className="text-white font-bold text-xl">QUANTROCK</span>
                    </div>
                  </div>
                </div>

                {/* Promo Banner - Hidden on mobile */}
                <div className="hidden sm:flex mt-6 bg-white rounded-lg p-4 items-center justify-center gap-3">
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
                    %
                  </div>
                  <div className="text-center">
                    <p className="text-gray-800 font-medium">تداول مع QUANTROCK واحصل</p>
                    <p className="text-[#f5a623] font-bold">على اشتراك متداول PRO مجاناً!</p>
                  </div>
                </div>
              </div>

              {/* Left Side - Registration Form (shows second on mobile) */}
              <div className="order-2 lg:order-1">
                <div className="bg-gradient-to-br from-[#f5a623] via-[#c77dff] to-[#7b2cbf] rounded-lg shadow-2xl overflow-hidden max-w-md mx-auto lg:mx-0 p-1">
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
                          <div className="flex items-center gap-1 px-2 sm:px-3 py-2.5 sm:py-3 border border-purple-500/30 rounded bg-black/40 text-gray-300 text-xs sm:text-sm whitespace-nowrap">
                            <span>(971+)</span>
                          </div>
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

        {/* Presenter Section */}
        <div className="bg-[#1a2744] py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-right mb-6 sm:mb-8" dir="rtl">
              <h2 className="text-xl sm:text-2xl font-bold text-white inline-block border-r-4 border-[#f5a623] pr-4">
                المحاضرون
              </h2>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-lg p-4 sm:p-6 flex flex-col md:flex-row items-center md:items-start gap-4 sm:gap-6 border border-white/20" dir="rtl">
              {/* Presenter Image */}
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#f5a623] to-[#e09515] p-1 flex-shrink-0">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
                    alt="QUANTROCK Team"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Presenter Info */}
              <div className="flex-1 text-right text-center md:text-right">
                <p className="text-[#f5a623] text-xs sm:text-sm mb-1">المحاضر</p>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">فريق QUANTROCK</h3>
                <div className="w-16 h-1 bg-[#f5a623] mb-3 mx-auto md:mx-0 md:mr-0"></div>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  محللون محترفون للأسواق المالية وخبراء في تداول الأسواق المالية منذ 10 سنوات.
                  قدموا العديد من استراتيجيات التداول الناجحة بالإضافة إلى التحليلات الدورية للأسواق المالية.
                </p>
              </div>

            </div>

            {/* Bottom Info */}
            <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-6 sm:gap-8 text-center" dir="rtl">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">التاريخ</p>
                <p className="text-white font-bold text-sm sm:text-base">السبت 13 ديسمبر</p>
                <p className="text-gray-300 text-xs sm:text-sm">08:30 م</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">المدة</p>
                <p className="text-white font-bold text-sm sm:text-base">120 دقيقة</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs sm:text-sm">السعر</p>
                <p className="text-white font-bold text-sm sm:text-base">مجاناً</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
