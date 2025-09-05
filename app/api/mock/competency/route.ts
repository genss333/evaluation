import { NextResponse } from "next/server";

// Create the mock data array with the specified type
const mockCompetencies = [
  {
    id: "c8a1b3f2",
    runNumber: 1,
    title: "Technical Proficiency",
    sum: 85,
    total: 100,
    targetScore: 90,
    weight: 0.4,
  },
  {
    id: "d4e2f1a3",
    runNumber: 1,
    title: "Team Collaboration",
    sum: 92,
    total: 100,
    targetScore: 85,
    weight: 0.3,
  },
  {
    id: "b9c7d6e5",
    runNumber: 1,
    title: "Problem Solving",
    sum: 78,
    total: 100,
    targetScore: 80,
    weight: 0.2,
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
