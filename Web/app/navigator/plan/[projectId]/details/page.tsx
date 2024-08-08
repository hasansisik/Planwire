"use client";
import { useEffect, useState, useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { getPlan, getPins } from "@/redux/actions/planActions";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MapPin, Pencil, Type } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ReactDOMServer from "react-dom/server";

export default function PlanPDetails() {
  const dispatch = useDispatch<AppDispatch>();
  const plan = useSelector((state: RootState) => state.plans.plan);
  const pins = useSelector((state: RootState) => state.plans.pins);
  const searchParams = useSearchParams();
  const planId = searchParams.get("planId");

  const [mode, setMode] = useState<"draw" | "text" | "pin" | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (planId) {
      dispatch(getPlan(planId));
      dispatch(getPins(planId)); // Fetch pins
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
      const svgString = ReactDOMServer.renderToString(
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 30"
          fill="none"
          width="24"
          height="30"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z"
            fill="red"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 22C15 22 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 9 22 12 22ZM16.2675 15.2202C17.3398 13.2872 18 11.3235 18 10C18 6.68629 15.3137 4 12 4C8.68629 4 6 6.68629 6 10C6 11.3499 6.68682 13.3658 7.79716 15.3358C8.62357 14.2077 9.87268 13 12 13C14.0518 13 15.5373 14.1153 16.2675 15.2202Z"
            fill="red"
          />
        </svg>
      );

      pin.innerHTML = svgString;
      canvas.parentElement?.appendChild(pin);

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
                height: "1000px",
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
                    {pins.map((pin, index) => (
                      <div
                        key={index}
                        style={{
                          position: "absolute",
                          left: `${pin.x}%`,
                          top: `${pin.y}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 30"
                          fill="none"
                          width="24"
                          height="30"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z"
                            fill="red"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 22C15 22 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 9 22 12 22ZM16.2675 15.2202C17.3398 13.2872 18 11.3235 18 10C18 6.68629 15.3137 4 12 4C8.68629 4 6 6.68629 6 10C6 11.3499 6.68682 13.3658 7.79716 15.3358C8.62357 14.2077 9.87268 13 12 13C14.0518 13 15.5373 14.1153 16.2675 15.2202Z"
                            fill="red"
                          />
                        </svg>
                      </div>
                    ))}
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
