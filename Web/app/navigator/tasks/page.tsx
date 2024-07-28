import AvatarGroup from "@/components/ui/avatar-group";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import Image from "next/image";

export default function Tasks() {
  const avatars = [
    "/user.jpg",
    "/user.jpg",
    "/user.jpg",
    "/user.jpg",
    "/user.jpg",
  ];
  return (
    <div>
      <div className="pb-5">
        <h4>Görevler</h4>
        <p className="text-muted-foreground font-normal text-sm">
          Görevleri buradan inceleyebilir, Ekleyebilir ve arama yapabilirsiniz.
        </p>
      </div>
      <div className="pb-5 flex flex-row justify-between gap-4">
        <div className="flex flex-row gap-5">
          <Input className="w-[300px]" type="search" placeholder="Görev Ara" />
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
      <div>
        <Card className="w-[400px] gap-5 ">
          <CardHeader>
            <CardTitle className="text-base">
              <div className="flex-center gap-5 justify-between">
                <p className="text-sm font-normal">#14</p>
                <p className="text-sm font-normal">Malzeme Eksikliği</p>
                <div className="flex-center">
                  <Image
                    src="/user.jpg"
                    width="40"
                    height="40"
                    style={{ borderRadius: "50%" }}
                    alt="Planwire"
                  />
                  <p className="text-sm font-normal">Nedim Yeşilçınar</p>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h6>Asansör kuyusuna beton döküldü </h6>
          </CardContent>
          <CardFooter className="flex-center gap-5 justify-between">
              <p className="text-sm font-normal">29.07.2024</p>
              <h6 className="text-sm">DA-A-1K</h6>
              <div className="flex-center justify-between">
                <AvatarGroup avatars={avatars} />
              </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
