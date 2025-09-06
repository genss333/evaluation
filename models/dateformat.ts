import { Locale } from "date-fns";

export interface IDateFormat {
  date?: Date | null;
  locale?: Locale;
  formattedDate?: string;
}
