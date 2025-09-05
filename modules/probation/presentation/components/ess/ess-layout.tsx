import Flex from "@/components/layout/flex";
import { ProbationModel } from "@/modules/probation/data/models/probation-model";
import ProbationDetail from "../shared/probation-details";
import ProbationTitle from "./probation-title";

interface ESSLayoutProps {
  data: ProbationModel;
}

const ESSLayout = ({ data }: ESSLayoutProps) => {
  return (
    <Flex direction={"col"} gap={4} className="m-[20px]">
      <ProbationTitle items={data?.titles ?? []} />
      <ProbationDetail data={data} />
    </Flex>
  );
};

export default ESSLayout;
