'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, MapPin, Briefcase, Building2, CheckCircle2, 
  Filter, X, ArrowUpRight, ChevronDown, Sparkles, Heart 
} from 'lucide-react';

// Мок-данные вакансий
const INITIAL_JOBS = [
  {
    id: 1,
    title: 'Senior Frontend Developer (React / Next.js)',
    company: 'Krisp',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
    city: 'Ереван',
    district: 'Кентрон',
    salaryMin: 1200000,
    salaryMax: 1800000,
    currency: 'AMD',
    experience: '3–6 лет',
    format: 'Гибрид',
    isVerified: true,
    publishedAt: 'Сегодня',
    tags: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
    description: 'Ищем опытного Frontend-разработчика для работы над основными модулями шупомодавления и голосовых технологий.'
  },
  {
    id: 2,
    title: 'Специалист по работе с клиентами / Поддержка',
    company: 'Team Telecom Armenia',
    logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&auto=format&fit=crop&q=80',
    city: 'Ереван',
    district: 'Арабкир',
    salaryMin: 250000,
    salaryMax: 400000,
    currency: 'AMD',
    experience: 'Без опыта',
    format: 'Офис',
    isVerified: true,
    publishedAt: 'Вчера',
    tags: ['Армянский язык', 'Русский язык', 'CRM'],
    description: 'Обработка входящих обращений пользователей, помощь в настройке сервисов, работа с базой данных клиентов.'
  },
  {
    id: 3,
    title: 'Middle Product Designer (UI/UX)',
    company: 'ServiceTitan Armenia',
    logo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&auto=format&fit=crop&q=80',
    city: 'Ереван',
    district: 'Арабкир',
    salaryMin: 800000,
    salaryMax: 1300000,
    currency: 'AMD',
    experience: '1–3 года',
    format: 'Удаленно',
    isVerified: true,
    publishedAt: '2 дня назад',
    tags: ['Figma', 'Design Systems', 'UX Research'],
    description: 'Разработка интерфейсов B2B экосистемы, участие в исследованиях, проведение юзабилити-тестов.'
  },
  {
    id: 4,
    title: 'Менеджер по продажам (B2B)',
    company: 'Ceramica Group',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&auto=format&fit=crop&q=80',
    city: 'Ереван',
    district: 'Давташен',
    salaryMin: 300000,
    salaryMax: 600000,
    currency: 'AMD',
    experience: '1–3 года',
    format: 'Офис',
    isVerified: false,
    publishedAt: '3 дня назад',
    tags: ['Продажи', 'B2B', 'Переговоры'],
    description: 'Консультация ключевых клиентов, заключение договоров, проведение презентаций коммерческих объектов.'
  }
];

