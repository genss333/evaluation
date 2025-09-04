import Flex from "@/components/layout/flex";
import ProbationDetail from "../shared/probation-details";
import ProbationTitle from "./probation-title";

const ESSLayout = () => {
  return (
    <Flex direction={"col"} gap={4} className="m-[20px]">
      <ProbationTitle />
      <ProbationDetail />
    </Flex>
  );
};

export default ESSLayout;
