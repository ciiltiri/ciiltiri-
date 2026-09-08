import React, { useState } from 'react';
import { 
  Users, 
  HandHeart, 
  Accessibility, 
  CheckCircle2, 
  Heart, 
  Package, 
  BookOpen, 
  Sparkles, 
  Volume2, 
  ArrowRight,
  ShieldAlert,
  GraduationCap
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../utils/translations';
import { speakText } from '../utils/accessibility';

interface ThreePillarsProps {
  language: Language;
  onOpenDonate: (category?: string) => void;
  onOpenRequest: (category?: string) => void;
  highContrast: boolean;
  initialTab?: string;
}

export const ThreePillars: React.FC<ThreePillarsProps> = ({
  language,
  onOpenDonate,
  onOpenRequest,
  highContrast,
  initialTab = 'agoon'
}) => {
  const [selectedPillar, setSelectedPillar] = useState<'agoon' | 'danyar' | 'cuuryaan'>(
    (initialTab as any) || 'agoon'
  );
  const [sponsorCount, setSponsorCount] = useState<number>(1);
  const t = TRANSLATIONS[language];

  const handleListenPillar = (text: string) => {
    speakText(text, language === 'so' ? 'so-SO' : 'en-US');
  };

  return (
    <section className="py-12 border-b border-stone-200 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'so' ? 'Qorshayaasha Daryeelka Bulshada' : 'Core Humanitarian Services'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
            {language === 'so'
              ? 'Saddexda Tiir ee aan ugu Adeegno Bulshada'
              : 'The Three Pillars of Direct Assistance'}
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            {language === 'so'
              ? 'Adeeg kasta waxaa si taxadar leh loogu habeeyay baahida gaarka ah ee qofka iyo xaqiijinta nolosha sharafta leh.'
              : 'Tailored programs engineered for maximum dignity, direct aid, and community sustainability.'}
          </p>
        </div>

        {/* 3 Pillar Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-2xl bg-stone-200/80 max-w-full overflow-x-auto shadow-inner">
            <button
              id="pillar-tab-agoon"
              onClick={() => setSelectedPillar('agoon')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                selectedPillar === 'agoon'
                  ? highContrast ? 'bg-yellow-400 text-black shadow-xs' : 'bg-white text-emerald-800 shadow-sm'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <Users className="w-4 h-4 text-emerald-600" />
              <span>{language === 'so' ? '1. Daryeelka Agoonta' : '1. Orphan Care'}</span>
            </button>

            <button
              id="pillar-tab-danyar"
              onClick={() => setSelectedPillar('danyar')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                selectedPillar === 'danyar'
                  ? highContrast ? 'bg-yellow-400 text-black shadow-xs' : 'bg-white text-amber-900 shadow-sm'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <HandHeart className="w-4 h-4 text-amber-600" />
              <span>{language === 'so' ? '2. Taageerada Danyarta' : '2. Needy Support'}</span>
            </button>

            <button
              id="pillar-tab-cuuryaan"
              onClick={() => setSelectedPillar('cuuryaan')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                selectedPillar === 'cuuryaan'
                  ? highContrast ? 'bg-yellow-400 text-black shadow-xs' : 'bg-white text-teal-900 shadow-sm'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              <Accessibility className="w-4 h-4 text-teal-600" />
              <span>{language === 'so' ? '3. Adeegyada Cuuryaanta' : '3. Disability & Mobility'}</span>
            </button>
          </div>
        </div>

        {/* Dynamic Pillar Content Card */}
        {selectedPillar === 'agoon' && (
          <div className={`rounded-2xl border p-6 sm:p-8 shadow-sm transition-all ${
            highContrast ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-stone-200'
          }`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Kafalada Joogtada ah & Waxbarashada</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-3">
                  {language === 'so'
                    ? 'Barnaamijka Kafalada Agoonta (Sponsorship)'
                    : 'Comprehensive Orphan Sponsorship Program'}
                </h3>
                <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-6">
                  {language === 'so'
                    ? 'Kafalada agoonta ma aha oo kaliya gargaar maaliyadeed; waa xaqiijinta mustaqbalka ilmaha agoonka ah. Waxaan u xaqiijinnaa waxbarasho joogto ah, dhar ciid, daryeel caafimaad iyo cunto nafaqo leh.'
                    : 'Sponsoring an orphan guarantees schooling, textbooks, seasonal clothing, healthcare, and essential nutritional support directly managed with their verified guardian.'}
                </p>

                {/* Features list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {[
                    language === 'so' ? '$35 bishii kafaalo buuxda' : '$35/month comprehensive sponsorship',
                    language === 'so' ? 'Fiiga dugsiga & buugaagta' : 'Full school tuition and textbooks',
                    language === 'so' ? 'Xirmada labiska & ciidda' : 'Seasonal and Eid clothing packs',
                    language === 'so' ? 'Daryeel caafimaad & baaris joogto ah' : 'Quarterly health & nutritional checkups'
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-stone-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    id="pillar-sponsor-agoon-btn"
                    onClick={() => onOpenDonate('agoon')}
                    className="px-5 py-2.5 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm flex items-center gap-2"
                  >
                    <Heart className="w-4 h-4 fill-white/20" />
                    <span>{language === 'so' ? 'Kafaalo Qaad Agoon Hadda' : 'Sponsor an Orphan'}</span>
                  </button>

                  <button
                    id="pillar-request-agoon-btn"
                    onClick={() => onOpenRequest('agoon')}
                    className="px-5 py-2.5 rounded-xl font-bold text-sm border border-stone-300 text-stone-800 hover:bg-stone-100"
                  >
                    {language === 'so' ? 'Codso Kafaalo Agoon' : 'Apply for Orphan Aid'}
                  </button>

                  <button
                    onClick={() => handleListenPillar(
                      language === 'so'
                        ? "Barnaamijka Kafalada Agoonta wuxuu bixiyaa soddon iyo shan doolar bishii oo lagu daboolo waxbarashada, cuntada, iyo caafimaadka ilmaha agoonka ah."
                        : "The orphan sponsorship program provides 35 dollars a month covering education, food and health."
                    )}
                    className="p-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-100"
                    title="Dhageyso faahfaahinta"
                  >
                    <Volume2 className="w-4 h-4 text-emerald-700" />
                  </button>
                </div>
              </div>

              {/* Calculator Panel */}
              <div className="lg:col-span-5 bg-stone-100/90 rounded-2xl p-5 border border-stone-200">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-600">
                    {language === 'so' ? 'Xisaabiyaha Kafalada' : 'Sponsorship Calculator'}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    $35 / ilmo / bishii
                  </span>
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    {language === 'so' ? 'Immisa carruur ah ayaad kafaalo qaadi kartaa?' : 'Number of children to sponsor:'}
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 5].map((num) => (
                      <button
                        key={num}
                        onClick={() => setSponsorCount(num)}
                        className={`flex-1 py-2 rounded-lg text-sm font-bold border transition-all ${
                          sponsorCount === num
                            ? 'bg-emerald-700 text-white border-emerald-700'
                            : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                        }`}
                      >
                        {num} {language === 'so' ? 'Ilmo' : 'Child'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-stone-200 mb-4">
                  <div className="flex justify-between items-center text-xs text-stone-600 mb-1">
                    <span>{language === 'so' ? 'Wadarta Bishii:' : 'Monthly total:'}</span>
                    <span className="font-bold text-stone-900 text-base">${sponsorCount * 35} / bishii</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-stone-600">
                    <span>{language === 'so' ? 'Kafaalada 1 Sano (12 Bilood):' : 'Full 1-Year Impact:'}</span>
                    <span className="font-bold text-emerald-700 text-base">${sponsorCount * 35 * 12}</span>
                  </div>
                </div>

                <button
                  onClick={() => onOpenDonate('agoon')}
                  className="w-full py-2.5 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white text-center flex items-center justify-center gap-2"
                >
                  <span>{language === 'so' ? `Bixi $${sponsorCount * 35} (Kafalada Bishaan)` : `Commit $${sponsorCount * 35}/mo`}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pillar 2: Danyarta */}
        {selectedPillar === 'danyar' && (
          <div className={`rounded-2xl border p-6 sm:p-8 shadow-sm transition-all ${
            highContrast ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-stone-200'
          }`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 mb-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                  <span>Cunto & Nolol Sharaf leh</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-3">
                  {language === 'so'
                    ? 'Sanduuqa Raashinka & Gargaarka Danyarta'
                    : 'Needy Families Food Basket & Relief'}
                </h3>
                <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-6">
                  {language === 'so'
                    ? 'Qoysaska danyarta ah ee aan haysan dakhli joogto ah waxay u baahan yihiin garab-istaag joogto ah. Xirmada raashinka bisha waxay qoys dhan ka badbaadisaa gaajada iyo cunto la\'aanta.'
                    : 'Providing guaranteed monthly food parcels of staples (flour, rice, cooking oil, sugar, milk) alongside emergency medical assistance to vulnerable low-income households.'}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {[
                    language === 'so' ? '25kg Bariis & 25kg Bur tayo leh' : '25kg Rice & 25kg Quality Flour',
                    language === 'so' ? '10kg Sonkor & 5L Saliidda cuntada' : '10kg Sugar & 5L Pure Cooking Oil',
                    language === 'so' ? 'Caano budo ah oo carruurta loogu talagalay' : 'Fortified powder milk for children',
                    language === 'so' ? 'Dayactirka hoyga iyo kaalmada biyaha' : 'Shelter restoration & clean water'
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-stone-700">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    id="pillar-donate-danyar-btn"
                    onClick={() => onOpenDonate('danyar')}
                    className="px-5 py-2.5 rounded-xl font-bold text-sm bg-amber-600 hover:bg-amber-700 text-white shadow-sm flex items-center gap-2"
                  >
                    <Package className="w-4 h-4" />
                    <span>{language === 'so' ? 'Ku Deeq Xirmo Raashin ($50)' : 'Donate Food Basket ($50)'}</span>
                  </button>

                  <button
                    id="pillar-request-danyar-btn"
                    onClick={() => onOpenRequest('danyar')}
                    className="px-5 py-2.5 rounded-xl font-bold text-sm border border-stone-300 text-stone-800 hover:bg-stone-100"
                  >
                    {language === 'so' ? 'Codso Raashin Danyar' : 'Request Food Aid'}
                  </button>

                  <button
                    onClick={() => handleListenPillar(
                      language === 'so'
                        ? "Xirmada raashinka danyarta waxay ka kooban tahay bariis, bur, sonkor, saliid iyo caano ku filan qoys muddo bil ah, oo qiimaheedu yahay konton doolar."
                        : "The food basket contains 25kg rice, 25kg flour, sugar, oil and milk sufficient for a family for a month at 50 dollars."
                    )}
                    className="p-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-100"
                    title="Dhageyso faahfaahinta"
                  >
                    <Volume2 className="w-4 h-4 text-amber-700" />
                  </button>
                </div>
              </div>

              {/* Basket Breakdown illustration */}
              <div className="lg:col-span-5 bg-amber-50/80 rounded-2xl p-5 border border-amber-200">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-3">
                  {language === 'so' ? 'Waxyaabaha Xirmada Raashinka ku jira' : 'Food Parcel Breakdown ($50)'}
                </div>
                <div className="space-y-2.5">
                  <div className="bg-white p-3 rounded-lg border border-amber-100 flex items-center justify-between text-xs">
                    <span className="font-semibold text-stone-800">Bariis Tayo leh (Rice)</span>
                    <span className="font-bold text-amber-800">25 KG</span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-amber-100 flex items-center justify-between text-xs">
                    <span className="font-semibold text-stone-800">Bur Qamadi ah (Wheat Flour)</span>
                    <span className="font-bold text-amber-800">25 KG</span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-amber-100 flex items-center justify-between text-xs">
                    <span className="font-semibold text-stone-800">Saliidda Cuntada (Cooking Oil)</span>
                    <span className="font-bold text-amber-800">5 Litir</span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-amber-100 flex items-center justify-between text-xs">
                    <span className="font-semibold text-stone-800">Sonkor Cad (Sugar)</span>
                    <span className="font-bold text-amber-800">10 KG</span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-amber-100 flex items-center justify-between text-xs">
                    <span className="font-semibold text-stone-800">Caano Budo ah (Milk Powder)</span>
                    <span className="font-bold text-amber-800">2.5 KG</span>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-amber-200 flex justify-between items-center text-xs">
                  <span className="font-medium text-stone-700">{language === 'so' ? 'Bixinta tooska ah ee suuqa:' : 'Direct market price:'}</span>
                  <span className="font-extrabold text-amber-900 text-sm">$50 Qoyskiiba</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pillar 3: Cuuryaanta */}
        {selectedPillar === 'cuuryaan' && (
          <div className={`rounded-2xl border p-6 sm:p-8 shadow-sm transition-all ${
            highContrast ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-stone-200'
          }`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-700 mb-2">
                  <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping" />
                  <span>Xorriyadda Dhaqdhaqaaqa & Xushmadda</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-3">
                  {language === 'so'
                    ? 'Adeegyada Cuuryaanta & Qalabka Socodka'
                    : 'Mobility Equipment & Disability Services'}
                </h3>
                <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-6">
                  {language === 'so'
                    ? 'Qofka naafada ah ee aan haysan kursi curyaan wuxuu ku xayiran yahay guriga dhexdiisa. Bixinta kursi curyaan ama biro socod waxay qofka siisaa fursad uu dib ugu bilaabo waxbarashadiisa ama shaqadiisa.'
                    : 'Providing wheelchairs, crutches, walking frames, hearing aids, and physical therapy sessions to restore independence, mobility, and dignified livelihood.'}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {[
                    language === 'so' ? 'Kuraas curyaan oo dhulka adag ku habboon' : 'Rough-terrain durable manual wheelchairs',
                    language === 'so' ? 'Biraha socodka ee gacmaha (Crutches)' : 'Ergonomic elbow crutches & walking aids',
                    language === 'so' ? 'Daweynta dabiiciga ah (Physiotherapy)' : 'Physical rehabilitation & recovery sessions',
                    language === 'so' ? 'Tababarrada farsamada gacanta & IT' : 'Vocational empowerment & digital skills'
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-stone-700">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    id="pillar-donate-cuuryaan-btn"
                    onClick={() => onOpenDonate('cuuryaan')}
                    className="px-5 py-2.5 rounded-xl font-bold text-sm bg-teal-700 hover:bg-teal-800 text-white shadow-sm flex items-center gap-2"
                  >
                    <Accessibility className="w-4 h-4" />
                    <span>{language === 'so' ? 'Ku Deeq Kursi Curyaan ($85)' : 'Sponsor a Wheelchair ($85)'}</span>
                  </button>

                  <button
                    id="pillar-request-cuuryaan-btn"
                    onClick={() => onOpenRequest('cuuryaan')}
                    className="px-5 py-2.5 rounded-xl font-bold text-sm border border-stone-300 text-stone-800 hover:bg-stone-100"
                  >
                    {language === 'so' ? 'Codso Kursi ama Qalab' : 'Request Wheelchair / Aid'}
                  </button>

                  <button
                    onClick={() => handleListenPillar(
                      language === 'so'
                        ? "Adeegga cuuryaanta wuxuu bixiyaa kuraasta curyaanka iyo qalabka socodka oo bilaash ah si qofka naafada ah uu u helo dhaqdhaqaaq iyo nolol madax-bannaan."
                        : "Our disability service delivers free wheelchairs and mobility gear to restore mobility and human dignity."
                    )}
                    className="p-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-100"
                    title="Dhageyso faahfaahinta"
                  >
                    <Volume2 className="w-4 h-4 text-teal-700" />
                  </button>
                </div>
              </div>

              {/* Disability Gear Showcase */}
              <div className="lg:col-span-5 bg-teal-50/80 rounded-2xl p-5 border border-teal-200">
                <div className="text-xs font-bold uppercase tracking-wider text-teal-900 mb-3">
                  {language === 'so' ? 'Qalabka Cuuryaanka ee La Bixiyo' : 'Mobility Aids Catalog'}
                </div>
                <div className="space-y-2.5">
                  <div className="bg-white p-3 rounded-lg border border-teal-100 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-stone-800">Kursiga Curyaanka ee Caadiga ah</div>
                      <div className="text-[11px] text-stone-500">Standard Folding Wheelchair</div>
                    </div>
                    <span className="font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded">$85</span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-teal-100 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-stone-800">Biraha Socodka ee Gacmaha (Lamaan)</div>
                      <div className="text-[11px] text-stone-500">Pair of Elbow Crutches</div>
                    </div>
                    <span className="font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded">$25</span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-teal-100 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-stone-800">Qalabka Maqalka ee Casriga ah</div>
                      <div className="text-[11px] text-stone-500">Digital Hearing Aid Device</div>
                    </div>
                    <span className="font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded">$60</span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-teal-100 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-stone-800">Xirmooyinka Daweynta Dabiiciga ah</div>
                      <div className="text-[11px] text-stone-500">Physical Therapy Sessions (1 Mo)</div>
                    </div>
                    <span className="font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded">$45</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
