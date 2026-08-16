import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Job } from '@/types/job';
import { Search, MapPin, Briefcase, ShieldCheck, Eye, Building2, SlidersHorizontal } from 'lucide-react';

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchJobs = async (query = '') => {
    setLoading(true);
    try {
      const res = await fetch(`/api/jobs?search=${encodeURIComponent(query)}`);
      const data = await res.json();
      setJobs(data.jobs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchJobs(searchQuery);
  };

  const formatSalary = (from?: number, to?: number, currency = 'AMD') => {
    const currSymbol = currency === 'AMD' ? '֏' : currency === 'USD' ? '$' : '€';
    if (from && to) return `${from.toLocaleString()} – ${to.toLocaleString()} ${currSymbol}`;
    if (from) return `от ${from.toLocaleString()} ${currSymbol}`;
    if (to) return `до ${to.toLocaleString()} ${currSymbol}`;
    return 'Зарплата не указана';
  };

  return (
    <>
      <Head>
        <title>WorkAM — Поиск работы и вакансий в Армении</title>
        <meta name="description" content="Современная платформа для поиска работы в Ереване и Армении" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <span className="text-2xl font-black text-brand-500 tracking-tight cursor-pointer">
                Work<span className="text-gray-900">.am</span>
              </span>
              <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-600">
                <a href="#" className="text-brand-500">Поиск вакансий</a>
                <a href="#" className="hover:text-gray-900 transition">Создать резюме</a>
                <a href="#" className="hover:text-gray-900 transition">Работодателям</a>
              </nav>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                Войти
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-brand-500 hover:bg-brand-600 rounded-lg shadow-sm transition">
                Подать вакансию
              </button>
            </div>
          </div>
        </header>

        {/* Search Hero Section */}
        <section className="bg-white border-b border-gray-200 py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6 text-center">
              Работа и вакансии в Ереване и Армении
            </h1>
            <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Профессия, должность или компания..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none transition text-sm"
                />
              </div>
              <button
                type="submit"
                className="px-8 py-3 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-xl transition shadow-sm flex items-center justify-center gap-2 text-sm"
              >
                Найти работу
              </button>
            </form>
          </div>
        </section>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 py-8 flex-1 w-full grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Filters Column */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2 text-sm">
                  <SlidersHorizontal className="w-4 h-4" /> Фильтры
                </h3>
              </div>

              {/* District Filter */}
              <div className="mb-6">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Район Еревана
                </label>
                <div className="space-y-2 text-sm text-gray-700">
                  {['Кентрон', 'Арабкир', 'Нор-Норк', 'Давташен', 'Удаленно'].map((district) => (
                    <label key={district} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-gray-300 text-brand-500 focus:ring-brand-500" />
                      <span>{district}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Work Format */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Формат работы
                </label>
                <div className="space-y-2 text-sm text-gray-700">
                  {['Офис', 'Удалённо', 'Гибрид'].map((fmt) => (
                    <label key={fmt} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-gray-300 text-brand-500 focus:ring-brand-500" />
                      <span>{fmt}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Job Feed */}
          <section className="lg:col-span-3 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-gray-500">
                Найдено вакансий: <span className="font-semibold text-gray-900">{jobs.length}</span>
              </p>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="bg-white p-6 rounded-xl border border-gray-200 animate-pulse h-36" />
                ))}
              </div>
            ) : jobs.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-xl border border-gray-200">
                <p className="text-gray-500">По вашему запросу ничего не найдено</p>
              </div>
            ) : (
              jobs.map((job) => (
                <article
                  key={job.id}
                  className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition group border-l-4 border-l-transparent hover:border-l-brand-500"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 group-hover:text-brand-500 transition">
                        {job.title}
                      </h2>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <Building2 className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{job.company}</span>
                        {job.isVerified && (
                          <span className="inline-flex items-center gap-0.5 text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                            <ShieldCheck className="w-3 h-3" /> Проверено
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">{job.publishedAt}</span>
                  </div>

                  <div className="text-xl font-extrabold text-gray-900 my-3">
                    {formatSalary(job.salaryFrom, job.salaryTo, job.currency)}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 my-4">
                    <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md">
                      <MapPin className="w-3 h-3" /> {job.city}{job.district ? `, ${job.district}` : ''}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md">
                      <Briefcase className="w-3 h-3" /> {job.experience}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 bg-blue-50 text-brand-600 font-medium rounded-md">
                      {job.workFormat}
                    </span>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <button className="px-5 py-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold rounded-lg transition">
                      Откликнуться
                    </button>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Eye className="w-3.5 h-3.5" />
                      <span>{job.viewsCount}</span>
                    </div>
                  </div>
                </article>
              ))
            )}
          </section>
        </main>
      </div>
    </>
  );
}
