import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva("paragraph-medium rounded-lg px-3 py-4 transition", {
  variants: {
    variant: {
      default:
        "bg-primary-500 text-light-900 hover:bg-primary-100 dark:bg-primary-500 dark:text-light-900",
      secondary: "paragraph-medium btn-secondary text-dark300_light900",
      lightGradient: "primary-gradient hover:secondary-gradient text-light-900",
      //   destructive:
      //     "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      //   outline:
      //     "border-input bg-background hover:bg-accent hover:text-accent-foreground border",
      // secondary: "body-medium rounded-lg shadow-none",
      simpleSecondary:
        "bg-light-800 text-light-500 shadow-none hover:bg-light-700 dark:bg-dark-300 hover:dark:bg-dark-400",
      // simpleTertiary:
      //   "text-dark100_light900 background-light700_dark300 shadow-none",
      // shadow: "paragraph-medium btn-secondary text-dark300_light900",
      tab: "tab",
      globalTab:
        "light-border-2 small-medium rounded-2xl px-5 py-2 capitalize dark:text-light-800 dark:hover:text-primary-500",
      //     "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      //   ghost: "hover:bg-accent hover:text-accent-foreground",
      //   link: "text-primary underline-offset-4 hover:underline",
    },
    size: {
      default: "px-5 py-2", // h-10 px-4 py-3
      sm: "small-medium min-h-[41px] px-4 py-3", // h-9 rounded-md px-3
      lg: "min-h-[46px] px-6 py-3", // h-11 rounded-md px-8
      icon: "h-10 w-10",
    },
    block: {
      default: "",
      full: "w-full",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    block: "default",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, block, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, block, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
