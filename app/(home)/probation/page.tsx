import { getSession } from "@/app/api/auth/route";
import { getQueryClient } from "@/lib/get-query-client";
import { Role } from "@/models/user-role";
import ESSLayout from "@/modules/probation/presentation/components/ess/ess-layout";
import HRLayout from "@/modules/probation/presentation/components/hr/hr-layout";
import MSSLayout from "@/modules/probation/presentation/components/mss/mss-layout";
import { probationQueryOptions } from "@/modules/probation/presentation/hooks/use-fetch-probation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";
import { cookies } from "next/headers";
import Loading from "./loading";

export async function generateMetadata(): Promise<Metadata> {
  const session = await getSession();

  let title = "";

  if (session) {
    switch (session.user.role) {
      case Role.MSS:
        title = "MSS Probations";
        break;
      case Role.ADMIN:
        title = "HR Probations";
        break;
      case Role.ESS:
        title = "ESS Probations";
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
  const cookieStore = await cookies();
  const session = await getSession();
  const queryClient = getQueryClient();

  const query = probationQueryOptions({ cookieStore });
  await queryClient.prefetchQuery(query);
  const data = queryClient.getQueryData(query.queryKey);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {session?.user.role && session.user.role == Role.MSS && data ? (
        <MSSLayout data={data} showBtnActions={true} />
      ) : session?.user.role == Role.ADMIN && data ? (
        <HRLayout data={data} />
      ) : data ? (
        <ESSLayout data={data} />
      ) : (
        <Loading />
      )}
    </HydrationBoundary>
  );
};

export default ProbationPage;
