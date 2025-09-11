import {
  DevplanModel,
  Priority,
} from "@/modules/probation/data/models/probation-devplan-model";
import { ProbationTableModel } from "@/modules/probation/data/models/probation-table-model";
import { NextResponse } from "next/server";

// --- Mock Data Generation ---

// 1. Define available priorities
const availablePriorities: Priority[] = [
  { id: 1, name: "High" },
  { id: 2, name: "Medium" },
  { id: 3, name: "Low" },
];

// 2. Create a list of development plan items
const devplanList: DevplanModel[] = [
  {
    id: 101,
    value: "",
    priority: availablePriorities[0],
    prioritys: [availablePriorities[0]], // High priority
    dateTime: new Date("2025-10-15T09:00:00Z"),
    remark: "Focus on data fetching patterns and caching strategies.",
  },
  {
    id: 102,
    value: "",
    priority: availablePriorities[0],
    prioritys: [availablePriorities[0], availablePriorities[1]], // High, Medium
    dateTime: new Date("2025-11-01T10:00:00Z"),
    remark: null,
  },
  {
    id: 103,
    value: "",
    priority: availablePriorities[1],
    prioritys: [availablePriorities[1]], // Medium priority
    dateTime: null, // Example of a null date
    remark: "Explore plugin creation and design system integration.",
  },
  {
    id: 104,
    value: "",
    priority: availablePriorities[2],
    prioritys: [availablePriorities[2]], // Low priority
    dateTime: new Date("2025-12-20T14:30:00Z"),
    remark: "Find a project that aligns with current tech stack.",
  },
];

// 3. Structure the final response using the generic table model
const mockData: ProbationTableModel<DevplanModel> = {
  title: "Q4 2025 Development Plan",
  desc: "Key development goals and areas for improvement during the probationary period.",
  list: devplanList,
};

// --- API Handler ---

export async function GET() {
  return NextResponse.json(mockData);
}
