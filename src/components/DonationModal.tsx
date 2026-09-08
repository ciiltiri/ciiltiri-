import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  CheckCircle2, 
  Smartphone, 
  CreditCard, 
  ShieldCheck, 
  Sparkles,
  Users,
  HandHeart,
  Accessibility
} from 'lucide-react';
import { Beneficiary, BeneficiaryCategory, DonationRecord } from '../types';
import { Language, TRANSLATIONS } from '../utils/translations';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  initialCategory?: BeneficiaryCategory | string;
  targetBeneficiary?: Beneficiary | null;
  onCompleteDonation: (donation: DonationRecord) => void;
}

export const DonationModal: React.FC<DonationModalProps> = ({
  isOpen,
  onClose,
  language,
  initialCategory = 'guud',
  targetBeneficiary,
  onCompleteDonation
}) => {
  const t = TRANSLATIONS[language];

  const [amount, setAmount] = useState<number>(
    initialCategory === 'cuuryaan' ? 85 :
    initialCategory === 'agoon' ? 35 :
    initialCategory === 'danyar' ? 50 : 35
  );
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'evc_plus' | 'zaad' | 'sahal' | 'edahab' | 'card'>('evc_plus');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorName, setDonorName] = useState('');
  const [message, setMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedDonation, setCompletedDonation] = useState<DonationRecord | null>(null);

  if (!isOpen) return null;

  const handleSelectPreset = (val: number) => {
    setAmount(val);
    setCustomAmount('');
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomAmount(val);
    if (val && !isNaN(Number(val))) {
      setAmount(Number(val));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || amount <= 0) {
      alert(language === 'so' ? 'Fadlan dooro ama qor xaddiga lacagta.' : 'Please enter a valid donation amount.');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      const generatedRef = `TX-${Math.floor(10000 + Math.random() * 90000)}`;
      const newDonation: DonationRecord = {
        id: `DON-${Date.now()}`,
        donorName: donorName.trim() || (language === 'so' ? 'Muxsin Soomaaliyeed' : 'Generous Contributor'),
        phone: donorPhone,
        amount,
        currency: 'USD',
        paymentMethod,
        targetCategory: targetBeneficiary ? targetBeneficiary.category : (initialCategory as any) || 'guud',
        beneficiaryName: targetBeneficiary ? targetBeneficiary.name : undefined,
        beneficiaryId: targetBeneficiary ? targetBeneficiary.id : undefined,
        message: message.trim(),
        date: language === 'so' ? 'Haddatan' : 'Just now',
        transactionRef: generatedRef
      };

      onCompleteDonation(newDonation);
      setIsProcessing(false);
      setCompletedDonation(newDonation);
    }, 800);
  };

  const handleResetAndClose = () => {
    setCompletedDonation(null);
    setDonorPhone('');
    setDonorName('');
    setMessage('');
    onClose();
  };

  const getDialCodeNotice = () => {
    switch (paymentMethod) {
      case 'evc_plus':
        return `*712*611466747*${amount}# (Xarunta Ciiltiri)`;
      case 'zaad':
        return `*888*611466747*${amount}#`;
      case 'sahal':
        return `*800*611466747*${amount}#`;
      case 'edahab':
        return `*700*611466747*${amount}#`;
      default:
        return 'Secure Card Checkout';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-stone-200 relative my-8 animate-in fade-in zoom-in-95 duration-150">
        <button
          onClick={handleResetAndClose}
          className="absolute right-4 top-4 p-2 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
          aria-label="Xir deeqda"
        >
          <X className="w-5 h-5" />
        </button>

        {completedDonation ? (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="text-xs font-bold uppercase tracking-widest text-emerald-800 mb-1">
              {t.donationSuccessTitle}
            </div>

            <h3 className="text-2xl font-black text-stone-900 mb-2">
              ${completedDonation.amount} USD {language === 'so' ? 'Waa La Xaqiijiyay!' : 'Successfully Donated!'}
            </h3>

            <p className="text-stone-600 text-xs sm:text-sm mb-5 leading-relaxed max-w-md mx-auto">
              {language === 'so'
                ? 'Allaha kaaga abaalmariyo naxariistaada iyo deeqdaada. Sadaqadu ma yareyso xoolo, waxayna iftiimisaa mustaqbalka walaalahaaga.'
                : t.donationSuccessDesc}
            </p>

            {/* Duco & Confirmation Card */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 text-left mb-6 space-y-2">
              <div className="flex justify-between items-center text-xs pb-2 border-b border-emerald-200">
                <span className="font-semibold text-emerald-900">{language === 'so' ? 'Tixraaca Deeqda:' : 'Receipt Ref:'}</span>
                <span className="font-mono font-bold text-emerald-800">{completedDonation.transactionRef}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-stone-600">{language === 'so' ? 'Deeq-bixiyaha:' : 'Donor:'}</span>
                <span className="font-bold text-stone-900">{completedDonation.donorName}</span>
              </div>
              {completedDonation.beneficiaryName && (
                <div className="flex justify-between items-center text-xs">
                  <span className="text-stone-600">{language === 'so' ? 'Qofka Tooska loogu bixiyay:' : 'Direct Recipient:'}</span>
                  <span className="font-bold text-emerald-800">{completedDonation.beneficiaryName}</span>
                </div>
              )}
              <div className="flex justify-between items-center text-xs">
                <span className="text-stone-600">{language === 'so' ? 'Habka lacag-bixinta:' : 'Method:'}</span>
                <span className="font-bold uppercase text-stone-800">{completedDonation.paymentMethod.replace('_', ' ')}</span>
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="px-6 py-2.5 rounded-xl font-bold text-sm bg-emerald-700 hover:bg-emerald-800 text-white"
            >
              {language === 'so' ? 'Waan Aqbalay / Xir' : 'Done & Close'}
            </button>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>{t.donateModalTitle}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 mb-1">
              {targetBeneficiary
                ? `${language === 'so' ? 'Caawi' : 'Support'}: ${targetBeneficiary.name}`
                : language === 'so' ? 'Ku Deeq Sadaqo & Gargaar Toos ah' : 'Direct Sadaqah & Humanitarian Aid'}
            </h3>

            {targetBeneficiary && (
              <p className="text-xs text-stone-500 mb-4">
                {targetBeneficiary.city} • {targetBeneficiary.primaryNeed}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Preset Amounts */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                  {t.amountLabel} *
                </label>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {[
                    { val: 15, label: '$15', desc: 'Sadaqo' },
                    { val: 35, label: '$35', desc: '1 Agoon' },
                    { val: 50, label: '$50', desc: '1 Raashin' },
                    { val: 85, label: '$85', desc: '1 Kursi' },
                  ].map((preset) => (
                    <button
                      key={preset.val}
                      type="button"
                      onClick={() => handleSelectPreset(preset.val)}
                      className={`py-2 px-1 rounded-xl text-center border transition-all ${
                        amount === preset.val && !customAmount
                          ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                          : 'bg-stone-50 border-stone-200 text-stone-800 hover:bg-stone-100'
                      }`}
                    >
                      <div className="font-extrabold text-sm leading-none">{preset.label}</div>
                      <div className="text-[10px] mt-1 opacity-80">{preset.desc}</div>
                    </button>
                  ))}
                </div>

                {/* Custom Amount Input */}
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-stone-500">$</span>
                  <input
                    type="number"
                    min="1"
                    value={customAmount}
                    onChange={handleCustomChange}
                    placeholder={language === 'so' ? 'Qor xaddi kale (Tus: $25, $100, $200)' : 'Or enter custom amount ($ USD)'}
                    className="w-full pl-8 pr-4 py-2 text-sm rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Payment Methods (Mobile Money Somali standard) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  {t.paymentMethodLabel} *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'evc_plus', label: 'EVC Plus', sub: 'Hormuud' },
                    { id: 'zaad', label: 'ZAAD', sub: 'Telesom' },
                    { id: 'sahal', label: 'Sahal', sub: 'Golis' },
                    { id: 'edahab', label: 'eDahab', sub: 'Somtel' },
                    { id: 'card', label: 'Card', sub: 'Visa/Master' },
                  ].map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id as any)}
                      className={`p-2 rounded-xl text-left border transition-all ${
                        paymentMethod === method.id
                          ? 'bg-emerald-50 border-emerald-600 text-emerald-900 ring-1 ring-emerald-600'
                          : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <div className="font-bold text-xs leading-none">{method.label}</div>
                      <div className="text-[10px] text-stone-500 mt-1">{method.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Donor Phone / Number for prompt */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {paymentMethod === 'card' ? 'Email / Phone' : t.mobileNumberDonor} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                    placeholder="061XXXXXXX / 063XXXXXXX"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    {t.donorNameLabel}
                  </label>
                  <input
                    type="text"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder={language === 'so' ? 'Tus: Muxsin ama Qarsoodi' : 'e.g. Anonymous or Name'}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Message / Duco */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  {t.donorMessageLabel}
                </label>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={language === 'so' ? 'Tus: Allaha u barakeeyo, caafimaad iyo ajar' : 'e.g. May Allah bless and heal them'}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              {/* Prompt instruction box */}
              <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600 flex items-center justify-between">
                <span>{language === 'so' ? 'Habka lacag bixinta tooska ah:' : 'Payment code:'}</span>
                <span className="font-mono font-bold text-emerald-800">{getDialCodeNotice()}</span>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3 rounded-xl font-bold text-sm bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Heart className="w-4 h-4 fill-white/20" />
                  <span>
                    {isProcessing
                      ? t.processingPayment
                      : `${t.confirmDonation} ($${amount} USD)`}
                  </span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
