import { Role } from "@/models/user-role";
import {
  Kpi,
  SumScore,
} from "@/modules/probation/data/models/probation-kpi-model";
import { ProbationTableModel } from "@/modules/probation/data/models/probation-table-model";
import { NextResponse } from "next/server";
import { getSession } from "../../auth/route";

// The interface for context
/*
export interface Kpi {
  id: number;
  code: string;
  title: string;
  total: number;
  targetScore: number;
  score: number | null;
  memo: string | null;
  how: string;
}
*/

const mockKpiDataMSS: ProbationTableModel<Kpi> & { sums?: SumScore[] } = {
  title: "ผู้ประเมินเพิ่มหัวข้อการประเมินของ KPI",
  desc: "กำหนดให้ส่วนที่ 3 = 60%",
  list: [
    {
      id: 1,
      runNumber: 1,
      code: "SALE-001",
      title: "บรรลุเป้าหมายยอดขายผลิตภัณฑ์ A",
      total: 30,
      targetScore: 25,
      scoreList: [
        { id: 2, title: "ลำดับ1", value: 50 },
        { id: 1, title: "พนักงาน", value: 50 },
      ],
      score: {
        score: null,
        disable: false,
      },
      sumScore: 100,
      memo: "ทำได้เกินเป้าหมายที่ตั้งไว้ในไตรมาสที่ 3 เนื่องจากแคมเปญการตลาดได้ผลดี",
      how: "จำนวน",
      standard: "80 = ผ่าน, 90 = ดี, 100 = ยอดเยี่ยม",
    },
    {
      id: 2,
      runNumber: 2,
      code: "PROJ-005",
      title: "การส่งมอบโปรเจกต์ 'Phoenix' ตรงตามกำหนด",
      total: 20,
      targetScore: 20,
      score: {
        score: null,
        disable: false,
      },
      memo: "ส่งมอบล่าช้ากว่ากำหนด 2 วัน เนื่องจากมีการแก้ไข Requirement กลางสัปดาห์สุดท้าย",
      how: "จำนวน",
      standard: "80 = ผ่าน, 90 = ดี, 100 = ยอดเยี่ยม",
    },
    {
      id: 3,
      runNumber: 4,
      code: "CS-002",
      title: "รักษาคะแนนความพึงพอใจของลูกค้า",
      total: 25,
      targetScore: 20,
      score: {
        score: null,
        disable: false,
      },
      how: "จำนวน",
      standard: "80 = ผ่าน, 90 = ดี, 100 = ยอดเยี่ยม",
      memo: "",
    },
  ],
  sums: [
    {
      id: 1,
      key: "targetScore",
      title: "คะแนนความคาดหวังรวม",
      value: 18.0,
    },
    {
      id: 2,
      key: "totalScore",
      title: "คะแนนรวม",
      value: 0.0,
    },
    {
      id: 3,
      key: "formTotal",
      title: "จากคะแนนเต็ม",
      value: 30.0,
    },
  ],
};

const mockKpiDataESS: ProbationTableModel<Kpi> & { sums?: SumScore[] } = {
  title: "ผู้ประเมินเพิ่มหัวข้อการประเมินของ KPI",
  desc: "กำหนดให้ส่วนที่ 3 = 60%",
  list: [
    {
      id: 1,
      runNumber: 1,
      code: "SALE-001",
      title: "บรรลุเป้าหมายยอดขายผลิตภัณฑ์ A",
      total: 30,
      targetScore: 25,
      score: {
        score: null,
        disable: false,
      },
      memo: "",
      how: "จำนวน",
      standard: "80 = ผ่าน, 90 = ดี, 100 = ยอดเยี่ยม",
    },
    {
      id: 2,
      runNumber: 2,
      code: "PROJ-005",
      title: "การส่งมอบโปรเจกต์ 'Phoenix' ตรงตามกำหนด",
      total: 20,
      targetScore: 20,
      score: {
        score: null,
        disable: false,
      },
      memo: "",
      how: "จำนวน",
      standard: "80 = ผ่าน, 90 = ดี, 100 = ยอดเยี่ยม",
    },
    {
      id: 3,
      runNumber: 4,
      code: "CS-002",
      title: "รักษาคะแนนความพึงพอใจของลูกค้า",
      total: 25,
      targetScore: 20,
      score: {
        score: null,
        disable: false,
      },
      how: "จำนวน",
      memo: "",
      standard: "80 = ผ่าน, 90 = ดี, 100 = ยอดเยี่ยม",
    },
  ],
};

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ message: "UnAuthorization" }, { status: 401 });
  }

  if (session.role === Role.MSS) {
    return NextResponse.json(mockKpiDataMSS);
  }
  return NextResponse.json(mockKpiDataESS);
}
