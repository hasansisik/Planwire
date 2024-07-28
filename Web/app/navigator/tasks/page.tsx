import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

export default function Tasks() {
    return (
      <div>
        <div className="pb-5">
          <h4>Görevler</h4>
          <p className="text-muted-foreground font-normal text-sm">
            Görevleri buradan inceleyebilir, Ekleyebilir ve arama
            yapabilirsiniz.
          </p>
        </div>
        <div className="pb-5 flex flex-row justify-between gap-4">
          <div className="flex flex-row gap-5">
            <Input
              className="w-[300px]"
              type="search"
              placeholder="Görev Ara"
            />
            <Button>
              <Search size={20} />
            </Button>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex gap-2 text-xs">
                <Plus />
                Görev Ekle
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Görev Ekle</DialogTitle>
                <DialogDescription>
                  Görev eklemek için gerekli bilgileri giriniz.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4"></div>
              <DialogFooter>
                <Button type="submit">Plan Ekle</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
}