"use client";

import ProbationDataTable from "@/components/custom/custom-data-table";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { CompetencyModel } from "@/modules/probation/data/models/probation-competency-model";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { useFetchCompetency } from "../../../hooks/use-fetch-probation";
import { CompedencySchema, SubFormRef } from "../../../schema/probation-form";

const CompetencyForm = forwardRef<SubFormRef, {}>((props, ref) => {
  const { data, isLoading } = useQuery(useFetchCompetency());

  const form = useForm<CompedencySchema>({
    defaultValues: {
      comps: [],
    },
  });

  const columns: ColumnDef<CompetencyModel>[] = [
    {
      accessorKey: "runnumber",
      header: "ลำดับ",
      size: 80,
      minSize: 80,
      maxSize: 100,
      cell: ({ row }) => (
        <div className="text-center">
          <div className="font-caption3 text-semi-black">
            {row.original.runNumber}
          </div>
        </div>
      ),
    },

    {
      accessorKey: "title",
      header: "หัวข้อการประเมิน",
      size: 260,
      minSize: 260,
      cell: ({ row }) => (
        <div className="text-left">
          <div className="font-caption3 text-semi-black">
            {row.original.title}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "total",
      header: "คะแนนเต็ม",
      size: 55,
      minSize: 55,
      cell: ({ row }) => (
        <div className="text-center font-caption3 text-semi-black">
          {row.original.total}
        </div>
      ),
    },
    {
      accessorKey: "wieght",
      header: "ค่าถ่วงน้ำหนัก",
      size: 70,
      minSize: 70,
      cell: ({ row }) => (
        <div className="text-center font-caption3 text-semi-black">
          {row.original.weight}
        </div>
      ),
    },
    {
      accessorKey: "sum",
      header: "คะแนนเต็มรวม",
      size: 70,
      minSize: 70,
      cell: ({ row }) => (
        <div className="text-center font-caption3 text-semi-black">
          {row.original.sum}
        </div>
      ),
    },
    {
      accessorKey: "score",
      header: "คะแนน",
      size: 80,
      minSize: 80,
      maxSize: 80,
      cell: ({ row }) => (
        <FormField
          name={`comps.${row.index}.compMemo`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  className="text-center font-caption3 text-semi-black w-full h-8 rounded-[10px]"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      ),
    },
    {
      accessorKey: "targetScore",
      header: "คะแนนเป้าหมาย",
      size: 70,
      minSize: 70,
      cell: ({ row }) => (
        <div className="text-center font-caption3 text-semi-black">
          {row.original.targetScore}
        </div>
      ),
    },

    {
      accessorKey: "memo",
      header: "หมายเหตุ / Memo",
      size: 260,
      minSize: 100,
      maxSize: 260,
      cell: ({ row }) => (
        <FormField
          name={`comps.${row.index}.compScore`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="font-caption3 text-semi-black w-full h-8 rounded-[10px]"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      ),
    },
  ];

  const onSubmit = (values: CompedencySchema) => {
    console.log("Form data submitted from compedency:", values);
  };

  useImperativeHandle(ref, () => ({
    submit: () => {
      form.handleSubmit(onSubmit)();
    },
  }));

  useEffect(() => {
    if (data?.list) {
      const formValues: CompedencySchema = {
        comps: data.list.map((item) => ({
          compMemo: item.memo ?? "",
          compScore: item.score.score ?? "",
        })),
      };
      form.reset(formValues);
    }
  }, [data, form]);

  if (isLoading) {
    return (
      <TabsContent value="competency" className="mt-4">
        <div>Loading Competency data...</div>
      </TabsContent>
    );
  }

  return (
    <TabsContent value="competency" className="mt-4">
      <Form {...form}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="font-title text-semi-black">{data?.title}</div>
            <div className="font-body2 text-status-red">{data?.desc}</div>
          </div>

          <ProbationDataTable
            hTextLeft={[1]}
            columns={columns}
            data={data?.list || []}
          />
        </div>
      </Form>
    </TabsContent>
  );
});

export default CompetencyForm;
