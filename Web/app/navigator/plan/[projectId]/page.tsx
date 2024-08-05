"use client"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import {
  createPlan,
  CreatePlanPayload,
  getPlans,
} from "@/redux/actions/planActions";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { storage } from "@/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";
import { server } from "@/config";
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
import { Input } from "@/components/ui/input";
import { GalleryVerticalEnd, Plus, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const uploadPlanToFirebase = async (file: File): Promise<string> => {
  const storageRef = ref(storage, `PlanwirePlan/${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};

const formSchema = z.object({
  planName: z.string().nonempty("Plan ismi zorunludur"),
  planCode: z.string().nonempty("Plan kodu zorunludur"),
  planCategory: z.string().nonempty("Plan kategori zorunludur"),
  planImages: z.any().optional(),
});

type Plan = {
  _id: string;
  planName: string;
  planCode: string;
  planCategory: string;
  planImages: string;
  updatedAt: string;
};

export default function Plans() {
  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState<Plan[]>([]);
  const plans = useSelector((state: RootState) => state.plans.plans) as Plan[];
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      planName: "",
      planCode: "",
      planCategory: "",
      planImages: undefined,
    },
  });

  useEffect(() => {
    const url = new URL(window.location.href);
    const projectId = url.pathname.split("/").pop();
    if (projectId) {
      dispatch(getPlans(projectId));
    }
  }, [dispatch]);

  const handleSearch = async () => {
    try {
      let url = `${server}/search/plan/?`;
      if (searchKey) {
        url += `search=${searchKey}&`;
      }
      if (url[url.length - 1] === "&") {
        url = url.slice(0, -1);
      }
      const response = await axios.get(url);
      setSearchResults(response.data);
    } catch (error) {
      console.log("Failed to get plans", error);
    }
  };

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const url = new URL(window.location.href);
    const projectId = url.pathname.split("/").pop();
    let logoURL = "";
    if (data.planImages && data.planImages[0]) {
      const logoFile = data.planImages[0] as unknown as File;
      logoURL = await uploadPlanToFirebase(logoFile);
    }
    const payload: CreatePlanPayload = {
      ...data,
      planImages: logoURL ? logoURL : "",
      projectId: projectId || "",
    };
    const actionResult = await dispatch(createPlan(payload));
    if (createPlan.fulfilled.match(actionResult)) {
      if (actionResult.payload) {
        toast({
          title: "Proje Oluşturuldu",
          description: "Başarıyla proje oluşturuldu.",
        });
        if (projectId) {
          dispatch(getPlans(projectId));
        }
      } else {
        toast({
          title: "Proje Oluşturulamadı",
          description: "Geçersiz yanıt formatı.",
          variant: "destructive",
        });
      }
    } else if (createPlan.rejected.match(actionResult)) {
      toast({
        title: "Giriş Başarısız",
        description: actionResult.payload as React.ReactNode,
        variant: "destructive",
      });
    }
  };

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
          <Input
            className="w-[300px]"
            type="search"
            placeholder="Plan Ara"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <Button onClick={handleSearch}>
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
              <Form {...form}>
                <form
                  className="flex flex-col gap-4"
                  onSubmit={form.handleSubmit(handleSubmit)}
                >
                  <FormField
                    control={form.control}
                    name="planName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Plan İsmi</FormLabel>
                        <FormControl>
                          <Input placeholder="Plan Adı" {...field} />
                        </FormControl>
                        <FormDescription>Plan İsmini Girin</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="planCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Plan Kodu</FormLabel>
                        <FormControl>
                          <Input placeholder="Plan Kodu" {...field} />
                        </FormControl>
                        <FormDescription>Plan Kodunu Girin</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="planCategory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Plan Kategori</FormLabel>
                        <FormControl>
                          <Input placeholder="Plan Kategori" {...field} />
                        </FormControl>
                        <FormDescription>Plan Kategori Girin</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="planImages"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Plan Görseli</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            onChange={(e) => {
                              const files = e.target.files;
                              if (files && files.length > 0) {
                                field.onChange(files); // Dosya nesnesini gönder
                              } else {
                                field.onChange(undefined); // Boş değer gönder
                              }
                            }}
                          />
                        </FormControl>
                        <FormDescription>Plan Görseli Girin</FormDescription>
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
      {searchResults.length === 0
        ? plans.map((item) => (
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
          ))
        : searchResults.map((item) => (
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
