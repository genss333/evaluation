"use client";

import Flex from "@/components/layout/flex";
import { cn } from "@/lib/utils";
import { GetCurrentStep } from "@/modules/probation/domain/usecases/get-current-step";
import { Fragment, useEffect, useState } from "react";
import * as model from "../../../data/models/probation-model";
interface TitleStepProps {
  title: string;
  desc: string;
}

interface ProbationStepProps {
  steps: model.ProbationStep[];
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

const Dot = ({ start, active }: { start: boolean; active: boolean }) => {
  if (start && active)
    return <div className="w-[10px] h-[10px] bg-status-red rounded-full" />;

  if (active)
    return (
      <Flex
        justify={"center"}
        align={"center"}
        direction={"col"}
        className="w-[20px] h-[20px] bg-[#E6E6E6] rounded-full "
      >
        <Flex
          justify={"center"}
          align={"center"}
          direction={"col"}
          className="w-[14px] h-[14px] bg-status-red rounded-full"
        >
          <Flex className="w-[6px] h-[6px] bg-background rounded-full" />
        </Flex>
      </Flex>
    );

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

const ProbationStep = ({ steps }: ProbationStepProps) => {
  const [activeIndex, setActiveIndex] = useState<number>();

  useEffect(() => {
    function findActiveIndex() {
      const usecase = new GetCurrentStep();
      setActiveIndex(usecase.call(steps) ?? -1);
    }

    findActiveIndex();

    return () => {
      setActiveIndex(0);
    };
  }, [steps]);

  return (
    <Flex direction="row" align="center" className="w-full pt-16 px-16">
      {steps?.map((item, index) => (
        <Fragment key={index}>
          <Flex
            direction="col"
            align="center"
            justify={"center"}
            className="shrink-0 relative"
          >
            <span className="absolute bottom-full mb-2 whitespace-nowrap text-sm">
              <TitleStep title={item.title ?? ""} desc={item.desc ?? ""} />
            </span>
            <Dot start={index === 0} active={index <= (activeIndex ?? -1)} />
          </Flex>

          {index !== steps.length - 1 && (
            <Line
              active={index < (activeIndex ?? -1)}
              className="grow" // ย้าย grow มาไว้ที่ Line
            />
          )}
        </Fragment>
      ))}
    </Flex>
  );
};

export default ProbationStep;
