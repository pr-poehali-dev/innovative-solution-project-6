import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import OrderModal from "@/components/ui/OrderModal";
import CallbackModal from "@/components/ui/CallbackModal";
import PriceCalculator from "@/components/ui/PriceCalculator";
import SiteFooter from "@/components/sections/SiteFooter";
import { trucks } from "./truck/trucksData";
import TruckSeo from "./truck/TruckSeo";
import TruckHero, { TruckHeader } from "./truck/TruckHero";
import TruckContent from "./truck/TruckContent";
import SimilarTrucks from "./truck/SimilarTrucks";

export default function TruckPage() {
  const { slug } = useParams<{ slug: string }>();
  const [modalOpen, setModalOpen] = useState(false);
  const [calcSummary, setCalcSummary] = useState("");
  const [callbackOpen, setCallbackOpen] = useState(false);
  const truck = slug ? trucks[slug] : null;

  useEffect(() => {

  }, [slug]);

  if (!truck) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <p className="text-2xl font-bold mb-4">Техника не найдена</p>
        <Link to="/" className="text-accent hover:underline">← На главную</Link>
      </div>
    );
  }

  return (
    <div className="page-enter">
      <OrderModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        truckName={truck.title}
        calcSummary={calcSummary}
        title="Заказать эту технику"
        submitLabel="Заказать технику"
      />
      <TruckSeo truck={truck} slug={slug!} />
      <CallbackModal open={callbackOpen} onClose={() => setCallbackOpen(false)} />

      <TruckHeader onCallback={() => setCallbackOpen(true)} />

      <main className="pt-24 sm:pt-28 pb-16 min-h-screen">
        <TruckHero truck={truck} slug={slug!} onOrder={() => setModalOpen(true)} />

        {/* Калькулятор */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <PriceCalculator pricePerHour={truck.priceNum} onOrder={(result) => {
            setCalcSummary(`${result.hours} ч × ${result.shifts} дн. × ${result.pricePerHour.toLocaleString("ru-RU")} ₽/ч = ${result.total.toLocaleString("ru-RU")} ₽`);
            setModalOpen(true);
          }} />
        </section>

        <TruckContent truck={truck} slug={slug!} />

        <SimilarTrucks currentSlug={slug!} />
      </main>
      <SiteFooter />
    </div>
  );
}