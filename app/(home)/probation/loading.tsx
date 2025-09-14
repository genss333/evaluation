import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="space-y-4 m-4">
      <Skeleton className="h-48 rounded-[10px]" />
      <Skeleton className="h-[calc(100vh-24rem)] rounded-[10px]" />
    </div>
  );
};

export default Loading;
