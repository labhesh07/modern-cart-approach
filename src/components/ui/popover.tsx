
import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        "transition-all duration-300 ease-in-out",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))

PopoverContent.displayName = PopoverPrimitive.Content.displayName

// Motion-enhanced popover content
const MotionPopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none",
        className
      )}
      asChild
      {...props}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 5 }}
        animate={{ 
          opacity: 1, 
          scale: 1, 
          y: 0,
          transition: { type: "spring", damping: 20, stiffness: 300 }
        }}
        exit={{ 
          opacity: 0, 
          scale: 0.95, 
          y: 5,
          transition: { duration: 0.2 }
        }}
      >
        {props.children}
      </motion.div>
    </PopoverPrimitive.Content>
  </PopoverPrimitive.Portal>
))

MotionPopoverContent.displayName = "MotionPopoverContent"

export { 
  Popover, 
  PopoverTrigger, 
  PopoverContent,
  MotionPopoverContent
}
