import { getSession } from "@/app/api/auth/route";
import { getQueryClient } from "@/lib/get-query-client";
import { Role } from "@/models/user-role";
import ESSLayout from "@/modules/probation/presentation/components/ess/ess-layout";
import MSSLayout from "@/modules/probation/presentation/components/mss/mss-layout";
import { prefetchProbation } from "@/modules/probation/presentation/hooks/fetch-probation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const session = await getSession();

  let title = "Probation Portal"; // Default title for guests

  if (session) {
    switch (session.role) {
      case Role.MSS:
        title = "Manager View: Probations";
        break;
      case Role.ESS:
        title = "My Probation Details";
        break;
      default:
        title = "Dashboard";
        break;
    }
  }

  return {
    title: title,
  };
}

const ProbationPage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(prefetchProbation());
  const data = queryClient.getQueryData(prefetchProbation().queryKey);

  const session = await getSession();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {session?.role === Role.MSS && data ? (
        <MSSLayout data={data} />
      ) : data ? (
        <ESSLayout data={data} />
      ) : (
        <div>No probation data available.</div>
      )}
    </HydrationBoundary>
  );
};

export default ProbationPage;
