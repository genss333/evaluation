import { ProbationModel } from "@/modules/probation/data/models/probation-model";
import ProbationDetail from "../shared/probation-details";
import EmpApproveLine from "./emp-approve-line-list";

interface MSSLayoutProps {
  data: ProbationModel;
}

const MSSLayout = ({ data }: MSSLayoutProps) => {
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
        <ProbationDetail data={data} />
      </div>
    </div>
  );
};

export default MSSLayout;
