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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import {
  createForm,
  CreateFormPayload,
  getForms,
} from "@/redux/actions/formActions";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAllUsers } from "@/redux/actions/userActions";
import axios from "axios";
import { server } from "@/config";

interface Form {
  _id: string;
  formCategory: string;
  formTitle: string;
  formDescription: string;
  date: string;
  formCreator: {
    _id: string;
    name: string;
    picture: string;
  };
  formPerson: {
    _id: string;
    name: string;
    picture: string;
  };
  number: number;
  createdAt: string;
}

const getCompanyId = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("companyId");
  }
  return null;
};

const formSchema = z.object({
  formTitle: z.string().nonempty("Plan kodu zorunludur"),
  formCategory: z.string().nonempty("Plan kategori zorunludur"),
  formDescription: z.string().nonempty("Plan kategori zorunludur"),
  formPerson: z.any().optional(),
});

export default function Forms() {
  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const forms = useSelector((state: RootState) => state.forms.forms);
  const { user, users } = useSelector((state: RootState) => state.user);

  const [searchKey, setSearchKey] = useState("");
  const [searchResults, setSearchResults] = useState<Form[]>([]);

  const companyId = getCompanyId();

  useEffect(() => {
    if (companyId) {
      dispatch(getAllUsers(companyId));
    } else {
      console.error("Company ID is null");
    }
  }, [companyId, dispatch]);

  const handleSearch = async () => {
    try {
      const url = new URL(window.location.href);
      const projectId = url.pathname.split("/").pop();
      let searchUrl = `${server}/search/form/?`;

      if (searchKey) {
        searchUrl += `search=${searchKey}&`;
      }
      if (projectId) {
        searchUrl += `projectId=${projectId}&`;
      }
      if (searchUrl[searchUrl.length - 1] === "&") {
        searchUrl = searchUrl.slice(0, -1);
      }

      const response = await axios.get(searchUrl);
      setSearchResults(response.data);
    } catch (error) {
      console.log("Failed to get plans", error);
    }
  };

  const handleClear = () => {
    setSearchKey("");
    setSearchResults([]);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      formTitle: "",
      formCategory: "",
      formDescription: "",
      formPerson: "",
    },
  });

  useEffect(() => {
    const url = new URL(window.location.href);
    const projectId = url.pathname.split("/").pop();
    if (projectId) {
      dispatch(getForms(projectId));
    }
  }, [dispatch]);

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const projectId = new URL(window.location.href).pathname.split("/").pop();
    if (projectId) {
      const payload: CreateFormPayload = {
        projectId,
        formCategory: data.formCategory,
        formTitle: data.formTitle,
        formDescription: data.formDescription,
        formCreator: user._id,
        formPerson: data.formPerson,
      };

      const actionResult = await dispatch(createForm(payload));
      if (createForm.fulfilled.match(actionResult)) {
        if (actionResult.payload) {
          toast({
            title: "Form Oluşturuldu",
            description: "Başarıyla Form oluşturuldu.",
          });
          if (projectId) {
            dispatch(getForms(projectId));
          }
        } else {
          toast({
            title: "Form Oluşturulamadı",
            description: "Form yanıt formatı.",
            variant: "destructive",
          });
        }
      } else if (createForm.rejected.match(actionResult)) {
        toast({
          title: "Form Oluşturulamadı",
          description: actionResult.payload as React.ReactNode,
          variant: "destructive",
        });
      }
    }
  };

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
          <Input
            className="w-[300px]"
            type="search"
            placeholder="Form Ara"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <Button variant="outline" onClick={handleClear}>Temizle</Button>
          <Button onClick={handleSearch}>
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
            <div className="grid gap-4 py-4">
              <Form {...form}>
                <form
                  className="flex flex-col gap-4"
                  onSubmit={form.handleSubmit(handleSubmit)}
                >
                  {/* formTitle Input */}
                  <FormField
                    control={form.control}
                    name="formTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Form Başlığı</FormLabel>
                        <FormControl>
                          <Input placeholder="Form Başlığı" {...field} />
                        </FormControl>
                        <FormDescription>Form Başlığını Girin</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* formCategory Input */}
                  <FormField
                    control={form.control}
                    name="formCategory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Form Kategorisi</FormLabel>
                        <FormControl>
                          <Input placeholder="Form Kategorisi" {...field} />
                        </FormControl>
                        <FormDescription>
                          Form Kategorisini Girin
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* formDescription Input */}
                  <FormField
                    control={form.control}
                    name="formDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Form Açıklaması</FormLabel>
                        <FormControl>
                          <Input placeholder="Form Açıklaması" {...field} />
                        </FormControl>
                        <FormDescription>Form Açıklaması Girin</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* formPerson Input */}
                  <FormField
                    control={form.control}
                    name="formPerson"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>İlgili Kişiyi Seç</FormLabel>
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
                      <Button type="submit">Form Ekle</Button>
                    </DialogClose>
                  </DialogFooter>
                </form>
              </Form>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="cards-container">
        {searchResults.length === 0
          ? forms.map((form: Form) => (
              <Card key={form._id} className="form-card">
                <CardHeader>
                  <CardTitle className="text-base">
                    <div className="flex-center gap-5 justify-between">
                      <div className="flex-center">
                        <p className="text-sm font-normal">#{form.number}</p>
                        <p className="text-sm font-normal">
                          {form.formCategory}
                        </p>
                      </div>
                      <p className="text-sm font-normal">
                        {new Date(form.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <h6>{form.formTitle}</h6>
                </CardContent>
                <CardFooter className="flex-center gap-5 justify-between">
                  <div className="flex-center">
                    <Image
                      src={form.formCreator.picture}
                      width="40"
                      height="40"
                      style={{ borderRadius: "50%" }}
                      alt="Planwire"
                    />
                    <div>
                      <p className="text-xs font-normal">Oluşturan :</p>
                      <p className="text-sm font-bold">
                        {form.formCreator.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex-center">
                    <Image
                      src={form.formPerson.picture}
                      width="40"
                      height="40"
                      style={{ borderRadius: "50%" }}
                      alt="Planwire"
                    />
                    <div>
                      <p className="text-xs font-normal">İmzalayan :</p>
                      <p className="text-sm font-bold">
                        {form.formPerson.name}
                      </p>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))
          : searchResults.map((form: Form) => (
              <Card key={form._id} className="form-card">
                <CardHeader>
                  <CardTitle className="text-base">
                    <div className="flex-center gap-5 justify-between">
                      <div className="flex-center">
                        <p className="text-sm font-normal">#{form.number}</p>
                        <p className="text-sm font-normal">
                          {form.formCategory}
                        </p>
                      </div>
                      <p className="text-sm font-normal">
                        {new Date(form.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <h6>{form.formTitle}</h6>
                </CardContent>
                <CardFooter className="flex-center gap-5 justify-between">
                  <div className="flex-center">
                    <Image
                      src={form.formCreator.picture}
                      width="40"
                      height="40"
                      style={{ borderRadius: "50%" }}
                      alt="Planwire"
                    />
                    <div>
                      <p className="text-xs font-normal">Oluşturan :</p>
                      <p className="text-sm font-bold">
                        {form.formCreator.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex-center">
                    <Image
                      src={form.formPerson.picture}
                      width="40"
                      height="40"
                      style={{ borderRadius: "50%" }}
                      alt="Planwire"
                    />
                    <div>
                      <p className="text-xs font-normal">İmzalayan :</p>
                      <p className="text-sm font-bold">
                        {form.formPerson.name}
                      </p>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
      </div>
    </div>
  );
}
