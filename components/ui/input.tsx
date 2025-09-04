import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
}

export { Input };

interface TextFieldProps extends React.ComponentProps<"input"> {
  helperText?: string;
  errorText?: string;
  showErrorText?: boolean;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  obscureText?: boolean;
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      helperText,
      errorText,
      showErrorText,
      prefixIcon,
      suffixIcon,
      obscureText,
      className,
      type,
      ...props
    },
    ref
  ) => {
    const inputType = obscureText ? "password" : type || "text";

    return (
      <div className="flex flex-col w-full">
        <div className="relative flex items-center">
          {prefixIcon && <div className="absolute left-3">{prefixIcon}</div>}
          <input
            ref={ref}
            type={inputType}
            className={cn(
              "w-full rounded-md border bg-transparent px-3 py-2 text-base placeholder:text-muted-foreground shadow-xs transition-[color,box-shadow] outline-none",
              prefixIcon ? "pl-10" : "",
              suffixIcon ? "pr-10" : "",
              errorText
                ? "border-destructive ring-destructive/20"
                : "border-input",
              className
            )}
            {...props}
          />
          {suffixIcon && (
            <div className="absolute right-3 hover:cursor-pointer">
              {suffixIcon}
            </div>
          )}
        </div>
        {helperText && !errorText && (
          <p className="mt-1 text-xs text-muted-foreground">{helperText}</p>
        )}
        {errorText && showErrorText && (
          <p className="mt-1 text-xs text-destructive">{errorText}</p>
        )}
      </div>
    );
  }
);

TextField.displayName = "TextField";

export { TextField };
