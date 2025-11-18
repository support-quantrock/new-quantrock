import { Language } from '../contexts/LanguageContext';
import { faqTranslations } from './faq';

export const translations: Record<Language, any> = {
  en: {
    nav: {
      home: 'Home',
      features: 'Features',
      howItWorks: 'How It Works',
      gallery: 'Webinars',
      about: 'About',
      challenge: 'Challenge',
      ambassador: 'Ambassador',
      affiliate: 'Affiliate',
      faq: 'FAQ',
      downloadApp: 'Download App'
    },
    footer: {
      quickLinks: 'Quick Links',
      legal: 'Legal',
      followUs: 'Follow Us',
      copyright: '© 2025 Quantrock. All rights reserved.',
      terms: 'Terms of Use',
      privacy: 'Privacy Policy',
      ambassador: 'Ambassador',
      affiliate: 'Affiliate Program',
      faq: 'FAQ'
    },
    landing: {
      hero: {
        title: 'Invest Smarter with the',
        titleHighlight: 'Power of AI',
        subtitle: 'Harness institutional-grade intelligence and real-time market data to make confident investment decisions. Your future starts now.',
        downloadApp: 'Download the App Now',
        appStore: 'App Store',
        googlePlay: 'Google Play'
      },
      marquee: {
        title: 'Track Top Investors'
      },
      features: {
        title: 'Powerful Features for Smart Investing',
        subtitle: 'Discover the tools that give you an edge in the market',
        aiInsights: 'AI-Powered Insights',
        aiInsightsDesc: 'Leverage cutting-edge artificial intelligence to analyze market trends and make data-driven investment decisions.',
        realTimeData: 'Real-Time Market Data',
        realTimeDataDesc: 'Access live market data and updates to stay ahead of the curve and capitalize on opportunities instantly.',
        smartMoney: 'Smart Money Tracking',
        smartMoneyDesc: 'Monitor your portfolio performance with intelligent tracking tools that provide actionable insights.',
        research: 'Institutional-Grade Research',
        researchDesc: 'Get access to professional-level market research and analysis previously available only to institutions.'
      },
      howItWorks: {
        title: 'Get Started in Three Simple Steps',
        subtitle: 'Your journey to smarter investing begins here',
        step1: 'Download App',
        step1Desc: 'Get Quantrock from the App Store or Google Play in seconds.',
        step2: 'Create Account',
        step2Desc: 'Sign up quickly and securely to access your personalized dashboard.',
        step3: 'Start Investing Smartly',
        step3Desc: 'Begin making informed investment decisions powered by AI insights.'
      },
      testimonials: {
        title: 'What Our Users Say',
        subtitle: 'Join thousands of satisfied investors',
        quote1: 'Quantrock has transformed how I approach investing. The AI insights are incredibly accurate and actionable.',
        author1: 'Sarah Mitchell',
        role1: 'Portfolio Manager',
        quote2: 'The real-time data and institutional-grade research give me confidence in every investment decision I make.',
        author2: 'James Thompson',
        role2: 'Angel Investor',
        quote3: 'Finally, a platform that combines powerful technology with user-friendly design. Quantrock is a game changer.',
        author3: 'Emily Richardson',
        role3: 'Financial Analyst'
      },
      about: {
        title: 'About Quantrock',
        subtitle: 'Empowering investors with cutting-edge technology',
        description: 'Quantrock is revolutionizing the investment landscape by providing retail investors with institutional-grade tools and insights. Our AI-powered platform democratizes access to sophisticated market analysis, helping you make informed decisions with confidence.',
        mission: 'Our Mission',
        missionDesc: 'To empower every investor with the tools and knowledge they need to succeed in the financial markets.',
        vision: 'Our Vision',
        visionDesc: 'A world where sophisticated investment strategies are accessible to everyone, not just institutions.'
      },
      insider: {
        title: 'Insider Tracking',
        subtitle: 'Follow the smart money'
      },
      gallery: {
        title: 'See Quantrock in Action',
        subtitle: 'Explore our platform through free webinars and courses'
      },
      lossStatistics: {
        title: 'Investor Loss',
        titleHighlight: 'Statistics',
        description: 'Understanding the risks in trading helps you make informed decisions',
        cards: [
          {
            text: 'Around 74-89% of retail investors accounts lose money when trading CFDS (CONTRACTS FOR DIFFERENCE), including forex trading',
            source: '[Source : ESMA, 2019]'
          },
          {
            text: '70% of day traders lose money, and only about 11% are consistently profitable',
            source: '[source : NASAA, 2020]'
          },
          {
            text: 'Approximately 90% of new futures traders lose money within their first year of trading',
            source: '[Source : CFTC, 2019]'
          },
          {
            text: '81% of retail investors who trade bitcoin lose money',
            source: '[Source : SSRN, 2018]'
          },
          {
            text: '75% of options traders experience net losses',
            source: '[Source: UC Berkeley, 2004]'
          },
          {
            text: '87% of individual stock traders lose money',
            source: '[Source: NBER, 2000]'
          },
          {
            text: '80% of forex day traders quit within the first two years',
            source: '[Source : FAJ, 2013]'
          },
          {
            text: '88% of retail traders invest in leveraged ETFS lose money due to the compounding effects and volatility decay',
            source: '[Source : morning star, 2018]'
          },
          {
            text: '82% of CFD traders lose money',
            source: '[source : FCA,2019]'
          }
        ]
      },
      appNaming: {
        howWeNamed: 'HOW',
        weNamed: 'WE NAMED',
        theApp: 'THE APP',
        quant: 'QUANT',
        quantDesc: 'Referring to quantitative analysis or quantitative finance',
        rock: 'ROCK',
        rockDesc: 'Referring to Strength and Resilience'
      },
      quotes: {
        graham: {
          title: 'THE FATHER OF VALUE INVESTING',
          quote: 'In the short run, the market is a voting machine but in the long run, it is a weighing machine.',
          author: 'Benjamin Graham'
        },
        lynch: {
          title: 'LEGENDARY MUTUAL FUND MANAGER',
          quote: 'There are many reasons that officers might sell.... But there\'s only one reason that insiders buy: They think the stock price is undervalued and will eventually go up.',
          author: 'Peter Lynch'
        },
        livermore: {
          title: 'LEGENDARY STOCK TRADER',
          quote: 'Plan your trade and trade your plan.',
          author: 'Jesse Livermore'
        },
        soros: {
          title: 'LEGENDARY HEDGE FUND MANAGER',
          quote: 'It\'s not whether you\'re right or wrong, but how much money you make when you\'re right and how much you lose when you\'re wrong.',
          author: 'George Soros'
        },
        buffett: {
          title: 'THE ORACLE OF OMAHA',
          quote: 'Risk comes from not knowing what you are doing.',
          author: 'Warren Buffett'
        }
      },
      cta: {
        title: 'Ready to Transform Your Investment Strategy?',
        subtitle: 'Join thousands of investors who are already making smarter decisions with Quantrock',
        download: 'Download Now',
        learnMore: 'Learn More'
      },
      challenge: {
        title1: 'From Training to Challenge...',
        title2: 'Up to a',
        title3: 'Real Portfolio',
        title4: 'and',
        title5: 'of Profits',
        description: 'A comprehensive program designed to refine investors\' skills and empower them to experience a real investment journey that starts with learning on a simulated portfolio and ends with managing real portfolios.',
        howItWorks: 'How It Works',
        startChallenge: 'Start Challenge',
        realFunding: 'Real Funding',
        profitShare: 'Profit Share',
        highWatermark: 'High Watermark',
        profitProtection: 'Profit Protection'
      },
      stockAnalysis: {
        pastPerformance: 'QX Rating',
        risksRewards: 'Risks & Rewards',
        valuationComparison: 'Valuation & Comparison',
        growthForecast: 'Growth Forecast',
        financialHealth: 'Financial Health',
        dividendQuality: 'Dividend Quality',
        managementProfile: 'Management Profile',
        insiderTransactions: 'Insider Transactions',
        qxRatingTitle: 'QX Rating',
        qxRatingDesc: 'QUANTROCK rating based on the consensus of forecast, tracker, fair value, and QUANTROCK special quant strategy',
        qxSmartMoneyTitle: 'Qx Smart Money',
        qxSmartMoneyDesc: 'Track where smart money moving even in hedge fund, family office, insiders, politicians',
        qxValueTitle: 'QX Value',
        qxValueDesc: 'The QUANTROCK Valuation Models contains a wide range of valuation methods, including the DDM Value and (DCF) Valuations'
      },
      ui: {
        messagePlaceholder: 'Message...',
        importantDecision: 'Important decision',
        previousSlide: 'Previous slide',
        nextSlide: 'Next slide',
        goToSlide: 'Go to slide'
      },
      smartMoneyTracker: {
        title: 'Smart Money Tracker',
        description: 'Track every element of your investment workflow to build a dynamic knowledge base. Transform your trading data into powerful insights — your second brain for smart investing.',
        trackPositions: 'Track Positions.',
        trackPositionsDesc: 'Monitor your portfolio in real-time.',
        activeTrades: 'Active trades',
        assessment: 'Assessment',
        planStrategies: 'Plan Strategies.',
        planStrategiesDesc: 'Visualize your investment strategy.',
        nextReview: 'Next Review',
        techAnalysis: 'Tech Analysis',
        realTimeAlerts: 'Real-time Alerts.',
        realTimeAlertsDesc: 'Instant market notifications.',
        march: 'March',
        monitorPerformance: 'Monitor Performance.',
        monitorPerformanceDesc: 'Track performance metrics.'
      },
      institutionalAnalysis: {
        title: 'Institutional-Grade',
        titleHighlight: 'Financial Analysis',
        description: 'Access comprehensive financial data and forecasting tools powered by S&P Global Market Intelligence',
        institutionalQuality: 'Institutional Quality Data from'
      },
      insiderTrading: {
        title: 'Trade Like an',
        titleHighlight: 'Insider',
        description: 'Track the forces that move the markets',
        trendingNow: 'Trending Now:',
        congressTrading: 'Congress Trading',
        insiderTradingLabel: 'Insider Trading',
        institutionalHoldings: 'Institutional Holdings',
        seeDashboard: 'See Dashboard'
      }
    }
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      features: 'الميزات',
      howItWorks: 'كيف يعمل',
      gallery: 'المعرض',
      about: 'عن',
      challenge: 'التحدي',
      ambassador: 'السفير',
      affiliate: 'الشريك التابع',
      faq: 'الأسئلة الشائعة',
      downloadApp: 'تحميل التطبيق'
    },
    footer: {
      quickLinks: 'روابط سريعة',
      legal: 'قانوني',
      followUs: 'تابعنا',
      copyright: '© 2025 كوانتروك. جميع الحقوق محفوظة.',
      terms: 'شروط الاستخدام',
      privacy: 'سياسة الخصوصية',
      ambassador: 'السفير',
      affiliate: 'برنامج الشراكة',
      faq: 'الأسئلة الشائعة'
    },
    landing: {
      hero: {
        title: 'استثمر بذكاء أكبر مع',
        titleHighlight: 'قوة الذكاء الاصطناعي',
        subtitle: 'استخدم الذكاء على مستوى المؤسسات وبيانات السوق في الوقت الفعلي لاتخاذ قرارات استثمارية واثقة. مستقبلك يبدأ الآن.',
        downloadApp: 'تحميل التطبيق الآن',
        appStore: 'متجر التطبيقات',
        googlePlay: 'جوجل بلاي'
      },
      marquee: {
        title: 'تتبع كبار المستثمرين'
      },
      features: {
        title: 'ميزات قوية للاستثمار الذكي',
        subtitle: 'اكتشف الأدوات التي تمنحك ميزة في السوق',
        aiInsights: 'رؤى مدعومة بالذكاء الاصطناعي',
        aiInsightsDesc: 'استفد من الذكاء الاصطناعي المتطور لتحليل اتجاهات السوق واتخاذ قرارات استثمارية تعتمد على البيانات.',
        realTimeData: 'بيانات السوق في الوقت الفعلي',
        realTimeDataDesc: 'الوصول إلى بيانات وتحديثات السوق الحية للبقاء في المقدمة والاستفادة من الفرص على الفور.',
        smartMoney: 'تتبع الأموال الذكية',
        smartMoneyDesc: 'راقب أداء محفظتك باستخدام أدوات تتبع ذكية توفر رؤى قابلة للتنفيذ.',
        research: 'أبحاث على مستوى المؤسسات',
        researchDesc: 'احصل على إمكانية الوصول إلى أبحاث وتحليلات السوق على المستوى المهني المتاحة سابقًا للمؤسسات فقط.'
      },
      howItWorks: {
        title: 'ابدأ في ثلاث خطوات بسيطة',
        subtitle: 'رحلتك إلى الاستثمار الذكي تبدأ هنا',
        step1: 'تحميل التطبيق',
        step1Desc: 'احصل على Quantrock من App Store أو Google Play في ثوانٍ.',
        step2: 'إنشاء حساب',
        step2Desc: 'سجل بسرعة وأمان للوصول إلى لوحة القيادة الشخصية الخاصة بك.',
        step3: 'ابدأ الاستثمار بذكاء',
        step3Desc: 'ابدأ في اتخاذ قرارات استثمارية مستنيرة مدعومة برؤى الذكاء الاصطناعي.'
      },
      testimonials: {
        title: 'ما يقوله مستخدمونا',
        subtitle: 'انضم إلى آلاف المستثمرين الراضين',
        quote1: 'لقد غيّر Quantrock طريقة تعاملي مع الاستثمار. رؤى الذكاء الاصطناعي دقيقة وقابلة للتنفيذ بشكل لا يصدق.',
        author1: 'سارة ميتشل',
        role1: 'مديرة المحفظة',
        quote2: 'البيانات في الوقت الفعلي والأبحاث على مستوى المؤسسات تمنحني الثقة في كل قرار استثماري أتخذه.',
        author2: 'جيمس طومسون',
        role2: 'مستثمر ملاك',
        quote3: 'أخيرًا، منصة تجمع بين التكنولوجيا القوية والتصميم سهل الاستخدام. Quantrock يغير قواعد اللعبة.',
        author3: 'إميلي ريتشاردسون',
        role3: 'محللة مالية'
      },
      about: {
        title: 'حول Quantrock',
        subtitle: 'تمكين المستثمرين بالتكنولوجيا المتطورة',
        description: 'يُحدث Quantrock ثورة في مشهد الاستثمار من خلال تزويد مستثمري التجزئة بأدوات ورؤى على مستوى المؤسسات. تُضفي منصتنا المدعومة بالذكاء الاصطناعي طابعًا ديمقراطيًا على الوصول إلى تحليل السوق المتطور.',
        mission: 'مهمتنا',
        missionDesc: 'تمكين كل مستثمر بالأدوات والمعرفة التي يحتاجها للنجاح في الأسواق المالية.',
        vision: 'رؤيتنا',
        visionDesc: 'عالم تكون فيه استراتيجيات الاستثمار المتطورة في متناول الجميع.'
      },
      insider: {
        title: 'تتبع المطلعين',
        subtitle: 'تابع الأموال الذكية'
      },
      gallery: {
        title: 'شاهد Quantrock في العمل',
        subtitle: 'استكشف منصتنا من خلال لقطات الشاشة ومقاطع الفيديو'
      },
      lossStatistics: {
        title: 'خسائر المستثمرين',
        titleHighlight: 'إحصائيات',
        description: 'فهم المخاطر في التداول يساعدك على اتخاذ قرارات مستنيرة',
        cards: [
          {
            text: 'حوالي 74-89٪ من حسابات المستثمرين الأفراد تخسر المال عند تداول عقود الفروقات، بما في ذلك تداول العملات الأجنبية',
            source: '[المصدر: ESMA، 2019]'
          },
          {
            text: '70٪ من متداولي اليوم يخسرون المال، وحوالي 11٪ فقط مربحون باستمرار',
            source: '[المصدر: NASAA، 2020]'
          },
          {
            text: 'حوالي 90٪ من متداولي العقود الآجلة الجدد يخسرون المال خلال السنة الأولى من التداول',
            source: '[المصدر: CFTC، 2019]'
          },
          {
            text: '81٪ من المستثمرين الأفراد الذين يتداولون البيتكوين يخسرون المال',
            source: '[المصدر: SSRN، 2018]'
          },
          {
            text: '75٪ من متداولي الخيارات يعانون من خسائر صافية',
            source: '[المصدر: جامعة كاليفورنيا بيركلي، 2004]'
          },
          {
            text: '87٪ من متداولي الأسهم الأفراد يخسرون المال',
            source: '[المصدر: NBER، 2000]'
          },
          {
            text: '80٪ من متداولي الفوركس اليوميين يتوقفون خلال أول عامين',
            source: '[المصدر: FAJ، 2013]'
          },
          {
            text: '88٪ من متداولي التجزئة الذين يستثمرون في صناديق المؤشرات المتداولة بالرافعة المالية يخسرون المال بسبب تأثيرات التراكم وتآكل التقلبات',
            source: '[المصدر: Morningstar، 2018]'
          },
          {
            text: '82٪ من متداولي عقود الفروقات يخسرون المال',
            source: '[المصدر: FCA، 2019]'
          }
        ]
      },
      appNaming: {
        howWeNamed: 'كيف',
        weNamed: 'سميناه',
        theApp: 'التطبيق',
        quant: 'كوانت',
        quantDesc: 'يشير إلى التحليل الكمي أو التمويل الكمي',
        rock: 'روك',
        rockDesc: 'يشير إلى القوة والمرونة'
      },
      quotes: {
        graham: {
          title: 'أب الاستثمار القيمي',
          quote: 'على المدى القصير، السوق آلة تصويت ولكن على المدى الطويل، هي آلة وزن.',
          author: 'بنجامين جراهام'
        },
        lynch: {
          title: 'مدير صندوق استثمار أسطوري',
          quote: 'هناك أسباب عديدة قد تدفع المسؤولين للبيع.... لكن هناك سبب واحد فقط يدفع المطلعين للشراء: يعتقدون أن سعر السهم مقوم بأقل من قيمته وسيرتفع في النهاية.',
          author: 'بيتر لينش'
        },
        livermore: {
          title: 'متداول أسهم أسطوري',
          quote: 'خطط لتداولك وتداول وفقاً لخطتك.',
          author: 'جيسي ليفرمور'
        },
        soros: {
          title: 'مدير صندوق تحوط أسطوري',
          quote: 'ليست المسألة ما إذا كنت على حق أم خطأ، بل كم من المال تحقق عندما تكون على حق وكم تخسر عندما تكون مخطئاً.',
          author: 'جورج سوروس'
        },
        buffett: {
          title: 'عراف أوماها',
          quote: 'الخطر يأتي من عدم معرفة ما تفعله.',
          author: 'وارن بافيت'
        }
      },
      cta: {
        title: 'هل أنت مستعد لتحويل استراتيجية الاستثمار الخاصة بك؟',
        subtitle: 'انضم إلى آلاف المستثمرين الذين يتخذون بالفعل قرارات أكثر ذكاءً',
        download: 'تحميل الآن',
        learnMore: 'اعرف المزيد'
      },
      challenge: {
        title1: 'من التدريب إلى التحدي...',
        title2: 'حتى',
        title3: 'محفظة حقيقية',
        title4: 'و',
        title5: 'من الأرباح',
        description: 'برنامج شامل مصمم لصقل مهارات المستثمرين وتمكينهم من تجربة رحلة استثمارية حقيقية تبدأ بالتعلم على محفظة محاكاة وتنتهي بإدارة محافظ حقيقية.',
        howItWorks: 'كيف يعمل',
        startChallenge: 'ابدأ التحدي',
        realFunding: 'تمويل حقيقي',
        profitShare: 'حصة الربح',
        highWatermark: 'علامة مائية عالية',
        profitProtection: 'حماية الأرباح'
      },
      stockAnalysis: {
        pastPerformance: 'تصنيف QX',
        risksRewards: 'المخاطر والمكافآت',
        valuationComparison: 'التقييم والمقارنة',
        growthForecast: 'توقعات النمو',
        financialHealth: 'الصحة المالية',
        dividendQuality: 'جودة الأرباح',
        managementProfile: 'ملف الإدارة',
        insiderTransactions: 'معاملات المطلعين',
        qxRatingTitle: 'تصنيف QX',
        qxRatingDesc: 'تصنيف QUANTROCK بناءً على إجماع التنبؤات والمتتبع والقيمة العادلة واستراتيجية QUANTROCK الكمية الخاصة',
        qxSmartMoneyTitle: 'QX الأموال الذكية',
        qxSmartMoneyDesc: 'تتبع حركة الأموال الذكية في صناديق التحوط والمكاتب العائلية والمطلعين والسياسيين',
        qxValueTitle: 'قيمة QX',
        qxValueDesc: 'تحتوي نماذج تقييم QUANTROCK على مجموعة واسعة من طرق التقييم، بما في ذلك قيمة DDM وتقييمات DCF'
      },
      ui: {
        messagePlaceholder: 'رسالة...',
        importantDecision: 'قرار مهم',
        previousSlide: 'الشريحة السابقة',
        nextSlide: 'الشريحة التالية',
        goToSlide: 'انتقل إلى الشريحة'
      },
      smartMoneyTracker: {
        title: 'متتبع الأموال الذكية',
        description: 'تتبع كل عنصر من عناصر سير عمل الاستثمار الخاص بك لبناء قاعدة معرفية ديناميكية. حول بيانات التداول الخاصة بك إلى رؤى قوية — عقلك الثاني للاستثمار الذكي.',
        trackPositions: 'تتبع المراكز.',
        trackPositionsDesc: 'راقب محفظتك في الوقت الفعلي.',
        activeTrades: 'صفقات نشطة',
        assessment: 'تقييم',
        planStrategies: 'خطط الاستراتيجيات.',
        planStrategiesDesc: 'تصور استراتيجية الاستثمار الخاصة بك.',
        nextReview: 'المراجعة التالية',
        techAnalysis: 'التحليل التقني',
        realTimeAlerts: 'تنبيهات فورية.',
        realTimeAlertsDesc: 'إشعارات السوق الفورية.',
        march: 'مارس',
        monitorPerformance: 'مراقبة الأداء.',
        monitorPerformanceDesc: 'تتبع مقاييس الأداء.'
      },
      institutionalAnalysis: {
        title: 'على مستوى مؤسسي',
        titleHighlight: 'التحليل المالي',
        description: 'الوصول إلى بيانات مالية شاملة وأدوات التنبؤ المدعومة بذكاء سوق S&P العالمي',
        institutionalQuality: 'بيانات بجودة مؤسسية من'
      },
      insiderTrading: {
        title: 'تداول مثل',
        titleHighlight: 'المطلع',
        description: 'تتبع القوى التي تحرك الأسواق',
        trendingNow: 'الرائج الآن:',
        congressTrading: 'تداول الكونجرس',
        insiderTradingLabel: 'تداول المطلعين',
        institutionalHoldings: 'الممتلكات المؤسسية',
        seeDashboard: 'عرض لوحة المعلومات'
      }
    }
  },
  zh: {
    nav: {
      home: '首页',
      features: '功能',
      howItWorks: '工作原理',
      gallery: '画廊',
      about: '关于',
      challenge: '挑战',
      ambassador: '大使',
      affiliate: '联盟伙伴',
      faq: '常见问题',
      downloadApp: '下载应用'
    },
    footer: {
      quickLinks: '快速链接',
      legal: '法律',
      followUs: '关注我们',
      copyright: '© 2025 Quantrock。保留所有权利。',
      terms: '使用条款',
      privacy: '隐私政策',
      ambassador: '大使',
      affiliate: '联盟计划',
      faq: '常见问题'
    },
    landing: {
      hero: {
        title: '借助',
        titleHighlight: 'AI的力量更智能地投资',
        subtitle: '利用机构级智能和实时市场数据做出自信的投资决策。您的未来从现在开始。',
        downloadApp: '立即下载应用',
        appStore: 'App Store',
        googlePlay: 'Google Play'
      },
      marquee: {
        title: '追踪顶级投资者'
      },
      features: {
        title: '智能投资的强大功能',
        subtitle: '发现为您提供市场优势的工具',
        aiInsights: 'AI驱动的洞察',
        aiInsightsDesc: '利用尖端人工智能分析市场趋势并做出数据驱动的投资决策。',
        realTimeData: '实时市场数据',
        realTimeDataDesc: '访问实时市场数据和更新，保持领先并立即抓住机会。',
        smartMoney: '智能资金追踪',
        smartMoneyDesc: '使用智能跟踪工具监控您的投资组合绩效。',
        research: '机构级研究',
        researchDesc: '获得以前仅对机构开放的专业级市场研究和分析。'
      },
      howItWorks: {
        title: '通过三个简单步骤开始',
        subtitle: '您的智能投资之旅从这里开始',
        step1: '下载应用',
        step1Desc: '在几秒钟内从App Store或Google Play获取Quantrock。',
        step2: '创建账户',
        step2Desc: '快速安全地注册以访问您的个性化仪表板。',
        step3: '开始智能投资',
        step3Desc: '开始做出由AI洞察支持的明智投资决策。'
      },
      testimonials: {
        title: '用户评价',
        subtitle: '加入数千名满意的投资者',
        quote1: 'Quantrock改变了我投资的方式。',
        author1: 'Sarah Mitchell',
        role1: '投资组合经理',
        quote2: '实时数据和机构级研究让我充满信心。',
        author2: 'James Thompson',
        role2: '天使投资人',
        quote3: '强大技术与用户友好设计的完美结合。',
        author3: 'Emily Richardson',
        role3: '金融分析师'
      },
      about: {
        title: '关于Quantrock',
        subtitle: '用尖端技术赋能投资者',
        description: 'Quantrock通过为散户投资者提供机构级工具和洞察，正在革新投资格局。',
        mission: '我们的使命',
        missionDesc: '为每位投资者提供他们在金融市场上成功所需的工具和知识。',
        vision: '我们的愿景',
        visionDesc: '一个复杂的投资策略对每个人都可及的世界。'
      },
      insider: {
        title: '内部人士追踪',
        subtitle: '跟随聪明的资金'
      },
      gallery: {
        title: '看Quantrock的实际应用',
        subtitle: '通过截图和视频探索我们的平台'
      },
      cta: {
        title: '准备好改变您的投资策略了吗？',
        subtitle: '加入已经使用Quantrock做出更明智决策的数千名投资者',
        download: '立即下载',
        learnMore: '了解更多'
      },
      challenge: {
        title1: '从培训到挑战...',
        title2: '最高',
        title3: '真实投资组合',
        title4: '和',
        title5: '的利润',
        description: '一个全面的计划，旨在提高投资者的技能，使他们能够体验真实的投资之旅，从模拟投资组合学习开始，到管理真实投资组合结束。',
        howItWorks: '工作原理',
        startChallenge: '开始挑战',
        realFunding: '真实资金',
        profitShare: '利润分成',
        highWatermark: '高水位线',
        profitProtection: '利润保护'
      },
      stockAnalysis: {
        pastPerformance: 'QX评级',
        risksRewards: '风险与回报',
        valuationComparison: '估值与比较',
        growthForecast: '增长预测',
        financialHealth: '财务健康',
        dividendQuality: '股息质量',
        managementProfile: '管理层简介',
        insiderTransactions: '内部交易',
        qxRatingTitle: 'QX评级',
        qxRatingDesc: 'QUANTROCK评级基于预测、追踪器、公允价值和QUANTROCK特殊量化策略的共识',
        qxSmartMoneyTitle: 'QX智能资金',
        qxSmartMoneyDesc: '追踪智能资金在对冲基金、家族办公室、内部人士、政治家中的流向',
        qxValueTitle: 'QX价值',
        qxValueDesc: 'QUANTROCK估值模型包含广泛的估值方法，包括DDM价值和DCF估值'
      },
      ui: {
        messagePlaceholder: '消息...',
        importantDecision: '重要决定',
        previousSlide: '上一张幻灯片',
        nextSlide: '下一张幻灯片',
        goToSlide: '转到幻灯片'
      },
      smartMoneyTracker: {
        title: '智能资金追踪器',
        description: '跟踪您投资工作流程的每个元素，构建动态知识库。将您的交易数据转化为强大的洞察力——您的智能投资第二大脑。',
        trackPositions: '跟踪仓位。',
        trackPositionsDesc: '实时监控您的投资组合。',
        activeTrades: '活跃交易',
        assessment: '评估',
        planStrategies: '规划策略。',
        planStrategiesDesc: '可视化您的投资策略。',
        nextReview: '下次审查',
        techAnalysis: '技术分析',
        realTimeAlerts: '实时警报。',
        realTimeAlertsDesc: '即时市场通知。',
        march: '三月',
        monitorPerformance: '监控表现。',
        monitorPerformanceDesc: '跟踪绩效指标。'
      },
      institutionalAnalysis: {
        title: '机构级',
        titleHighlight: '财务分析',
        description: '访问由标普全球市场情报提供支持的全面财务数据和预测工具',
        institutionalQuality: '来自的机构级数据'
      },
      insiderTrading: {
        title: '像',
        titleHighlight: '内部人士一样交易',
        description: '追踪推动市场的力量',
        trendingNow: '热门趋势：',
        congressTrading: '国会交易',
        insiderTradingLabel: '内部人士交易',
        institutionalHoldings: '机构持股',
        seeDashboard: '查看仪表板'
      }
    }
  },
  fr: {
    nav: {
      home: 'Accueil',
      features: 'Fonctionnalités',
      howItWorks: 'Comment Ça Marche',
      gallery: 'Galerie',
      about: 'À Propos',
      challenge: 'Défi',
      ambassador: 'Ambassadeur',
      affiliate: 'Affilié',
      faq: 'FAQ',
      downloadApp: 'Télécharger l\'App'
    },
    footer: {
      quickLinks: 'Liens Rapides',
      legal: 'Légal',
      followUs: 'Suivez-nous',
      copyright: '© 2025 Quantrock. Tous droits réservés.',
      terms: 'Conditions d\'utilisation',
      privacy: 'Politique de confidentialité',
      ambassador: 'Ambassadeur',
      affiliate: 'Programme d\'affiliation',
      faq: 'FAQ'
    },
    landing: {
      hero: {
        title: 'Investissez Plus Intelligemment avec la',
        titleHighlight: 'Puissance de l\'IA',
        subtitle: 'Exploitez l\'intelligence de niveau institutionnel et les données en temps réel.',
        downloadApp: 'Télécharger Maintenant',
        appStore: 'App Store',
        googlePlay: 'Google Play'
      },
      marquee: {
        title: 'Suivez les Meilleurs Investisseurs'
      },
      features: {
        title: 'Fonctionnalités Puissantes',
        subtitle: 'Les outils qui vous donnent un avantage',
        aiInsights: 'Insights IA',
        aiInsightsDesc: 'Tirez parti de l\'IA pour analyser les tendances.',
        realTimeData: 'Données Temps Réel',
        realTimeDataDesc: 'Accédez aux données de marché en direct.',
        smartMoney: 'Suivi Intelligent',
        smartMoneyDesc: 'Surveillez les performances de votre portefeuille.',
        research: 'Recherche Institutionnelle',
        researchDesc: 'Accédez à des recherches de niveau professionnel.'
      },
      howItWorks: {
        title: 'Commencez en Trois Étapes',
        subtitle: 'Votre voyage commence ici',
        step1: 'Télécharger',
        step1Desc: 'Obtenez Quantrock depuis les stores.',
        step2: 'Créer un Compte',
        step2Desc: 'Inscrivez-vous rapidement.',
        step3: 'Investir',
        step3Desc: 'Commencez à investir intelligemment.'
      },
      testimonials: {
        title: 'Témoignages',
        subtitle: 'Ce que disent nos utilisateurs',
        quote1: 'Quantrock a transformé ma façon d\'investir.',
        author1: 'Sarah Mitchell',
        role1: 'Gestionnaire',
        quote2: 'Les données en temps réel me donnent confiance.',
        author2: 'James Thompson',
        role2: 'Investisseur',
        quote3: 'Une plateforme révolutionnaire.',
        author3: 'Emily Richardson',
        role3: 'Analyste'
      },
      about: {
        title: 'À Propos',
        subtitle: 'Technologie de pointe',
        description: 'Quantrock révolutionne l\'investissement.',
        mission: 'Mission',
        missionDesc: 'Autonomiser chaque investisseur.',
        vision: 'Vision',
        visionDesc: 'Rendre l\'investissement accessible à tous.'
      },
      insider: {
        title: 'Suivi des Initiés',
        subtitle: 'Suivez l\'argent intelligent'
      },
      gallery: {
        title: 'Galerie',
        subtitle: 'Explorez notre plateforme'
      },
      cta: {
        title: 'Prêt à Transformer?',
        subtitle: 'Rejoignez-nous aujourd\'hui',
        download: 'Télécharger',
        learnMore: 'En Savoir Plus'
      },
      challenge: {
        title1: 'De la Formation au Défi...',
        title2: 'Jusqu\'à',
        title3: 'Portefeuille Réel',
        title4: 'et',
        title5: 'des Profits',
        description: 'Un programme complet conçu pour affiner les compétences des investisseurs et leur permettre de vivre un véritable parcours d\'investissement qui commence par l\'apprentissage sur un portefeuille simulé et se termine par la gestion de portefeuilles réels.',
        howItWorks: 'Comment Ça Marche',
        startChallenge: 'Commencer le Défi',
        realFunding: 'Financement Réel',
        profitShare: 'Partage des Profits',
        highWatermark: 'Niveau Haut',
        profitProtection: 'Protection des Profits'
      },
      stockAnalysis: {
        pastPerformance: 'Note QX',
        risksRewards: 'Risques et Récompenses',
        valuationComparison: 'Évaluation et Comparaison',
        growthForecast: 'Prévision de Croissance',
        financialHealth: 'Santé Financière',
        dividendQuality: 'Qualité des Dividendes',
        managementProfile: 'Profil de Gestion',
        insiderTransactions: 'Transactions d\'Initiés',
        qxRatingTitle: 'Note QX',
        qxRatingDesc: 'Note QUANTROCK basée sur le consensus des prévisions, du tracker, de la juste valeur et de la stratégie quantitative spéciale QUANTROCK',
        qxSmartMoneyTitle: 'QX Argent Intelligent',
        qxSmartMoneyDesc: 'Suivez les mouvements de l\'argent intelligent dans les hedge funds, family offices, initiés et politiciens',
        qxValueTitle: 'Valeur QX',
        qxValueDesc: 'Les modèles de valorisation QUANTROCK contiennent une large gamme de méthodes d\'évaluation, y compris la valeur DDM et les évaluations DCF'
      },
      ui: {
        messagePlaceholder: 'Message...',
        importantDecision: 'Décision importante',
        previousSlide: 'Diapositive précédente',
        nextSlide: 'Diapositive suivante',
        goToSlide: 'Aller à la diapositive'
      },
      smartMoneyTracker: {
        title: 'Traceur d\'Argent Intelligent',
        description: 'Suivez chaque élément de votre flux de travail d\'investissement pour créer une base de connaissances dynamique. Transformez vos données de trading en insights puissants — votre second cerveau pour investir intelligemment.',
        trackPositions: 'Suivre les Positions.',
        trackPositionsDesc: 'Surveillez votre portefeuille en temps réel.',
        activeTrades: 'Transactions actives',
        assessment: 'Évaluation',
        planStrategies: 'Planifier les Stratégies.',
        planStrategiesDesc: 'Visualisez votre stratégie d\'investissement.',
        nextReview: 'Prochaine Révision',
        techAnalysis: 'Analyse Technique',
        realTimeAlerts: 'Alertes en Temps Réel.',
        realTimeAlertsDesc: 'Notifications de marché instantanées.',
        march: 'Mars',
        monitorPerformance: 'Surveiller la Performance.',
        monitorPerformanceDesc: 'Suivre les métriques de performance.'
      },
      institutionalAnalysis: {
        title: 'De Qualité Institutionnelle',
        titleHighlight: 'Analyse Financière',
        description: 'Accédez à des données financières complètes et des outils de prévision alimentés par S&P Global Market Intelligence',
        institutionalQuality: 'Données de qualité institutionnelle de'
      },
      insiderTrading: {
        title: 'Trader comme un',
        titleHighlight: 'Initié',
        description: 'Suivez les forces qui font bouger les marchés',
        trendingNow: 'Tendances Actuelles:',
        congressTrading: 'Transactions du Congrès',
        insiderTradingLabel: 'Transactions d\'Initiés',
        institutionalHoldings: 'Détentions Institutionnelles',
        seeDashboard: 'Voir le Tableau de Bord'
      }
    }
  },
  es: {
    nav: {
      home: 'Inicio',
      features: 'Funciones',
      howItWorks: 'Cómo Funciona',
      gallery: 'Galería',
      about: 'Sobre',
      challenge: 'Desafío',
      ambassador: 'Embajador',
      affiliate: 'Afiliado',
      faq: 'Preguntas frecuentes',
      downloadApp: 'Descargar App'
    },
    footer: {
      quickLinks: 'Enlaces Rápidos',
      legal: 'Legal',
      followUs: 'Síguenos',
      copyright: '© 2025 Quantrock. Todos los derechos reservados.',
      terms: 'Términos de uso',
      privacy: 'Política de privacidad',
      ambassador: 'Embajador',
      affiliate: 'Programa de afiliados',
      faq: 'Preguntas frecuentes'
    },
    landing: {
      hero: {
        title: 'Invierte Más Inteligentemente con el',
        titleHighlight: 'Poder de la IA',
        subtitle: 'Aprovecha la inteligencia institucional y datos en tiempo real.',
        downloadApp: 'Descargar Ahora',
        appStore: 'App Store',
        googlePlay: 'Google Play'
      },
      marquee: {
        title: 'Sigue a los Mejores'
      },
      features: {
        title: 'Funciones Potentes',
        subtitle: 'Herramientas que te dan ventaja',
        aiInsights: 'Insights de IA',
        aiInsightsDesc: 'Aprovecha la IA para analizar tendencias.',
        realTimeData: 'Datos en Tiempo Real',
        realTimeDataDesc: 'Accede a datos de mercado en vivo.',
        smartMoney: 'Seguimiento Inteligente',
        smartMoneyDesc: 'Monitorea tu rendimiento.',
        research: 'Investigación Institucional',
        researchDesc: 'Accede a investigación profesional.'
      },
      howItWorks: {
        title: 'Comienza en Tres Pasos',
        subtitle: 'Tu viaje comienza aquí',
        step1: 'Descargar',
        step1Desc: 'Obtén Quantrock desde las tiendas.',
        step2: 'Crear Cuenta',
        step2Desc: 'Regístrate rápidamente.',
        step3: 'Invertir',
        step3Desc: 'Comienza a invertir inteligentemente.'
      },
      testimonials: {
        title: 'Testimonios',
        subtitle: 'Lo que dicen nuestros usuarios',
        quote1: 'Quantrock transformó mi forma de invertir.',
        author1: 'Sarah Mitchell',
        role1: 'Gerente',
        quote2: 'Los datos en tiempo real me dan confianza.',
        author2: 'James Thompson',
        role2: 'Inversor',
        quote3: 'Una plataforma revolucionaria.',
        author3: 'Emily Richardson',
        role3: 'Analista'
      },
      about: {
        title: 'Sobre Quantrock',
        subtitle: 'Tecnología de vanguardia',
        description: 'Quantrock revoluciona la inversión.',
        mission: 'Misión',
        missionDesc: 'Empoderar a cada inversor.',
        vision: 'Visión',
        visionDesc: 'Hacer la inversión accesible para todos.'
      },
      insider: {
        title: 'Seguimiento de Iniciados',
        subtitle: 'Sigue al dinero inteligente'
      },
      gallery: {
        title: 'Galería',
        subtitle: 'Explora nuestra plataforma'
      },
      cta: {
        title: '¿Listo para Transformar?',
        subtitle: 'Únete hoy',
        download: 'Descargar',
        learnMore: 'Más Información'
      },
      challenge: {
        title1: 'Del Entrenamiento al Desafío...',
        title2: 'Hasta',
        title3: 'Cartera Real',
        title4: 'y',
        title5: 'de Ganancias',
        description: 'Un programa integral diseñado para perfeccionar las habilidades de los inversores y empoderarlos para experimentar un viaje de inversión real que comienza con el aprendizaje en una cartera simulada y termina con la gestión de carteras reales.',
        howItWorks: 'Cómo Funciona',
        startChallenge: 'Comenzar Desafío',
        realFunding: 'Financiación Real',
        profitShare: 'Reparto de Beneficios',
        highWatermark: 'Marca Alta',
        profitProtection: 'Protección de Ganancias'
      },
      stockAnalysis: {
        pastPerformance: 'Calificación QX',
        risksRewards: 'Riesgos y Recompensas',
        valuationComparison: 'Valoración y Comparación',
        growthForecast: 'Pronóstico de Crecimiento',
        financialHealth: 'Salud Financiera',
        dividendQuality: 'Calidad de Dividendos',
        managementProfile: 'Perfil de Gestión',
        insiderTransactions: 'Transacciones Internas',
        qxRatingTitle: 'Calificación QX',
        qxRatingDesc: 'Calificación QUANTROCK basada en el consenso de pronóstico, rastreador, valor justo y estrategia cuantitativa especial QUANTROCK',
        qxSmartMoneyTitle: 'QX Dinero Inteligente',
        qxSmartMoneyDesc: 'Rastrea dónde se mueve el dinero inteligente en fondos de cobertura, oficinas familiares, insiders y políticos',
        qxValueTitle: 'Valor QX',
        qxValueDesc: 'Los modelos de valoración QUANTROCK contienen una amplia gama de métodos de valoración, incluido el valor DDM y las valoraciones DCF'
      },
      ui: {
        messagePlaceholder: 'Mensaje...',
        importantDecision: 'Decisión importante',
        previousSlide: 'Diapositiva anterior',
        nextSlide: 'Diapositiva siguiente',
        goToSlide: 'Ir a la diapositiva'
      },
      smartMoneyTracker: {
        title: 'Rastreador de Dinero Inteligente',
        description: 'Rastrea cada elemento de tu flujo de trabajo de inversión para construir una base de conocimiento dinámica. Transforma tus datos de trading en insights poderosos — tu segundo cerebro para invertir inteligentemente.',
        trackPositions: 'Rastrear Posiciones.',
        trackPositionsDesc: 'Monitorea tu cartera en tiempo real.',
        activeTrades: 'Operaciones activas',
        assessment: 'Evaluación',
        planStrategies: 'Planear Estrategias.',
        planStrategiesDesc: 'Visualiza tu estrategia de inversión.',
        nextReview: 'Próxima Revisión',
        techAnalysis: 'Análisis Técnico',
        realTimeAlerts: 'Alertas en Tiempo Real.',
        realTimeAlertsDesc: 'Notificaciones de mercado instantáneas.',
        march: 'Marzo',
        monitorPerformance: 'Monitorear Rendimiento.',
        monitorPerformanceDesc: 'Rastrear métricas de rendimiento.'
      },
      institutionalAnalysis: {
        title: 'De Grado Institucional',
        titleHighlight: 'Análisis Financiero',
        description: 'Accede a datos financieros completos y herramientas de pronóstico impulsadas por S&P Global Market Intelligence',
        institutionalQuality: 'Datos de calidad institucional de'
      },
      insiderTrading: {
        title: 'Opera como un',
        titleHighlight: 'Insider',
        description: 'Rastrea las fuerzas que mueven los mercados',
        trendingNow: 'Tendencia Ahora:',
        congressTrading: 'Operaciones del Congreso',
        insiderTradingLabel: 'Operaciones de Insiders',
        institutionalHoldings: 'Participaciones Institucionales',
        seeDashboard: 'Ver Panel'
      }
    }
  },
  ru: {
    nav: {
      home: 'Главная',
      features: 'Функции',
      howItWorks: 'Как Это Работает',
      gallery: 'Галерея',
      about: 'О нас',
      challenge: 'Вызов',
      ambassador: 'Посол',
      affiliate: 'Партнер',
      faq: 'Вопросы',
      downloadApp: 'Скачать Приложение'
    },
    footer: {
      quickLinks: 'Быстрые ссылки',
      legal: 'Юридическая информация',
      followUs: 'Подписывайтесь',
      copyright: '© 2025 Quantrock. Все права защищены.',
      terms: 'Условия использования',
      privacy: 'Политика конфиденциальности',
      ambassador: 'Посол',
      affiliate: 'Партнерская программа',
      faq: 'Вопросы'
    },
    landing: {
      hero: {
        title: 'Инвестируйте Умнее с',
        titleHighlight: 'Силой ИИ',
        subtitle: 'Используйте интеллект институционального уровня.',
        downloadApp: 'Скачать',
        appStore: 'App Store',
        googlePlay: 'Google Play'
      },
      marquee: {
        title: 'Отслеживайте Лучших'
      },
      features: {
        title: 'Мощные Функции',
        subtitle: 'Инструменты для преимущества',
        aiInsights: 'Инсайты ИИ',
        aiInsightsDesc: 'Используйте ИИ для анализа.',
        realTimeData: 'Данные Реального Времени',
        realTimeDataDesc: 'Доступ к живым данным.',
        smartMoney: 'Умное Отслеживание',
        smartMoneyDesc: 'Отслеживайте портфель.',
        research: 'Институциональные Исследования',
        researchDesc: 'Доступ к профессиональным исследованиям.'
      },
      howItWorks: {
        title: 'Начните в Три Шага',
        subtitle: 'Ваше путешествие начинается',
        step1: 'Скачать',
        step1Desc: 'Получите Quantrock.',
        step2: 'Создать Аккаунт',
        step2Desc: 'Зарегистрируйтесь быстро.',
        step3: 'Инвестировать',
        step3Desc: 'Начните умно инвестировать.'
      },
      testimonials: {
        title: 'Отзывы',
        subtitle: 'Что говорят пользователи',
        quote1: 'Quantrock изменил мой подход.',
        author1: 'Sarah Mitchell',
        role1: 'Менеджер',
        quote2: 'Данные дают уверенность.',
        author2: 'James Thompson',
        role2: 'Инвестор',
        quote3: 'Революционная платформа.',
        author3: 'Emily Richardson',
        role3: 'Аналитик'
      },
      about: {
        title: 'О Quantrock',
        subtitle: 'Передовые технологии',
        description: 'Quantrock революционизирует инвестирование.',
        mission: 'Миссия',
        missionDesc: 'Расширить возможности инвесторов.',
        vision: 'Видение',
        visionDesc: 'Сделать инвестирование доступным.'
      },
      insider: {
        title: 'Отслеживание Инсайдеров',
        subtitle: 'Следуйте за умными деньгами'
      },
      gallery: {
        title: 'Галерея',
        subtitle: 'Изучите платформу'
      },
      cta: {
        title: 'Готовы Трансформировать?',
        subtitle: 'Присоединяйтесь сегодня',
        download: 'Скачать',
        learnMore: 'Узнать Больше'
      },
      challenge: {
        title1: 'От Обучения к Вызову...',
        title2: 'До',
        title3: 'Реальный Портфель',
        title4: 'и',
        title5: 'Прибыли',
        description: 'Комплексная программа, разработанная для совершенствования навыков инвесторов и предоставления им возможности испытать реальный инвестиционный путь, который начинается с обучения на симулированном портфеле и заканчивается управлением реальными портфелями.',
        howItWorks: 'Как Это Работает',
        startChallenge: 'Начать Вызов',
        realFunding: 'Реальное Финансирование',
        profitShare: 'Доля Прибыли',
        highWatermark: 'Высокая Отметка',
        profitProtection: 'Защита Прибыли'
      },
      stockAnalysis: {
        pastPerformance: 'Рейтинг QX',
        risksRewards: 'Риски и Вознаграждения',
        valuationComparison: 'Оценка и Сравнение',
        growthForecast: 'Прогноз Роста',
        financialHealth: 'Финансовое Здоровье',
        dividendQuality: 'Качество Дивидендов',
        managementProfile: 'Профиль Управления',
        insiderTransactions: 'Внутренние Сделки',
        qxRatingTitle: 'Рейтинг QX',
        qxRatingDesc: 'Рейтинг QUANTROCK на основе консенсуса прогнозов, трекера, справедливой стоимости и специальной количественной стратегии QUANTROCK',
        qxSmartMoneyTitle: 'QX Умные Деньги',
        qxSmartMoneyDesc: 'Отслеживайте движение умных денег в хедж-фондах, семейных офисах, инсайдерах и политиках',
        qxValueTitle: 'Стоимость QX',
        qxValueDesc: 'Модели оценки QUANTROCK содержат широкий спектр методов оценки, включая значение DDM и оценки DCF'
      },
      ui: {
        messagePlaceholder: 'Сообщение...',
        importantDecision: 'Важное решение',
        previousSlide: 'Предыдущий слайд',
        nextSlide: 'Следующий слайд',
        goToSlide: 'Перейти к слайду'
      },
      smartMoneyTracker: {
        title: 'Трекер Умных Денег',
        description: 'Отслеживайте каждый элемент вашего инвестиционного рабочего процесса для создания динамической базы знаний. Превратите свои торговые данные в мощные идеи — ваш второй мозг для умного инвестирования.',
        trackPositions: 'Отслеживать Позиции.',
        trackPositionsDesc: 'Отслеживайте свой портфель в режиме реального времени.',
        activeTrades: 'Активные сделки',
        assessment: 'Оценка',
        planStrategies: 'Планировать Стратегии.',
        planStrategiesDesc: 'Визуализируйте свою инвестиционную стратегию.',
        nextReview: 'Следующая Проверка',
        techAnalysis: 'Технический Анализ',
        realTimeAlerts: 'Оповещения в Реальном Времени.',
        realTimeAlertsDesc: 'Мгновенные рыночные уведомления.',
        march: 'Март',
        monitorPerformance: 'Отслеживать Эффективность.',
        monitorPerformanceDesc: 'Отслеживайте показатели эффективности.'
      },
      institutionalAnalysis: {
        title: 'Институционального Уровня',
        titleHighlight: 'Финансовый Анализ',
        description: 'Получите доступ к комплексным финансовым данным и инструментам прогнозирования на основе S&P Global Market Intelligence',
        institutionalQuality: 'Данные институционального качества от'
      },
      insiderTrading: {
        title: 'Торгуйте как',
        titleHighlight: 'Инсайдер',
        description: 'Отслеживайте силы, которые движут рынками',
        trendingNow: 'Тренды Сейчас:',
        congressTrading: 'Торговля Конгресса',
        insiderTradingLabel: 'Инсайдерская Торговля',
        institutionalHoldings: 'Институциональные Активы',
        seeDashboard: 'Посмотреть Панель'
      }
    }
  },
  tr: {
    nav: {
      home: 'Ana Sayfa',
      features: 'Özellikler',
      howItWorks: 'Nasıl Çalışır',
      gallery: 'Galeri',
      about: 'Hakkında',
      challenge: 'Yarışma',
      ambassador: 'Elçi',
      affiliate: 'Ortak',
      faq: 'SSS',
      downloadApp: 'Uygulamayı İndir'
    },
    footer: {
      quickLinks: 'Hızlı Bağlantılar',
      legal: 'Yasal',
      followUs: 'Takip Edin',
      copyright: '© 2025 Quantrock. Tüm hakları saklıdır.',
      terms: 'Kullanım Koşulları',
      privacy: 'Gizlilik Politikası',
      ambassador: 'Elçi',
      affiliate: 'Ortak Programı',
      faq: 'SSS'
    },
    landing: {
      hero: {
        title: 'Yapay Zekanın Gücüyle',
        titleHighlight: 'Daha Akıllı Yatırım',
        subtitle: 'Kurumsal zeka ve gerçek zamanlı verilerle yatırım yapın.',
        downloadApp: 'İndir',
        appStore: 'App Store',
        googlePlay: 'Google Play'
      },
      marquee: {
        title: 'En İyi Yatırımcıları Takip Edin'
      },
      features: {
        title: 'Güçlü Özellikler',
        subtitle: 'Avantaj sağlayan araçlar',
        aiInsights: 'Yapay Zeka İçgörüleri',
        aiInsightsDesc: 'Yapay zeka ile analiz yapın.',
        realTimeData: 'Gerçek Zamanlı Veri',
        realTimeDataDesc: 'Canlı verilere erişin.',
        smartMoney: 'Akıllı Takip',
        smartMoneyDesc: 'Portföyünüzü izleyin.',
        research: 'Kurumsal Araştırma',
        researchDesc: 'Profesyonel araştırmalara erişin.'
      },
      howItWorks: {
        title: 'Üç Adımda Başlayın',
        subtitle: 'Yolculuğunuz başlıyor',
        step1: 'İndir',
        step1Desc: 'Quantrock\'u edinin.',
        step2: 'Hesap Oluştur',
        step2Desc: 'Hızlıca kaydolun.',
        step3: 'Yatırım Yap',
        step3Desc: 'Akıllıca yatırım yapmaya başlayın.'
      },
      testimonials: {
        title: 'Yorumlar',
        subtitle: 'Kullanıcılarımız ne diyor',
        quote1: 'Quantrock yaklaşımımı değiştirdi.',
        author1: 'Sarah Mitchell',
        role1: 'Yönetici',
        quote2: 'Veriler güven veriyor.',
        author2: 'James Thompson',
        role2: 'Yatırımcı',
        quote3: 'Devrimci platform.',
        author3: 'Emily Richardson',
        role3: 'Analist'
      },
      about: {
        title: 'Hakkında',
        subtitle: 'Son teknoloji',
        description: 'Quantrock yatırımı devrimleştiriyor.',
        mission: 'Misyon',
        missionDesc: 'Yatırımcıları güçlendirmek.',
        vision: 'Vizyon',
        visionDesc: 'Yatırımı herkes için erişilebilir kılmak.'
      },
      insider: {
        title: 'İçeriden Takip',
        subtitle: 'Akıllı parayı takip edin'
      },
      gallery: {
        title: 'Galeri',
        subtitle: 'Platformumuzu keşfedin'
      },
      cta: {
        title: 'Dönüştürmeye Hazır mısınız?',
        subtitle: 'Bugün katılın',
        download: 'İndir',
        learnMore: 'Daha Fazla'
      },
      challenge: {
        title1: 'Eğitimden Yarışmaya...',
        title2: 'Kadar',
        title3: 'Gerçek Portföy',
        title4: 've',
        title5: 'Kar',
        description: 'Yatırımcıların becerilerini geliştirmek ve simüle edilmiş bir portföyde öğrenmeyle başlayan ve gerçek portföyleri yönetmeyle biten gerçek bir yatırım yolculuğu deneyimlemelerini sağlamak için tasarlanmış kapsamlı bir program.',
        howItWorks: 'Nasıl Çalışır',
        startChallenge: 'Yarışmaya Başla',
        realFunding: 'Gerçek Finansman',
        profitShare: 'Kar Payı',
        highWatermark: 'Yüksek İşaret',
        profitProtection: 'Kar Koruması'
      },
      stockAnalysis: {
        pastPerformance: 'QX Derecelendirmesi',
        risksRewards: 'Riskler ve Ödüller',
        valuationComparison: 'Değerleme ve Karşılaştırma',
        growthForecast: 'Büyüme Tahmini',
        financialHealth: 'Finansal Sağlık',
        dividendQuality: 'Temettü Kalitesi',
        managementProfile: 'Yönetim Profili',
        insiderTransactions: 'İçeriden İşlemler',
        qxRatingTitle: 'QX Derecelendirmesi',
        qxRatingDesc: 'Tahmin, izleyici, gerçeğe uygun değer ve QUANTROCK özel nicel stratejisinin konsensüsüne dayanan QUANTROCK derecelendirmesi',
        qxSmartMoneyTitle: 'QX Akıllı Para',
        qxSmartMoneyDesc: 'Akıllı paranın hedge fonlar, aile ofisleri, içeridekiler ve politikacılarda nasıl hareket ettiğini takip edin',
        qxValueTitle: 'QX Değeri',
        qxValueDesc: 'QUANTROCK Değerleme Modelleri, DDM Değeri ve DCF Değerlemeleri dahil olmak üzere geniş bir değerleme yöntemleri yelpazesi içerir'
      },
      ui: {
        messagePlaceholder: 'Mesaj...',
        importantDecision: 'Önemli karar',
        previousSlide: 'Önceki slayt',
        nextSlide: 'Sonraki slayt',
        goToSlide: 'Slayta git'
      },
      smartMoneyTracker: {
        title: 'Akıllı Para Takipçisi',
        description: 'Dinamik bir bilgi tabanı oluşturmak için yatırım iş akışınızın her öğesini takip edin. Ticaret verilerinizi güçlü içgörülere dönüştürün — akıllı yatırım için ikinci beyniniz.',
        trackPositions: 'Pozisyonları Takip Et.',
        trackPositionsDesc: 'Portföyünüzü gerçek zamanlı izleyin.',
        activeTrades: 'Aktif işlemler',
        assessment: 'Değerlendirme',
        planStrategies: 'Stratejileri Planla.',
        planStrategiesDesc: 'Yatırım stratejinizi görselleştirin.',
        nextReview: 'Sonraki İnceleme',
        techAnalysis: 'Teknik Analiz',
        realTimeAlerts: 'Gerçek Zamanlı Uyarılar.',
        realTimeAlertsDesc: 'Anlık piyasa bildirimleri.',
        march: 'Mart',
        monitorPerformance: 'Performansı İzle.',
        monitorPerformanceDesc: 'Performans metriklerini takip edin.'
      },
      institutionalAnalysis: {
        title: 'Kurumsal Seviye',
        titleHighlight: 'Finansal Analiz',
        description: 'S&P Global Market Intelligence tarafından desteklenen kapsamlı finansal verilere ve tahmin araçlarına erişin',
        institutionalQuality: 'Kurumsal kalite verileri'
      },
      insiderTrading: {
        title: 'Bir',
        titleHighlight: 'Insider Gibi Ticaret Yap',
        description: 'Piyasaları hareket ettiren güçleri takip edin',
        trendingNow: 'Şimdi Trend:',
        congressTrading: 'Kongre Ticareti',
        insiderTradingLabel: 'İçeriden Ticaret',
        institutionalHoldings: 'Kurumsal Holdingler',
        seeDashboard: 'Panoya Bak'
      }
    }
  },
  ur: {
    nav: {
      home: 'ہوم',
      features: 'خصوصیات',
      howItWorks: 'یہ کیسے کام کرتا ہے',
      gallery: 'گیلری',
      about: 'کے بارے میں',
      challenge: 'چیلنج',
      ambassador: 'سفیر',
      affiliate: 'ملحق',
      faq: 'سوالات',
      downloadApp: 'ایپ ڈاؤن لوڈ کریں'
    },
    footer: {
      quickLinks: 'فوری لنکس',
      legal: 'قانونی',
      followUs: 'ہمیں فالو کریں',
      copyright: '© 2025 Quantrock۔ تمام حقوق محفوظ ہیں۔',
      terms: 'استعمال کی شرائط',
      privacy: 'رازداری کی پالیسی',
      ambassador: 'سفیر',
      affiliate: 'ملحقہ پروگرام',
      faq: 'سوالات'
    },
    landing: {
      hero: {
        title: 'AI کی طاقت سے',
        titleHighlight: 'زیادہ ہوشیار سرمایہ کاری',
        subtitle: 'ادارہ جاتی ذہانت اور حقیقی وقت کے ڈیٹا کا استعمال کریں۔',
        downloadApp: 'ڈاؤن لوڈ کریں',
        appStore: 'ایپ اسٹور',
        googlePlay: 'گوگل پلے'
      },
      marquee: {
        title: 'اعلیٰ سرمایہ کاروں کو ٹریک کریں'
      },
      features: {
        title: 'طاقتور خصوصیات',
        subtitle: 'برتری دینے والے ٹولز',
        aiInsights: 'AI بصیرت',
        aiInsightsDesc: 'AI سے تجزیہ کریں۔',
        realTimeData: 'حقیقی وقت کا ڈیٹا',
        realTimeDataDesc: 'لائیو ڈیٹا تک رسائی۔',
        smartMoney: 'ہوشیار ٹریکنگ',
        smartMoneyDesc: 'پورٹ فولیو کی نگرانی کریں۔',
        research: 'ادارہ جاتی تحقیق',
        researchDesc: 'پیشہ ورانہ تحقیق تک رسائی۔'
      },
      howItWorks: {
        title: 'تین اقدامات میں شروع کریں',
        subtitle: 'آپ کا سفر شروع ہوتا ہے',
        step1: 'ڈاؤن لوڈ کریں',
        step1Desc: 'Quantrock حاصل کریں۔',
        step2: 'اکاؤنٹ بنائیں',
        step2Desc: 'تیزی سے سائن اپ کریں۔',
        step3: 'سرمایہ کاری کریں',
        step3Desc: 'ہوشیاری سے سرمایہ کاری شروع کریں۔'
      },
      testimonials: {
        title: 'تبصرے',
        subtitle: 'صارفین کیا کہتے ہیں',
        quote1: 'Quantrock نے میرا نقطہ نظر بدل دیا۔',
        author1: 'Sarah Mitchell',
        role1: 'منیجر',
        quote2: 'ڈیٹا اعتماد دیتا ہے۔',
        author2: 'James Thompson',
        role2: 'سرمایہ کار',
        quote3: 'انقلابی پلیٹ فارم۔',
        author3: 'Emily Richardson',
        role3: 'تجزیہ کار'
      },
      about: {
        title: 'کے بارے میں',
        subtitle: 'جدید ترین ٹیکنالوجی',
        description: 'Quantrock سرمایہ کاری میں انقلاب۔',
        mission: 'مشن',
        missionDesc: 'سرمایہ کاروں کو بااختیار بنانا۔',
        vision: 'وژن',
        visionDesc: 'سرمایہ کاری کو سب کے لیے قابل رسائی بنانا۔'
      },
      insider: {
        title: 'اندرونی ٹریکنگ',
        subtitle: 'ہوشیار رقم کی پیروی کریں'
      },
      gallery: {
        title: 'گیلری',
        subtitle: 'پلیٹ فارم دریافت کریں'
      },
      cta: {
        title: 'تبدیل کرنے کے لیے تیار؟',
        subtitle: 'آج شامل ہوں',
        download: 'ڈاؤن لوڈ کریں',
        learnMore: 'مزید جانیں'
      },
      challenge: {
        title1: 'تربیت سے چیلنج تک...',
        title2: 'تک',
        title3: 'حقیقی پورٹ فولیو',
        title4: 'اور',
        title5: 'منافع',
        description: 'ایک جامع پروگرام جو سرمایہ کاروں کی مہارتوں کو بہتر بنانے اور انہیں ایک حقیقی سرمایہ کاری کے سفر کا تجربہ کرنے کے لیے بااختیار بنانے کے لیے ڈیزائن کیا گیا ہے جو ایک سمیولیٹڈ پورٹ فولیو پر سیکھنے سے شروع ہوتا ہے اور حقیقی پورٹ فولیوز کے انتظام پر ختم ہوتا ہے۔',
        howItWorks: 'یہ کیسے کام کرتا ہے',
        startChallenge: 'چیلنج شروع کریں',
        realFunding: 'حقیقی فنڈنگ',
        profitShare: 'منافع کا حصہ',
        highWatermark: 'اعلی نشان',
        profitProtection: 'منافع کی حفاظت'
      },
      stockAnalysis: {
        pastPerformance: 'QX درجہ بندی',
        risksRewards: 'خطرات اور انعامات',
        valuationComparison: 'تشخیص اور موازنہ',
        growthForecast: 'نمو کی پیش گوئی',
        financialHealth: 'مالی صحت',
        dividendQuality: 'ڈویڈنڈ کوالٹی',
        managementProfile: 'مینجمنٹ پروفائل',
        insiderTransactions: 'اندرونی لین دین',
        qxRatingTitle: 'QX درجہ بندی',
        qxRatingDesc: 'پیشن گوئی، ٹریکر، منصفانہ قیمت، اور QUANTROCK خصوصی مقداری حکمت عملی کے اتفاق رائے پر مبنی QUANTROCK درجہ بندی',
        qxSmartMoneyTitle: 'QX سمارٹ منی',
        qxSmartMoneyDesc: 'ہیج فنڈز، فیملی آفسز، انسائیڈرز، سیاستدانوں میں سمارٹ منی کی نقل و حرکت کو ٹریک کریں',
        qxValueTitle: 'QX ویلیو',
        qxValueDesc: 'QUANTROCK ویلیویشن ماڈلز میں تشخیص کے طریقوں کی ایک وسیع رینج شامل ہے، بشمول DDM ویلیو اور DCF ویلیویشنز'
      },
      ui: {
        messagePlaceholder: 'پیغام...',
        importantDecision: 'اہم فیصلہ',
        previousSlide: 'پچھلی سلائڈ',
        nextSlide: 'اگلی سلائڈ',
        goToSlide: 'سلائڈ پر جائیں'
      },
      smartMoneyTracker: {
        title: 'سمارٹ منی ٹریکر',
        description: 'ایک متحرک علمی بنیاد بنانے کے لیے اپنی سرمایہ کاری کے ورک فلو کے ہر عنصر کو ٹریک کریں۔ اپنے تجارتی ڈیٹا کو طاقتور بصیرتوں میں تبدیل کریں — سمارٹ سرمایہ کاری کے لیے آپ کا دوسرا دماغ۔',
        trackPositions: 'پوزیشنز ٹریک کریں۔',
        trackPositionsDesc: 'اپنے پورٹ فولیو کو حقیقی وقت میں مانیٹر کریں۔',
        activeTrades: 'فعال تجارتیں',
        assessment: 'تشخیص',
        planStrategies: 'حکمت عملی کی منصوبہ بندی۔',
        planStrategiesDesc: 'اپنی سرمایہ کاری کی حکمت عملی کو دیکھیں۔',
        nextReview: 'اگلا جائزہ',
        techAnalysis: 'تکنیکی تجزیہ',
        realTimeAlerts: 'حقیقی وقت کے الرٹس۔',
        realTimeAlertsDesc: 'فوری مارکیٹ اطلاعات۔',
        march: 'مارچ',
        monitorPerformance: 'کارکردگی مانیٹر کریں۔',
        monitorPerformanceDesc: 'کارکردگی کے میٹرکس ٹریک کریں۔'
      },
      institutionalAnalysis: {
        title: 'ادارہ جاتی درجے کا',
        titleHighlight: 'مالیاتی تجزیہ',
        description: 'S&P گلوبل مارکیٹ انٹیلی جنس کی طرف سے تقویت یافتہ جامع مالیاتی ڈیٹا اور پیشن گوئی کے ٹولز تک رسائی حاصل کریں',
        institutionalQuality: 'ادارہ جاتی معیار کا ڈیٹا'
      },
      insiderTrading: {
        title: 'ایک کی طرح تجارت کریں',
        titleHighlight: 'اندرونی',
        description: 'ان قوتوں کو ٹریک کریں جو بازاروں کو حرکت دیتی ہیں',
        trendingNow: 'ابھی ٹرینڈنگ:',
        congressTrading: 'کانگریس ٹریڈنگ',
        insiderTradingLabel: 'انسائیڈر ٹریڈنگ',
        institutionalHoldings: 'ادارہ جاتی ہولڈنگز',
        seeDashboard: 'ڈیش بورڈ دیکھیں'
      }
    }
  }
};

export function useTranslation(lang: Language) {
  return translations[lang];
}
