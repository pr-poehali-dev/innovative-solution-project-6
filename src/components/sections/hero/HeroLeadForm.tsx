import { useState, useEffect, useRef } from "react";
import LeadFormFields from "./leadForm/LeadFormFields";
import SubmitButton from "./leadForm/SubmitButton";
import CarouselControls from "./leadForm/CarouselControls";
import { slides } from "./leadForm/data";
import Icon from "@/components/ui/icon";

const HeroLeadForm = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [showExtra, setShowExtra] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paused || done) return;
    const t = setInterval(() => setActive((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, [paused, done]);

  const next = () => setActive((p) => (p + 1) % slides.length);
  const prev = () => setActive((p) => (p - 1 + slides.length) % slides.length);

  const handleFieldFocus = (e: React.FocusEvent<HTMLElement>) => {
    setPaused(true);
    const target = e.target;
    setTimeout(() => {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 350);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="overflow-x-clip rounded-3xl">
        <div
          ref={trackRef}
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div key={i} className="w-full shrink-0 px-1">
              <div
                style={{ scrollMarginTop: "80px", scrollMarginBottom: "16px" }}
                className="bg-card/80 backdrop-blur-xl border border-accent/20 rounded-3xl p-5 sm:p-7"
              >
                <div className="text-center mb-4">
                  <div className="inline-flex items-center gap-2 text-accent text-sm font-semibold mb-2">
                    <Icon name={slide.icon} size={18} />
                    <span>{slide.badge}</span>
                  </div>
                  <h3 className="text-white font-bold text-xl">{slide.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{slide.subtitle}</p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitting(true);
                    setTimeout(() => {
                      setSubmitting(false);
                      setDone(true);
                    }, 1000);
                  }}
                  className="space-y-3"
                >
                  <LeadFormFields
                    phone={phone}
                    setPhone={setPhone}
                    name={name}
                    setName={setName}
                    comment={comment}
                    setComment={setComment}
                    showExtra={showExtra}
                    setShowExtra={setShowExtra}
                    onFieldFocus={handleFieldFocus}
                  />
                  <SubmitButton submitting={submitting} done={done} label={slide.cta} />
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CarouselControls active={active} count={slides.length} prev={prev} next={next} onDot={setActive} />
    </div>
  );
};

export default HeroLeadForm;
