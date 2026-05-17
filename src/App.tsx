import { lazy, Suspense } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const Toaster = lazy(() =>
  import("@/components/ui/toaster").then((m) => ({ default: m.Toaster }))
);
const Sonner = lazy(() =>
  import("@/components/ui/sonner").then((m) => ({ default: m.Toaster }))
);
const ScrollToTop = lazy(() => import("@/components/ScrollToTop"));
const FloatingCallButton = lazy(() => import("@/components/ui/FloatingCallButton"));
const OrderNotifications = lazy(() => import("@/components/ui/OrderNotifications"));
const AutoReindex = lazy(() => import("@/components/AutoReindex"));

const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const TruckPage = lazy(() => import("./pages/TruckPage"));
const CityPage = lazy(() => import("./pages/CityPage"));
const BlogIndex = lazy(() => import("./pages/BlogIndex"));
const BlogArticle = lazy(() => import("./pages/BlogArticle"));
const ReviewsPage = lazy(() => import("./pages/ReviewsPage"));
const SitemapSourcePage = lazy(() => import("./pages/SitemapSourcePage"));
const SeoLandingPage = lazy(() => import("./pages/SeoLandingPage"));
const TruckCard = lazy(() => import("./pages/TruckCard"));
const ReviewCard = lazy(() => import("./pages/ReviewCard"));
const AdBanner = lazy(() => import("./pages/AdBanner"));
const AdminReindex = lazy(() => import("./pages/AdminReindex"));
const SeoDashboard = lazy(() => import("./pages/SeoDashboard"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const AsfaltirovaniePage = lazy(() => import("./pages/AsfaltirovaniePage"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Suspense fallback={null}>
        <Toaster />
        <Sonner />
        <FloatingCallButton />
        <OrderNotifications />
        <AutoReindex />
      </Suspense>
      <div className="fixed inset-0 -z-10 bg-background">
        <div className="absolute inset-0 bg-grid opacity-100" />
        <div className="hidden lg:block absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-accent/8 blur-[120px]" />
        <div className="hidden lg:block absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-accent/6 blur-[100px]" />
        <div className="hidden lg:block absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-orange-500/5 blur-[100px]" />
      </div>
      <BrowserRouter>
        <Suspense fallback={null}>
          <ScrollToTop />
        </Suspense>
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/tehnika/:slug" element={<TruckPage />} />
            <Route path="/gorod/:slug" element={<CityPage />} />
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:slug" element={<BlogArticle />} />
            <Route path="/otzyvy" element={<ReviewsPage />} />
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
              path="/arenda-manipulyatora-dzerzhinsk-bor-kstovo"
              element={<SeoLandingPage slugOverride="arenda-manipulyatora-dzerzhinsk-bor-kstovo" />}
            />
            <Route path="/karta/faw-j6p-390" element={<TruckCard />} />
            <Route path="/review-card" element={<ReviewCard />} />
            <Route path="/banner" element={<AdBanner />} />
            <Route path="/admin/reindex" element={<AdminReindex />} />
            <Route path="/seo" element={<SeoDashboard />} />
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
);

export default App;