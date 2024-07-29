import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
      <div className="grid grid-cols-3 gap-4 py-5 border-b">
        <div className="pb-5">
          <p className="font-bold text-sm">Projeyi Seçin</p>
          <p className="text-muted-foreground font-normal text-xs">
            Projeyi düzenlemek için Seçin.
          </p>
        </div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Lütfen Proje Seçin" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Projeler</SelectLabel>
              <SelectItem value="santiye1">İstanbul Şantiye</SelectItem>
              <SelectItem value="santiye2">Ankara Şantiye</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {/* Project */}
      <div className="grid grid-cols-3 gap-4 pt-20 py-5 border-b">
        <div className="pb-5">
          <p className="font-bold text-sm">Proje Adı</p>
          <p className="text-muted-foreground font-normal text-xs">
            Proje adını düzenleyebilir veya değiştirebilirsiniz.
          </p>
        </div>
        <Input placeholder="Proje Adı" className="w-[300px]" />
      </div>
      <div className="grid grid-cols-3 gap-4 py-5 border-b">
        <div className="pb-5">
          <p className="font-bold text-sm">Proje Kodu</p>
          <p className="text-muted-foreground font-normal text-xs">
            Proje Kodunu düzenleyebilir veya değiştirebilirsiniz.
          </p>
        </div>
        <Input placeholder="Proje Kodu" className="w-[300px]" />
      </div>
      <div className="grid grid-cols-3 gap-4 py-5 border-b">
        <div className="pb-5">
          <p className="font-bold text-sm">Adres</p>
          <p className="text-muted-foreground font-normal text-xs">
            Adresinizi düzenleyebilir veya değiştirebilirsiniz.
          </p>
        </div>
        <Textarea placeholder="Adres Bilgileri" />
      </div>
    </div>
  );
}
