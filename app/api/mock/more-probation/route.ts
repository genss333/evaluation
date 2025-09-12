import { MoreProbationModel } from "@/modules/probation/data/models/more-probation-model";
import { ProbationTableModel } from "@/modules/probation/data/models/probation-table-model";
import { NextResponse } from "next/server";

const mockData: ProbationTableModel<MoreProbationModel> = {
  title: "",
  desc: "",
  list: [
    {
      id: 1,
      title: "จุดแข็งของผู้ถูกประเมิน",
      value: [
        { id: 1, value: "" },
        { id: 2, value: "" },
      ],
    },
    {
      id: 2,
      title: "เรื่องที่จะประเมินผลงานในครั้งต่อไป",
      value: [{ id: 1, value: "" }],
    },
  ],
};

export async function GET() {
  return NextResponse.json(mockData);
}
