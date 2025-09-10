import { Kpi } from "@/modules/probation/data/models/probation-kpi-model";
import { ProbationTableModel } from "@/modules/probation/data/models/probation-table-model";
import { NextResponse } from "next/server";

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

export async function GET() {
  const mockKpiData: ProbationTableModel<Kpi> = {
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
        essScore: 28,
        score: {
          score: null,
          disable: false,
        },
        // memo: "ทำได้เกินเป้าหมายที่ตั้งไว้ในไตรมาสที่ 3 เนื่องจากแคมเปญการตลาดได้ผลดี",
        how: "จำนวน",
      },
      {
        id: 2,
        runNumber: 2,
        code: "PROJ-005",
        title: "การส่งมอบโปรเจกต์ 'Phoenix' ตรงตามกำหนด",
        total: 20,
        targetScore: 20,
        essScore: 28,
        score: {
          score: null,
          disable: false,
        },
        // memo: "ส่งมอบล่าช้ากว่ากำหนด 2 วัน เนื่องจากมีการแก้ไข Requirement กลางสัปดาห์สุดท้าย",
        how: "จำนวน",
      },
      {
        id: 3,
        runNumber: 4,
        code: "CS-002",
        title: "รักษาคะแนนความพึงพอใจของลูกค้า",
        total: 25,
        targetScore: 20,
        essScore: 28,
        score: {
          score: null,
          disable: false,
        },
        how: "จำนวน",
      },
    ],
  };

  return NextResponse.json(mockKpiData);
}
