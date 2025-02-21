import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "text-white border border-[#FFFFFF52] bg-inherit shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground text-black",
        link: "text-primary underline-offset-4 hover:underline",
        Triadic: "rounded-[48px] px-6 py-2 bg-[#FF803B] text-black hover:bg-[#FF803B]/70",
        NonTriadic: "rounded-[48px] px-[16px] py-[12px] bg-transparent text-white border border-[#97979A]", 
      },
      size: {
        default: "h-[48px] px-4 py-2 w-full",
        sm: "h-8 rounded-md px-3 text-xs w-full",
        lg: "h-10 rounded-md px-8 w-full",
        icon: "h-9 w-9",
      },
      isLoading: {
        true: "opacity-70 cursor-not-allowed",
        false: "",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed",
        false: "",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      isLoading: false,
      disabled: false,
    },
    compoundVariants: [
      {
        isLoading: true,
        disabled: true,
        className: "opacity-70 cursor-not-allowed",
      },
    ]
  }
);

const Button = React.forwardRef(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      children,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({ 
            variant, 
            size, 
            isLoading, 
            disabled, 
            className 
          })
        )}
        disabled={isLoading || disabled}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" />
          </>
        ) : (
          children
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
