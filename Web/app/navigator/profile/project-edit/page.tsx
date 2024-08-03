"use client";
import { useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { useEffect } from "react";
import { getProjects } from "@/redux/actions/projectActions";
import { Project } from "@/redux/reducers/projectReducer";

const getCompanyId = () => {
  return localStorage.getItem("companyId");
};

export default function ProjectPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const companyId = getCompanyId();
    if (companyId) {
      dispatch(getProjects(companyId));
    }
  }, [dispatch]);

  const projects = useSelector((state: RootState) => state.projects.projects);

  const handleSelectChange = (projectId: string) => {
    const project = projects.find((p) => p._id === projectId);
    if (project) {
      setSelectedProject(project);
    }
  };

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
        <Select onValueChange={handleSelectChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Lütfen Proje Seçin" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Projeler</SelectLabel>
              {projects.map((project) => (
                <SelectItem key={project._id} value={project._id}>
                  {project.projectName}
                </SelectItem>
              ))}
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
        <Input
          placeholder={
            selectedProject ? selectedProject.projectName : "Proje Adı"
          }
          className="w-[300px]"
        />
      </div>
      <div className="grid grid-cols-3 gap-4 py-5 border-b">
        <div className="pb-5">
          <p className="font-bold text-sm">Proje Kodu</p>
          <p className="text-muted-foreground font-normal text-xs">
            Proje Kodunu düzenleyebilir veya değiştirebilirsiniz.
          </p>
        </div>
        <Input
          placeholder={
            selectedProject ? selectedProject.projectCode : "Proje Kodu"
          }
          className="w-[300px]"
        />
      </div>
      <div className="grid grid-cols-3 gap-4 py-5 border-b">
        <div className="pb-5">
          <p className="font-bold text-sm">Adres</p>
          <p className="text-muted-foreground font-normal text-xs">
            Adresinizi düzenleyebilir veya değiştirebilirsiniz.
          </p>
        </div>
        <Textarea
          placeholder={
            selectedProject ? selectedProject.address : "Adres Bilgileri"
          }
        />
      </div>
    </div>
  );
}
