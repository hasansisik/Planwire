import { LightDarkToggle } from "@/components/ui/light-dark-toggle";
import { Toaster } from "@/components/ui/toaster";

type Props = {
  children: React.ReactNode;
};

export default function LoggedOutLayout({ children }: Props) {
  return (
    <>
      <div className="flex flex-col gap-5 min-h-screen items-center justify-center p-24">
        {children}
        <Toaster />
      </div>
      <LightDarkToggle className="fixed top-[calc(50%-12px)] right-2" />
    </>
  );
}
