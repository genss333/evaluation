import { getQueryClient } from "@/lib/get-query-client";
import ESSLayout from "@/modules/probation/presentation/components/ess/ess-layout";
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
      {data && <ESSLayout data={data} />}
    </HydrationBoundary>
  );
};

export default ProbationPage;
