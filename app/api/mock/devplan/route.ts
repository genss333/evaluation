import {
  Devplan,
  Priority,
} from "@/modules/probation/domain/entities/probation-devplan";
import { ProbationTable } from "@/modules/probation/domain/entities/probation-table";
import { NextResponse } from "next/server";

// --- Mock Data Generation ---

// 1. Define available priorities
const availablePriorities: Priority[] = [
  { id: 1, name: "High" },
  { id: 2, name: "Medium" },
  { id: 3, name: "Low" },
];

// 2. Create a list of development plan items
const devplanList: Devplan[] = [
  {
    id: 101,
    plan: {
      value: "",
      disable: true,
    },
    priority: {
      value: availablePriorities[0],
      disable: true,
    },
    prioritys: availablePriorities, // High priority
    dateTime: {
      value: new Date("2025-10-15T09:00:00Z"),
      disable: true,
    },
    remark: {
      value: "Focus on data fetching patterns and caching strategies.",
      disable: true,
    },
  },
];

// 3. Structure the final response using the generic table model
const mockData: ProbationTable<Devplan> = {
  title: "Q4 2025 Development Plan",
  desc: "Key development goals and areas for improvement during the probationary period.",
  list: devplanList,
};

// --- API Handler ---

export async function GET() {
  return NextResponse.json(mockData);
}
