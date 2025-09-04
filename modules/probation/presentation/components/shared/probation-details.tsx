import Container from "@/components/layout/container";
import ProbationStep from "./probation-setep";

const ProbationDetail = () => {
  return (
    <Container className="bg-background w-full rounded-[10px] p-4">
      <ProbationStep
        steps={[
          {
            title: "ตั้งค่า KPI",
            desc: "สิ้นสุด 31/07/2568",
            status: "A",
            dateTime: new Date(),
          },
          {
            title: "ประเมินตนเอง",
            desc: "ธนัท ดำรงชัย",
            status: "P",
            dateTime: null,
          },
          {
            title: "ผู้ประเมินลำดับที่ 1",
            desc: "จักรพันธ์ กลิ่นเพชร",
            status: "P",
            dateTime: null,
          },
          {
            title: "ผู้ประเมินลำดับที่ 2",
            desc: "ตีรณา โชตวาณิช",
            status: "P",
            dateTime: null,
          },
          {
            title: "ผู้ประเมินลำดับสุดท้าย",
            desc: "บัณทัต ศรีวรรณวิไล",
            status: "P",
            dateTime: null,
          },
          {
            title: "เสร็จสิ้น",
            desc: "",
            status: "P",
            dateTime: null,
          },
        ]}
      />
    </Container>
  );
};

export default ProbationDetail;
