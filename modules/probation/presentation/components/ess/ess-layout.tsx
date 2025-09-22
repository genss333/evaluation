"use client";

import Flex from "@/components/layout/flex";
import { Probation } from "@/modules/probation/domain/entities/probation";
import ProbationDetail from "../shared/probation-details";
import ProbationESSGrade from "./probation-grade";
import ProbationTitle from "./probation-title";

interface ESSLayoutProps {
  data: Probation;
}

const ESSLayout = ({ data }: ESSLayoutProps) => {
  return (
    <Flex direction={"col"} gap={4} className="m-[20px]">
      <ProbationTitle items={data.titles} />
      <ProbationDetail
        data={data}
        GradeGroup={(data) => <ProbationESSGrade data={data} />}
        showBtnActions
      />
    </Flex>
  );
};

export default ESSLayout;
