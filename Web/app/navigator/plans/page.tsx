"use client";

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
import { GalleryVerticalEnd, Plus, Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Plan {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  assignee: string;
  avatars: string[];
  plans: {
    code: string;
    date: string;
    description: string;
    image: string;
  }[];
}

export default function Plans() {
  const [tasks, setTasks] = useState<Plan[]>([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const plans: Plan[] = [
          {
            id: "item-1",
            title: "Zemin Kat",
            description: "",
            date: "",
            location: "",
            assignee: "",
            avatars: [],
            plans: [
              {
                code: "DA-A-1K",
                date: "27.07.2024",
                description: "Avm Projesi",
                image: "/planImage.jpg",
              },
              {
                code: "DA-A-2K",
                date: "28.07.2024",
                description: "Ofis Projesi",
                image: "/planImage.jpg",
              },
              {
                code: "DA-A-1K",
                date: "27.07.2024",
                description: "Avm Projesi",
                image: "/planImage.jpg",
              },
              {
                code: "DA-A-2K",
                date: "28.07.2024",
                description: "Ofis Projesi",
                image: "/planImage.jpg",
              },
              {
                code: "DA-A-1K",
                date: "27.07.2024",
                description: "Avm Projesi",
                image: "/planImage.jpg",
              },
              {
                code: "DA-A-2K",
                date: "28.07.2024",
                description: "Ofis Projesi",
                image: "/planImage.jpg",
              },
            ],
          },
          {
            id: "item-2",
            title: "1.Kat",
            description: "",
            date: "",
            location: "",
            assignee: "",
            avatars: [],
            plans: [
              {
                code: "DA-B-1K",
                date: "29.07.2024",
                description: "Konut Projesi",
                image: "/planImage.jpg",
              },
            ],
          },
        ];
        setTasks(plans);
      } catch (error) {
        console.error("Hata:", error);
      }
    };
    fetchPlans();
  }, []);

  return (
    <Accordion type="multiple" className="w-full">
      <div className="pb-5">
        <h4>Planlar</h4>
        <p className="text-muted-foreground font-normal text-sm">
          Planlarınızı buradan inceleyebilir, ekleyebilir ve arama
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
            <div className="grid gap-4 py-4"></div>
            <DialogFooter>
              <Button type="submit">Plan Ekle</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      {tasks.map((item) => (
        <AccordionItem key={item.id} className="pb-3" value={item.id}>
          <AccordionTrigger>
            <div className="flex flex-row gap-2">
              <GalleryVerticalEnd />
              <p>{item.title}</p>
            </div>
          </AccordionTrigger>
          <AccordionContent className="cards-container">
            {item.plans.map((plan, index) => (
              <Card key={index} className="plan-card">
                <CardHeader>
                  <CardTitle className="text-base">
                    <div className="flex flex-row justify-between">
                      <p>{plan.code}</p>
                      <p className="text-sm font-normal">{plan.date}</p>
                    </div>
                  </CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    src={plan.image}
                    width="175"
                    height="100"
                    alt="Planwire"
                  />
                </CardContent>
              </Card>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
