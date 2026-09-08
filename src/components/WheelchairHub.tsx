import React, { useState } from 'react';
import { 
  Accessibility, 
  Heart, 
  CheckCircle2, 
  ArrowRight, 
  Volume2, 
  ShieldCheck,
  Package,
  Activity,
  Award
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../utils/translations';
import { speakText } from '../utils/accessibility';

interface WheelchairHubProps {
  language: Language;
  onOpenDonate: (category?: string) => void;
  onOpenRequest: (category?: string) => void;
  highContrast: boolean;
}

export const WheelchairHub: React.FC<WheelchairHubProps> = ({
  language,
  onOpenDonate,
  onOpenRequest,
  highContrast
}) => {
  const t = TRANSLATIONS[language];

  const handleAudioExplain = () => {
    const text = language === 'so'
      ? "Qaybta adeegga dadka baahiyaha gaarka ah qaba waxay diiradda saartaa kuraasta curyaanka ee bilaashka ah, biraha socodka, iyo xirfadaha madax-bannaanida si walaalaha naafada ah ay ugu noolaadaan nolol sharaf leh."
      : "The disability service focuses on free wheelchairs, walking crutches, hearing devices and independent vocational skills.";
    speakText(text, language === 'so' ? 'so-SO' : 'en-US');
  };

  const wheelchairTypes = [
    {
      title: language === 'so' ? 'Kursiga Curyaanka ee Caadiga ah' : 'Standard Folding Wheelchair',
      cost: 85,
      description: language === 'so' ? 'U habboon qofka guriga dhexdiisa ama xarumaha daryeelka ku sugan.' : 'Ideal for indoor and everyday home mobility.',
      readyCount: 28,
      specs: ['Bir aan mirir qaadin', 'Laablaabmi kara (Foldable)', 'Lugaha la hagaajin karo']
    },
    {
      title: language === 'so' ? 'Kursiga Dhulka Adag (Rough-Terrain)' : 'Rough-Terrain Heavy Duty Wheelchair',
      cost: 110,
      description: language === 'so' ? 'Taayirro waaweyn oo ku habboon ciidda, dhagxaanta iyo waddooyinka aan laamiga ahayn.' : 'Large reinforced pneumatic tires built for unpaved terrain and sand.',
      readyCount: 14,
      specs: ['Taayirro buufis ah', 'Qaab-dhismeed xooggan', 'Bariikyo laba-geesood ah']
    },
    {
      title: language === 'so' ? 'Biraha Socodka ee Gacmaha (Elbow Crutches)' : 'Ergonomic Elbow Crutches',
      cost: 25,
      description: language === 'so' ? 'Lamaan biraha socodka ah oo caawiya qofka lugta ka dhaawacan ama ka naafoobay.' : 'Durable lightweight aluminum crutches with soft arm cuffs.',
      readyCount: 45,
      specs: ['Aluminium fudud', 'Gacmo jilicsan', 'Dhererka la qabsan kara']
    }
  ];

  return (
    <section className={`py-12 border-b ${
      highContrast ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-teal-900 text-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-800/80 text-teal-200 border border-teal-700 mb-3">
              <Accessibility className="w-4 h-4 text-teal-300" />
              <span>{language === 'so' ? 'Xarunta Gaarka ah ee Cuuryaanta' : 'Dedicated Disability & Mobility Center'}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-3">
              {language === 'so'
                ? 'Kursi Curyaan = Xorriyad, Waxbarasho & Shaqo'
                : 'A Wheelchair Restores Mobility, Dignity & Freedom'}
            </h2>

            <p className="text-teal-100 text-sm sm:text-base leading-relaxed max-w-2xl">
              {language === 'so'
                ? 'Qof kasta oo naafo ah wuxuu leeyahay karti iyo hami. Annagoo kaashanayna samafalayaasha, waxaan u qaybinnaa kuraas bilaash ah qof kasta oo u baahan, waxaana u tababarnaa farsamooyinka uu ku shaqaysan karo.'
                : 'People with disabilities deserve unrestricted mobility and equal opportunity. Through direct sponsorships, we supply customized wheelchairs, walking aids, and vocational rehabilitation.'}
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
            <button
              id="wheelchair-hub-request-btn"
              onClick={() => onOpenRequest('cuuryaan')}
              className="w-full py-3.5 px-5 rounded-xl font-bold text-sm bg-white text-teal-900 hover:bg-teal-50 transition-all shadow-md flex items-center justify-center gap-2 text-center"
            >
              <Accessibility className="w-4 h-4 text-teal-700" />
              <span>{language === 'so' ? 'Codso Kursi Curyaan Bilaash ah' : 'Apply for Free Wheelchair'}</span>
            </button>

            <button
              id="wheelchair-hub-donate-btn"
              onClick={() => onOpenDonate('cuuryaan')}
              className="w-full py-3.5 px-5 rounded-xl font-bold text-sm bg-emerald-500 hover:bg-emerald-600 text-white transition-all shadow-md flex items-center justify-center gap-2 text-center"
            >
              <Heart className="w-4 h-4 fill-white/20" />
              <span>{language === 'so' ? 'Ku Deeq Kursi Curyaan ($85)' : 'Sponsor a Wheelchair ($85)'}</span>
            </button>

            <button
              onClick={handleAudioExplain}
              className="inline-flex items-center justify-center gap-1.5 text-xs text-teal-200 hover:text-white pt-1"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{language === 'so' ? 'Dhageyso faahfaahinta codka' : 'Listen to audio briefing'}</span>
            </button>
          </div>
        </div>

        {/* Wheelchair Types & Distribution Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {wheelchairTypes.map((item, index) => (
            <div
              key={index}
              className="bg-teal-800/60 rounded-2xl p-6 border border-teal-700/80 flex flex-col justify-between backdrop-blur-xs"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-700/80 flex items-center justify-center text-teal-200">
                    <Accessibility className="w-5 h-5" />
                  </div>
                  <span className="text-xl font-extrabold text-teal-200">${item.cost}</span>
                </div>

                <h3 className="font-bold text-base text-white mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-teal-200 leading-relaxed mb-4">
                  {item.description}
                </p>

                <div className="space-y-1.5 mb-5">
                  {item.specs.map((spec, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-teal-100">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-teal-700/60 flex items-center justify-between">
                <span className="text-xs text-teal-300">
                  {language === 'so' ? `${item.readyCount} xabbo diyaar ah` : `${item.readyCount} units ready`}
                </span>
                <button
                  onClick={() => onOpenDonate('cuuryaan')}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white transition-colors"
                >
                  {language === 'so' ? 'Bixi Qiimahan' : 'Fund This'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
