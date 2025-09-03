import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: "Selft Probations",
  };
}

const ProbationPage = async () => {
  return <div></div>;
};

export default ProbationPage;
