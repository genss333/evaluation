"use client";
import { switchLang } from "@/lib/dictionaries";
import { Bell, Languages, UserRound } from "lucide-react";
import { ReactNode } from "react";
import Flex from "../layout/flex";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface AppNavbarProps {
  lang: "en" | "th";
}

const AppNavbarItem = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-background rounded-full h-[40px] p-2">{children}</div>
  );
};

const SwitchLang = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <AppNavbarItem>
          <Languages className="size-5  opacity-80" />
        </AppNavbarItem>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={8}>
        <DropdownMenuItem onClick={() => switchLang("th")}>
          Thai
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchLang("en")}>
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const AppNavbar = ({ lang }: AppNavbarProps) => {
  return (
    <Flex justify="between" align="center" gap={4} className="mt-4 mr-10">
      <AppNavbarItem>image</AppNavbarItem>
      <AppNavbarItem>
        <div className="relative">
          <div className="size-1.5 bg-tiger-red rounded-full absolute top-0 right-1 z-10" />
          <Bell className="size-5  opacity-80" />
        </div>
      </AppNavbarItem>
      <AppNavbarItem>
        <UserRound className="size-5  opacity-80" />
      </AppNavbarItem>
      <SwitchLang />
    </Flex>
  );
};

export default AppNavbar;
