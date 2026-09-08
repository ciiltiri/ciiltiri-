import React from 'react';
import { 
  Heart, 
  Accessibility, 
  Users, 
  HandHeart, 
  PhoneCall, 
  Volume2, 
  VolumeX, 
  Globe, 
  Menu, 
  X,
  Sparkles,
  UserPlus
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../utils/translations';
import { speakText, stopSpeaking } from '../utils/accessibility';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenDonate: (category?: string) => void;
  onOpenRequest: (category?: string) => void;
  fontSize: 'normal' | 'large' | 'xlarge';
  setFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  setLanguage,
  activeTab,
  setActiveTab,
  onOpenDonate,
  onOpenRequest,
  fontSize,
  setFontSize,
  highContrast,
  setHighContrast
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const t = TRANSLATIONS[language];

  const handleToggleSpeech = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      const summaryText = language === 'so'
        ? "Kusoo dhawoow Xarunta Ciiltiri ee degmada Garasbaaley. Waxaan u adeegnaa agoonta, qoysaska danyarta ah, iyo dadka naafada ah ee curyaamiinta ah. Taleefanka xarunta waa 611466747."
        : "Welcome to Ciiltiri Center in Garasbaaley district. Serving orphans, needy families, and persons with disabilities. Phone: 611466747.";
      speakText(summaryText, language === 'so' ? 'so-SO' : 'en-US');
      setIsSpeaking(true);
      setTimeout(() => setIsSpeaking(false), 9000);
    }
  };

  const navItems = [
    { id: 'home', label: t.navHome, icon: Heart },
    { id: 'registration', label: t.navRegister, icon: UserPlus, badge: 'Cusub' },
    { id: 'agoon', label: t.navOrphans, icon: Users, badge: 'Agoonta' },
    { id: 'danyar', label: t.navNeedy, icon: HandHeart, badge: 'Danyarta' },
    { id: 'cuuryaan', label: t.navDisabled, icon: Accessibility, badge: 'Cuuryaanta' },
    { id: 'registry', label: t.navTransparency, icon: Sparkles },
  ];

  return (
    <header className={`sticky top-0 z-40 border-b transition-colors duration-200 ${
      highContrast 
        ? 'bg-black border-yellow-400 text-white' 
        : 'bg-white/95 backdrop-blur-md border-stone-200 text-stone-900 shadow-xs'
    }`}>
      {/* Top Accessibility & Emergency Bar */}
      <div className={`px-4 py-1.5 text-xs border-b flex flex-wrap items-center justify-between gap-2 ${
        highContrast ? 'bg-zinc-900 border-zinc-700 text-yellow-300' : 'bg-stone-100/80 border-stone-200 text-stone-600'
      }`}>
        <div className="flex items-center gap-3">
          <a href="tel:611466747" className="flex items-center gap-1.5 font-bold text-emerald-800 hover:underline">
            <PhoneCall className="w-3.5 h-3.5 text-emerald-700" />
            <span>Xarunta Ciiltiri (Garasbaaley): 611466747</span>
          </a>
          <span className="hidden sm:inline text-stone-400">|</span>
          <span className="hidden sm:inline text-stone-600">
            EVC Plus: *712*611466747*lacagta#
          </span>
        </div>

        {/* Accessibility Toggles */}
        <div className="flex items-center gap-2">
          {/* Audio helper */}
          <button
            id="accessibility-audio-toggle"
            onClick={handleToggleSpeech}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs transition-colors ${
              isSpeaking 
                ? 'bg-emerald-600 text-white animate-pulse' 
                : highContrast ? 'bg-zinc-800 text-yellow-300 hover:bg-zinc-700' : 'bg-white hover:bg-stone-200 text-stone-700 border border-stone-300'
            }`}
            title={isSpeaking ? t.stopAudio : t.listenStory}
            aria-label="Dhageyso faahfaahinta"
          >
            {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-600" />}
            <span className="font-medium">{isSpeaking ? t.stopAudio : (language === 'so' ? 'Codka' : 'Audio')}</span>
          </button>

          {/* Font Size Adjuster */}
          <div className="flex items-center rounded border border-stone-300 bg-white overflow-hidden text-[11px] font-bold">
            <button
              id="font-size-normal"
              onClick={() => setFontSize('normal')}
              className={`px-1.5 py-0.5 ${fontSize === 'normal' ? 'bg-emerald-700 text-white' : 'text-stone-700 hover:bg-stone-100'}`}
              title="Cabirka qoraalka caadiga ah"
            >
              A
            </button>
            <button
              id="font-size-large"
              onClick={() => setFontSize('large')}
              className={`px-1.5 py-0.5 border-x border-stone-300 ${fontSize === 'large' ? 'bg-emerald-700 text-white' : 'text-stone-700 hover:bg-stone-100'}`}
              title="Cabirka qoraalka weyn"
            >
              A+
            </button>
            <button
              id="font-size-xlarge"
              onClick={() => setFontSize('xlarge')}
              className={`px-1.5 py-0.5 ${fontSize === 'xlarge' ? 'bg-emerald-700 text-white' : 'text-stone-700 hover:bg-stone-100'}`}
              title="Cabirka qoraalka ugu weyn"
            >
              A++
            </button>
          </div>

          {/* High Contrast Toggle */}
          <button
            id="contrast-mode-toggle"
            onClick={() => setHighContrast(!highContrast)}
            className={`px-2 py-0.5 rounded text-xs font-medium transition-colors ${
              highContrast
                ? 'bg-yellow-400 text-black font-bold'
                : 'bg-stone-200 hover:bg-stone-300 text-stone-700'
            }`}
            title="Aragga Sare"
          >
            {highContrast ? 'Contrast: On' : 'Contrast'}
          </button>

          {/* Language Toggle */}
          <button
            id="language-toggle-btn"
            onClick={() => setLanguage(language === 'so' ? 'en' : 'so')}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-medium"
          >
            <Globe className="w-3 h-3" />
            <span className="uppercase font-bold">{language === 'so' ? 'English' : 'Soomaali'}</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo and Identity */}
          <button
            id="brand-logo-btn"
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-xs transition-transform group-hover:scale-105 ${
              highContrast ? 'bg-yellow-400 text-black' : 'bg-emerald-700 text-white'
            }`}>
              <div className="relative">
                <Heart className="w-6 h-6 fill-current" />
                <Accessibility className="w-3.5 h-3.5 absolute -bottom-1 -right-1 text-amber-300 stroke-[2.5]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl sm:text-2xl tracking-tight leading-none text-emerald-950">
                  {highContrast ? <span className="text-yellow-400">CIILTIRI</span> : 'CIILTIRI'}
                </span>
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                  highContrast ? 'bg-yellow-300 text-black' : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                }`}>
                  Garasbaaley
                </span>
              </div>
              <p className={`text-xs mt-0.5 line-clamp-1 ${highContrast ? 'text-stone-300' : 'text-stone-500'}`}>
                {language === 'so' ? 'Xarunta Garasbaaley • Tel: 611466747' : 'Garasbaaley Center • Tel: 611466747'}
              </p>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? highContrast
                        ? 'bg-yellow-400 text-black shadow-xs font-bold'
                        : 'bg-emerald-50 text-emerald-900 ring-1 ring-emerald-200'
                      : highContrast
                        ? 'text-stone-200 hover:bg-zinc-800'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-700' : 'text-stone-500'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs: Request Aid & Donate */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              id="cta-request-aid-header"
              onClick={() => onOpenRequest()}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold border transition-all ${
                highContrast
                  ? 'border-yellow-400 text-yellow-300 hover:bg-zinc-800'
                  : 'border-stone-300 text-stone-700 hover:bg-stone-100 hover:border-stone-400'
              }`}
            >
              {t.navRequest}
            </button>

            <button
              id="cta-donate-header"
              onClick={() => onOpenDonate()}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-all transform active:scale-95 ${
                highContrast
                  ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                  : 'bg-emerald-700 text-white hover:bg-emerald-800 shadow-emerald-800/20'
              }`}
            >
              <Heart className="w-4 h-4 fill-white/30" />
              <span>{t.navDonate}</span>
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-stone-600 hover:text-stone-900 hover:bg-stone-100 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-t px-4 pt-3 pb-5 space-y-2 ${
          highContrast ? 'bg-black border-zinc-700' : 'bg-white border-stone-200'
        }`}>
          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                    isActive
                      ? highContrast ? 'bg-yellow-400 text-black font-bold' : 'bg-emerald-100 text-emerald-900 font-semibold'
                      : highContrast ? 'text-stone-200 hover:bg-zinc-800' : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-3 grid grid-cols-2 gap-2 border-t border-stone-200">
            <button
              id="mobile-request-btn"
              onClick={() => {
                onOpenRequest();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-center text-sm font-semibold rounded-lg border border-stone-300 text-stone-800 hover:bg-stone-100"
            >
              {t.navRequest}
            </button>
            <button
              id="mobile-donate-btn"
              onClick={() => {
                onOpenDonate();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 text-center text-sm font-bold rounded-lg bg-emerald-700 text-white hover:bg-emerald-800"
            >
              {t.navDonate}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
