"use client";

import Flex from "@/components/layout/flex";
import { cn } from "@/lib/utils";
import { GetCurrentStep } from "@/modules/probation/domain/usecases/get-current-step";
import { Fragment, ReactNode, useEffect, useState } from "react";
import * as model from "../../../data/models/probation-model";
interface TitleStepProps {
  title: string;
  desc: string;
}

interface ProbationStepProps {
  steps: model.ProbationStep[] | null;
  ConditionForm?: ReactNode;
}

const TitleStep = ({ title, desc }: TitleStepProps) => {
  return (
    <Flex direction={"col"} align={"center"} gap={2}>
      <div className="font-caption1 text-semi-black">{title}</div>
      <div className="font-caption3 text-semi-black">{desc}</div>
    </Flex>
  );
};

const Line = ({
  start,
  active,
  className,
}: {
  start?: boolean;
  active: boolean;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        start && "hidden",
        active ? "bg-status-red" : "bg-[#E6E6E6]",
        "h-1 flex-1",
        ...(className ?? "")
      )}
    />
  );
};

const Dot = ({
  start,
  active,
  index,
  activeIndex,
}: {
  start: boolean;
  active: boolean;
  index: number;
  activeIndex: number;
}) => {
  if (start || index < activeIndex) {
    return <div className="w-[10px] h-[10px] bg-status-red rounded-full" />;
  } else if (active && index === activeIndex) {
    return (
      <div className="relative w-[20px] h-[20px] bg-[#E6E6E6] rounded-full">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[12px] h-[12px] bg-red-500 rounded-full">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[6px] h-[6px] bg-white rounded-full" />
        </div>
      </div>
    );
  }
  return (
    <Flex
      justify={"center"}
      align={"center"}
      direction={"col"}
      className="w-[14px] h-[14px] bg-[#E6E6E6] rounded-full "
    >
      <Flex
        justify={"center"}
        align={"center"}
        direction={"col"}
        className="w-[6px] h-[6px] bg-background rounded-full"
      />
    </Flex>
  );
};

const ProbationStep = ({ steps, ConditionForm }: ProbationStepProps) => {
  const [activeIndex, setActiveIndex] = useState<number>();

  useEffect(() => {
    function findActiveIndex() {
      if (!steps) return null;

      const usecase = new GetCurrentStep();
      setActiveIndex(usecase.call(steps) ?? -1);
    }

    findActiveIndex();

    return () => {
      setActiveIndex(0);
    };
  }, [steps]);

  return (
    <>
      {ConditionForm}
      <Flex direction="row" align="center" className="w-full pt-16 px-16">
        {steps?.map((item, index) => (
          <Fragment key={index}>
            <div className="flex flex-col justify-center items-center relative">
              <div className="absolute bottom-full mb-2 whitespace-nowrap text-sm">
                <TitleStep title={item.title ?? ""} desc={item.desc ?? ""} />
              </div>
              <Dot
                start={index === 0}
                active={index <= (activeIndex ?? -1)}
                index={index}
                activeIndex={activeIndex ?? -1}
              />
            </div>
            {index !== steps.length - 1 && (
              <Line
                active={index < (activeIndex ?? -1)}
                className="grow" // ย้าย grow มาไว้ที่ Line
              />
            )}
          </Fragment>
        ))}
      </Flex>
    </>
  );
};

export default ProbationStep;
