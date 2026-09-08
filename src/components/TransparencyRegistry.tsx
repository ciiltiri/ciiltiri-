import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  Clock, 
  Heart, 
  FileText, 
  Sparkles,
  Users,
  HandHeart,
  Accessibility,
  ArrowUpRight
} from 'lucide-react';
import { AssistanceRequest, DonationRecord } from '../types';
import { Language, TRANSLATIONS } from '../utils/translations';

interface TransparencyRegistryProps {
  requests: AssistanceRequest[];
  donations: DonationRecord[];
  language: Language;
  highContrast: boolean;
  onOpenDonate: () => void;
}

export const TransparencyRegistry: React.FC<TransparencyRegistryProps> = ({
  requests,
  donations,
  language,
  highContrast,
  onOpenDonate
}) => {
  const t = TRANSLATIONS[language];
  const [activeTab, setActiveTab] = useState<'requests' | 'donations'>('requests');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const getStatusBadge = (status: AssistanceRequest['status']) => {
    switch (status) {
      case 'la_fuliyay':
        return {
          label: language === 'so' ? 'La Fuliyay' : 'Fulfilled',
          style: 'bg-emerald-100 text-emerald-800 border-emerald-300'
        };
      case 'la_ogolaaday':
        return {
          label: language === 'so' ? 'La Ogolaaday' : 'Approved',
          style: 'bg-blue-100 text-blue-800 border-blue-300'
        };
      case 'dib_u_eegis':
        return {
          label: language === 'so' ? 'Dib u Eegis' : 'In Review',
          style: 'bg-amber-100 text-amber-800 border-amber-300'
        };
      default:
        return {
          label: language === 'so' ? 'Codsiga cusub' : 'Registered',
          style: 'bg-stone-200 text-stone-700 border-stone-300'
        };
    }
  };

  const filteredRequests = requests.filter((r) => {
    const matchesCat = filterCategory === 'all' || r.category === filterCategory;
    const matchesSearch = searchTerm.trim() === '' ||
      r.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section className="py-12 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{language === 'so' ? 'Hufnaan & Diiwaanka Bulshada' : 'Public Aid Ledger & Transparency'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">
              {t.registryTitle}
            </h2>
            <p className="text-stone-600 text-sm mt-1 max-w-xl">
              {t.registrySub}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="registry-tab-requests"
              onClick={() => setActiveTab('requests')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'requests'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {language === 'so' ? `Diiwaanka Codsiyada (${requests.length})` : `Applications (${requests.length})`}
            </button>

            <button
              id="registry-tab-donations"
              onClick={() => setActiveTab('donations')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'donations'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {language === 'so' ? `Deeqaha La Bixiyay (${donations.length})` : `Donation Stream (${donations.length})`}
            </button>
          </div>
        </div>

        {activeTab === 'requests' ? (
          <div>
            {/* Search and Category Filter for Requests */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {[
                  { id: 'all', label: t.filterAll },
                  { id: 'agoon', label: t.filterAgoon },
                  { id: 'danyar', label: t.filterDanyar },
                  { id: 'cuuryaan', label: t.filterCuuryaan },
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setFilterCategory(c.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                      filterCategory === c.id
                        ? 'bg-stone-800 text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={language === 'so' ? 'Raadi tixraac, magaalo...' : 'Search ref, city...'}
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl text-xs border border-stone-300 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Requests Table */}
            <div className="overflow-x-auto rounded-2xl border border-stone-200">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-stone-100/90 text-stone-700 font-bold uppercase text-[11px] tracking-wider border-b border-stone-200">
                  <tr>
                    <th className="py-3 px-4">Tixraaca</th>
                    <th className="py-3 px-4">Magaca & Goobta</th>
                    <th className="py-3 px-4">Qaybta</th>
                    <th className="py-3 px-4">Baahida</th>
                    <th className="py-3 px-4">Heerka</th>
                    <th className="py-3 px-4">Xaaladda</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredRequests.map((req) => {
                    const badge = getStatusBadge(req.status);
                    return (
                      <tr key={req.id} className="hover:bg-stone-50/80 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-emerald-800">
                          #{req.id}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-stone-900">{req.fullName}</div>
                          <div className="text-[11px] text-stone-500">{req.city}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded capitalize ${
                            req.category === 'agoon' ? 'bg-emerald-100 text-emerald-800' :
                            req.category === 'danyar' ? 'bg-amber-100 text-amber-800' : 'bg-teal-100 text-teal-800'
                          }`}>
                            {req.category}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 max-w-xs">
                          <div className="font-medium text-stone-800 line-clamp-1">{req.needType}</div>
                          <div className="text-[11px] text-stone-500 line-clamp-1">{req.details}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`text-[11px] font-bold ${
                            req.urgentLevel === 'degdeg' ? 'text-red-600' : 'text-stone-600'
                          }`}>
                            {req.urgentLevel === 'degdeg' ? 'Degdeg' : 'Dhexdhexaad'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded-full border ${badge.style}`}>
                            {badge.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Recent Donations Stream */
          <div className="space-y-3">
            {donations.map((don) => (
              <div
                key={don.id}
                className="p-4 rounded-2xl border border-stone-200 bg-stone-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Heart className="w-5 h-5 fill-emerald-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-900 text-sm sm:text-base">{don.donorName}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase bg-stone-200 text-stone-700">
                        {don.paymentMethod.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {don.beneficiaryName ? (
                        <span>
                          {language === 'so' ? 'Loo bixiyay:' : 'Designated for:'} <strong>{don.beneficiaryName}</strong>
                        </span>
                      ) : (
                        <span>{language === 'so' ? 'Sanduuqa Guud ee Gargaarka' : 'General Relief Fund'}</span>
                      )}
                      {don.message && <span className="italic ml-2">"{don.message}"</span>}
                    </p>
                  </div>
                </div>

                <div className="text-right flex sm:flex-col items-center sm:items-end justify-between">
                  <div className="text-lg font-black text-emerald-700">+${don.amount} USD</div>
                  <div className="text-[11px] text-stone-400 font-mono">{don.date} • {don.transactionRef}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
