import { lazy, Suspense, useEffect } from "react";

const NotFound = lazy(() => import("@/pages/NotFound"));

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
    </Suspense>
  );
};

export default NotFoundWithNoindex;