const DISTRICTS = ['Все районы', 'Кентрон', 'Арабкир', 'Давташен', 'Нор-Норк', 'Малатия-Себастия', 'Удаленно'];

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('Все районы');
  const [selectedFormat, setSelectedFormat] = useState('Все');
  const [favorites, setFavorites] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);

  // Фильтрация вакансий
  const filteredJobs = useMemo(() => {
    return INITIAL_JOBS.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            job.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesDistrict = selectedDistrict === 'Все районы' || job.district === selectedDistrict;
      const matchesFormat = selectedFormat === 'Все' || job.format === selectedFormat;

      return matchesSearch && matchesDistrict && matchesFormat;
    });
  }, [searchTerm, selectedDistrict, selectedFormat]);

  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const handleApply = (id) => {
    if (!appliedJobs.includes(id)) {
      setAppliedJobs(prev => [...prev, id]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* 🔹 HEADER */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 backdrop-blur-md bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-9 h-9 bg-brand-600 text-white font-bold rounded-xl flex items-center justify-center text-lg shadow-md shadow-brand-500/20">
                W
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Work<span className="text-brand-600">.am</span>
              </span>
            </div>
            
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
              <a href="#" className="text-brand-600 font-semibold">Поиск вакансий</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Компании</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Создать резюме</a>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button className="hidden sm:inline-flex text-sm font-medium text-slate-700 hover:text-slate-900 px-3 py-2">
              Войти
            </button>
            <button className="bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition-all shadow-sm hover:shadow-md">
              Работодателям
            </button>
          </div>
        </div>
      </header>

      {/* 🔹 HERO & SEARCH BLOCK */}
      <section className="bg-gradient-to-b from-white to-slate-100/70 border-b border-slate-200/80 pt-10 pb-12">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Работа в Армении <br />
            <span className="text-brand-600">с человеческим интерфейсом</span>
          </h1>
          <p className="mt-3 text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
            Без устаревшего дизайна и хаоса. Прозрачные зарплаты, проверенные компании Еревана и всей страны.
          </p>

          {/* Search Box */}
          <div className="mt-8 bg-white p-2 sm:p-3 rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/80 flex flex-col md:flex-row gap-2">
            <div className="flex-1 flex items-center px-3 gap-3 border-b md:border-b-0 md:border-r border-slate-100 py-2 md:py-0">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Профессия, должность или навык..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none text-sm sm:text-base"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="p-1 text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center px-3 gap-2 py-2 md:py-0 border-b md:border-b-0 border-slate-100 min-w-[180px]">
              <MapPin className="w-5 h-5 text-slate-400 shrink-0" />
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full bg-transparent text-slate-700 text-sm focus:outline-none cursor-pointer"
              >
                {DISTRICTS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <button className="bg-brand-600 hover:bg-brand-700 text-white font-medium px-8 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm text-sm sm:text-base">
              Найти
            </button>
          </div>

          {/* Quick tags */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-slate-500">
            <span>Часто ищут:</span>
            {['React', 'Продажи', 'Удаленка', 'Арабкир', 'Без опыта'].map(tag => (
              <button
                key={tag}
                onClick={() => setSearchTerm(tag)}
                className="bg-slate-200/60 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-md transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 shrink-0 space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Filter className="w-4 h-4 text-brand-600" />
                Фильтры
              </h3>
              {(selectedDistrict !== 'Все районы' || selectedFormat !== 'Все') && (
                <button 
                  onClick={() => { setSelectedDistrict('Все районы'); setSelectedFormat('Все'); }}
                  className="text-xs text-brand-600 hover:underline"
                >
                  Сбросить
                </button>
              )}
            </div>

            {/* Format Filter */}
            <div className="space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Формат работы</label>
              {['Все', 'Офис', 'Гибрид', 'Удаленно'].map((fmt) => (
                <label key={fmt} className="flex items-center gap-2.5 text-sm text-slate-700 cursor-pointer hover:text-slate-900">
                  <input
                    type="radio"
                    name="format"
                    checked={selectedFormat === fmt}
                    onChange={() => setSelectedFormat(fmt)}
                    className="w-4 h-4 text-brand-600 focus:ring-brand-500 border-slate-300"
                  />
                  {fmt}
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Vacancies Feed */}
        <section className="flex-1 space-y-4">
          <div className="flex items-center justify-between pb-2">
            <p className="text-sm text-slate-500">
              Найдено <span className="font-bold text-slate-900">{filteredJobs.length}</span> вакансий
            </p>
          </div>

          {filteredJobs.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center">
              <p className="text-slate-500 text-base">По вашему запросу ничего не найдено.</p>
              <button
                onClick={() => { setSearchTerm(''); setSelectedDistrict('Все районы'); setSelectedFormat('Все'); }}
                className="mt-4 text-sm font-medium text-brand-600 hover:underline"
              >
                Сбросить все фильтры
              </button>
            </div>
          ) : (
            filteredJobs.map((job) => {
              const isApplied = appliedJobs.includes(job.id);
              const isFav = favorites.includes(job.id);

              return (
                <div
                  key={job.id}
                  className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 transition-all hover:border-slate-300 hover:shadow-md relative group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <img
                        src={job.logo}
                        alt={job.company}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-100 shadow-sm"
                      />
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                            {job.company}
                            {job.isVerified && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 fill-blue-50" />
                            )}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="text-xs text-slate-400">{job.publishedAt}</span>
                        </div>

                        <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-1 hover:text-brand-600 transition-colors cursor-pointer flex items-center gap-1">
                          {job.title}
                        </h2>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleFavorite(job.id)}
                      className={`p-2 rounded-xl border transition-colors ${
                        isFav 
                          ? 'border-red-200 bg-red-50 text-red-500' 
                          : 'border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Salary & Details Badges */}
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <div className="text-base sm:text-lg font-extrabold text-slate-900 bg-slate-100 px-3 py-1 rounded-lg">
                      {job.salaryMin.toLocaleString()} – {job.salaryMax.toLocaleString()} ֏
                    </div>

                    <span className="inline-flex items-center gap-1 text-xs font-medium bg-slate-50 text-slate-600 px-2.5 py-1.5 rounded-lg border border-slate-100">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {job.city}, {job.district}
                    </span>

                    <span className="inline-flex items-center gap-1 text-xs font-medium bg-slate-50 text-slate-600 px-2.5 py-1.5 rounded-lg border border-slate-100">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                      {job.format}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-sm text-slate-600 line-clamp-2 leading-relaxed">
                    {job.description}
                  </p>

                  {/* Tags & Action Button */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {job.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => handleApply(job.id)}
                      disabled={isApplied}
                      className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-1.5 shrink-0 ${
                        isApplied
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                          : 'bg-brand-600 hover:bg-brand-700 text-white shadow-sm hover:shadow'
                      }`}
                    >
                      {isApplied ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" /> Отклик отправлен
                        </>
                      ) : (
                        <>Откликнуться</>
                      )}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </section>
      </main>

      {/* 🔹 FOOTER */}
      <footer className="bg-white border-t border-slate-200 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center sm:flex sm:justify-between sm:text-left text-xs text-slate-500">
          <p>© 2026 WorkAM. Поиск работы в Ереване и Армении.</p>
          <p className="mt-2 sm:mt-0">Сделано с любовью к качественному UX.</p>
        </div>
      </footer>

    </div>
  );
}
