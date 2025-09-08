// /app/api/mock/probation/route.ts

import { Role } from "@/models/user-role";
import { NextResponse } from "next/server";
import { getSession } from "../../auth/route"; // ตรวจสอบว่า path ถูกต้อง

// 1. สร้าง Base Data ที่ใช้ร่วมกันทั้งสอง Role
const baseMockData = {
  count: {
    title: "ครั้งที่",
    values: [{ id: 1, title: "1" }],
    disable: true,
  },
  code: {
    title: "รหัสพนักงาน",
    values: [{ id: 1, title: "EMP007" }],
    disable: true,
  },
  empName: {
    title: "ชื่อ-สกุล",
    values: [{ id: 1, title: "สมศรี มีสุข" }],
    disable: true,
  },
  startDate: {
    title: "วันที่เริ่มทดลองงาน",
    values: [{ id: 1, title: "01/06/2025" }],
    disable: true,
  },
  // ... (ใส่ข้อมูลอื่นๆ ที่เหมือนกันทั้งหมดที่นี่) ...
  steps: [
    {
      title: "ตั้งค่า KPI",
      desc: "สิ้นสุด 31/07/2568",
      status: "A",
      dateTime: new Date("2025-09-01T10:15:00"),
    },
    {
      title: "พนักงานประเมินตนเอง",
      desc: "พนักงานดำเนินการประเมิน",
      status: "P",
      dateTime: null,
    },
    {
      title: "หัวหน้างานประเมิน",
      desc: "หัวหน้างานกำลังประเมินผล",
      status: "P",
      dateTime: null,
    },
    {
      title: "ฝ่ายบุคคลตรวจสอบ",
      desc: "รอฝ่ายบุคคลดำเนินการ",
      status: "P",
      dateTime: null,
    },
    {
      title: "เสร็จสิ้น",
      desc: "",
      status: "P",
      dateTime: null,
    },
  ],
};

// 2. สร้างฟังก์ชันเพื่อรวม Base Data กับข้อมูลเฉพาะของแต่ละ Role
const getMockDataByRole = (role: Role) => {
  if (role === Role.MSS) {
    return {
      ...baseMockData,
      titles: [
        {
          title: "แบบฟอร์มการประเมิน",
          values: [
            { id: 1, title: "ความซื่อสัตย์และจริยธรรม" },
            { id: 2, title: "การทำงานเป็นทีม" },
            { id: 3, title: "ความรับผิดชอบ" },
          ],
          disable: true,
        },
      ],
      employee: [
        {
          personCode: "TG00132",
          name: "test test",
          percent: 54,
        },
      ],
    };
  }

  return {
    ...baseMockData,
    titles: [
      {
        title: "แบบฟอร์มการประเมิน",
        values: [
          { id: 1, title: "ความซื่อสัตย์และจริยธรรม" },
          { id: 2, title: "การทำงานเป็นทีม" },
          { id: 3, title: "ความรับผิดชอบ" },
        ],
        disable: true,
      },
      {
        title: "แบบฟอร์มการประเมิน",
        values: [
          { id: 1, title: "ความซื่อสัตย์และจริยธรรม" },
          { id: 2, title: "การทำงานเป็นทีม" },
          { id: 3, title: "ความรับผิดชอบ" },
        ],
        disable: true,
      },
    ],
  };
};

export async function GET() {
  const session = await getSession();

  if (!session?.role) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const data = getMockDataByRole(session.role);

  return NextResponse.json(data);
}
