"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const rollBackSchema = z.object({
  reason: z.string().min(1, {
    message: "*ระบุเหตุผล เพื่อทำรายการต่อ",
  }),
});

type RollBackSchema = z.infer<typeof rollBackSchema>;

export const RollBackDailog = ({ children }: { children: ReactNode }) => {
  const form = useForm<RollBackSchema>({
    resolver: zodResolver(rollBackSchema),
    defaultValues: {
      reason: "",
    },
  });

  const onSubmit = (values: RollBackSchema) => {
    console.log("Form submitted with values:", values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogTitle className="text-center">
          คุณต้องการถอยกลับการประเมินใช่หรือไม่
        </DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="โปรดระบุเหตุผล*"
                      className="text-sm font-normal placeholder:text-[#BFBFBF]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center gap-2 mt-3">
              <DialogClose asChild>
                <Button
                  variant={"outline"}
                  type="submit"
                  className="h-8 text-xs text-tiger-red rounded-full min-w-[80px] border-tiger-red"
                >
                  ยกเลิก
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="h-8 text-xs rounded-full min-w-[80px]"
              >
                ยืนยัน
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
