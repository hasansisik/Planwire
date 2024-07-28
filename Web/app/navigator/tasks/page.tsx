"use client";

import { useEffect, useState } from "react";
import AvatarGroup from "@/components/ui/avatar-group";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import Image from "next/image";

interface Task {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  assignee: string;
  avatars: string[];
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks: Task[] = [
        {
          id: 1,
          title: "Malzeme Eksikliği",
          description: "Asansör kuyusuna beton döküldü",
          date: "29.07.2024",
          location: "DA-A-1K",
          assignee: "Nedim Yeşilçınar",
          avatars: [
            "/user.jpg",
            "/user.jpg",
            "/user.jpg",
            "/user.jpg",
            "/user.jpg",
          ],
        },
        {
          id: 2,
          title: "Elektrik Sorunu",
          description: "Elektrik panosunda arıza tespit edildi",
          date: "30.07.2024",
          location: "DA-B-2L",
          assignee: "Ayşe Yılmaz",
          avatars: ["/user.jpg", "/user.jpg"],
        },
      ];
      setTasks(tasks);
    };

    fetchTasks();
  }, []);

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
      <div className="tasks-container">
        {tasks.map((task) => (
          <Card key={task.id} className="task-card">
            <CardHeader>
              <CardTitle className="text-base">
                <div className="flex-center gap-5 justify-between">
                  <p className="text-sm font-normal">#{task.id}</p>
                  <p className="text-sm font-normal">{task.title}</p>
                  <div className="flex-center">
                    <Image
                      src="/user.jpg"
                      width="40"
                      height="40"
                      style={{ borderRadius: "50%" }}
                      alt="Planwire"
                    />
                    <p className="text-sm font-normal">{task.assignee}</p>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h6>{task.description}</h6>
            </CardContent>
            <CardFooter className="flex-center gap-5 justify-between">
              <p className="text-sm font-normal">{task.date}</p>
              <h6 className="text-sm">{task.location}</h6>
              <div className="flex-center justify-between">
                <AvatarGroup avatars={task.avatars} />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
