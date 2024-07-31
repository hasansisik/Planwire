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
import { PersonStandingIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { PasswordInput } from "@/components/ui/password-input";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hook";
import { login, LoginPayload } from "@/redux/actions/userActions";

// localStorage'dan companyId'yi almak için fonksiyon
const getCompanyId = () => {
  return localStorage.getItem("companyId");
};

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Şifre en az 8 karakter olmalıdır")
});

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  });

   const handleSubmit = async (data: z.infer<typeof formSchema>) => {
     const companyId = getCompanyId();
     const actionResult = await dispatch(login({ ...data, companyId } as LoginPayload));
     if (login.fulfilled.match(actionResult)) {
       if (actionResult.payload) {
         router.push("/projects");
       } else {
         console.error("Giriş Başarısız: Geçersiz yanıt formatı");
       }
     } else if (login.rejected.match(actionResult)) {
       console.error("Giriş Başarısız:", actionResult.error.message);
     }
   };

  return (
    <>
      <PersonStandingIcon size={50} />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Giriş Yap</CardTitle>
          <CardDescription>Giriş yapmak için bilgileri doldurun.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              {/* Email Input */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="ornek@hotmail.com" {...field} />
                    </FormControl>
                    <FormDescription>Email adresinizi girin</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Password Input */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Şifre</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="●●●●●●●●" {...field} />
                    </FormControl>
                    <FormDescription>Şifrenizi girin</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Giriş Yap</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="justify-between">
          <small>Hesabınız yok mu ?</small>
          <Button asChild variant="outline" size="sm">
            <Link href="/sign-up">Kayıt Ol</Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
