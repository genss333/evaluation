import ProbationLayout from "@/modules/probation/presentation/components/probation-layout";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: "Selft Probations",
  };
}

const ProbationPage = async () => {
  return <ProbationLayout />;
};

export default ProbationPage;
