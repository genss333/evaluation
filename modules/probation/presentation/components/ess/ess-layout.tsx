import Flex from "@/components/layout/flex";
import ProbationTitle from "./probation-title";

const ESSLayout = () => {
  return (
    <Flex direction={"col"} gap={10} className="m-[20px]">
      <ProbationTitle />
    </Flex>
  );
};

export default ESSLayout;
