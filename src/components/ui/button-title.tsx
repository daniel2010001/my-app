import { forwardRef } from "react";

import { Button, ButtonProps } from "./button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

const ButtonTitle = forwardRef<HTMLButtonElement, ButtonProps>(({ title, ...props }, ref) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button ref={ref} {...props} />
        </TooltipTrigger>
        <TooltipContent>
          <p>{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});
ButtonTitle.displayName = "Button";

export { ButtonTitle };
