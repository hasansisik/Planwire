import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { Label } from "@/components/ui/label";
import { GalleryVerticalEnd, Plus, Search } from "lucide-react";

import Image from "next/image";

export default function Plans() {
  return (
    <Accordion type="multiple" className="w-full">
      <div className="pb-5">
        <h4>Planlar</h4>
        <p className="text-muted-foreground font-normal text-sm">
          Planlarınızı buradan inceleyebilir, Ekleyebilir ve arama
          yapabilirsiniz.
        </p>
      </div>
      <div className="pb-5 flex flex-row justify-between gap-4">
        <div className="flex flex-row gap-5">
          <Input className="w-[300px]" type="search" placeholder="Plan Ara" />
          <Button>
            <Search size={20} />
          </Button>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex gap-2 text-xs">
              <Plus />
              Plan Ekle
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Plan Ekle</DialogTitle>
              <DialogDescription>
                Plan eklemek için gerekli bilgileri giriniz.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
            </div>
            <DialogFooter>
              <Button type="submit">Plan Ekle</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <AccordionItem className="pb-3" value="item-1">
        <AccordionTrigger>
          <div className="flex flex-row gap-2">
            <GalleryVerticalEnd />
            <p>Zemin Kat</p>
          </div>
        </AccordionTrigger>
        <AccordionContent className="flex flex-row gap-5">
          <Card className="max-w-max">
            <CardHeader>
              <CardTitle className="text-base">
                <div className="flex flex-row justify-between">
                  <p>DA-A-1K</p>
                  <p className="text-sm font-normal">27.07.2024</p>
                </div>
              </CardTitle>
              <CardDescription>Avm Projesi</CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                src="/planImage.jpg"
                width="175"
                height="100"
                alt="Planwire"
              />
            </CardContent>
          </Card>
          <Card className="max-w-max">
            <CardHeader>
              <CardTitle className="text-base">
                <div className="flex flex-row justify-between">
                  <p>DA-A-1K</p>
                  <p className="text-sm font-normal">27.07.2024</p>
                </div>
              </CardTitle>
              <CardDescription>Avm Projesi</CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                src="/planImage.jpg"
                width="175"
                height="100"
                alt="Planwire"
              />
            </CardContent>
          </Card>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem className="pb-3" value="item-2">
        <AccordionTrigger>
          <div className="flex flex-row gap-2">
            <GalleryVerticalEnd />
            <p>1.Kat</p>
          </div>
        </AccordionTrigger>
        <AccordionContent className="flex flex-row gap-5">
          <Card className="max-w-max">
            <CardHeader>
              <CardTitle className="text-base">
                <div className="flex flex-row justify-between">
                  <p>DA-A-1K</p>
                  <p className="text-sm font-normal">27.07.2024</p>
                </div>
              </CardTitle>
              <CardDescription>Avm Projesi</CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                src="/planImage.jpg"
                width="175"
                height="100"
                alt="Planwire"
              />
            </CardContent>
          </Card>
          <Card className="max-w-max">
            <CardHeader>
              <CardTitle className="text-base">
                <div className="flex flex-row justify-between">
                  <p>DA-A-1K</p>
                  <p className="text-sm font-normal">27.07.2024</p>
                </div>
              </CardTitle>
              <CardDescription>Avm Projesi</CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                src="/planImage.jpg"
                width="175"
                height="100"
                alt="Planwire"
              />
            </CardContent>
          </Card>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem className="pb-3" value="item-3">
        <AccordionTrigger>
          <div className="flex flex-row gap-2">
            <GalleryVerticalEnd />
            <p>2.Kat</p>
          </div>
        </AccordionTrigger>
        <AccordionContent className="flex flex-row gap-5">
          <Card className="max-w-max">
            <CardHeader>
              <CardTitle className="text-base">
                <div className="flex flex-row justify-between">
                  <p>DA-A-1K</p>
                  <p className="text-sm font-normal">27.07.2024</p>
                </div>
              </CardTitle>
              <CardDescription>Avm Projesi</CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                src="/planImage.jpg"
                width="175"
                height="100"
                alt="Planwire"
              />
            </CardContent>
          </Card>
          <Card className="max-w-max">
            <CardHeader>
              <CardTitle className="text-base">
                <div className="flex flex-row justify-between">
                  <p>DA-A-1K</p>
                  <p className="text-sm font-normal">27.07.2024</p>
                </div>
              </CardTitle>
              <CardDescription>Avm Projesi</CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                src="/planImage.jpg"
                width="175"
                height="100"
                alt="Planwire"
              />
            </CardContent>
          </Card>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem className="pb-3" value="item-4">
        <AccordionTrigger>
          <div className="flex flex-row gap-2">
            <GalleryVerticalEnd />
            <p>3.Kat</p>
          </div>
        </AccordionTrigger>
        <AccordionContent className="flex flex-row gap-5">
          <Card className="max-w-max">
            <CardHeader>
              <CardTitle className="text-base">
                <div className="flex flex-row justify-between">
                  <p>DA-A-1K</p>
                  <p className="text-sm font-normal">27.07.2024</p>
                </div>
              </CardTitle>
              <CardDescription>Avm Projesi</CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                src="/planImage.jpg"
                width="175"
                height="100"
                alt="Planwire"
              />
            </CardContent>
          </Card>
          <Card className="max-w-max">
            <CardHeader>
              <CardTitle className="text-base">
                <div className="flex flex-row justify-between">
                  <p>DA-A-1K</p>
                  <p className="text-sm font-normal">27.07.2024</p>
                </div>
              </CardTitle>
              <CardDescription>Avm Projesi</CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                src="/planImage.jpg"
                width="175"
                height="100"
                alt="Planwire"
              />
            </CardContent>
          </Card>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
