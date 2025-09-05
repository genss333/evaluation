import { NextResponse } from "next/server";

// Updated interfaces for context
/*
export interface ProbationTitleValue {
  id: number;
  title: string;
}

export interface ProbationTitle {
  title: string;
  values: ProbationTitleValue[];
  disable: boolean;
}

export interface ProbationGroup {
  timeAttandance: number;
  kpi: number;
  competency: number;
  total: number;
}

export interface ProbationGrade {
  grade: string;
  period: string;
}

export interface ProbationStep {
  title?: string;
  desc?: string;
  status: "1" | "P" | "LP" | "R" | "A";
  dateTime?: Date | null;
}

export interface YearProbation {
  id: number;
  title: string;
}

export interface ProbationModel {
  titles: ProbationTitle[];
  count: number;
  code: string;
  empName: string;
  startDate: Date;
  startWork: Date;
  position: string;
  years: YearProbation[];
  month: YearProbation[];
  empLevel: string;
  workAge: number;
  group: ProbationGroup;
  grade: ProbationGrade;
  steps: ProbationStep[];
  multiform: boolean;
}
*/

export async function GET() {
  const mockData = {
    titles: [
      {
        title: "หัวข้อการประเมินหลัก",
        values: [
          { id: 1, title: "ความซื่อสัตย์และจริยธรรม" },
          { id: 2, title: "การทำงานเป็นทีม" },
          { id: 3, title: "ความรับผิดชอบ" },
        ],
        disable: false, // Added disable property
      },
      {
        title: "หัวข้อการประเมินตามหน้าที่",
        values: [
          { id: 4, title: "ความรู้ในงาน" },
          { id: 5, title: "ทักษะการสื่อสาร" },
        ],
        disable: true, // Added disable property
      },
    ],
    count: 1,
    code: "EMP007",
    empName: "สมศรี มีสุข",
    startDate: new Date("2025-06-01T09:00:00"),
    startWork: new Date("2025-06-01T09:00:00"),
    position: "Senior Frontend Developer",
    years: [
      { id: 2025, title: "2025" },
      { id: 2024, title: "2024" },
      { id: 2023, title: "2023" },
    ],
    month: [
      { id: 1, title: "มกราคม" },
      { id: 2, title: "กุมภาพันธ์" },
      { id: 3, title: "มีนาคม" },
      { id: 4, title: "เมษายน" },
      { id: 5, title: "พฤษภาคม" },
      { id: 6, title: "มิถุนายน" },
      { id: 7, title: "กรกฎาคม" },
      { id: 8, title: "สิงหาคม" },
      { id: 9, title: "กันยายน" },
      { id: 10, title: "ตุลาคม" },
      { id: 11, title: "พฤศจิกายน" },
      { id: 12, title: "ธันวาคม" },
    ],
    empLevel: "S3",
    workAge: 3.5,
    group: {
      timeAttandance: 10,
      kpi: 50,
      competency: 40,
      total: 100,
    },
    grade: {
      grade: "A",
      period: "120 วัน",
    },
    steps: [
      {
        title: "พนักงานประเมินตนเอง",
        desc: "พนักงานดำเนินการประเมิน",
        status: "1",
        dateTime: new Date("2025-09-01T10:15:00"),
      },
      {
        title: "หัวหน้างานประเมิน",
        desc: "หัวหน้างานกำลังประเมินผล",
        status: "A",
        dateTime: new Date("2025-09-03T14:00:00"),
      },
      {
        title: "ฝ่ายบุคคลตรวจสอบ",
        desc: "รอฝ่ายบุคคลดำเนินการ",
        status: "P",
        dateTime: null,
      },
    ],
    multiform: true,
  };

  return NextResponse.json(mockData);
}
