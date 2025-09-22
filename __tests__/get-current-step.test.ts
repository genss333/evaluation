import { ProbationStep } from "@/modules/probation/domain/entities/probation";
import { GetCurrentStep } from "@/modules/probation/domain/usecases/get-current-step";

export const mockDataSteps: ProbationStep[] = [
  {
    title: "ตั้งค่า KPI",
    desc: "สิ้นสุด 31/07/2568",
    status: "A",
    dateTime: new Date(),
  },
  {
    title: "ประเมินตนเอง",
    desc: "ธนัท ดำรงชัย",
    status: "A",
    dateTime: new Date(),
  },
  {
    title: "ผู้ประเมินลำดับที่ 1",
    desc: "จักรพันธ์ กลิ่นเพชร",
    status: "P",
    dateTime: null,
  },
];

describe("GetCurrentStep", () => {
  test("should current step = ประเมินตนเอง", () => {
    const usecase = new GetCurrentStep();
    const current = usecase.call(mockDataSteps);
    expect(current).toEqual(2);
  });
});
