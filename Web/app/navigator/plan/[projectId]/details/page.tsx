"use client";
import { useEffect, useState, useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { getPlan } from "@/redux/actions/planActions";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MapPin, Pencil, Type } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function PlanPDetails() {
  const dispatch = useDispatch<AppDispatch>();
  const plan = useSelector((state: RootState) => state.plans.plan);
  const searchParams = useSearchParams();
  const planId = searchParams.get("planId");

  const [mode, setMode] = useState<"draw" | "text" | "pin" | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (planId) {
      dispatch(getPlan(planId));
    }
  }, [dispatch, planId]);

  const handleDraw = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (mode === "draw" && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "black";
        ctx.fillRect(e.nativeEvent.offsetX, e.nativeEvent.offsetY, 2, 2);
      }
    }
  };

  const handleText = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (mode === "text" && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        const text = prompt("Yazmak istediğiniz metni girin:");
        if (text) {
          ctx.fillStyle = "black";
          ctx.font = "16px Arial";
          ctx.fillText(text, e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        }
      }
    }
  };

 const handlePin = (e: React.MouseEvent) => {
   e.stopPropagation();
   if (mode === "pin" && canvasRef.current) {
     const canvas = canvasRef.current;
     const rect = canvas.getBoundingClientRect();
     const x = e.clientX - rect.left;
     const y = e.clientY - rect.top;

     const pin = document.createElement("div");
     pin.style.position = "absolute";
     pin.style.left = `${x}px`;
     pin.style.top = `${y}px`;
     pin.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M21 10c0 5.523-9 13-9 13S3 15.523 3 10a9 9 0 1 1 18 0Z"/><circle cx="12" cy="10" r="3"/></svg>`;

     canvas.parentElement?.appendChild(pin);
   }
 };

  const tooltips = [
    {
      icon: <MapPin />,
      text: "Pin Ekle",
      onClick: () => setMode("pin"),
      modeValue: "pin",
    },
    {
      icon: <Pencil />,
      text: "Çizim",
      onClick: () => setMode("draw"),
      modeValue: "draw",
    },
    {
      icon: <Type />,
      text: "Yazı",
      onClick: () => setMode("text"),
      modeValue: "text",
    },
  ];

  return (
    <div>
      <div className="pb-5">
        <h4>Plan Detayları</h4>
        <p className="text-muted-foreground font-normal text-sm">
          Planlarınızı buradan inceleyebilir, ekleyebilir ve arama
          yapabilirsiniz.
        </p>
      </div>
      <div className="flex flex-row justify-between">
        <div>
          <div>
            <h6>Proje Adı: {plan.planName}</h6>
            <p className="text-muted-foreground font-normal text-sm pb-5">
              Plan Kodu: {plan.planCode} , Plan Kategori : {plan.planCategory}
            </p>
          </div>
          <div className="flex flex-row justify-between gap-5">
            <div
              style={{
                width: "1000px",
                height: "700px",
                overflow: "hidden",
                border: "1px solid #ccc",
                position: "relative",
              }}
            >
              <TransformWrapper
                limitToBounds={true}
                minScale={0.5}
                maxScale={4}
                centerOnInit={true}
              >
                <TransformComponent>
                  <div style={{ position: "relative" }}>
                    <img
                      src={plan.planImages}
                      alt="Plan"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <canvas
                      ref={canvasRef}
                      width={1000}
                      height={700}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                      }}
                      onClick={
                        mode === "text"
                          ? handleText
                          : mode === "pin"
                          ? handlePin
                          : handleDraw
                      }
                    />
                  </div>
                </TransformComponent>
              </TransformWrapper>
            </div>
            <div className="flex flex-col gap-5">
              <TooltipProvider>
                {tooltips.map((tooltip, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={tooltip.onClick}
                        variant={
                          mode === tooltip.modeValue ? "default" : "outline"
                        }
                      >
                        {tooltip.icon}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{tooltip.text}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </div>
          </div>
        </div>
        <div>
          <h6>Görev Detayları</h6>
          <p className="text-muted-foreground font-normal text-xs">
            Görev buradan inceleyebilir, ekleyebilir ve arama yapabilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
}
