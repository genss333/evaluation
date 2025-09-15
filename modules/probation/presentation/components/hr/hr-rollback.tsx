"use client";

import { Button } from "@/components/ui/button";
import { useProbationProps } from "../../hooks/store/use-probation-store";

const HRRollBack = () => {
  const { isHrRollback, setHrRollback } = useProbationProps();
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <div className="font-title">เลือกเงื่อนไขแบบฟอร์ม</div>
        {!isHrRollback ? (
          <Button
            variant={"outline"}
            className="h-8 text-tiger-red text-xs border-tiger-red rounded-full"
            onClick={() => setHrRollback(true)}
          >
            Roll Back
          </Button>
        ) : (
          <div className="flex justify-between gap-3">
            <Button
              variant={"outline"}
              size={"sm"}
              className="rounded-full border-primary text-primary text-sm font-normal min-w-[80px]"
              onClick={() => setHrRollback(false)}
            >
              ยกเลิก
            </Button>
            <Button
              size={"sm"}
              className="rounded-full text-sm font-normal min-w-[80px]"
            >
              ยืนยัน
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HRRollBack;
