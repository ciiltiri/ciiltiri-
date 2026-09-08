import React, { useState } from 'react';
import { 
  Users, 
  HandHeart, 
  Accessibility, 
  UserPlus, 
  CheckCircle2, 
  Printer, 
  MapPin, 
  Phone, 
  Calendar, 
  ShieldCheck, 
  Search, 
  Sparkles, 
  FileCheck,
  QrCode,
  HeartHandshake
} from 'lucide-react';
import { CenterRegistration, BeneficiaryCategory } from '../types';
import { Language, TRANSLATIONS } from '../utils/translations';

interface RegistrationPortalProps {
  language: Language;
  registrations: CenterRegistration[];
  onAddRegistration: (reg: CenterRegistration) => void;
  highContrast: boolean;
}

export const RegistrationPortal: React.FC<RegistrationPortalProps> = ({
  language,
  registrations,
  onAddRegistration,
  highContrast
}) => {
  const t = TRANSLATIONS[language];
  const [activeFormType, setActiveFormType] = useState<BeneficiaryCategory | 'samafale'>('agoon');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  
  // Form fields
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [gender, setGender] = useState<'rag' | 'dumar'>('rag');
  const [phone, setPhone] = useState('');
  const [campOrVillage, setCampOrVillage] = useState('Kaamka Weydow');
  const [guardianName, setGuardianName] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [disabilityDetails, setDisabilityDetails] = useState('');
  const [mobilityAidNeeded, setMobilityAidNeeded] = useState('Kursi Curyaan (Wheelchair)');
  const [familyMembersCount, setFamilyMembersCount] = useState<number | ''>(5);
  const [educationLevel, setEducationLevel] = useState('Dugsi Hoose (Fasalka 2aad)');
  const [notes, setNotes] = useState('');

  // Generated Card Modal/Preview
  const [activeCard, setActiveCard] = useState<CenterRegistration | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      alert(language === 'so' ? 'Fadlan buuxi magaca iyo taleefanka.' : 'Please fill in name and phone number.');
      return;
    }

    const regId = `CLT-GB-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReg: CenterRegistration = {
      id: regId,
      fullName: fullName.trim(),
      age: Number(age) || 10,
      gender,
      phone: phone.trim(),
      registrationType: activeFormType,
      subDistrict: 'Garasbaaley, Muqdisho',
      campOrVillage: campOrVillage.trim(),
      guardianName: guardianName.trim() || undefined,
      guardianPhone: guardianPhone.trim() || undefined,
      disabilityDetails: activeFormType === 'cuuryaan' ? disabilityDetails.trim() : undefined,
      mobilityAidNeeded: activeFormType === 'cuuryaan' ? mobilityAidNeeded : undefined,
      familyMembersCount: activeFormType === 'danyar' ? (Number(familyMembersCount) || 5) : undefined,
      educationLevel: activeFormType === 'agoon' ? educationLevel : undefined,
      registeredDate: new Date().toISOString().split('T')[0],
      status: 'la_diiwaangeliyay',
      notes: notes.trim() || undefined
    };

    onAddRegistration(newReg);
    setActiveCard(newReg);

    // Reset fields
    setFullName('');
    setAge('');
    setPhone('');
    setGuardianName('');
    setGuardianPhone('');
    setDisabilityDetails('');
    setNotes('');
  };

  const filteredList = registrations.filter((r) => {
    const matchesCategory = filterType === 'all' || r.registrationType === filterType;
    const matchesSearch = searchTerm.trim() === '' ||
      r.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.campOrVillage && r.campOrVillage.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="py-10 sm:py-14 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300 mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Xarunta Ciiltiri • Garasbaaley (Tel: 611466747)</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            {t.regSectionTitle}
          </h2>

          <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-2xl mx-auto leading-relaxed">
            {t.regSectionDesc}
          </p>
        </div>

        {/* 2-Column layout: Form on the Left, Beneficiary Card & Registered Directory on the Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Column 1: Registration Form (7 cols) */}
          <div className={`lg:col-span-7 rounded-2xl border p-6 sm:p-8 shadow-sm ${
            highContrast ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-stone-200'
          }`}>
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-emerald-700" />
                <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                  {language === 'so' ? 'Diiwaangeli Qof Cusub' : 'Enroll Beneficiary'}
                </h3>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded bg-stone-100 text-stone-700 border border-stone-200">
                Garasbaaley Center
              </span>
            </div>

            {/* Type selector tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
              {[
                { id: 'agoon', label: 'Agoon', icon: Users, color: 'text-emerald-700' },
                { id: 'danyar', label: 'Danyar', icon: HandHeart, color: 'text-amber-700' },
                { id: 'cuuryaan', label: 'Cuuryaan', icon: Accessibility, color: 'text-teal-700' },
                { id: 'samafale', label: 'Samafale', icon: HeartHandshake, color: 'text-blue-700' },
              ].map((tab) => {
                const Icon = tab.icon;
                const isSelected = activeFormType === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveFormType(tab.id as any)}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold border flex flex-col items-center gap-1.5 transition-all ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-900 ring-2 ring-emerald-500/20 shadow-xs'
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${tab.color}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name & Age */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {activeFormType === 'agoon' ? 'Magaca Ilmaha Agoonka ah *' : 
                     activeFormType === 'cuuryaan' ? 'Magaca Qofka Naafada ah *' :
                     activeFormType === 'danyar' ? 'Magaca Madaxa Qoyska *' : 'Magaca Samafalaha *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Tus: Maxamed Nuur Cali"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Da'da (Age) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="110"
                    value={age}
                    onChange={(e) => setAge(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="Tus: 9"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Gender & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Lab / Dhedig (Gender)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setGender('rag')}
                      className={`py-2 text-xs font-bold rounded-xl border ${
                        gender === 'rag' ? 'bg-emerald-700 text-white border-emerald-700' : 'bg-stone-50 text-stone-700 border-stone-200'
                      }`}
                    >
                      Lab (Male)
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender('dumar')}
                      className={`py-2 text-xs font-bold rounded-xl border ${
                        gender === 'dumar' ? 'bg-emerald-700 text-white border-emerald-700' : 'bg-stone-50 text-stone-700 border-stone-200'
                      }`}
                    >
                      Dhedig (Female)
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Taleefanka Tooska ah (EVC Plus) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="061XXXXXXX"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Location in Garasbaaley */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Xaafadda ama Kaamka ee Garasbaaley *
                </label>
                <select
                  value={campOrVillage}
                  onChange={(e) => setCampOrVillage(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="Kaamka Weydow (Garasbaaley)">Kaamka Weydow (Garasbaaley)</option>
                  <option value="Siinka Dheer (Garasbaaley)">Siinka Dheer (Garasbaaley)</option>
                  <option value="Kaamka Deeqle (Garasbaaley)">Kaamka Deeqle (Garasbaaley)</option>
                  <option value="Buulo Eelaay (Garasbaaley)">Buulo Eelaay (Garasbaaley)</option>
                  <option value="Biyo Cadde (Garasbaaley)">Biyo Cadde (Garasbaaley)</option>
                  <option value="Xaafadda Daaru-salaam">Xaafadda Daaru-salaam (Garasbaaley)</option>
                  <option value="Ceelasha Biyaha">Ceelasha Biyaha (Nawaaxiga Garasbaaley)</option>
                  <option value="Deegaan kale ee Garasbaaley">Deegaan kale ee Degmada Garasbaaley</option>
                </select>
              </div>

              {/* Conditional fields for Agoon */}
              {activeFormType === 'agoon' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-200">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Magaca Hooyada / Mas'uulka
                    </label>
                    <input
                      type="text"
                      value={guardianName}
                      onChange={(e) => setGuardianName(e.target.value)}
                      placeholder="Hooyada ama Eeddada"
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Heerka Waxbarashada
                    </label>
                    <input
                      type="text"
                      value={educationLevel}
                      onChange={(e) => setEducationLevel(e.target.value)}
                      placeholder="Dugsi ma dhigto / Fasalka 3aad"
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 bg-white"
                    />
                  </div>
                </div>
              )}

              {/* Conditional fields for Cuuryaan */}
              {activeFormType === 'cuuryaan' && (
                <div className="space-y-3 p-3.5 bg-teal-50/70 rounded-xl border border-teal-200">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Nooca Naafanimada (Disability Description) *
                    </label>
                    <input
                      type="text"
                      value={disabilityDetails}
                      onChange={(e) => setDisabilityDetails(e.target.value)}
                      placeholder="Tus: Naafonimada lugaha, ma socon karo / Naafonimada aragga"
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Qalabka Socodka ee Loo Baahan Yahay
                    </label>
                    <select
                      value={mobilityAidNeeded}
                      onChange={(e) => setMobilityAidNeeded(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 bg-white"
                    >
                      <option value="Kursi Curyaan (Wheelchair)">Kursi Curyaan (Folding Wheelchair)</option>
                      <option value="Kursiga Dhulka Adag (Rough-Terrain)">Kursiga Dhulka Adag ee Ciidda</option>
                      <option value="Biraha Socodka ee Gacmaha (Crutches)">Biraha Socodka ee Gacmaha (Crutches)</option>
                      <option value="Qalabka Maqalka">Qalabka Maqalka (Hearing Aid)</option>
                      <option value="Daweynta Dabiiciga ah">Daweynta Dabiiciga ah (Physiotherapy)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Conditional fields for Danyar */}
              {activeFormType === 'danyar' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-amber-50/70 rounded-xl border border-amber-200">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Tirada Qoyska (Family Members)
                    </label>
                    <input
                      type="number"
                      value={familyMembersCount}
                      onChange={(e) => setFamilyMembersCount(e.target.value === '' ? '' : Number(e.target.value))}
                      placeholder="5"
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Baahida Koowaad
                    </label>
                    <input
                      type="text"
                      readOnly
                      value="Xirmo Raashin Bille ah (Food Basket)"
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-stone-200 bg-stone-100 font-medium"
                    />
                  </div>
                </div>
              )}

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Faahfaahin Dheeraad ah ama Xaaladda Hoyga
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Xog ku saabsan xaaladda gaarka ah..."
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                id="submit-registration-btn"
                className="w-full py-3 rounded-xl font-bold text-sm bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{language === 'so' ? 'Diiwaangeli & Soo Saari Kaarka Ciiltiri' : 'Register & Generate ID Card'}</span>
              </button>
            </form>
          </div>

          {/* Column 2: Digital ID Card Preview & Registered Beneficiaries (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Live Card Preview (Official Xarunta Ciiltiri Beneficiary Card) */}
            <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-950 text-white rounded-2xl p-6 shadow-xl border border-emerald-700 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <QrCode className="w-32 h-32" />
              </div>

              <div className="flex items-center justify-between pb-3 mb-4 border-b border-emerald-700/80">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-bold text-sm">
                    XC
                  </div>
                  <div>
                    <div className="font-extrabold text-sm tracking-wide">XARUNTA CIILTIRI</div>
                    <div className="text-[10px] text-emerald-200">Garasbaaley, Muqdisho • Tel: 611466747</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[9px] uppercase font-bold tracking-widest bg-emerald-500/30 text-emerald-200 px-2 py-0.5 rounded border border-emerald-500/40">
                    KAARKA DARYEELKA
                  </span>
                </div>
              </div>

              {activeCard ? (
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-emerald-300">Magaca Qofka</div>
                      <div className="text-lg font-black tracking-tight text-white">{activeCard.fullName}</div>
                    </div>
                    <span className="text-xs font-mono font-bold bg-white text-emerald-900 px-2 py-1 rounded">
                      #{activeCard.id}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                    <div>
                      <div className="text-[10px] text-emerald-300">Qaybta</div>
                      <div className="font-bold capitalize">{activeCard.registrationType}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-emerald-300">Da'da & Jinsiga</div>
                      <div className="font-bold">{activeCard.age} jir • {activeCard.gender}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-emerald-300">Goobta</div>
                      <div className="font-bold truncate">{activeCard.campOrVillage}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-emerald-300">Taleefanka</div>
                      <div className="font-mono font-bold">{activeCard.phone}</div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-emerald-700/60 flex items-center justify-between text-[11px] text-emerald-200">
                    <span>Xaqiijinta: Xarunta Garasbaaley</span>
                    <button
                      onClick={handlePrint}
                      className="inline-flex items-center gap-1 text-white font-bold underline hover:text-emerald-300"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>{t.printCard}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center text-emerald-200">
                  <FileCheck className="w-10 h-10 mx-auto mb-2 opacity-80" />
                  <p className="text-xs font-medium">
                    Kaarka daryeelka ee Xarunta Ciiltiri wuxuu halkan ku soo bixi doonaa isla marka aad diiwaangeliso qofka.
                  </p>
                  <p className="text-[11px] text-emerald-400 mt-1 font-semibold">
                    Xarunta: Degmada Garasbaaley | Tel: 611466747
                  </p>
                </div>
              )}
            </div>

            {/* Registered Directory summary list */}
            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-bold text-sm text-stone-900">
                    {language === 'so' ? 'Dadka La Diiwaangeliyay' : 'Registered Beneficiaries'}
                  </h4>
                  <p className="text-[11px] text-stone-500">Degmada Garasbaaley ({registrations.length} qof)</p>
                </div>

                <div className="relative w-36">
                  <Search className="w-3 h-3 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Raadi..."
                    className="w-full pl-7 pr-2 py-1 text-xs rounded-lg border border-stone-300 bg-stone-50 focus:outline-none"
                  />
                </div>
              </div>

              {/* Filter pills */}
              <div className="flex items-center gap-1.5 pb-2 mb-3 overflow-x-auto text-[11px]">
                {['all', 'agoon', 'danyar', 'cuuryaan'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`px-2.5 py-1 rounded-md font-bold whitespace-nowrap transition-colors ${
                      filterType === type
                        ? 'bg-emerald-800 text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {type === 'all' ? 'Dhammaan' : type}
                  </button>
                ))}
              </div>

              {/* Scrollable list */}
              <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                {filteredList.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setActiveCard(item)}
                    className="p-3 rounded-xl border border-stone-100 bg-stone-50 hover:bg-emerald-50/50 hover:border-emerald-200 transition-all cursor-pointer flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-stone-900 flex items-center gap-1.5">
                        <span>{item.fullName}</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded uppercase ${
                          item.registrationType === 'agoon' ? 'bg-emerald-100 text-emerald-800' :
                          item.registrationType === 'cuuryaan' ? 'bg-teal-100 text-teal-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {item.registrationType}
                        </span>
                      </div>
                      <div className="text-[11px] text-stone-500 mt-0.5">
                        {item.campOrVillage} • {item.phone}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="font-mono font-bold text-emerald-800 text-[11px]">#{item.id}</div>
                      <span className="text-[10px] text-stone-400">{item.registeredDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
