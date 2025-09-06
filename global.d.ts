import { IDateFormat } from "@/lib/interfaces/dateformat";

declare global {
  interface String {
    capitalizeFirst(): string;

    langCode(): string;

    tr: () => string;
  }

  interface Number {
    toBuddhistCalendar(): number;
  }

  interface Date {
    formatInBuddhistCalendar({ locale, formattedDate }: IDateFormat): string;
  }
}
