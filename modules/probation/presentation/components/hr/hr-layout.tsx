import { ProbationModel } from "@/modules/probation/data/models/probation-model";
import MSSLayout from "../mss/mss-layout";

interface HRLayoutProps {
  data: ProbationModel;
}

const HRLayout = ({ data }: HRLayoutProps) => {
  return <MSSLayout data={data} showBtnActions={false} />;
};

export default HRLayout;
