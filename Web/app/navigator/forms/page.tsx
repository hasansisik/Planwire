"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import Image from "next/image";
import { useEffect, useState } from "react";

interface Form {
  id: number;
  formCategory: string;
  formTitle: string;
  date: string;
  formCreator: string;
  formPerson: string;
}

export default function Forms() {
  const [forms, setForms] = useState<Form[]>([]);

  useEffect(() => {
    const fetchForms = async () => {
      const forms: Form[] = [
        {
          id: 1,
          formCategory: "Finans",
          formTitle: "Bütçe Raporu",
          date: "29.07.2024",
          formCreator: "Ahmet Yılmaz",
          formPerson: "Mehmet Demir",
        },
      ];
      setForms(forms);
    };

    fetchForms();
  }, []);

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
              <Plus />
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
      <div className="cards-container">
        {forms.map((form) => (
          <Card key={form.id} className="form-card">
            <CardHeader>
              <CardTitle className="text-base">
                <div className="flex-center gap-5 justify-between">
                  <div className="flex-center">
                    <p className="text-sm font-normal">#{form.id}</p>
                    <p className="text-sm font-normal">{form.formCategory}</p>
                  </div>
                  <p className="text-sm font-normal">{form.date}</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h6>{form.formTitle}</h6>
            </CardContent>
            <CardFooter className="flex-center gap-5 justify-between">
              <div className="flex-center">
                <Image
                  src="/user.jpg"
                  width="40"
                  height="40"
                  style={{ borderRadius: "50%" }}
                  alt="Planwire"
                />
                <div>
                  <p className="text-xs font-normal">Oluşturan :</p>
                  <p className="text-sm font-bold">{form.formCreator}</p>
                </div>
              </div>
              <div className="flex-center">
                <Image
                  src="/user.jpg"
                  width="40"
                  height="40"
                  style={{ borderRadius: "50%" }}
                  alt="Planwire"
                />
                <div>
                  <p className="text-xs font-normal">İmzalayan :</p>
                  <p className="text-sm font-bold">{form.formPerson}</p>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
