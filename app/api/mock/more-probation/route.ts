import { MoreProbation } from "@/modules/probation/domain/entities/more-probation";
import { ProbationTable } from "@/modules/probation/domain/entities/probation-table";
import { NextResponse } from "next/server";

const mockData: ProbationTable<MoreProbation> = {
  title: "",
  desc: "",
  list: [
    {
      id: 1,
      title: "จุดแข็งของผู้ถูกประเมิน",
      value: [
        { id: 1, value: "", disable: true },
        { id: 2, value: "", disable: true },
      ],
    },
    {
      id: 2,
      title: "เรื่องที่จะประเมินผลงานในครั้งต่อไป",
      value: [
        { id: 1, value: "เรื่องที่จะประเมินผลงานในครั้งต่อไป", disable: true },
        { id: 2, value: "", disable: true },
      ],
    },
  ],
};

export async function GET() {
  return NextResponse.json(mockData);
}
