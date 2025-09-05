"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as React from "react";

import { cn } from "@/lib/utils";

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        // Base layout and sizing
        "inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center cursor-pointer",
        "gap-1.5 rounded-md border border-transparent px-2 py-1",

        // Typography and text color
        "font-body3 text-semi-black dark:text-muted-foreground whitespace-nowrap",

        // Transitions
        "transition-[color,box-shadow]",

        // State: Active
        "data-[state=active]:text-tiger-red",
        "dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30",
        "dark:data-[state=active]:text-semi-black",
        "data-[state=active]:border-b-2 data-[state=active]:border-b-tiger-red rounded-none mx-1.5",

        // State: Focus
        "focus-visible:border-ring focus-visible:outline-1 focus-visible:outline-ring",
        "focus-visible:ring-[3px] focus-visible:ring-ring/50",

        // State: Disabled
        "disabled:pointer-events-none disabled:opacity-50",

        // Child SVG styles
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",

        // Prop className
        className
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(
        "flex-1 outline-1 outline=[#E6E6E6] rounded-tl-[10px] rounded-tr-[10px]",
        className
      )}
      {...props}
    />
  );
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
