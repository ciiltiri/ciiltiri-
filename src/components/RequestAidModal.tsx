import React, { useState } from 'react';
import { 
  X, 
  HandHeart, 
  Accessibility, 
  Users, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  AlertCircle,
  FileText
} from 'lucide-react';
import { AssistanceRequest, BeneficiaryCategory, UrgentLevel } from '../types';
import { Language, TRANSLATIONS } from '../utils/translations';

interface RequestAidModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  initialCategory?: BeneficiaryCategory | string;
  onSubmitRequest: (req: AssistanceRequest) => void;
}

export const RequestAidModal: React.FC<RequestAidModalProps> = ({
  isOpen,
  onClose,
  language,
  initialCategory = 'danyar',
  onSubmitRequest
}) => {
  const t = TRANSLATIONS[language];

  const [category, setCategory] = useState<BeneficiaryCategory>(
    (initialCategory === 'agoon' || initialCategory === 'cuuryaan') ? initialCategory : 'danyar'
  );
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Muqdisho');
  const [needType, setNeedType] = useState(
    initialCategory === 'cuuryaan' ? 'Kursi Curyaan / Qalab Socod' : 
    initialCategory === 'agoon' ? 'Kafalo & Waxbarasho Agoon' : 'Xirmo Raashin Bille ah'
  );
  const [details, setDetails] = useState('');
  const [urgentLevel, setUrgentLevel] = useState<UrgentLevel>('degdeg');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !details.trim()) {
      alert(language === 'so' ? 'Fadlan buuxi magaca, taleefanka, iyo sharaxaadda.' : 'Please fill in name, phone, and details.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedId = `GAR-${Math.floor(1000 + Math.random() * 9000)}`;
      const newRequest: AssistanceRequest = {
        id: generatedId,
        fullName,
        phone,
        category,
        city,
        needType,
        details,
        urgentLevel,
        status: 'la_gudbiyay',
        submittedDate: new Date().toISOString().split('T')[0]
      };

      onSubmitRequest(newRequest);
      setIsSubmitting(false);
      setSubmittedRef(generatedId);
    }, 600);
  };

  const handleResetAndClose = () => {
    setSubmittedRef(null);
    setFullName('');
    setPhone('');
    setDetails('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-stone-200 relative my-8 animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={handleResetAndClose}
          className="absolute right-4 top-4 p-2 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
          aria-label="Xir foomka"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedRef ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-bold text-stone-900 mb-2">
              {language === 'so' ? 'Codsigaaga Waa La Diiwaangeliyay!' : 'Request Successfully Submitted!'}
            </h3>

            <p className="text-stone-600 text-sm mb-5 leading-relaxed max-w-md mx-auto">
              {language === 'so'
                ? 'Mahadsanid. Codsigaaga waxaa la siiyay lambar tixraac ah. Kooxda baarista iyo gargaarka ayaa si degdeg ah kula soo xiriiri doonta lambarka aad reebtay.'
                : 'Thank you. Your aid application is logged. Our regional humanitarian coordination team will verify and contact you via your phone.'}
            </p>

            <div className="bg-stone-100 p-4 rounded-xl max-w-xs mx-auto mb-6 border border-stone-200">
              <div className="text-xs uppercase font-bold text-stone-500">
                {language === 'so' ? 'Lambarka Tixraaca (Ref ID)' : 'Reference Tracking ID'}
              </div>
              <div className="text-xl font-extrabold text-emerald-700 tracking-wider mt-1">
                #{submittedRef}
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="px-6 py-2.5 rounded-xl font-bold text-sm bg-emerald-700 hover:bg-emerald-800 text-white"
            >
              {language === 'so' ? 'Waan Fahmay / Xir' : 'Done & Close'}
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">
              <FileText className="w-4 h-4" />
              <span>{t.reqTitle}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 mb-1">
              {language === 'so' ? 'Codso Gargaar, Raashin ama Kursi Curyaan' : 'Apply for Assistance & Mobility Care'}
            </h3>

            <p className="text-stone-600 text-xs sm:text-sm mb-5">
              {t.reqSub}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Category Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  {t.categoryLabel} *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setCategory('agoon');
                      setNeedType('Kafalo & Waxbarasho Agoon');
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-all ${
                      category === 'agoon'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800 ring-1 ring-emerald-500'
                        : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>Agoon</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCategory('danyar');
                      setNeedType('Xirmo Raashin Bille ah');
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-all ${
                      category === 'danyar'
                        ? 'bg-amber-50 border-amber-500 text-amber-800 ring-1 ring-amber-500'
                        : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <HandHeart className="w-3.5 h-3.5" />
                    <span>Danyar</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCategory('cuuryaan');
                      setNeedType('Kursi Curyaan / Qalab Socod');
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition-all ${
                      category === 'cuuryaan'
                        ? 'bg-teal-50 border-teal-500 text-teal-800 ring-1 ring-teal-500'
                        : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <Accessibility className="w-3.5 h-3.5" />
                    <span>Cuuryaan</span>
                  </button>
                </div>
              </div>

              {/* Full Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {t.fullNameLabel} *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={language === 'so' ? 'Tusaale: Axmed Cabdi Xasan' : 'e.g. Ahmed Abdi Hassan'}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {t.phoneLabel} *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="061XXXXXXX / 063XXXXXXX"
                      className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* City & Need Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {t.cityLabel} *
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="Muqdisho">Muqdisho (Banaadir)</option>
                    <option value="Hargeysa">Hargeysa (Maroodi-jeex)</option>
                    <option value="Garoowe">Garoowe (Nugaal)</option>
                    <option value="Baydhabo">Baydhabo (Bay)</option>
                    <option value="Kismaayo">Kismaayo (Jubbada Hoose)</option>
                    <option value="Baladweyne">Baladweyne (Hiiraan)</option>
                    <option value="Borama">Boorama (Awdal)</option>
                    <option value="Gaalkacyo">Gaalkacyo (Mudug)</option>
                    <option value="Dhuusamareeb">Dhuusamareeb (Galgaduud)</option>
                    <option value="Jowhar">Jowhar (Shabeellaha Dhexe)</option>
                    <option value="Deegaan kale">Magaalo / Deegaan Kale</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {t.needTypeLabel} *
                  </label>
                  <select
                    value={needType}
                    onChange={(e) => setNeedType(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="Kursi Curyaan / Qalab Socod">{t.needWheelchair}</option>
                    <option value="Xirmo Raashin Bille ah">{t.needFood}</option>
                    <option value="Kafalo & Waxbarasho Agoon">{t.needEducation}</option>
                    <option value="Daaweyn & Daryeel Caafimaad">{t.needMedical}</option>
                    <option value="Hoy & Kaalmo Dhaqaale">{t.needShelter}</option>
                  </select>
                </div>
              </div>

              {/* Details Textarea */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {t.detailsLabel} *
                </label>
                <textarea
                  rows={3}
                  required
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder={t.detailsPlaceholder}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              {/* Urgency */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-xs font-semibold text-stone-700">
                  {language === 'so' ? 'Heerka Degdegga ah:' : 'Urgency Level:'}
                </span>
                <div className="flex items-center gap-2 text-xs font-bold">
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="radio"
                      name="urgency"
                      checked={urgentLevel === 'degdeg'}
                      onChange={() => setUrgentLevel('degdeg')}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-red-600 font-bold">{language === 'so' ? 'Aad u Degdeg' : 'Critical'}</span>
                  </label>
                  <label className="flex items-center gap-1 cursor-pointer ml-3">
                    <input
                      type="radio"
                      name="urgency"
                      checked={urgentLevel === 'dhexdhexaad'}
                      onChange={() => setUrgentLevel('dhexdhexaad')}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-stone-700">{language === 'so' ? 'Dhexdhexaad' : 'Standard'}</span>
                  </label>
                </div>
              </div>

              {/* Submit Action */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl font-bold text-sm bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isSubmitting ? t.submitting : t.submitRequest}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
