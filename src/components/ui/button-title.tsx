import { forwardRef } from "react";

import { cn } from "@/lib/utils";
import { Button, ButtonProps, buttonVariants } from "./button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

const ButtonTitle = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ title, className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className={cn(buttonVariants({ variant, size, className }))}
              ref={ref}
              {...props}
              asChild={asChild}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>{title}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
);
ButtonTitle.displayName = "Button";

export { ButtonTitle };
