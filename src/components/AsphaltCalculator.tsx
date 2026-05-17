import { useMemo, useState } from "react";
import AsphaltCalculatorHeader from "./asphalt-calculator/AsphaltCalculatorHeader";
import AsphaltCalculatorForm from "./asphalt-calculator/AsphaltCalculatorForm";
import AsphaltCalculatorResult from "./asphalt-calculator/AsphaltCalculatorResult";
import {
  type WorkType,
  type Thickness,
  type Base,
  type Extras,
  workOptions,
  thicknessOptions,
  baseOptions,
} from "./asphalt-calculator/asphaltCalculatorData";

interface AsphaltCalculatorProps {
  light?: boolean;
}

const AsphaltCalculator = ({ light = false }: AsphaltCalculatorProps) => {
  const [work, setWork] = useState<WorkType>("new");
  const [length, setLength] = useState<number>(20);
  const [width, setWidth] = useState<number>(10);
  const [thickness, setThickness] = useState<Thickness>(5);
  const [base, setBase] = useState<Base>("full");
  const [extras, setExtras] = useState<Extras>({
    curb: false,
    marking: false,
    removal: false,
  });
  const [urgent, setUrgent] = useState<boolean>(false);

  const area = useMemo(
    () => Math.max(0, Number(length) || 0) * Math.max(0, Number(width) || 0),
    [length, width],
  );

  const breakdown = useMemo(() => {
    const workOpt = workOptions.find((o) => o.id === work)!;
    const thickOpt = thicknessOptions.find((t) => t.value === thickness)!;
    const baseOpt = baseOptions.find((b) => b.value === base)!;

    const mainCost = area * workOpt.pricePerM2 * thickOpt.multiplier;
    const baseCost = work === "patch" ? 0 : area * baseOpt.addPerM2;
    const curbCost = extras.curb ? (Number(length) + Number(width)) * 2 * 550 : 0;
    const markingCost = extras.marking ? area * 35 : 0;
    const removalCost = extras.removal ? area * 90 : 0;
    const subtotal = mainCost + baseCost + curbCost + markingCost + removalCost;

    const urgentCost = urgent ? subtotal * 0.15 : 0;
    const discount = area >= 500 ? subtotal * 0.08 : area >= 200 ? subtotal * 0.04 : 0;

    const total = subtotal + urgentCost - discount;
    const days = Math.max(1, Math.ceil(area / 500));

    return {
      mainCost,
      baseCost,
      curbCost,
      markingCost,
      removalCost,
      subtotal,
      urgentCost,
      discount,
      total,
      days,
    };
  }, [area, work, thickness, base, extras, urgent, length, width]);

  const showResult = area > 0 && breakdown.total > 0;

  return (
    <section
      id="calculator"
      className={`relative z-10 px-4 sm:px-6 py-12 sm:py-20 ${light ? "" : "bg-accent/5"}`}
      style={
        light
          ? {
              background:
                "linear-gradient(180deg, rgba(255,243,220,0.6) 0%, rgba(255,236,200,0.8) 50%, rgba(255,243,220,0.6) 100%)",
            }
          : undefined
      }
    >
      <div className="max-w-6xl mx-auto">
        <AsphaltCalculatorHeader light={light} />

        <div className="grid lg:grid-cols-[1fr_auto] gap-6">
          <AsphaltCalculatorForm
            light={light}
            work={work}
            setWork={setWork}
            length={length}
            setLength={setLength}
            width={width}
            setWidth={setWidth}
            thickness={thickness}
            setThickness={setThickness}
            base={base}
            setBase={setBase}
            extras={extras}
            setExtras={setExtras}
            urgent={urgent}
            setUrgent={setUrgent}
            area={area}
          />

          <AsphaltCalculatorResult
            light={light}
            area={area}
            breakdown={breakdown}
            showResult={showResult}
          />
        </div>
      </div>
    </section>
  );
};

export default AsphaltCalculator;
