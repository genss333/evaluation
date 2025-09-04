import Flex from "@/components/layout/flex";
interface TitleStepProps {
  title: string;
  desc: string;
}
const TitleStep = ({ title, desc }: TitleStepProps) => {
  return (
    <Flex direction={"col"} gap={2}>
      <div className="font-caption1">{title}</div>
      <div className="font-caption2">{desc}</div>
    </Flex>
  );
};

const ProbationStep = () => {
  return <div></div>;
};

export default ProbationStep;
