"use client";

import { Button } from "@/components/ui/button";
import { RollBackDailog } from "../shared/roll-back-dailog";

const RollBack = () => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <div className="font-title">เลือกเงื่อนไขแบบฟอร์ม</div>
        <RollBackDailog>
          <Button
            variant={"outline"}
            className="h-8 text-tiger-red text-xs border-tiger-red rounded-full"
          >
            Roll Back
          </Button>
        </RollBackDailog>
      </div>
    </div>
  );
};

export default RollBack;
