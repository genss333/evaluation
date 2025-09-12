"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ProbationModel } from "@/modules/probation/data/models/probation-model";
import ProbationDetail from "../shared/probation-details";
import EmpApproveLine from "./emp-approve-line-list";
import ProbationGrade from "./probation-grade";

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
        <ProbationDetail
          data={data}
          GradeGroup={(data) => <ProbationGrade data={data} />}
          roleBack={
            <div className="p-4">
              <div className="flex justify-between items-center">
                <div className="font-title">เลือกเงื่อนไขแบบฟอร์ม</div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="h-8 text-xs border-tiger-red rounded-full"
                    >
                      Role Back
                    </Button>
                  </DialogTrigger>
                  <DialogContent></DialogContent>
                </Dialog>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default MSSLayout;
