import Container from "@/components/layout/container";
import Flex from "@/components/layout/flex";
import { TextField } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";

interface ProbationTitleItemProps {
  title: string;
  value: string;
  showSuffix?: boolean;
}

const ProbationTitleItem = ({
  title,
  value,
  showSuffix = true,
}: ProbationTitleItemProps) => {
  return (
    <Flex justify={"around"} align={"center"}>
      <div className="font-body2 text-semi-black w-full lg:max-w-[200px]">
        {title}
      </div>
      <TextField
        className="font-body3 text-button-grey bg-[#F0F0F0] h-8 rounded-[10px]"
        placeholder={value}
        suffixIcon={
          showSuffix && <ChevronDown className="text-button-grey" size={18} />
        }
        disabled
      />
    </Flex>
  );
};

const ProbationTitle = () => {
  return (
    <Container className="bg-background w-full rounded-[10px] p-[10px]">
      <Flex direction={"col"} gap={4} className="lg:max-w-1/2">
        <ProbationTitleItem
          title="แบบฟอร์มการประเมิน"
          value="แบบประเมินหัวหน้างานประจำปี 2568"
          showSuffix={false}
        />
        <ProbationTitleItem
          title="หัวหน้าผู้ประเมิน"
          value="นางสาว ธิดาพร ชาวคูเวียง"
          showSuffix={false}
        />
        <ProbationTitleItem
          title="ระยะเวลาการประเมิน"
          value="01/08/2568 - 31/08/2568"
          showSuffix={false}
        />
      </Flex>
    </Container>
  );
};

export default ProbationTitle;
