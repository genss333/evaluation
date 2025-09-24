import { Method } from "@/lib/api-client";
import { User } from "@/models/user";
import { EvalForm } from "@/modules/probation/data/models/eval-form";
import { NextResponse } from "next/server";
import { mapEvalFormToProbation } from "./process";

export async function GET(request: Request) {
  try {
    const authorization = request.headers.get("authorization");
    const user = request.headers.get("user");

    if (!authorization) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const externalApiResponse = await fetch(
      `http://10.51.192.161:8080/api/eval/forms`,
      {
        method: Method.GET,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${authorization}`,
        },
      }
    );

    // 4. Check if the external API call was successful
    if (!externalApiResponse.ok) {
      // Forward the error from the external API to the client
      return NextResponse.json(
        {
          message: `Error from external API: ${await externalApiResponse.text()}`,
        },
        { status: externalApiResponse.status }
      );
    }
    const userModel: User = JSON.parse(user as string);
    if (!userModel) {
      return NextResponse.json(
        { message: "Unauthorized No Session User" },
        { status: 401 }
      );
    }

    const apiResponse = await externalApiResponse.json();
    const evalForm: EvalForm = apiResponse.data[0];
    const formId = evalForm.id;

    const externalStepsApiResponse = await fetch(
      `http://10.51.192.161:8080/api/eval/forms/${formId}/steps`,
      {
        method: Method.GET,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${authorization}`,
        },
      }
    );

    const stepsData = await externalStepsApiResponse.json();

    const result = mapEvalFormToProbation(
      apiResponse,
      stepsData.data,
      userModel
    );

    return NextResponse.json(result);
  } catch (err) {
    console.error("Route Handler Error:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
