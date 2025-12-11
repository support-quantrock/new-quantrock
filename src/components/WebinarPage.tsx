import { useState } from 'react';
import { Calendar, Clock, Wifi, DollarSign, CheckCircle, Loader2 } from 'lucide-react';
import { PageLayout } from './PageLayout';
import { supabase } from '../lib/supabase';

export function WebinarPage() {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
    console.log('Has anon key:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);
    setIsLoading(true);
    setError(null);

    try {
      console.log('Inserting into webinar_registrations...');
      const { data, error: insertError } = await supabase
        .from('webinar_registrations')
        .insert({
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          country: formData.country,
          webinar_id: 'dec-2025'
        })
        .select();

      console.log('Insert result:', { data, error: insertError });

      if (insertError) {
        console.error('Registration error:', insertError);
        setError(`حدث خطأ أثناء التسجيل: ${insertError.message}`);
      } else {
        console.log('Registration successful!');
        setIsSubmitted(true);
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
        {/* Hero Section */}
        <div
          className="relative pt-20 sm:pt-24 pb-8 sm:pb-16"
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

                {/* Info Bar - 2 columns on mobile, row on desktop */}
                <div className="grid grid-cols-2 sm:flex sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 sm:gap-6 mb-4 sm:mb-6">
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

                {/* Webinar Image */}
                <img
                  src="/media/webinar-dec2025.jpg"
                  alt="Webinar"
                  className="w-full max-w-xs rounded-lg object-cover border-2 border-[#f5a623]/30 mb-4 sm:mb-6 mx-auto"
                />

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
                <div className="bg-white rounded-lg shadow-2xl overflow-hidden max-w-md mx-auto lg:mx-0">
                  {/* Form Header */}
                  <div className="bg-white p-4 sm:p-6 pb-2 text-center border-b border-gray-100">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800" dir="rtl">بيانات التسجيل في الندوة</h3>
                    <p className="text-gray-500 text-xs sm:text-sm mt-1" dir="rtl">بادر بالحجز الآن الأماكن محدودة</p>
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
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#f5a623] focus:ring-1 focus:ring-[#f5a623] transition-all text-right text-sm sm:text-base"
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
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#f5a623] focus:ring-1 focus:ring-[#f5a623] transition-all text-right text-sm sm:text-base"
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
                            className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#f5a623] focus:ring-1 focus:ring-[#f5a623] transition-all text-right text-sm sm:text-base"
                            placeholder="الهاتف"
                          />
                          <div className="flex items-center gap-1 px-2 sm:px-3 py-2.5 sm:py-3 border border-gray-300 rounded bg-gray-50 text-gray-600 text-xs sm:text-sm whitespace-nowrap">
                            <span>(971+)</span>
                          </div>
                        </div>

                        <div>
                          <select
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded text-gray-800 focus:outline-none focus:border-[#f5a623] focus:ring-1 focus:ring-[#f5a623] transition-all text-right bg-white text-sm sm:text-base"
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
                        <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-600">
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
                          <div className="bg-red-50 border border-red-200 text-red-600 px-3 sm:px-4 py-2 sm:py-3 rounded text-xs sm:text-sm">
                            {error}
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={isLoading}
                          className="w-full bg-[#f5a623] hover:bg-[#e09515] disabled:bg-[#f5a623]/70 text-white font-bold py-3 sm:py-3.5 px-6 rounded transition-all duration-300 text-base sm:text-lg flex items-center justify-center gap-2"
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
                        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">تم التسجيل بنجاح!</h3>
                        <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
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

        {/* Presenter Section */}
        <div className="bg-[#1a2744] py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-right mb-6 sm:mb-8" dir="rtl">
              <h2 className="text-xl sm:text-2xl font-bold text-white inline-block border-r-4 border-[#f5a623] pr-4">
                المحاضرون
              </h2>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-lg p-4 sm:p-6 flex flex-col md:flex-row items-center gap-4 sm:gap-6 border border-white/20" dir="rtl">
              {/* Presenter Image */}
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#f5a623] to-[#e09515] flex items-center justify-center overflow-hidden flex-shrink-0">
                <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-3xl sm:text-4xl text-gray-600">👤</span>
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

              {/* Register Button */}
              <div className="flex-shrink-0 w-full md:w-auto">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="block text-center bg-[#f5a623] hover:bg-[#e09515] text-white font-bold py-3 px-8 rounded transition-all duration-300"
                >
                  سجل الآن
                </a>
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
