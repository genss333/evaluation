import { IDateFormat } from "@/models/dateformat";
import { format } from "date-fns";
import { th } from "date-fns/locale";

Number.prototype.toBuddhistCalendar = function () {
  return this.valueOf() + 543;
};

Date.prototype.formatInBuddhistCalendar = function ({
  locale,
  formattedDate,
}: IDateFormat) {
  if (!this) return "--/---/--/ --:--";

  if (formattedDate?.includes("y")) {
    if (locale?.code.includes("th")) {
      const buddhistYear = this?.getFullYear().toBuddhistCalendar();

      let dateTimeStirng = format(this, formattedDate, { locale: th });

      dateTimeStirng = dateTimeStirng.replaceAll(
        this.getFullYear().toString(),
        buddhistYear.toString(),
      );

      dateTimeStirng.replaceAll("ค.ศ", "พ.ศ.");

      return dateTimeStirng;
    } else {
      const result = format(this, formattedDate, { locale });
      return result;
    }
  }
  return format(this, formattedDate ?? "dd/MM/yyyy", { locale });
};
