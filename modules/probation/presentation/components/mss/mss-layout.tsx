"use client";

import { Probation } from "@/modules/probation/domain/entities/probation";
import { ReactNode } from "react";
import ProbationDetail from "../shared/probation-details";
import EmpApproveLine from "./emp-approve-line-list";
import RollBack from "./mss-rollback";
import ProbationGrade from "./probation-grade";

interface MSSLayoutProps {
  data: Probation;
  showBtnActions: boolean;
  roleBack?: ReactNode;
}

const MSSLayout = ({ data, showBtnActions, roleBack }: MSSLayoutProps) => {
  return (
    <div className="space-y-2.5 xl:grid xl:grid-cols-4 xl:gap-2 px-2.5">
      <div className="col-span-1">
        {data.employee && data.titles && (
          <EmpApproveLine
            employees={data.employee}
            form={data.titles[0] || null}
          />
        )}
      </div>
      <div className="col-span-3">
        <ProbationDetail
          data={data}
          GradeGroup={(data) => <ProbationGrade data={data} />}
          roleBack={roleBack ?? <RollBack key={"mss-rollback"} />}
          showBtnActions={showBtnActions}
        />
      </div>
    </div>
  );
};

export default MSSLayout;
