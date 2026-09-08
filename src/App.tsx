/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ThreePillars } from './components/ThreePillars';
import { BeneficiaryList } from './components/BeneficiaryList';
import { WheelchairHub } from './components/WheelchairHub';
import { TransparencyRegistry } from './components/TransparencyRegistry';
import { RequestAidModal } from './components/RequestAidModal';
import { DonationModal } from './components/DonationModal';
import { RegistrationPortal } from './components/RegistrationPortal';
import { Footer } from './components/Footer';

import { Beneficiary, AssistanceRequest, DonationRecord, BeneficiaryCategory, CenterRegistration } from './types';
import { INITIAL_BENEFICIARIES, RECENT_DONATIONS } from './data/mockData';
import { Language, TRANSLATIONS } from './utils/translations';

export default function App() {
  const [language, setLanguage] = useState<Language>('so');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [highContrast, setHighContrast] = useState<boolean>(false);

  // Initial Seed Registrations for Xarunta Ciiltiri Garasbaaley
  const INITIAL_REGISTRATIONS: CenterRegistration[] = [
    {
      id: 'CLT-GB-1021',
      fullName: 'Xasan Cali Maxamed',
      age: 8,
      gender: 'rag',
      phone: '0615598210',
      registrationType: 'agoon',
      subDistrict: 'Garasbaaley, Muqdisho',
      campOrVillage: 'Kaamka Weydow (Garasbaaley)',
      guardianName: 'Xaawo Maxamed Nuur',
      guardianPhone: '0615598210',
      educationLevel: 'Dugsi Hoose (Fasalka 2aad)',
      registeredDate: '2026-09-02',
      status: 'la_diiwaangeliyay',
      notes: 'Aabaha wuxuu ku geeriyooday shil gaari, qoysku waxay u baahan yihiin kafaalo waxbarasho.'
    },
    {
      id: 'CLT-GB-1022',
      fullName: 'Faadumo Nuur Cilmi',
      age: 19,
      gender: 'dumar',
      phone: '0611466747',
      registrationType: 'cuuryaan',
      subDistrict: 'Garasbaaley, Muqdisho',
      campOrVillage: 'Siinka Dheer (Garasbaaley)',
      disabilityDetails: 'Naafonimada labada lugood tan iyo yaraantii',
      mobilityAidNeeded: 'Kursi Curyaan (Wheelchair)',
      registeredDate: '2026-08-29',
      status: 'kaalmo_heshay',
      notes: 'Waxaa lagu wareejiyay kursi curyaan cusub bishii hore.'
    },
    {
      id: 'CLT-GB-1023',
      fullName: 'Shariifo Maxamed Warsame',
      age: 42,
      gender: 'dumar',
      phone: '0619983411',
      registrationType: 'danyar',
      subDistrict: 'Garasbaaley, Muqdisho',
      campOrVillage: 'Kaamka Deeqle (Garasbaaley)',
      familyMembersCount: 6,
      registeredDate: '2026-09-05',
      status: 'la_diiwaangeliyay',
      notes: 'Qoys danyar ah oo ku nool waab cooshad ah, baahi weyn u qaba raashinka aasaasiga ah.'
    },
    {
      id: 'CLT-GB-1024',
      fullName: 'Axmed Cabdi Jaamac',
      age: 34,
      gender: 'rag',
      phone: '0617789012',
      registrationType: 'cuuryaan',
      subDistrict: 'Garasbaaley, Muqdisho',
      campOrVillage: 'Buulo Eelaay (Garasbaaley)',
      disabilityDetails: 'Dhaawac lugta bidix ka gaaray, socodka ku dhiban',
      mobilityAidNeeded: 'Biraha Socodka ee Gacmaha (Crutches)',
      registeredDate: '2026-09-06',
      status: 'baaritaanka_socda'
    }
  ];

  // Core Dynamic Data States (with localStorage persistence)
  const [registrations, setRegistrations] = useState<CenterRegistration[]>(() => {
    const saved = localStorage.getItem('ciiltiri_registrations');
    return saved ? JSON.parse(saved) : INITIAL_REGISTRATIONS;
  });

  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>(() => {
    const saved = localStorage.getItem('gargaar_beneficiaries');
    return saved ? JSON.parse(saved) : INITIAL_BENEFICIARIES;
  });

  const [requests, setRequests] = useState<AssistanceRequest[]>(() => {
    const saved = localStorage.getItem('gargaar_requests');
    return saved ? JSON.parse(saved) : [
      {
        id: 'GAR-4102',
        fullName: 'Faadumo Xuseen Warsame',
        phone: '0615598210',
        category: 'agoon',
        city: 'Garasbaaley, Muqdisho',
        needType: 'Kafalo & Waxbarasho Agoon',
        details: 'Waxaan hayaa 3 carruur agoon ah oo ku nool Kaamka Weydow ee Garasbaaley.',
        urgentLevel: 'degdeg',
        status: 'la_ogolaaday',
        submittedDate: '2026-09-02'
      },
      {
        id: 'GAR-4103',
        fullName: 'Cabdi Nuur Cilmi',
        phone: '0611466747',
        category: 'cuuryaan',
        city: 'Garasbaaley, Muqdisho',
        needType: 'Kursi Curyaan / Qalab Socod',
        details: 'Waxaan degganahay Siinka Dheer ee Garasbaaley, waxaan u baahanahay kursi curyaan si aan u socdo.',
        urgentLevel: 'degdeg',
        status: 'la_fuliyay',
        submittedDate: '2026-08-29'
      },
      {
        id: 'GAR-4104',
        fullName: 'Shariifo Maxamed',
        phone: '0619983411',
        category: 'danyar',
        city: 'Garasbaaley, Muqdisho',
        needType: 'Xirmo Raashin Bille ah',
        details: 'Qoys danyar ah oo ku nool Kaamka Deeqle ee Garasbaaley, baahi weyn u qaba raashinka aasaasiga ah.',
        urgentLevel: 'dhexdhexaad',
        status: 'dib_u_eegis',
        submittedDate: '2026-09-05'
      }
    ];
  });

  const [donations, setDonations] = useState<DonationRecord[]>(() => {
    const saved = localStorage.getItem('gargaar_donations');
    return saved ? JSON.parse(saved) : RECENT_DONATIONS;
  });

  // Modals state
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState<string | undefined>(undefined);
  const [targetBeneficiary, setTargetBeneficiary] = useState<Beneficiary | null>(null);

  // Notification Banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('ciiltiri_registrations', JSON.stringify(registrations));
  }, [registrations]);

  useEffect(() => {
    localStorage.setItem('gargaar_beneficiaries', JSON.stringify(beneficiaries));
  }, [beneficiaries]);

  useEffect(() => {
    localStorage.setItem('gargaar_requests', JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    localStorage.setItem('gargaar_donations', JSON.stringify(donations));
  }, [donations]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4500);
  };

  const handleAddRegistration = (newReg: CenterRegistration) => {
    setRegistrations([newReg, ...registrations]);
    showToast(
      language === 'so'
        ? `Guul! Qofka si toos ah ayaa loogu diiwaangeliyay Xarunta Ciiltiri (Garasbaaley). Kaarka: #${newReg.id}`
        : `Enrolled into Ciiltiri Center Garasbaaley! ID Card: #${newReg.id}`
    );
  };

  const handleOpenDonate = (category?: string, beneficiary?: Beneficiary) => {
    setModalCategory(category);
    setTargetBeneficiary(beneficiary || null);
    setDonateModalOpen(true);
  };

  const handleOpenRequest = (category?: string) => {
    setModalCategory(category);
    setRequestModalOpen(true);
  };

  const handleCompleteDonation = (newDonation: DonationRecord) => {
    setDonations([newDonation, ...donations]);

    // If donation was for a specific beneficiary, update their progress
    if (newDonation.beneficiaryId) {
      setBeneficiaries(prev =>
        prev.map(b => {
          if (b.id === newDonation.beneficiaryId) {
            const newRaised = b.raisedAmount + newDonation.amount;
            return {
              ...b,
              raisedAmount: newRaised,
              donorsCount: b.donorsCount + 1,
              status: newRaised >= b.targetAmount ? 'sponsored' : b.status
            };
          }
          return b;
        })
      );
    }

    showToast(
      language === 'so'
        ? `Jazaakallahu Khayran! Deeqdaadii $${newDonation.amount} USD si buuxda ayaa loo diiwaangeliyay.`
        : `Thank you! Your donation of $${newDonation.amount} USD has been processed.`
    );
  };

  const handleSubmitRequest = (newRequest: AssistanceRequest) => {
    setRequests([newRequest, ...requests]);
    showToast(
      language === 'so'
        ? `Codsigaaga (#${newRequest.id}) waa la gudbiyay! Kooxda ayaa kula soo xiriiri doonta.`
        : `Your application (#${newRequest.id}) is logged for verification.`
    );
  };

  const handleCategorySelectFromHero = (category: string) => {
    setSelectedCategory(category);
    setActiveTab(category);
  };

  // Font Size CSS mapping
  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'large':
        return 'text-lg';
      case 'xlarge':
        return 'text-xl';
      default:
        return 'text-base';
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${
      highContrast ? 'bg-zinc-950 text-white' : 'bg-stone-50 text-stone-900'
    } ${getFontSizeClass()}`}>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm p-4 rounded-xl bg-emerald-800 text-white shadow-xl flex items-center gap-3 border border-emerald-600 animate-in slide-in-from-bottom duration-200">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
          <p className="text-xs sm:text-sm font-semibold leading-snug">{toastMessage}</p>
        </div>
      )}

      {/* Header */}
      <Header
        language={language}
        setLanguage={setLanguage}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'agoon' || tab === 'danyar' || tab === 'cuuryaan') {
            setSelectedCategory(tab);
          } else if (tab === 'home') {
            setSelectedCategory('all');
          }
        }}
        onOpenDonate={handleOpenDonate}
        onOpenRequest={handleOpenRequest}
        fontSize={fontSize}
        setFontSize={setFontSize}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* If Active Tab is Home */}
        {activeTab === 'home' && (
          <>
            <HeroSection
              language={language}
              onOpenDonate={handleOpenDonate}
              onOpenRequest={handleOpenRequest}
              onOpenRegistration={() => setActiveTab('registration')}
              onSelectCategory={handleCategorySelectFromHero}
              highContrast={highContrast}
            />

            <RegistrationPortal
              language={language}
              registrations={registrations}
              onAddRegistration={handleAddRegistration}
              highContrast={highContrast}
            />

            <ThreePillars
              language={language}
              onOpenDonate={handleOpenDonate}
              onOpenRequest={handleOpenRequest}
              highContrast={highContrast}
            />

            <BeneficiaryList
              beneficiaries={beneficiaries}
              language={language}
              onOpenDonate={handleOpenDonate}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              highContrast={highContrast}
            />

            <WheelchairHub
              language={language}
              onOpenDonate={handleOpenDonate}
              onOpenRequest={handleOpenRequest}
              highContrast={highContrast}
            />

            <TransparencyRegistry
              requests={requests}
              donations={donations}
              language={language}
              highContrast={highContrast}
              onOpenDonate={() => handleOpenDonate()}
            />
          </>
        )}

        {/* If Active Tab is Agoon (Dedicated Orphan Section) */}
        {activeTab === 'agoon' && (
          <div>
            <ThreePillars
              language={language}
              onOpenDonate={handleOpenDonate}
              onOpenRequest={handleOpenRequest}
              highContrast={highContrast}
              initialTab="agoon"
            />
            <BeneficiaryList
              beneficiaries={beneficiaries}
              language={language}
              onOpenDonate={handleOpenDonate}
              selectedCategory="agoon"
              setSelectedCategory={setSelectedCategory}
              highContrast={highContrast}
            />
          </div>
        )}

        {/* If Active Tab is Danyar (Dedicated Needy Families Section) */}
        {activeTab === 'danyar' && (
          <div>
            <ThreePillars
              language={language}
              onOpenDonate={handleOpenDonate}
              onOpenRequest={handleOpenRequest}
              highContrast={highContrast}
              initialTab="danyar"
            />
            <BeneficiaryList
              beneficiaries={beneficiaries}
              language={language}
              onOpenDonate={handleOpenDonate}
              selectedCategory="danyar"
              setSelectedCategory={setSelectedCategory}
              highContrast={highContrast}
            />
          </div>
        )}

        {/* If Active Tab is Cuuryaan (Dedicated Disability & Wheelchair Section) */}
        {activeTab === 'cuuryaan' && (
          <div>
            <WheelchairHub
              language={language}
              onOpenDonate={handleOpenDonate}
              onOpenRequest={handleOpenRequest}
              highContrast={highContrast}
            />
            <ThreePillars
              language={language}
              onOpenDonate={handleOpenDonate}
              onOpenRequest={handleOpenRequest}
              highContrast={highContrast}
              initialTab="cuuryaan"
            />
            <BeneficiaryList
              beneficiaries={beneficiaries}
              language={language}
              onOpenDonate={handleOpenDonate}
              selectedCategory="cuuryaan"
              setSelectedCategory={setSelectedCategory}
              highContrast={highContrast}
            />
          </div>
        )}

        {/* If Active Tab is Registration (Xarunta Ciiltiri Garasbaaley) */}
        {activeTab === 'registration' && (
          <div className="py-2">
            <RegistrationPortal
              language={language}
              registrations={registrations}
              onAddRegistration={handleAddRegistration}
              highContrast={highContrast}
            />
          </div>
        )}

        {/* If Active Tab is Registry (Transparency & Ledger) */}
        {activeTab === 'registry' && (
          <TransparencyRegistry
            requests={requests}
            donations={donations}
            language={language}
            highContrast={highContrast}
            onOpenDonate={() => handleOpenDonate()}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        language={language}
        onOpenDonate={() => handleOpenDonate()}
        onOpenRequest={() => handleOpenRequest()}
        highContrast={highContrast}
      />

      {/* Request Aid Application Modal */}
      <RequestAidModal
        isOpen={requestModalOpen}
        onClose={() => setRequestModalOpen(false)}
        language={language}
        initialCategory={modalCategory}
        onSubmitRequest={handleSubmitRequest}
      />

      {/* Donation Modal */}
      <DonationModal
        isOpen={donateModalOpen}
        onClose={() => {
          setDonateModalOpen(false);
          setTargetBeneficiary(null);
        }}
        language={language}
        initialCategory={modalCategory}
        targetBeneficiary={targetBeneficiary}
        onCompleteDonation={handleCompleteDonation}
      />
    </div>
  );
}
