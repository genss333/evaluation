import Flex from "@/components/layout/flex";
import * as model from "@/modules/probation/data/models/probation-model";
import ProbationField from "../shared/probation-field";

interface ProbationTitleProps {
  items: model.ProbationTitle[] | [];
}

const ProbationTitle = ({ items }: ProbationTitleProps) => {
  return (
    <div className="bg-background w-full rounded-[10px] p-[10px]">
      <Flex direction={"col"} gap={4} className="max-w-1/2">
        {items &&
          items.map((item, idx) => (
            <ProbationField
              key={idx}
              title={item.title}
              values={item.values}
              showSuffix={item.values.length > 1}
              disable={item.disable}
              colSpan={[1, 3]}
            />
          ))}
      </Flex>
    </div>
  );
};

export default ProbationTitle;
