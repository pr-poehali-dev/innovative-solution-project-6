import { lazy, Suspense, useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const NotFound = lazy(() => import("@/pages/NotFound"));

const popularLinks = [
  { to: "/", label: "Главная", icon: "Home" },
  { to: "/uslugi-manipulyatora", label: "Услуги манипулятора", icon: "Truck" },
  { to: "/arenda-manipulyatora-nizhny-novgorod", label: "Аренда манипулятора", icon: "Wrench" },
  { to: "/asfaltirovanie", label: "Асфальтирование", icon: "Construction" },
  { to: "/blog", label: "Блог", icon: "BookOpen" },
  { to: "/otzyvy", label: "Отзывы", icon: "Star" },
];

const NotFoundWithNoindex = () => {
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);

    const prevTitle = document.title;
    document.title = "404 — страница не найдена";

    const status = document.createElement("meta");
    status.name = "prerender-status-code";
    status.content = "404";
    document.head.appendChild(status);

    return () => {
      document.head.removeChild(meta);
      document.head.removeChild(status);
      document.title = prevTitle;
    };
  }, []);

  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <NotFound />
      <div className="max-w-2xl mx-auto px-4 pb-16 -mt-8">
        <p className="text-center text-sm font-semibold text-gray-500 mb-4">
          Популярные разделы сайта
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {popularLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white border border-gray-200 hover:border-teal-400 hover:shadow-md transition text-sm font-medium text-gray-700"
            >
              <Icon name={link.icon} size={18} className="text-teal-600 shrink-0" />
              <span className="truncate">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </Suspense>
  );
};

export default NotFoundWithNoindex;