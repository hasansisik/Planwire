import { Button } from "@/components/ui/button";

export default function ProjectPage() {
  return (
    <div>
      <div className="pb-5 flex flex-row justify-between gap-4">
        <div className="pb-5">
          <h5>Proje Düzenle</h5>
          <p className="text-muted-foreground font-normal text-sm">
            Projenizi düzenleyebilir ve inceleyebilirsiniz.
          </p>
        </div>
        <Button className="flex gap-2 text-xs">Kaydet</Button>
      </div>
    </div>
  );
}