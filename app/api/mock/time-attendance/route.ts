import { ProbationTimeModel } from "@/modules/probation/data/models/time-attandance-model";
import { NextResponse } from "next/server";

export const mockProbationTimeObject: ProbationTimeModel = {
  title: "ประวัติการขาดลามาสาย",
  desc: "กำหนดให้ส่วนที่ 1 = 10%",
  list: [
    // Row 1
    { id: 1, title: "สาย (ครั้ง)", value: "0-00:00", disable: true },
    { id: 2, title: "ขาดงาน", value: "0-00:00", disable: true },
    { id: 3, title: "Incentive Leave", value: "0-00:00", disable: true },
    { id: 4, title: "Sick Leave", value: "0-00:00", disable: true },
    // Row 2
    { id: 5, title: "Unpaid Leave", value: "0-00:00", disable: true },
    { id: 6, title: "ลาพักผ่อนประจำปี", value: "0-00:00", disable: true },
    { id: 7, title: "Marriage Leave", value: "0-00:00", disable: true },
    { id: 8, title: "Funeral Leave", value: "0-00:00", disable: true },
    // Row 3
    { id: 9, title: "Sterilization Leave", value: "0-00:00", disable: true },
    { id: 10, title: "Maternity Leave", value: "0-00:00", disable: true },
    {
      id: 11,
      title: "Leave for delivery by Legal Wife",
      value: "0-00:00",
      disable: true,
    },
    { id: 12, title: "Military Leave", value: "0-00:00", disable: true },
    // Row 4
    { id: 13, title: "Alternative Leave", value: "0-00:00", disable: true },
    { id: 14, title: "-", value: "0-00:00", disable: true },
    { id: 15, title: "-", value: "0-00:00", disable: true },
    { id: 16, title: "-", value: "0-00:00", disable: true },
    // Row 5
    { id: 17, title: "-", value: "0-00:00", disable: true },
    { id: 18, title: "-", value: "0-00:00", disable: true },
    { id: 19, title: "-", value: "0-00:00", disable: true },
    { id: 20, title: "-", value: "0-00:00", disable: true },
    // Row 6
    { id: 21, title: "-", value: "0-00:00", disable: true },
    { id: 22, title: "-", value: "0-00:00", disable: true },
    { id: 23, title: "Accumulated OT Leave", value: "0-00:00", disable: true },
    // The last item in row 6 is blank in the image, so we skip it.
    // Row 7 - Scores
    { id: 24, title: "คะแนนเต็ม", value: "100", disable: true },
    { id: 25, title: "คะแนนที่ได้", value: "100", disable: true },
    { id: 26, title: "คะแนนเฉลี่ยสะสม", value: "0", disable: true },
  ],
};

export async function GET() {
  return NextResponse.json(mockProbationTimeObject);
}
