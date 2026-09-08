import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva("inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-[color,background-color,box-shadow,transform] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/35 disabled:pointer-events-none disabled:opacity-50 active:translate-y-px [&_svg]:pointer-events-none [&_svg]:shrink-0", { variants: { variant: { default: "bg-primary text-primary-foreground shadow-sm hover:bg-primary-dark", outline: "border border-border bg-background hover:border-primary/30 hover:bg-secondary", ghost: "text-muted-foreground hover:bg-secondary hover:text-foreground" }, size: { default: "h-11 px-5", sm: "h-9 px-4", lg: "h-13 rounded-2xl px-7 text-base" } }, defaultVariants: { variant: "default", size: "default" } });

function Button({ className, variant, size, asChild = false, ...props }: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
