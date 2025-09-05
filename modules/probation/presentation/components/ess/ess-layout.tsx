import Flex from "@/components/layout/flex";
import { ProbationModel } from "@/modules/probation/data/models/probation-model";
import ProbationDetail from "../shared/probation-details";
import ProbationTitle from "./probation-title";

interface ESSLayoutProps {
  data: ProbationModel | null;
}

const ESSLayout = ({ data }: ESSLayoutProps) => {
  return (
    <Flex direction={"col"} gap={4} className="m-[20px]">
      <ProbationTitle />
      <ProbationDetail />
    </Flex>
  );
};

export default ESSLayout;
