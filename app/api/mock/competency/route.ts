import { CompetencyModel } from "@/modules/probation/data/models/probation-competency-model";
import { NextResponse } from "next/server";

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
    essScore: 28,
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
    essScore: 28,
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
    essScore: 28,
    score: {
      score: null,
      disable: false,
    },
  },
];

const mockData = {
  title: "การให้คะแนนการประเมิน Competency",
  desc: "กำหนดให้ส่วนที่ 2 = 30%",
  list: mockCompetencies,
};

export async function GET() {
  return NextResponse.json(mockData);
}
