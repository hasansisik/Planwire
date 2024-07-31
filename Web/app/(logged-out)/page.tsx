// CompanyPage.tsx
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
import { companyLogin, LoginPayload } from "@/redux/actions/companyActions";
import { useAppDispatch } from "@/redux/hook";

const formSchema = z.object({
  CompanyCode: z.string().nonempty("Şirket kodu gerekli"),
  password: z.string().nonempty("Şifre gerekli"),
});

export default function CompanyPage() {
  const dispatch = useAppDispatch(); // useDispatch yerine useAppDispatch
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      CompanyCode: "",
      password: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const actionResult = await dispatch(companyLogin(data as LoginPayload));
    if (companyLogin.fulfilled.match(actionResult)) {
      if (actionResult.payload) {
        router.push("/welcome");
      } else {
        console.error("Giriş Başarısız: Geçersiz yanıt formatı");
      }
    } else if (companyLogin.rejected.match(actionResult)) {
      console.error("Giriş Başarısız:", actionResult.error.message);
    }
  };

  return (
    <>
      <PersonStandingIcon size={50} />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Şirket Giriş</CardTitle>
          <CardDescription>
            Şirket bilgileri ile giriş yapabilirsiniz.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              {/* Company Code Input */}
              <FormField
                control={form.control}
                name="CompanyCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Şirket Kodu</FormLabel>
                    <FormControl>
                      <Input placeholder="sirketkodu" {...field} />
                    </FormControl>
                    <FormDescription>Şirket Kodunuzu girin</FormDescription>
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
              <Button type="submit">Şirket Girişi</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
