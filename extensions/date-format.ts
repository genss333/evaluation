import "@/extensions/buddhist-calendar";
import { IDateFormat } from "@/models/dateformat";

export class DateFormat {
  // ฟังก์ชัน private สำหรับแปลงและตรวจสอบวันที่
  private static toDate(input: Date | string | undefined | null): Date | null {
    if (!input) return null;
    const dateObj = new Date(input);
    // ตรวจสอบว่าเป็นวันที่ที่ถูกต้องหรือไม่
    if (isNaN(dateObj.getTime())) return null;
    return dateObj;
  }

  static fullDateTime({ date, locale }: IDateFormat) {
    const dateObj = this.toDate(date);
    if (!dateObj) return "--/---/--/ --:--";

    const formattedDate = "EEEE d MMMM y HH:mm";
    return dateObj.formatInBuddhistCalendar({ formattedDate, locale });
  }

  static dateTime({ date, locale }: IDateFormat) {
    const dateObj = this.toDate(date);
    if (!dateObj) return "--/---/--/ --:--";

    const formattedDate = "d MMM y kk:mm";
    return dateObj.formatInBuddhistCalendar({ formattedDate, locale });
  }

  static fullDate({ date, locale }: IDateFormat) {
    const dateObj = this.toDate(date);
    if (!dateObj) return "--/---/--/";

    const formattedDate = "EEEE d MMMM y";
    return dateObj.formatInBuddhistCalendar({ formattedDate, locale });
  }

  static monthYear({ date, locale }: IDateFormat) {
    const dateObj = this.toDate(date);
    if (!dateObj) return "--/---/--/";

    const formattedDate = "MMMM y";
    return dateObj.formatInBuddhistCalendar({ formattedDate, locale });
  }

  static shortDate({ date, locale }: IDateFormat) {
    const dateObj = this.toDate(date);
    if (!dateObj) return "--/--/----";

    const formattedDate = "d MMM y";
    return dateObj.formatInBuddhistCalendar({ formattedDate, locale });
  }

  static year({ date, locale }: IDateFormat) {
    const dateObj = this.toDate(date);
    if (!dateObj) return "--";
    const formattedDate = "y";
    return dateObj.formatInBuddhistCalendar({ formattedDate, locale });
  }

  static month({ date, locale }: IDateFormat) {
    const dateObj = this.toDate(date);
    if (!dateObj) return "--";
    const formattedDate = "MMMM";
    return dateObj.formatInBuddhistCalendar({ formattedDate, locale });
  }

  static custom({ date, locale, formattedDate }: IDateFormat) {
    const dateObj = this.toDate(date);
    if (!dateObj) return "--/--/----";

    return dateObj.formatInBuddhistCalendar({ locale, formattedDate });
  }
}
