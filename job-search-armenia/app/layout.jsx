import './globals.css';

export const metadata = {
  title: 'WorkAM — Поиск работы и вакансий в Армении',
  description: 'Современный сервис для поиска работы в Ереване и по всей Армении.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className="min-h-screen flex flex-col justify-between">
        {children}
      </body>
    </html>
  );
}
