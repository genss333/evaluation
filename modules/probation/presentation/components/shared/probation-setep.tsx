"use client";

import Flex from "@/components/layout/flex";
import { cn } from "@/lib/utils";
import { GetCurrentStep } from "@/modules/probation/domain/usecases/get-current-step";

import { getQueryClient } from "@/lib/get-query-client";
import { Fragment, ReactNode, useEffect, useState } from "react";
import * as model from "../../../data/models/probation-model";
import { useProbationProps } from "../../hooks/store/use-probation-store";
import { probationQueryKery } from "../../hooks/use-fetch-probation";
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
  const { isHrRollback } = useProbationProps();

  if (start || index < activeIndex) {
    if (isHrRollback) {
      if (activeIndex == 0) {
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
          className="w-[14px] h-[14px] border rounded-full "
        />
      );
    }
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

  if (isHrRollback) {
    return (
      <Flex
        justify={"center"}
        align={"center"}
        direction={"col"}
        className="w-[14px] h-[14px] border border-[#] rounded-full "
      />
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
  const { isHrRollback, setHrRollback } = useProbationProps();
  const [activeIndex, setActiveIndex] = useState<number>();
  const queryClient = getQueryClient();
  const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

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

  const handlerSetStep = async (index: number) => {
    if (isHrRollback) {
      setActiveIndex(index);
      await queryClient.invalidateQueries({
        queryKey: [probationQueryKery],
      });
      setHrRollback(false);
    }
  };

  return (
    <Fragment>
      {ConditionForm}
      <Flex direction="row" align="center" className="w-full pt-16 px-16">
        {steps?.map((item, index) => (
          <Fragment key={index}>
            <div className="flex flex-col justify-center items-center relative">
              <div className="absolute bottom-full mb-2 whitespace-nowrap text-sm">
                <TitleStep title={item.title ?? ""} desc={item.desc ?? ""} />
              </div>
              <div
                className={cn(isHrRollback && "hover:cursor-pointer")}
                onClick={() => handlerSetStep(index)}
              >
                <Dot
                  start={index === 0}
                  active={index <= (activeIndex ?? -1)}
                  index={index}
                  activeIndex={activeIndex ?? -1}
                />
              </div>
            </div>
            {index !== steps.length - 1 && (
              <Line active={index < (activeIndex ?? -1)} className="grow" />
            )}
          </Fragment>
        ))}
      </Flex>
    </Fragment>
  );
};

export default ProbationStep;
