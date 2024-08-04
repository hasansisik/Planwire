import { LightDarkToggle } from "@/components/ui/light-dark-toggle";
import { Toaster } from "@/components/ui/toaster";

type Props = {
  children: React.ReactNode;
};

export default function ProjectLayout({ children }: Props) {
  return (
    <>
      <div className="overflow-auto px-10 py-5">
        {children} 
        <Toaster />
      </div>
      <LightDarkToggle className="fixed top-[calc(50%-12px)] right-2" />
    </>
  );
}
