import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-blue focus-visible:ring-offset-2 focus-visible:ring-offset-void",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-glow-blue hover:shadow-glow-purple hover:scale-[1.02] active:scale-[0.98]",
        outline:
          "border border-white/15 bg-white/[0.03] backdrop-blur-md hover:bg-white/[0.08] hover:border-neon-blue/50 text-white",
        ghost: "hover:bg-white/5 text-white",
        glass: "glass hover:border-neon-purple/40 text-white",
        destructive: "bg-red-500/90 text-white hover:bg-red-500",
        link: "text-neon-blueSoft underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
