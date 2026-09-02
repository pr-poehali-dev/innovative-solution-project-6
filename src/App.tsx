import { lazy, Suspense, type ComponentType } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
// Главная — её открывают почти все посетители. Держим её в основном файле,
// чтобы браузер получил страницу сразу, без второго запроса к серверу.
// Именно эта лишняя ступенька давала пустой экран при первом открытии.
import Index from "./pages/Index";
// Второстепенные блоки: если файл не догрузился (старый кеш, обрыв связи),
// сайт продолжает работать без него, а не падает целиком
const softLazy = <T,>(load: () => Promise<T>) =>
  lazy(() =>
    load().catch(() => ({ default: () => null })) as Promise<{
      default: ComponentType;
    }>
  );

const ScrollToTop = softLazy(() => import("@/components/ScrollToTop"));
const FloatingCallButton = softLazy(() => import("@/components/ui/FloatingCallButton"));
const AutoReindex = softLazy(() => import("@/components/AutoReindex"));
const OfflineDownloadModal = softLazy(() => import("@/components/ui/OfflineDownloadModal"));
const OfflineSuccessToast = softLazy(() => import("@/components/ui/OfflineSuccessToast"));
const EngagementTracker = softLazy(() => import("@/components/EngagementTracker"));


const NotFound = lazy(() => import("./components/NotFoundWithNoindex"));
const TruckPage = lazy(() => import("./pages/TruckPage"));
const CityPage = lazy(() => import("./pages/CityPage"));
const BlogIndex = lazy(() => import("./pages/BlogIndex"));
const BlogArticle = lazy(() => import("./pages/BlogArticle"));
const ReviewsPage = lazy(() => import("./pages/ReviewsPage"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const WeatherPage = lazy(() => import("./pages/WeatherPage"));
const FaqPage = lazy(() => import("./pages/FaqPage"));
const SitemapSourcePage = lazy(() => import("./pages/SitemapSourcePage"));
const SeoLandingPage = lazy(() => import("./pages/SeoLandingPage"));
const TruckCard = lazy(() => import("./pages/TruckCard"));
const ReviewCard = lazy(() => import("./pages/ReviewCard"));
const AdBanner = lazy(() => import("./pages/AdBanner"));
const AdminReindex = lazy(() => import("./pages/AdminReindex"));
const SeoDashboard = lazy(() => import("./pages/SeoDashboard"));
const SeoReindexPage = lazy(() => import("./pages/SeoReindexPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const AsfaltirovaniePage = lazy(() => import("./pages/AsfaltirovaniePage"));
const AdLanding = lazy(() => import("./pages/AdLanding"));
const MaterialsPage = lazy(() => import("./pages/MaterialsPage"));
const MaterialCategoryPage = lazy(() => import("./pages/MaterialCategoryPage"));
const AdminMaterials = lazy(() => import("./pages/AdminMaterials"));

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
      <Suspense fallback={null}>
        <Toaster />
        <Sonner />
        <FloatingCallButton />
        <AutoReindex />
        <OfflineDownloadModal />
        <OfflineSuccessToast />
        <EngagementTracker />
      </Suspense>
      <div className="hidden lg:block fixed inset-0 -z-10 bg-background pointer-events-none">
        <div className="absolute inset-0 bg-grid opacity-100" />
        <div
          className="hidden lg:block absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(600px circle at 8% 6%, rgba(232,168,32,0.08), transparent 60%), radial-gradient(500px circle at 96% 38%, rgba(232,168,32,0.06), transparent 60%), radial-gradient(400px circle at 30% 96%, rgba(249,115,22,0.05), transparent 60%)",
          }}
        />
      </div>
      <BrowserRouter>
        <Suspense fallback={null}>
          <ScrollToTop />
        </Suspense>
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/zakazat" element={<AdLanding />} />
            <Route path="/tehnika/:slug" element={<TruckPage />} />
            <Route path="/gorod/:slug" element={<CityPage />} />
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />
            <Route path="/otzyvy" element={<ReviewsPage />} />
            <Route path="/nashi-raboty" element={<GalleryPage />} />
            <Route path="/pogoda" element={<WeatherPage />} />
            <Route path="/voprosy" element={<FaqPage />} />
            <Route path="/sitemap-source" element={<SitemapSourcePage />} />
            <Route
              path="/arenda-manipulyatora-nizhny-novgorod"
              element={<SeoLandingPage slugOverride="arenda-manipulyatora-nizhny-novgorod" />}
            />
            <Route
              path="/uslugi-manipulyatora"
              element={<SeoLandingPage slugOverride="uslugi-manipulyatora" />}
            />
            <Route
              path="/manipulyator-s-lyulkoy"
              element={<SeoLandingPage slugOverride="manipulyator-s-lyulkoy" />}
            />
            <Route
              path="/arenda-manipulyatora-3-tonny"
              element={<SeoLandingPage slugOverride="arenda-manipulyatora-3-tonny" />}
            />
            <Route
              path="/arenda-manipulyatora-5-tonn"
              element={<SeoLandingPage slugOverride="arenda-manipulyatora-5-tonn" />}
            />
            <Route
              path="/arenda-manipulyatora-7-tonn"
              element={<SeoLandingPage slugOverride="arenda-manipulyatora-7-tonn" />}
            />
            <Route
              path="/manipulyator-s-bur"
              element={<SeoLandingPage slugOverride="manipulyator-s-bur" />}
            />
            <Route
              path="/arenda-manipulyatora-10-tonn"
              element={<SeoLandingPage slugOverride="arenda-manipulyatora-10-tonn" />}
            />
            <Route
              path="/perevozka-spetstehniki-manipulyatorom"
              element={<SeoLandingPage slugOverride="perevozka-spetstehniki-manipulyatorom" />}
            />
            <Route
              path="/arenda-manipulyatora-dzerzhinsk"
              element={<SeoLandingPage slugOverride="arenda-manipulyatora-dzerzhinsk" />}
            />
            <Route
              path="/arenda-manipulyatora-dzerzhinsk-bor-kstovo"
              element={<SeoLandingPage slugOverride="arenda-manipulyatora-dzerzhinsk-bor-kstovo" />}
            />
            <Route
              path="/arenda-manipulyatora-avtozavodskiy-rayon-nn"
              element={<SeoLandingPage slugOverride="arenda-manipulyatora-avtozavodskiy-rayon-nn" />}
            />
            <Route
              path="/arenda-manipulyatora-sormovskiy-rayon-nn"
              element={<SeoLandingPage slugOverride="arenda-manipulyatora-sormovskiy-rayon-nn" />}
            />
            <Route
              path="/arenda-manipulyatora-kanavinskiy-rayon-nn"
              element={<SeoLandingPage slugOverride="arenda-manipulyatora-kanavinskiy-rayon-nn" />}
            />
            <Route
              path="/arenda-manipulyatora-moskovskiy-rayon-nn"
              element={<SeoLandingPage slugOverride="arenda-manipulyatora-moskovskiy-rayon-nn" />}
            />
            <Route
              path="/arenda-manipulyatora-leninskiy-rayon-nn"
              element={<SeoLandingPage slugOverride="arenda-manipulyatora-leninskiy-rayon-nn" />}
            />
            <Route
              path="/arenda-manipulyatora-nizhegorodskiy-rayon-nn"
              element={<SeoLandingPage slugOverride="arenda-manipulyatora-nizhegorodskiy-rayon-nn" />}
            />
            <Route
              path="/arenda-manipulyatora-sovetskiy-rayon-nn"
              element={<SeoLandingPage slugOverride="arenda-manipulyatora-sovetskiy-rayon-nn" />}
            />
            <Route
              path="/arenda-manipulyatora-priokskiy-rayon-nn"
              element={<SeoLandingPage slugOverride="arenda-manipulyatora-priokskiy-rayon-nn" />}
            />
            <Route path="/karta/faw-j6p-390" element={<TruckCard />} />
            <Route path="/review-card" element={<ReviewCard />} />
            <Route path="/banner" element={<AdBanner />} />
            <Route path="/stroymaterialy" element={<MaterialsPage />} />
            <Route path="/stroymaterialy/:slug" element={<MaterialCategoryPage />} />
            <Route path="/admin/materialy" element={<AdminMaterials />} />
            <Route path="/admin/reindex" element={<AdminReindex />} />
            <Route path="/seo" element={<SeoDashboard />} />
            <Route path="/seo/pereobhod" element={<SeoReindexPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/asfaltirovanie" element={<AsfaltirovaniePage />} />
            <Route path="/asfaltirovanie-nizhny-novgorod" element={<AsfaltirovaniePage />} />
            <Route path="/asfaltirovanie-dvorov" element={<AsfaltirovaniePage />} />
            <Route path="/asfaltirovanie-parkovok" element={<AsfaltirovaniePage />} />
            <Route path="/asfaltirovanie-dorog" element={<AsfaltirovaniePage />} />
            <Route path="/ukladka-asfalta" element={<AsfaltirovaniePage />} />
            <Route path="/yamochnyy-remont" element={<AsfaltirovaniePage />} />
            <Route path="/asfaltirovanie-pod-klyuch" element={<AsfaltirovaniePage />} />
            <Route path="/asfaltirovanie-cena" element={<AsfaltirovaniePage />} />
            <Route path="/asfaltirovanie-dzerzhinsk" element={<AsfaltirovaniePage />} />
            <Route path="/asfaltirovanie-kstovo" element={<AsfaltirovaniePage />} />
            <Route path="/asfaltirovanie-arzamas" element={<AsfaltirovaniePage />} />
            <Route path="/asfaltirovanie-bogorodsk" element={<AsfaltirovaniePage />} />
            <Route path="/presentation" element={<Navigate to="/" replace />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;