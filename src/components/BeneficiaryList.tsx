import React, { useState } from 'react';
import { 
  Users, 
  HandHeart, 
  Accessibility, 
  MapPin, 
  ShieldCheck, 
  Heart, 
  Search, 
  Volume2, 
  AlertCircle,
  Clock,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { Beneficiary, BeneficiaryCategory } from '../types';
import { Language, TRANSLATIONS } from '../utils/translations';
import { speakText } from '../utils/accessibility';

interface BeneficiaryListProps {
  beneficiaries: Beneficiary[];
  language: Language;
  onOpenDonate: (category?: string, beneficiary?: Beneficiary) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  highContrast: boolean;
}

export const BeneficiaryList: React.FC<BeneficiaryListProps> = ({
  beneficiaries,
  language,
  onOpenDonate,
  selectedCategory,
  setSelectedCategory,
  highContrast
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBeneficiaryModal, setSelectedBeneficiaryModal] = useState<Beneficiary | null>(null);
  const t = TRANSLATIONS[language];

  // Filtering
  const filteredBeneficiaries = beneficiaries.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = searchTerm.trim() === '' || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.primaryNeed.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryBadge = (cat: BeneficiaryCategory) => {
    switch (cat) {
      case 'agoon':
        return {
          label: language === 'so' ? 'Agoon' : 'Orphan',
          icon: Users,
          style: 'bg-emerald-100 text-emerald-800 border-emerald-300'
        };
      case 'danyar':
        return {
          label: language === 'so' ? 'Danyar' : 'Needy Family',
          icon: HandHeart,
          style: 'bg-amber-100 text-amber-900 border-amber-300'
        };
      case 'cuuryaan':
        return {
          label: language === 'so' ? 'Cuuryaan / Naafo' : 'Disabled / Mobility',
          icon: Accessibility,
          style: 'bg-teal-100 text-teal-900 border-teal-300'
        };
    }
  };

  const handleSpeakBeneficiary = (b: Beneficiary) => {
    const text = language === 'so'
      ? `${b.name}, oo ku nool ${b.city}. Wuxuu u baahan yahay ${b.primaryNeed}. ${b.description}`
      : `${b.name}, residing in ${b.city}. Needs ${b.primaryNeed}. ${b.description}`;
    speakText(text, language === 'so' ? 'so-SO' : 'en-US');
  };

  return (
    <section className="py-12 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title and Search Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-stone-200 text-stone-700 mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{language === 'so' ? 'Kiisaska Tooska ah ee La Xaqiijiyay' : 'Direct Verified Beneficiaries'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
              {t.urgentCases}
            </h2>
            <p className="text-stone-600 text-sm mt-1 max-w-xl">
              {t.urgentCasesDesc}
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="beneficiary-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-xs"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6">
          {[
            { id: 'all', label: t.filterAll, count: beneficiaries.length },
            { id: 'agoon', label: t.filterAgoon, count: beneficiaries.filter(b => b.category === 'agoon').length },
            { id: 'danyar', label: t.filterDanyar, count: beneficiaries.filter(b => b.category === 'danyar').length },
            { id: 'cuuryaan', label: t.filterCuuryaan, count: beneficiaries.filter(b => b.category === 'cuuryaan').length },
          ].map((tab) => (
            <button
              key={tab.id}
              id={`filter-pill-${tab.id}`}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                selectedCategory === tab.id
                  ? highContrast
                    ? 'bg-yellow-400 text-black font-bold'
                    : 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-stone-200/80 text-stone-700 hover:bg-stone-300'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[11px] ${
                selectedCategory === tab.id ? 'bg-white/20 text-white' : 'bg-stone-300/80 text-stone-700'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Beneficiaries Grid */}
        {filteredBeneficiaries.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-stone-200">
            <AlertCircle className="w-10 h-10 text-stone-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-stone-800">
              {language === 'so' ? 'Lama helin kiis ku habboon baaritaankaaga' : 'No matching cases found'}
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              {language === 'so' ? 'Fadlan tirtir shaandheynta ama raadi erey kale' : 'Please adjust your search terms or filters'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBeneficiaries.map((b) => {
              const badge = getCategoryBadge(b.category);
              const Icon = badge.icon;
              const percent = Math.min(100, Math.round((b.raisedAmount / b.targetAmount) * 100));

              return (
                <div
                  key={b.id}
                  id={`beneficiary-card-${b.id}`}
                  className={`rounded-2xl border flex flex-col justify-between transition-all hover:shadow-md ${
                    highContrast
                      ? 'bg-zinc-900 border-zinc-700 text-white'
                      : 'bg-white border-stone-200'
                  }`}
                >
                  <div className="p-5 sm:p-6">
                    {/* Header: Category Badge + Audio Helper + Verified */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border ${badge.style}`}>
                        <Icon className="w-3.5 h-3.5" />
                        <span>{badge.label}</span>
                      </span>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleSpeakBeneficiary(b)}
                          className="p-1.5 rounded-lg border border-stone-200 text-stone-500 hover:text-emerald-700 hover:bg-stone-100 transition-colors"
                          title={t.listenStory}
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                        {b.verified && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            <ShieldCheck className="w-3 h-3" />
                            <span>{language === 'so' ? 'Xaqiijisan' : 'Verified'}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Beneficiary Name & Location */}
                    <h3 className="text-lg font-extrabold text-stone-900 line-clamp-1 mb-1">
                      {b.name}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-3">
                      <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span>{b.city}, {b.region}</span>
                      {b.age && (
                        <>
                          <span>•</span>
                          <span>{b.age} {language === 'so' ? 'jir' : 'yrs old'}</span>
                        </>
                      )}
                    </div>

                    {/* Primary Need highlight */}
                    <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200/80 mb-3">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-0.5">
                        {language === 'so' ? 'Baahida Ugu Weyn:' : 'Primary Need:'}
                      </div>
                      <div className="text-xs font-bold text-stone-900 line-clamp-1">
                        {b.primaryNeed}
                      </div>
                    </div>

                    {/* Story description */}
                    <p className="text-xs leading-relaxed text-stone-600 line-clamp-3 mb-4">
                      {b.description}
                    </p>

                    {/* Need Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {b.specificNeeds.map((need, i) => (
                        <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-stone-100 text-stone-700">
                          {need}
                        </span>
                      ))}
                    </div>

                    {/* Funding Progress Bar */}
                    <div className="space-y-1.5 mb-4">
                      <div className="flex justify-between text-xs">
                        <span className="text-stone-500 font-medium">
                          {t.raised}: <strong className="text-stone-900">${b.raisedAmount}</strong>
                        </span>
                        <span className="text-stone-500 font-medium">
                          {t.target}: <strong className="text-emerald-700">${b.targetAmount}</strong>
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden">
                        <div
                          className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[11px] text-stone-400">
                        <span>{b.donorsCount} {language === 'so' ? 'qof ayaa caawiyay' : 'donors supported'}</span>
                        <span className="font-bold text-stone-600">{percent}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="p-4 sm:p-5 pt-0 border-t border-stone-100 flex items-center gap-2">
                    <button
                      id={`detail-btn-${b.id}`}
                      onClick={() => setSelectedBeneficiaryModal(b)}
                      className="flex-1 py-2 rounded-xl text-xs font-bold border border-stone-300 text-stone-700 hover:bg-stone-100 transition-colors text-center"
                    >
                      {t.viewDetails}
                    </button>

                    <button
                      id={`sponsor-btn-${b.id}`}
                      onClick={() => onOpenDonate(b.category, b)}
                      className="flex-1 py-2 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Heart className="w-3.5 h-3.5 fill-white/20" />
                      <span>{language === 'so' ? 'Caawi Hadda' : 'Help Now'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Case Details Full Modal */}
      {selectedBeneficiaryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-stone-200 relative animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  {selectedBeneficiaryModal.id} • {selectedBeneficiaryModal.city}
                </span>
                <h3 className="text-xl font-bold text-stone-900 mt-0.5">
                  {selectedBeneficiaryModal.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedBeneficiaryModal(null)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 text-lg leading-none"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 mb-6 text-sm text-stone-700">
              <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                <div className="text-xs font-bold text-stone-500 uppercase">
                  {language === 'so' ? 'Baahida Loo Diiwaangeliyay' : 'Documented Need'}
                </div>
                <div className="text-sm font-bold text-stone-900 mt-0.5">
                  {selectedBeneficiaryModal.primaryNeed}
                </div>
              </div>

              <div>
                <div className="text-xs font-bold text-stone-500 uppercase mb-1">
                  {language === 'so' ? 'Sheekada & Xaaladda Qoyska' : 'Full Story & Situation'}
                </div>
                <p className="text-stone-700 leading-relaxed text-sm bg-stone-50/50 p-3 rounded-xl border border-stone-200">
                  {selectedBeneficiaryModal.description}
                </p>
              </div>

              {selectedBeneficiaryModal.guardianName && (
                <div className="flex justify-between items-center text-xs text-stone-600 bg-stone-100 p-2.5 rounded-lg">
                  <span className="font-medium">{language === 'so' ? 'Mas\'uulka / Wakiilka:' : 'Guardian / Caregiver:'}</span>
                  <span className="font-bold text-stone-900">{selectedBeneficiaryModal.guardianName}</span>
                </div>
              )}

              <div className="pt-2">
                <div className="flex justify-between text-xs font-bold text-stone-700 mb-1">
                  <span>{language === 'so' ? 'Xaddiga La Ururiyay' : 'Raised'}: ${selectedBeneficiaryModal.raisedAmount}</span>
                  <span>{language === 'so' ? 'Bartilmaameed' : 'Goal'}: ${selectedBeneficiaryModal.targetAmount}</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-stone-200 overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 rounded-full"
                    style={{
                      width: `${Math.min(100, Math.round((selectedBeneficiaryModal.raisedAmount / selectedBeneficiaryModal.targetAmount) * 100))}%`
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  const b = selectedBeneficiaryModal;
                  setSelectedBeneficiaryModal(null);
                  onOpenDonate(b.category, b);
                }}
                className="flex-1 py-3 rounded-xl font-bold text-sm bg-emerald-700 hover:bg-emerald-800 text-white flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4 fill-white/20" />
                <span>{language === 'so' ? 'Bixi Deeq ama Kafaalo' : 'Contribute / Sponsor'}</span>
              </button>
              <button
                onClick={() => setSelectedBeneficiaryModal(null)}
                className="px-4 py-3 rounded-xl font-bold text-sm border border-stone-300 text-stone-700 hover:bg-stone-100"
              >
                {language === 'so' ? 'Xir' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
