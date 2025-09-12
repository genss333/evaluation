import { Role } from "@/models/user-role";
import { CompetencyModel } from "@/modules/probation/data/models/probation-competency-model";
import { NextResponse } from "next/server";
import { getSession } from "../../auth/route";

// Create the mock data array with the specified type
const mockCompetencies: CompetencyModel[] = [
  {
    id: 1,
    runNumber: 1,
    title: "Technical Proficiency",
    sum: 85,
    total: 100,
    targetScore: 90,
    weight: 0.4,
    scoreList: [
      { id: 1, title: "พนักงาน", value: 50 },
      { id: 2, title: "ลำดับ1", value: 50 },
    ],
    score: {
      score: null,
      disable: false,
    },
    sumScore: "",
  },
  {
    id: 2,
    runNumber: 2,
    title: "Team Collaboration",
    sum: 92,
    total: 100,
    targetScore: 85,
    weight: 0.3,
    scoreList: [
      { id: 1, title: "พนักงาน", value: 50 },
      { id: 2, title: "ลำดับ1", value: 50 },
    ],
    score: {
      score: null,
      disable: false,
    },
    sumScore: "",
  },
  {
    id: 3,
    runNumber: 3,
    title: "Problem Solving",
    sum: 78,
    total: 100,
    targetScore: 80,
    weight: 0.2,
    scoreList: [
      { id: 1, title: "พนักงาน", value: 50 },
      { id: 2, title: "ลำดับ1", value: 50 },
    ],
    score: {
      score: null,
      disable: false,
    },
    sumScore: "",
  },
];

const mockDataMSS = {
  title: "การให้คะแนนการประเมิน Competency",
  desc: "กำหนดให้ส่วนที่ 2 = 30%",
  list: mockCompetencies,
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

const mockDataESS = {
  title: "การให้คะแนนการประเมิน Competency",
  desc: "กำหนดให้ส่วนที่ 2 = 30%",
  list: [
    {
      id: 1,
      runNumber: 1,
      title: "Technical Proficiency",
      sum: 85,
      total: 100,
      targetScore: 90,
      weight: 0.4,
      memo: "",
      score: {
        score: null,
        disable: false,
      },
    },
    {
      id: 2,
      runNumber: 2,
      title: "Team Collaboration",
      sum: 92,
      total: 100,
      targetScore: 85,
      weight: 0.3,
      memo: "",
      score: {
        score: null,
        disable: false,
      },
    },
    {
      id: 3,
      runNumber: 3,
      title: "Problem Solving",
      sum: 78,
      total: 100,
      targetScore: 80,
      weight: 0.2,
      memo: "",
      score: {
        score: null,
        disable: false,
      },
    },
  ],
};

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ message: "UnAuthorization" }, { status: 401 });
  }

  if (session.role == Role.MSS) {
    return NextResponse.json(mockDataMSS);
  }
  return NextResponse.json(mockDataESS);
}
