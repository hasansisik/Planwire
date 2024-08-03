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
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { getPlans } from "@/redux/actions/planActions";

interface Plan {
  _id: string;
  planName: string;
  planCode: string;
  planCategory: string;
  planImages: string;
  createdAt: string;
  updatedAt: string;
  project: string;
  pins: any[];
  __v: number;
}

export default function Plans() {
  const dispatch = useDispatch<AppDispatch>();
  const plans = useSelector((state: RootState) => state.plans.plans);
  console.log(plans);

  useEffect(() => {
    const url = new URL(window.location.href);
    const projectId = url.pathname.split("/").pop();
    console.log(projectId);
    if (projectId) {
      dispatch(getPlans(projectId));
    }
  }, [dispatch]);

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
      {plans.map((item) => (
        <AccordionItem key={item._id} className="pb-3" value={item._id}>
          <AccordionTrigger>
            <div className="flex flex-row gap-2">
              <GalleryVerticalEnd />
              <p>{item.planCategory}</p>
            </div>
          </AccordionTrigger>
          <AccordionContent className="cards-container">
            <Link href={`/navigator/plan`} className="plan-card">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    <div className="flex flex-row justify-between">
                      <p>{item.planCode}</p>
                      <p className="text-sm font-normal">
                        {new Date(item.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </CardTitle>
                  <CardDescription>{item.planName}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Image
                    src={item.planImages}
                    width="175"
                    height="100"
                    alt="Planwire"
                  />
                </CardContent>
              </Card>
            </Link>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
