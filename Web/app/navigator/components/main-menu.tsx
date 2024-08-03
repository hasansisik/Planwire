import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import MenuItem from "./menu-item";
import MenuTitle from "./menu-title";
import Link from "next/link";
import { LightDarkToggle } from "@/components/ui/light-dark-toggle";
import { cn } from "@/lib/utils";

export default function MainMenu({ className }: { className?: string }) {
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const projectId = url.pathname.split("/").pop();
    setSelectedMenu(projectId);
  }, []);

  const url = new URL(window.location.href);
  const projectId = url.pathname.split("/").pop();

  return (
    <nav
      className={cn(
        `md:bg-muted overflow-auto md:border-r md:border-gray-300 flex flex-col`,
        className
      )}
    >
      <header className="border-b dark:border-b-black border-b-zinc-300">
        <Link href="/projects">
          <MenuTitle />
        </Link>
      </header>
      <ul className="flex flex-col py-4 px-2 gap-3 grow">
        <MenuItem
          href={`/navigator/plan/${projectId}`}
          icon="LayoutPanelLeft"
          className={selectedMenu === projectId ? "selected" : ""}
        >
          Planlar
        </MenuItem>
        <MenuItem
          href={`/navigator/task/${projectId}`}
          icon="LayoutList"
          className={selectedMenu === projectId ? "selected" : ""}
        >
          Görevler
        </MenuItem>
        <MenuItem
          href={`/navigator/form/${projectId}`}
          icon="File"
          className={selectedMenu === projectId ? "selected" : ""}
        >
          Formlar
        </MenuItem>
        <MenuItem
          href={`/navigator/file/${projectId}`}
          icon="FolderOpen"
          className={selectedMenu === projectId ? "selected" : ""}
        >
          Dosyalar
        </MenuItem>
      </ul>
      <footer className="flex gap-2 px-3 py-4 items-center">
        <Link href="/navigator/profile">
          <Avatar>
            <AvatarFallback className="bg-pink-300 dark:bg-pink-800">
              NY
            </AvatarFallback>
          </Avatar>
        </Link>
        <Link href="/" className="hover:underline">
          Çıkış
        </Link>
        <LightDarkToggle className="ml-auto" />
      </footer>
    </nav>
  );
}
