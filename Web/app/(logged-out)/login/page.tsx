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

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .refine((password) => {
      // At least one uppercase letter and one special character
      return /^(?=.*[!@#$%^&*.])(?=.*[A-Z]).*$/.test(password);
    }, "Password must contain at least one uppercase letter and one special character"),
});

export default function LoginPage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Giriş Başarılı!", data);
    router.push("/projects");
  };

  return (
    <>
      <PersonStandingIcon size={50} />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Giriş Yap</CardTitle>
          <CardDescription>This is the login page.</CardDescription>
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
                    <FormLabel>Email</FormLabel>
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
