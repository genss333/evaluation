import { ProbationModel } from "@/modules/probation/data/models/probation-model";
import MSSLayout from "../mss/mss-layout";
import HRRollBack from "./hr-rollback";

interface HRLayoutProps {
  data: ProbationModel;
}

const HRLayout = ({ data }: HRLayoutProps) => {
  return (
    <MSSLayout
      data={data}
      showBtnActions={false}
      roleBack={<HRRollBack key={"hr-rollback"} />}
    />
  );
};

export default HRLayout;
