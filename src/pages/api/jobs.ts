import type { NextApiRequest, NextApiResponse } from 'next';
import { Job } from '@/types/job';

const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer (React / TypeScript)',
    company: 'TechArm Solutions',
    city: 'Ереван',
    district: 'Кентрон',
    salaryFrom: 1200000,
    salaryTo: 1600000,
    currency: 'AMD',
    experience: '3–6 лет',
    workFormat: 'Гибрид',
    isVerified: true,
    publishedAt: 'Сегодня',
    viewsCount: 42
  },
  {
    id: '2',
    title: 'Специалист по сверке данных / Ассистент',
    company: 'Global Logistics AM',
    city: 'Ереван',
    district: 'Арабкир',
    salaryFrom: 350000,
    salaryTo: 450000,
    currency: 'AMD',
    experience: '1–3 года',
    workFormat: 'Офис',
    isVerified: true,
    publishedAt: 'Вчера',
    viewsCount: 128
  },
  {
    id: '3',
    title: 'UI/UX Designer',
    company: 'Creative Studio',
    city: 'Ереван',
    district: 'Удалённо',
    salaryFrom: 1500,
    salaryTo: 2200,
    currency: 'USD',
    experience: '1–3 года',
    workFormat: 'Удалённо',
    isVerified: false,
    publishedAt: '2 дня назад',
    viewsCount: 95
  }
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ jobs: Job[] }>
) {
  const { search } = req.query;

  let filtered = MOCK_JOBS;
  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    filtered = MOCK_JOBS.filter(
      j => j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q)
    );
  }

  res.status(200).json({ jobs: filtered });
}
