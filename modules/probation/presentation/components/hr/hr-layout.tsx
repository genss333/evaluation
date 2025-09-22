import { Probation } from "@/modules/probation/domain/entities/probation";
import MSSLayout from "../mss/mss-layout";
import HRRollBack from "./hr-rollback";

interface HRLayoutProps {
  data: Probation;
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
