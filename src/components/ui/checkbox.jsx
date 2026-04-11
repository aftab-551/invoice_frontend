import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react" // Keep this name consistent

import { cn } from "@/lib/utils"

function Checkbox({ className, ...props }) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        "peer size-4 shrink-0 rounded-[4px] border border-gray-400 outline-none transition-colors",
        // This makes the box fill purple when checked
        "data-[state=checked]:bg-[#6956fc] data-[state=checked]:border-[#6956fc]", 
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center">
        {/* Use CheckIcon here because that is what you imported above */}
        <CheckIcon className="size-3.5 text-white stroke-[3px]" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox }