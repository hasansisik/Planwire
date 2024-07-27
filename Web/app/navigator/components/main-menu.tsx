import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import MenuItem from "./menu-item";
import MenuTitle from "./menu-title";
import Link from "next/link";
import { LightDarkToggle } from "@/components/ui/light-dark-toggle";
import { cn } from "@/lib/utils";

export default function MainMenu({className}: {className?: string}) {
  return (
    <nav className={cn(`md:bg-muted overflow-auto md:border-r md:border-gray-300 flex flex-col`,className)}>
      <header className="border-b dark:border-b-black border-b-zinc-300">
        <MenuTitle />
      </header>
      <ul className="flex flex-col py-4 px-2 gap-3 grow">
        <MenuItem href="/navigator/plans" icon="LayoutPanelLeft">
          Planlar
        </MenuItem>
        <MenuItem href="/navigator/tasks" icon="LayoutList">
          Görevler
        </MenuItem>
        <MenuItem href="/navigator/forms" icon="File">
          Formlar
        </MenuItem>
        <MenuItem href="/navigator/file" icon="FolderOpen">
          Dosyalar
        </MenuItem>
      </ul>
      <footer className="flex gap-2 px-3 py-4 items-center">
        <Avatar>
          <AvatarFallback className="bg-pink-300 dark:bg-pink-800">
            NY
          </AvatarFallback>
        </Avatar>
        <Link href="/" className="hover:underline" >Çıkış</Link>
        <LightDarkToggle className="ml-auto"/>
      </footer>
    </nav>
  );
}
