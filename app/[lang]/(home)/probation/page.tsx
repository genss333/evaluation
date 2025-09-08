import { getQueryClient } from "@/lib/get-query-client";
import MSSLayout from "@/modules/probation/presentation/components/mss/mss-layout";
import { prefetchProbation } from "@/modules/probation/presentation/hooks/fetch-probation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: "ESS Probations",
  };
}

const ProbationPage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(prefetchProbation());
  const data = queryClient.getQueryData(prefetchProbation().queryKey);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {data && <MSSLayout data={data} />}
    </HydrationBoundary>
  );
};

export default ProbationPage;
