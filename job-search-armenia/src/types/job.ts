export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  city: string;
  district?: string;
  salaryFrom?: number;
  salaryTo?: number;
  currency: 'AMD' | 'USD' | 'EUR';
  experience: 'Без опыта' | '1–3 года' | '3–6 лет' | 'Более 6 лет';
  workFormat: 'Офис' | 'Удалённо' | 'Гибрид';
  isVerified: boolean;
  publishedAt: string;
  viewsCount: number;
}
