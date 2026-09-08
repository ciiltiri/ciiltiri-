export type BeneficiaryCategory = 'agoon' | 'danyar' | 'cuuryaan';

export type UrgentLevel = 'degdeg' | 'dhexdhexaad' | 'caadi';

export interface Beneficiary {
  id: string;
  name: string;
  age: number;
  category: BeneficiaryCategory;
  city: string;
  region: string;
  guardianName?: string;
  guardianPhone?: string;
  primaryNeed: string;
  description: string;
  targetAmount: number;
  raisedAmount: number;
  donorsCount: number;
  status: 'active' | 'sponsored' | 'urgent';
  urgentLevel: UrgentLevel;
  verified: boolean;
  photoPlaceholderType: 'child' | 'family' | 'mobility';
  specificNeeds: string[];
  registeredDate: string;
}

export interface AssistanceRequest {
  id: string;
  fullName: string;
  phone: string;
  category: BeneficiaryCategory;
  city: string;
  needType: string;
  details: string;
  familyMembersCount?: number;
  requiresMobilityAid?: boolean;
  mobilityAidType?: string;
  urgentLevel: UrgentLevel;
  status: 'la_gudbiyay' | 'dib_u_eegis' | 'la_ogolaaday' | 'la_fuliyay';
  submittedDate: string;
}

export interface DonationRecord {
  id: string;
  donorName: string;
  phone?: string;
  amount: number;
  currency: string;
  paymentMethod: 'evc_plus' | 'zaad' | 'sahal' | 'edahab' | 'card';
  targetCategory: BeneficiaryCategory | 'guud';
  beneficiaryName?: string;
  beneficiaryId?: string;
  message?: string;
  date: string;
  transactionRef: string;
}

export interface AidProgram {
  id: string;
  title: string;
  category: BeneficiaryCategory;
  tagline: string;
  costPerUnit: number;
  unitLabel: string;
  deliveredCount: number;
  targetCount: number;
  description: string;
  itemsIncluded: string[];
  icon: string;
}

export interface CenterRegistration {
  id: string; // e.g. CLT-GB-0124
  fullName: string;
  age: number;
  gender: 'rag' | 'dumar';
  phone: string;
  registrationType: BeneficiaryCategory | 'samafale';
  subDistrict: string; // e.g. Garasbaaley (Waaberi-Garasbaaley, Siinka, Weydow, iwm)
  campOrVillage?: string; // Kaamka ama xaafadda
  guardianName?: string;
  guardianPhone?: string;
  disabilityDetails?: string;
  mobilityAidNeeded?: string;
  familyMembersCount?: number;
  monthlyIncomeStatus?: string;
  educationLevel?: string;
  registeredDate: string;
  status: 'la_diiwaangeliyay' | 'baaritaanka_socda' | 'kaalmo_heshay';
  notes?: string;
}

