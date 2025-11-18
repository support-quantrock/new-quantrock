import { useState } from 'react';
import { Target, TrendingUp, DollarSign, Award, CheckCircle2, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { challengeTranslations } from '../translations/challenge';

export function StageCards() {
  const { language } = useLanguage();
  const t = challengeTranslations[language];
  const [openStageCard, setOpenStageCard] = useState<number | null>(null);

  const toggleStageCard = (index: number) => {
    setOpenStageCard(openStageCard === index ? null : index);
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
      {/* Stage 1: Training Stage */}
      <div className="flex flex-col rounded-2xl border border-green-500/30 bg-gradient-to-b from-[#0a1c3e] to-[#0a0e27] shadow-xl shadow-green-500/20 transition-all duration-300 overflow-hidden">
        <div className="bg-gradient-to-br from-[#1a4d44] to-[#0d2b26] p-4 sm:p-8 text-center border-b border-green-500/20">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl border-2 border-green-400/50 flex items-center justify-center">
            <Target className="w-8 h-8 text-green-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-4">{t.stageCard1Title}</h3>
          <div className="inline-block px-6 py-2 rounded-full border-2 border-green-400 bg-green-400/10">
            <span className="text-green-300 font-bold text-sm">{t.trainingPhase}</span>
          </div>
        </div>
        <div className="bg-gradient-to-b from-green-50/95 to-green-100/95 p-4 sm:p-8 flex-1">
          <div className="mb-4">
            <div className="inline-block bg-green-600 text-white font-bold text-base px-6 py-2 rounded-xl mb-2">STEP 01</div>
            <h4 className="text-lg font-bold text-gray-900 mt-1 mb-3">{t.stageCard1Subtitle}</h4>
          </div>
          <p className="text-gray-700 leading-relaxed text-sm">
            {t.stageCard1Description}
          </p>
          <button
            onClick={() => toggleStageCard(0)}
            className="mt-4 flex items-center gap-2 text-green-700 hover:text-green-900 font-semibold text-sm transition-colors"
          >
            <span>{t.showMore}</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openStageCard === 0 ? 'rotate-180' : ''}`} />
          </button>
        </div>
        <div className={`overflow-hidden transition-all duration-500 ${openStageCard === 0 ? 'max-h-[2400px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-gradient-to-b from-green-50/95 to-green-100/95 px-4 sm:px-8 pb-8">
            <div className="border-t border-green-300/30 pt-6">
              <div className="bg-white/50 p-4 rounded-xl">
                <h5 className="font-bold text-gray-900 mb-3">{t.stageCard1Requirements}</h5>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{t.stageCard1Req1}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{t.stageCard1Req2}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{t.stageCard1Req3}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{t.stageCard1Req4}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{t.stageCard1Req5}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{t.stageCard1Req6}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{t.stageCard1Req7}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{t.stageCard1Req8}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{t.stageCard1Req9}</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white/50 p-4 rounded-xl mt-4">
                <h5 className="font-bold text-gray-900 mb-3">{t.stageCard1Prize}</h5>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{t.stageCard1Prize1}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{t.stageCard1Prize2}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{t.stageCard1Prize3}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stage 2: Challenge Championship */}
      <div className="flex flex-col rounded-2xl border border-red-500/30 bg-gradient-to-b from-[#0a2e28] to-[#0a0e27] shadow-xl shadow-red-500/20 transition-all duration-300 overflow-hidden">
        <div className="bg-gradient-to-br from-[#5c1a1a] to-[#2b0d0d] p-4 sm:p-8 text-center border-b border-red-500/20">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl border-2 border-red-400/50 flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-red-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-4">{t.stageCard2Title}</h3>
          <div className="inline-block px-6 py-2 rounded-full border-2 border-red-400 bg-red-400/10">
            <span className="text-red-300 font-bold text-sm">{t.verificationPhase}</span>
          </div>
        </div>
        <div className="bg-gradient-to-b from-red-50/95 to-red-100/95 p-4 sm:p-8 flex-1">
          <div className="mb-4">
            <div className="inline-block bg-red-700 text-white font-bold text-base px-6 py-2 rounded-xl mb-2">STEP 02</div>
            <h4 className="text-lg font-bold text-gray-900 mt-1 mb-3">{t.stageCard2Subtitle}</h4>
          </div>
          <p className="text-gray-700 leading-relaxed text-sm">
            {t.stageCard2Description}
          </p>
          <button
            onClick={() => toggleStageCard(1)}
            className="mt-4 flex items-center gap-2 text-red-700 hover:text-red-900 font-semibold text-sm transition-colors"
          >
            <span>{t.showMore}</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openStageCard === 1 ? 'rotate-180' : ''}`} />
          </button>
        </div>
        <div className={`overflow-hidden transition-all duration-500 ${openStageCard === 1 ? 'max-h-[3600px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-gradient-to-b from-red-50/95 to-red-100/95 px-4 sm:px-8 pb-8">
            <div className="border-t border-red-300/30 pt-6 space-y-4">
              <div className="bg-white/50 p-4 rounded-xl">
                <h5 className="font-bold text-gray-900 mb-3">{t.stageCard2Round1}</h5>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{t.stageCard2Round1Req1}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{t.stageCard2Round1Req2}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{t.stageCard2Round1Req3}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{t.stageCard2Round1Req4}</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white/50 p-4 rounded-xl">
                <h5 className="font-bold text-gray-900 mb-3">{t.stageCard2Round2}</h5>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{t.stageCard2Round2Req1}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{t.stageCard2Round2Req2}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{t.stageCard2Round2Req3}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{t.stageCard2Round2Req4}</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white/50 p-4 rounded-xl">
                <h5 className="font-bold text-gray-900 mb-3">{t.stageCard2Rules}</h5>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{t.stageCard2Rule1}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{t.stageCard2Rule2}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{t.stageCard2Rule3}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{t.stageCard2Rule4}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{t.stageCard2Rule5}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{t.stageCard2Rule6}</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white/50 p-4 rounded-xl">
                <h5 className="font-bold text-gray-900 mb-3">{t.stageCard2Prize}</h5>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{t.stageCard2Prize1}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{t.stageCard2Prize2}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{t.stageCard2Prize3}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stage 3: Trading Stage */}
      <div className="flex flex-col rounded-2xl border border-orange-500/30 bg-gradient-to-b from-[#2e1f0a] to-[#0a0e27] shadow-xl shadow-orange-500/20 transition-all duration-300 overflow-hidden">
        <div className="bg-gradient-to-br from-[#4d2f1a] to-[#2b1a0d] p-4 sm:p-8 text-center border-b border-orange-500/20">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl border-2 border-orange-400/50 flex items-center justify-center">
            <DollarSign className="w-8 h-8 text-orange-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-4">{t.stageCard3Title}</h3>
          <div className="inline-block px-6 py-2 rounded-full border-2 border-orange-400 bg-orange-400/10">
            <span className="text-orange-300 font-bold text-sm">{t.masterPhase}</span>
          </div>
        </div>
        <div className="bg-gradient-to-b from-orange-50/95 to-orange-100/95 p-4 sm:p-8 flex-1">
          <div className="mb-4">
            <div className="inline-block bg-orange-700 text-white font-bold text-base px-6 py-2 rounded-xl mb-2">STEP 03</div>
            <h4 className="text-lg font-bold text-gray-900 mt-1 mb-3">{t.stageCard3Subtitle}</h4>
          </div>
          <p className="text-gray-700 leading-relaxed text-sm">
            {t.stageCard3Description}
          </p>
          <button
            onClick={() => toggleStageCard(2)}
            className="mt-4 flex items-center gap-2 text-orange-800 hover:text-orange-950 font-semibold text-sm transition-colors"
          >
            <span>{t.showMore}</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openStageCard === 2 ? 'rotate-180' : ''}`} />
          </button>
        </div>
        <div className={`overflow-hidden transition-all duration-500 ${openStageCard === 2 ? 'max-h-[2400px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-gradient-to-b from-orange-50/95 to-orange-100/95 px-4 sm:px-8 pb-8">
            <div className="border-t border-orange-300/30 pt-6">
              <div className="bg-white/50 p-4 rounded-xl">
                <h5 className="font-bold text-gray-900 mb-3">{t.stageCard3Rules}</h5>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-700 flex-shrink-0 mt-0.5" />
                    <span>{t.stageCard3Rule1}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-700 flex-shrink-0 mt-0.5" />
                    <span>{t.stageCard3Rule2}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-700 flex-shrink-0 mt-0.5" />
                    <span>{t.stageCard3Rule3}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-700 flex-shrink-0 mt-0.5" />
                    <span>{t.stageCard3Rule4}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-700 flex-shrink-0 mt-0.5" />
                    <span>{t.stageCard3Rule5}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-700 flex-shrink-0 mt-0.5" />
                    <span>{t.stageCard3Rule6}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-700 flex-shrink-0 mt-0.5" />
                    <span>{t.stageCard3Rule7}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-700 flex-shrink-0 mt-0.5" />
                    <span>{t.stageCard3Rule8}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-700 flex-shrink-0 mt-0.5" />
                    <span>{t.stageCard3Rule9}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-700 flex-shrink-0 mt-0.5" />
                    <span>{t.stageCard3Rule10}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stage 4: Portfolio Manager */}
      <div className="flex flex-col rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-[#2e1a0a] to-[#0a0e27] shadow-xl shadow-cyan-500/20 transition-all duration-300 overflow-hidden">
        <div className="bg-gradient-to-br from-[#1a2f5c] to-[#0d1b3a] p-4 sm:p-8 text-center border-b border-cyan-500/20">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl border-2 border-cyan-400/50 flex items-center justify-center">
            <Award className="w-8 h-8 text-cyan-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-4">{t.stageCard4Title}</h3>
          <div className="inline-block px-6 py-2 rounded-full border-2 border-cyan-400 bg-cyan-400/10">
            <span className="text-cyan-300 font-bold text-sm">{t.fundedPhaseLabel}</span>
          </div>
        </div>
        <div className="bg-gradient-to-b from-cyan-50/95 to-cyan-100/95 p-4 sm:p-8 flex-1">
          <div className="mb-4">
            <div className="inline-block bg-cyan-700 text-white font-bold text-base px-6 py-2 rounded-xl mb-2">STEP 04</div>
            <h4 className="text-lg font-bold text-gray-900 mt-1 mb-3">{t.stageCard4Subtitle}</h4>
          </div>
          <p className="text-gray-700 leading-relaxed text-sm">
            {t.stageCard4Description}
          </p>
          <button
            onClick={() => toggleStageCard(3)}
            className="mt-4 flex items-center gap-2 text-cyan-800 hover:text-cyan-950 font-semibold text-sm transition-colors"
          >
            <span>{t.showMore}</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openStageCard === 3 ? 'rotate-180' : ''}`} />
          </button>
        </div>
        <div className={`overflow-hidden transition-all duration-500 ${openStageCard === 3 ? 'max-h-[2400px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-gradient-to-b from-cyan-50/95 to-cyan-100/95 px-4 sm:px-8 pb-8">
            <div className="border-t border-cyan-300/30 pt-6">
              <div className="bg-white/50 p-4 rounded-xl">
                <h5 className="font-bold text-gray-900 mb-3">{t.stageCard4Benefits}</h5>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-700 flex-shrink-0 mt-0.5" />
                    <span>{t.stageCard4Benefit1}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-700 flex-shrink-0 mt-0.5" />
                    <span>{t.stageCard4Benefit2}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-700 flex-shrink-0 mt-0.5" />
                    <span>{t.stageCard4Benefit3}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-700 flex-shrink-0 mt-0.5" />
                    <span>{t.stageCard4Benefit4}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
