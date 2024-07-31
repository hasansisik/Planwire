"use client";
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
import { LayoutGrid, Pencil, Plus, Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "@/redux/actions/projectActions";
import { RootState } from "@/redux/store";

const getCompanyId = () => {
  return localStorage.getItem("companyId");
};

interface Project {
  id: string;
  projectName: string;
  projectCode: string;
  logo: string;
}

export default function Projects() {
  const dispatch = useDispatch();
  const projects = useSelector((state: RootState) => state.projects.projects);

  useEffect(() => {
    const companyId = getCompanyId();
    if (companyId) {
      dispatch(getProjects(companyId));
    }
  }, [dispatch]);

  return (
    <div>
      <div className="pb-5 flex flex-row justify-between gap-4">
        <div className="flex flex-row items-center gap-5">
          <LayoutGrid />
          <h5>Projeler</h5>
        </div>
        <div className="flex-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex gap-2 text-xs">
                <Pencil />
                Proje Düzenle
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Proje Düzenle</DialogTitle>
                <DialogDescription>
                  Proje düzenlemek için gerekli bilgileri giriniz.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4"></div>
              <DialogFooter>
                <Button type="submit">Proje Düzenle</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex gap-2 text-xs">
                <Plus />
                Proje Ekle
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Proje Ekle</DialogTitle>
                <DialogDescription>
                  Proje eklemek için gerekli bilgileri giriniz.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4"></div>
              <DialogFooter>
                <Button type="submit">Proje Ekle</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="cards-container">
        {projects.map((project: Project) => (
          <Card key={project.id} className="form-card">
            <CardHeader>
              <CardTitle className="text-base">{project.projectName}</CardTitle>
              <CardDescription>{project.projectCode}</CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                src="/planwirelogo.png"
                width="150"
                height="70"
                alt="Planwite"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
