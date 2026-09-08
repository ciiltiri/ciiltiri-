import React from 'react';
import { Heart, Accessibility, Users, HandHeart, ShieldCheck, Phone, Mail, MapPin } from 'lucide-react';
import { Language, TRANSLATIONS } from '../utils/translations';

interface FooterProps {
  language: Language;
  onOpenDonate: () => void;
  onOpenRequest: () => void;
  highContrast: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onOpenDonate,
  onOpenRequest,
  highContrast
}) => {
  const t = TRANSLATIONS[language];

  return (
    <footer className={`border-t ${
      highContrast ? 'bg-black text-stone-300 border-zinc-800' : 'bg-stone-900 text-stone-400 border-stone-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: About */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 text-white font-extrabold text-xl mb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center text-white">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <span>XARUNTA CIILTIRI</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed mb-4 max-w-md">
              {language === 'so'
                ? 'Xarunta Ciiltiri ee degmada Garasbaaley waa madal u taagan daryeelka agoonta, garab-istaagga qoysaska danyarta ah ee ku nool xeryaha barakacayaasha, iyo bixinta kuraasta iyo qalabka socodka dadka naafada ah (cuuryaanta). Tel: 611466747.'
                : 'Ciiltiri Humanitarian Center based in Garasbaaley district, Mogadishu. Serving orphans, destitute families, and providing wheelchairs & mobility aids. Tel: 611466747.'}
            </p>
            <div className="flex items-center gap-3 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Xarunta Garasbaaley: Deeqaha waxaa loo maamulaa si toos ah oo la baaray.</span>
            </div>
          </div>

          {/* Col 2: Adeegyada (Services) */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">
              {language === 'so' ? 'Adeegyada Muhiimka ah' : 'Key Programs'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Users className="w-3.5 h-3.5 text-emerald-500" />
                <span>{language === 'so' ? 'Kafalada Agoonta ($35/bi)' : 'Orphan Sponsorship'}</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-white transition-colors">
                <HandHeart className="w-3.5 h-3.5 text-amber-500" />
                <span>{language === 'so' ? 'Raashinka Danyarta ($50/bi)' : 'Family Food Relief'}</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Accessibility className="w-3.5 h-3.5 text-teal-500" />
                <span>{language === 'so' ? 'Kuraasta Curyaanka ($85)' : 'Wheelchair Distributions'}</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-white transition-colors">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                <span>{language === 'so' ? 'Daweynta Dabiiciga ah' : 'Physical Therapy'}</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Direct Numbers */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-3">
              {language === 'so' ? 'La Xiriir / Xisaabaadka' : 'Helpline & Accounts'}
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Tel: 611466747</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>EVC Plus: *712*611466747#</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Zaad / Sahal: 611466747</span>
              </div>
              <div className="flex items-center gap-2 text-stone-400">
                <MapPin className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                <span>Degmada Garasbaaley, Muqdisho</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-stone-800 text-center text-xs text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            © {new Date().getFullYear()} Gargaar & Daryeel. Xuquuqda oo dhan waa dhowran tahay.
          </div>
          <div className="flex items-center gap-3">
            <button onClick={onOpenRequest} className="hover:text-emerald-400 transition-colors">
              {language === 'so' ? 'Codso Gargaar' : 'Request Aid'}
            </button>
            <span>•</span>
            <button onClick={onOpenDonate} className="hover:text-emerald-400 transition-colors">
              {language === 'so' ? 'Ku Deeq Sadaqo' : 'Contribute'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
