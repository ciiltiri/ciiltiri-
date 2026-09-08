import React from 'react';
import { 
  Heart, 
  Accessibility, 
  Users, 
  HandHeart, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Phone,
  UserPlus
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../utils/translations';

interface HeroSectionProps {
  language: Language;
  onOpenDonate: (category?: string) => void;
  onOpenRequest: (category?: string) => void;
  onOpenRegistration?: () => void;
  onSelectCategory: (category: string) => void;
  highContrast: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  onOpenDonate,
  onOpenRequest,
  onOpenRegistration,
  onSelectCategory,
  highContrast
}) => {
  const t = TRANSLATIONS[language];

  return (
    <section className={`relative overflow-hidden border-b ${
      highContrast 
        ? 'bg-zinc-950 text-white border-zinc-800' 
        : 'bg-gradient-to-b from-emerald-50/70 via-stone-50 to-stone-50 border-stone-200'
    }`}>
      {/* Decorative background grid subtle overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 relative">
        <div className="max-w-3xl">
          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-5 transition-all shadow-xs border bg-emerald-100/90 text-emerald-900 border-emerald-300">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>
              {language === 'so'
                ? 'XARUNTA CIILTIRI • Degmada Garasbaaley • Tel: 611466747'
                : 'CIILTIRI CENTER • Garasbaaley District • Tel: 611466747'}
            </span>
          </div>

          <h1 className={`text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.15] mb-4 ${
            highContrast ? 'text-white' : 'text-stone-900'
          }`}>
            {language === 'so' ? (
              <>
                Xarunta Ciiltiri: U adeegista <span className="text-emerald-700 underline decoration-emerald-300 decoration-wavy decoration-2">Agoonta</span>,{' '}
                <span className="text-amber-700">Danyarta</span>, iyo dadka{' '}
                <span className="text-teal-700">Cuuryaanka</span> ah ee Garasbaaley.
              </>
            ) : (
              t.heroTitle
            )}
          </h1>

          <p className={`text-base sm:text-lg leading-relaxed mb-8 max-w-2xl ${
            highContrast ? 'text-stone-300' : 'text-stone-600'
          }`}>
            {language === 'so'
              ? 'Xarunta Ciiltiri ee degmada Garasbaaley waxay si toos ah ugu adeegtaa daryeelka agoonta, taakuleynta qoysaska danyarta ah ee ku nool xeryaha barakacayaasha, iyo bixinta kuraasta curyaanka iyo qalabka socodka.'
              : t.heroDesc}
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
            <button
              id="hero-primary-donate-btn"
              onClick={() => onOpenDonate()}
              className={`flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-base shadow-sm transition-transform active:scale-95 ${
                highContrast
                  ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                  : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-emerald-800/20'
              }`}
            >
              <Heart className="w-5 h-5 fill-white/20" />
              <span>{t.donateNow}</span>
            </button>

            {onOpenRegistration && (
              <button
                id="hero-registration-btn"
                onClick={() => onOpenRegistration()}
                className={`flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-base border transition-all ${
                  highContrast
                    ? 'bg-zinc-900 border-yellow-400 text-yellow-300 hover:bg-zinc-800'
                    : 'bg-emerald-50 border-emerald-300 text-emerald-900 hover:bg-emerald-100 shadow-xs'
                }`}
              >
                <UserPlus className="w-5 h-5 text-emerald-700" />
                <span>{language === 'so' ? 'Qeybta Diiwaangelinta' : 'Registration Portal'}</span>
              </button>
            )}

            <button
              id="hero-request-aid-btn"
              onClick={() => onOpenRequest()}
              className={`flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl font-bold text-base border transition-all ${
                highContrast
                  ? 'border-yellow-400 text-yellow-300 hover:bg-zinc-800'
                  : 'border-stone-300 bg-white hover:bg-stone-100 text-stone-800 shadow-xs'
              }`}
            >
              <HandHeart className="w-5 h-5 text-emerald-700" />
              <span>{t.requestAid}</span>
            </button>

            <a
              href="tel:611466747"
              className="inline-flex items-center gap-1.5 px-3.5 py-3 rounded-xl text-xs font-bold text-stone-700 hover:text-emerald-800 hover:bg-emerald-50 transition-colors"
            >
              <Phone className="w-4 h-4 text-emerald-700" />
              <span>Tel: 611466747</span>
            </a>
          </div>

          {/* Quick Target Category Selector Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-stone-200">
            {/* Agoonta Card */}
            <button
              id="quick-cat-agoon"
              onClick={() => onSelectCategory('agoon')}
              className={`p-3.5 rounded-xl text-left border transition-all hover:scale-[1.02] flex items-center gap-3 ${
                highContrast
                  ? 'bg-zinc-900 border-zinc-700 text-white hover:border-yellow-400'
                  : 'bg-white hover:border-emerald-400 border-stone-200 shadow-xs'
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-stone-900 truncate">
                    {language === 'so' ? '1. Agoonta' : '1. Orphans'}
                  </h4>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                </div>
                <p className="text-xs text-stone-500 truncate">
                  {language === 'so' ? 'Kafalo & Waxbarasho' : 'Sponsorship & School'}
                </p>
              </div>
            </button>

            {/* Danyarta Card */}
            <button
              id="quick-cat-danyar"
              onClick={() => onSelectCategory('danyar')}
              className={`p-3.5 rounded-xl text-left border transition-all hover:scale-[1.02] flex items-center gap-3 ${
                highContrast
                  ? 'bg-zinc-900 border-zinc-700 text-white hover:border-yellow-400'
                  : 'bg-white hover:border-amber-400 border-stone-200 shadow-xs'
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <HandHeart className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-stone-900 truncate">
                    {language === 'so' ? '2. Danyarta' : '2. Needy Families'}
                  </h4>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                </div>
                <p className="text-xs text-stone-500 truncate">
                  {language === 'so' ? 'Raashin & Hoy' : 'Food Baskets & Shelter'}
                </p>
              </div>
            </button>

            {/* Cuuryaanta Card */}
            <button
              id="quick-cat-cuuryaan"
              onClick={() => onSelectCategory('cuuryaan')}
              className={`p-3.5 rounded-xl text-left border transition-all hover:scale-[1.02] flex items-center gap-3 ${
                highContrast
                  ? 'bg-zinc-900 border-zinc-700 text-white hover:border-yellow-400'
                  : 'bg-white hover:border-teal-400 border-stone-200 shadow-xs'
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                <Accessibility className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-stone-900 truncate">
                    {language === 'so' ? '3. Cuuryaanta' : '3. Disability Care'}
                  </h4>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                </div>
                <p className="text-xs text-stone-500 truncate">
                  {language === 'so' ? 'Kuraas & Qalab Socod' : 'Wheelchairs & Crutches'}
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Impact Bar - Key Metrics */}
        <div className={`mt-10 pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 border-t ${
          highContrast ? 'border-zinc-800' : 'border-stone-200/80'
        }`}>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700">428+</div>
            <div className="text-xs font-medium text-stone-600 mt-0.5">{t.statsOrphans}</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-700">862+</div>
            <div className="text-xs font-medium text-stone-600 mt-0.5">{t.statsFamilies}</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-teal-700">194+</div>
            <div className="text-xs font-medium text-stone-600 mt-0.5">{t.statsWheelchairs}</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-stone-900">$142,500+</div>
            <div className="text-xs font-medium text-stone-600 mt-0.5">{t.statsDonations}</div>
          </div>
        </div>
      </div>
    </section>
  );
};
