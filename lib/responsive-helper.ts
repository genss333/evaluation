export type ResponsiveValue<T> =
  | T
  | Partial<{
      sm: T;
      md: T;
      lg: T;
      xl: T;
      "2xl": T;
    }>;

export function getResponsiveClasses<T extends string | number>(
  value: ResponsiveValue<T> | undefined,
  classMap?: Record<string, string>,
  prefix?: string,
) {
  if (value == null) return "";

  if (typeof value !== "object") {
    return classMap
      ? classMap[value as keyof typeof classMap]
      : `${prefix}${value}`;
  }

  return Object.entries(value)
    .map(([bp, val]) => {
      const mapped = classMap
        ? classMap[val as keyof typeof classMap]
        : `${prefix}${val}`;
      return `${bp}:${mapped}`;
    })
    .join(" ");
}
