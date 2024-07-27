import { Button } from "@/components/ui/button";
import { PersonStandingIcon } from "lucide-react";
import Link from "next/link";

export default function BlogPage() {
  return (
    <>
      <h1 className="flex gap-2 items-center">
        <PersonStandingIcon size={50} color="#D2FF53" />
        Hoşgeldiniz Sitemize !
      </h1>
      <p>Sitemize Hoşgeldiniz</p>
      <div className="flex gap-3 items-center">
        <Button asChild>
          <Link href="/login">Giriş Yap</Link>
        </Button>
        <small>or</small>
        <Button asChild variant="outline">
          <Link href="/sign-up">Kayıt Ol</Link>
        </Button>
      </div>
    </>
  );
}
