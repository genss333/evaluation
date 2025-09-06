import { Locale } from "date-fns";

export interface IDateFormat {
  date?: Date;
  locale?: Locale;
  formattedDate?: string;
}
