import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
const AdBanner = lazy(() => import("./pages/AdBanner"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <div className="fixed inset-0 -z-10 bg-background">
        <div className="absolute inset-0 bg-grid opacity-100" />
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-accent/8 blur-[120px]" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-accent/6 blur-[100px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-orange-500/5 blur-[100px]" />
      </div>
      <BrowserRouter>
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
            <Route path="/karta/faw-j6p-390" element={<TruckCard />} />
            <Route path="/banner" element={<AdBanner />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;