import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import MenuItem from "./menu-item";
import Link from "next/link";
import { LightDarkToggle } from "@/components/ui/light-dark-toggle";
import { cn } from "@/lib/utils";

export default function MainMenu({ className }: { className?: string }) {
  return (
    <nav className={cn(`overflow-auto flex flex-col p-10`, className)}>
      <h5>Profil Ayarları</h5>
      <ul className="flex flex-col py-4 px-2 gap-3 grow">
        <MenuItem href="/profile" icon="UserRoundPen">
          Profili Düzenle
        </MenuItem>
        <MenuItem href="/profile/project-edit" icon="SquarePen">
          Projeyi Düzenle
        </MenuItem>
        <MenuItem href="/profile/helpers" icon="LifeBuoy">
          Yardım ve Destek
        </MenuItem>
        <MenuItem href="/profile/politcy" icon="Clipboard">
          Politikalar ve Gizlilik
        </MenuItem>
        <MenuItem href="" icon="LogOut">
          Çıkış
        </MenuItem>
      </ul>
    </nav>
  );
}
