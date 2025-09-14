import { Bell, Languages, UserRound } from "lucide-react";
import { ReactNode } from "react";
import Flex from "../layout/flex";

interface AppNavbarProps {
  lang: "en" | "th";
}

const AppNavbarItem = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-background rounded-full h-[40px] p-2">{children}</div>
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
      <AppNavbarItem>
        <Languages className="size-5  opacity-80" />
      </AppNavbarItem>
    </Flex>
  );
};

export default AppNavbar;
