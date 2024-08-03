"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { getTasks } from "@/redux/actions/taskActions";
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
import Link from "next/link";

interface Task {
  _id: string;
  taskTitle: string;
  taskCategory: string;
  createdAt: string;
  taskCreator: {
    _id: string;
    name: string;
    email: string;
    picture: string;
  };
  project: string;
  plan: {
    _id: string;
    planName: string;
    planCode: string;
    planImages: string;
  };
  persons: Array<{
    _id: string;
    name: string;
    picture: string;
  }>;
  messages: Array<any>;
  number: number;
}

export default function Tasks() {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  useEffect(() => {
    const url = new URL(window.location.href);
    const projectId = url.pathname.split("/").pop();
    console.log(projectId);
    if (projectId) {
      dispatch(getTasks(projectId));
    }
  }, [dispatch]);

  return (
    <div>
      <div className="pb-5">
        <h4>Görevler</h4>
        <p className="text-muted-foreground font-normal text-sm">
          Görevleri buradan inceleyebilir, ekleyebilir ve arama yapabilirsiniz.
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
      <div className="cards-container">
        {tasks.map((task: Task) => (
          <Link
            key={task._id}
            href={`/navigator/tasks/${task._id}/details`}
            className="task-card"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  <div className="flex-center gap-5 justify-between">
                    <div className="flex-center">
                      <p className="text-sm font-normal">#{task.number}</p>
                      <p className="text-sm font-normal">{task.taskCategory}</p>
                    </div>
                    <div className="flex-center">
                      <Image
                        src={task.taskCreator.picture}
                        width="40"
                        height="40"
                        style={{ borderRadius: "50%" }}
                        alt={task.taskCreator.name}
                      />
                      <p className="text-sm font-normal">
                        {task.taskCreator.name}
                      </p>
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h6>{task.taskTitle}</h6>
              </CardContent>
              <CardFooter className="flex-center gap-5 justify-between">
                <p className="text-sm font-normal">
                  {new Date(task.createdAt).toLocaleDateString()}
                </p>
                <h6 className="text-sm">{task.plan.planCode}</h6>
                <div className="flex-center justify-between"></div>
                <AvatarGroup persons={task.persons} />
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
