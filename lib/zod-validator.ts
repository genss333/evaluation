import { z } from "zod";

// Common error message
const message = "กรุณาระบุข้อมูล";

// String validator
export const stringValidator = z.string({ error: message }).min(1, message);

// Email validator
export const emailValidator = z
  .string({ error: message })
  .min(1, message)
  .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "กรุณาระบุอีเมลที่ถูกต้อง")
  .email("กรุณาระบุอีเมลที่ถูกต้อง");

// Number validator
export const numberValidator = z
  .string({ error: message })
  .regex(/^\d*\.?\d*$/, "กรุณาระบุตัวเลขที่ถูกต้อง");

export const phoneNumberValidator = z
  .string({ error: message })
  .regex(/^[0-9]{10}$/, "กรุณากรอกหมายเลขโทรศัพท์ที่ถูกต้อง");

// ID card validator (basic 13-digit check)
export const idCardValidator = z
  .string({ error: message })
  .regex(/^[0-9]{13}$/, "กรุณาระบุเลขบัตรประชาชนที่ถูกต้อง");

// Password validator
export const passwordValidator = z
  .string({ error: message })
  .min(8, "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร")
  .regex(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])/,
    "ต้องมีทั้งตัวเลข ตัวพิมพ์ใหญ่ และตัวพิมพ์เล็ก",
  );

// Password confirm validator
export const passwordConfirmValidator = (password: string) =>
  stringValidator.refine(
    (val) => val === password,
    "กรุณาระบุรหัสผ่านให้ตรงกัน",
  );

// Thai Citizen ID (with checksum)
export const thaiCitizenIdValidator = z
  .string({ error: "เลขบัตรประชาชนไม่ถูกต้อง" })
  .regex(/^\d{13}$/, "เลขบัตรประชาชนไม่ถูกต้อง")
  .refine((value) => {
    const match = value.match(/^(\d{12})(\d)$/);
    if (!match) return false;
    const digits = match[1].split("").map(Number);
    const sum = digits.reduce(
      (acc, digit, index) => acc + (13 - index) * digit,
      0,
    );
    const checkDigit = parseInt(match[2], 10);
    return (11 - (sum % 11)) % 10 === checkDigit;
  }, "เลขบัตรประชาชนไม่ถูกต้อง");

// Latitude and Longitude validator
export const latLongValidator = z
  .string({ error: message })
  .regex(
    /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)\s*,\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/,
    "กรุณาระบุตำแหน่งที่ถูกต้อง",
  );
