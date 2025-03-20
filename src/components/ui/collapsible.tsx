
import * as React from "react"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.CollapsibleTrigger>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.CollapsibleTrigger>
>(({ className, children, ...props }, ref) => (
  <CollapsiblePrimitive.CollapsibleTrigger
    ref={ref}
    className={cn("group", className)}
    {...props}
  >
    {children}
  </CollapsiblePrimitive.CollapsibleTrigger>
))

CollapsibleTrigger.displayName = CollapsiblePrimitive.CollapsibleTrigger.displayName

const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <CollapsiblePrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden transition-all duration-300",
      className
    )}
    {...props}
  >
    <div className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
      {children}
    </div>
  </CollapsiblePrimitive.Content>
))

CollapsibleContent.displayName = CollapsiblePrimitive.Content.displayName

// Custom animation components
const MotionCollapsibleContent = React.forwardRef<
  React.ElementRef<typeof CollapsiblePrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <CollapsiblePrimitive.Content
    ref={ref}
    className={cn("overflow-hidden", className)}
    {...props}
  >
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ 
        height: "auto", 
        opacity: 1,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      exit={{ 
        height: 0, 
        opacity: 0,
        transition: { duration: 0.2, ease: "easeIn" }
      }}
    >
      {children}
    </motion.div>
  </CollapsiblePrimitive.Content>
))

MotionCollapsibleContent.displayName = "MotionCollapsibleContent"

export { 
  Collapsible, 
  CollapsibleTrigger, 
  CollapsibleContent,
  MotionCollapsibleContent
}
