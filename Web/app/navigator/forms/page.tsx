import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

export default function Forms() {
    return (
      <div>
        <div className="pb-5">
          <h4>Formlar</h4>
          <p className="text-muted-foreground font-normal text-sm">
            Formlarınızı buradan inceleyebilir, ekleyebilir ve arama
            yapabilirsiniz.
          </p>
        </div>
        <div className="pb-5 flex flex-row justify-between gap-4">
          <div className="flex flex-row gap-5">
            <Input className="w-[300px]" type="search" placeholder="Form Ara" />
            <Button>
              <Search size={20} />
            </Button>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex gap-2 text-xs">
                <Plus/>
                Form Ekle
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Form Ekle</DialogTitle>
                <DialogDescription>
                  Form eklemek için gerekli bilgileri giriniz.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4"></div>
              <DialogFooter>
                <Button type="submit">Form Ekle</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
}