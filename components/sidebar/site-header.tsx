import AppNavbar from "../navbar/app-navbar";

interface SiteHeaderProps {
  lang: "en" | "th";
}

export function SiteHeader({ lang }: SiteHeaderProps) {
  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear">
      <div className="flex w-full justify-between items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <div></div>
        <AppNavbar lang={lang} />
      </div>
    </header>
  );
}
