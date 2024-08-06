"use client"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import CanvasDraw from "react-canvas-draw";

function PlanPage() {
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
          <h6>Görev Detayları</h6>
          <div
            style={{
              width: "1000px",
              height: "800px",
              overflow: "hidden", // Taşan içeriği gizlemek için
              border: "1px solid #ccc",
              position: "relative",
            }}
          >
            <TransformWrapper
              options={{
                limitToBounds: true,
                minScale: 0.5,
                maxScale: 4,
                centerContent: true,
              }}
            >
              <TransformComponent>
                <CanvasDraw
                  canvasWidth={3000} // Kapsayıcı div'in genişliği ile aynı
                  canvasHeight={2000} // Kapsayıcı div'in yüksekliği ile aynı
                  brushColor="#000"
                  brushRadius={2}
                  lazyRadius={0}
                  imgSrc="/PlanImages.jpeg" // Yüksek çözünürlüklü görselin yolu
                />
              </TransformComponent>
            </TransformWrapper>
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

export default PlanPage;
