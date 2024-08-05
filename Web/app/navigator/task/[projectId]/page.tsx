"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { createTask, getTasks } from "@/redux/actions/taskActions";
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
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getPlans } from "@/redux/actions/planActions";
import { getAllUsers } from "@/redux/actions/userActions";

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

const getCompanyId = () => {
  return localStorage.getItem("companyId");
};

const formSchema = z.object({
  taskTitle: z.string().nonempty("Plan kodu zorunludur"),
  taskCategory: z.string().nonempty("Plan kategori zorunludur"),
  plan: z.any().optional(),
  persons: z.any().optional(),
});

export default function Tasks() {
  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const plans = useSelector((state: RootState) => state.plans.plans);
  const { user, users } = useSelector((state: RootState) => state.user);

  const companyId = getCompanyId();

  useEffect(() => {
    if (companyId) {
      dispatch(getAllUsers(companyId));
    } else {
      console.error("Company ID is null");
    }
  }, [companyId, dispatch]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskTitle: "",
      taskCategory: "",
      plan: "",
      persons: "",
    },
  });

  useEffect(() => {
    const url = new URL(window.location.href);
    const projectId = url.pathname.split("/").pop();
    if (projectId) {
      dispatch(getTasks(projectId));
      dispatch(getPlans(projectId));
    }
  }, [dispatch]);

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const url = new URL(window.location.href);
    const projectId = url.pathname.split("/").pop();

    const payload = {
      ...data,
      projectId: projectId || "",
      taskCreator: user._id, // Assuming `user` is available in the component's scope
    };

    const actionResult = await dispatch(createTask(payload));

    if (createTask.fulfilled.match(actionResult)) {
      if (actionResult.payload) {
        toast({
          title: "Görev Oluşturuldu",
          description: "Başarıyla görev oluşturuldu.",
        });
        if (projectId) {
          dispatch(getTasks(projectId));
        }
      } else {
        toast({
          title: "Görev Oluşturulamadı",
          description: "Geçersiz yanıt formatı.",
          variant: "destructive",
        });
      }
    } else if (createTask.rejected.match(actionResult)) {
      toast({
        title: "Görev Oluşturma Başarısız",
        description: actionResult.payload as React.ReactNode,
        variant: "destructive",
      });
    }
  };
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
            <div className="grid gap-4 py-4">
              <Form {...form}>
                <form
                  className="flex flex-col gap-4"
                  onSubmit={form.handleSubmit(handleSubmit)}
                >
                  {/* taskTitle Input */}
                  <FormField
                    control={form.control}
                    name="taskTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Görev İsmi</FormLabel>
                        <FormControl>
                          <Input placeholder="Görev Başlığı" {...field} />
                        </FormControl>
                        <FormDescription>Görev Başlığı Girin</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* taskCategory Input */}
                  <FormField
                    control={form.control}
                    name="taskCategory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Görev Kategorisi</FormLabel>
                        <FormControl>
                          <Input placeholder="Görev Kategorisi" {...field} />
                        </FormControl>
                        <FormDescription>
                          Görev Kategorisi Girin
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* PlanSelect Input */}
                  <FormField
                    control={form.control}
                    name="plan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Plan Seç</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Plan Seç" />
                            </SelectTrigger>
                            <SelectContent>
                              {plans.map((plan) => (
                                <SelectItem key={plan._id} value={plan._id}>
                                  {plan.planName}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Persons Input */}
                  <FormField
                    control={form.control}
                    name="persons"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kişi Seç</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Kişi Seç" />
                            </SelectTrigger>
                            <SelectContent>
                              {users.map((user) => (
                                <SelectItem key={user._id} value={user._id}>
                                  {user.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="submit">Proje Ekle</Button>
                    </DialogClose>
                  </DialogFooter>
                </form>
              </Form>
            </div>
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
