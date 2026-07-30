"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "@base-ui/react/select"
import { cn } from "@/lib/utils"
import { ChevronDown, Check } from "lucide-react"

function SelectRoot<T extends string>({
  className,
  ...props
}: SelectPrimitive.Root.Props<T> & { className?: string }) {
  return <SelectPrimitive.Root<T> data-slot="select-root" {...props} />
}

function SelectTrigger({
  className,
  children,
  ...props
}: SelectPrimitive.Trigger.Props & { className?: string }) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        "flex h-10 w-full items-center justify-between gap-2 rounded-xl border border-zinc-700/50 bg-zinc-800/50 px-3 py-2 text-sm text-zinc-100 select-none transition-all",
        "hover:border-zinc-600/50",
        "data-disabled:opacity-40 data-disabled:cursor-not-allowed",
        "data-popup-open:border-emerald-500/50 data-popup-open:ring-1 data-popup-open:ring-emerald-500/20",
        "focus-visible:outline-none focus-visible:border-emerald-500/50 focus-visible:ring-1 focus-visible:ring-emerald-500/20",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon className="text-zinc-500 data-popup-open:text-zinc-300 transition-colors">
        <ChevronDown className="w-4 h-4" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectValue({
  className,
  ...props
}: SelectPrimitive.Value.Props & { className?: string }) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn(
        "flex-1 text-left truncate data-placeholder:text-zinc-500",
        className
      )}
      {...props}
    />
  )
}

function SelectPopup({
  className,
  ...props
}: SelectPrimitive.Popup.Props & { className?: string }) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        className="outline-hidden z-50"
        sideOffset={4}
      >
        <SelectPrimitive.Popup
          data-slot="select-popup"
          className={cn(
            "group min-w-[var(--anchor-width)] origin-[var(--transform-origin)] rounded-xl border border-zinc-700/50 bg-zinc-900 py-1 text-zinc-100 outline-hidden shadow-2xl",
            "transition-[scale,opacity] duration-100 ease-out",
            "data-starting-style:scale-[0.98] data-starting-style:opacity-0",
            "data-ending-style:scale-[0.98] data-ending-style:opacity-0",
            "dark:border-zinc-700 dark:bg-zinc-900",
            className
          )}
          {...props}
        />
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

function SelectList({
  className,
  ...props
}: SelectPrimitive.List.Props & { className?: string }) {
  return (
    <SelectPrimitive.List
      data-slot="select-list"
      className={cn(
        "relative overflow-y-auto max-h-[var(--available-height)] py-1",
        className
      )}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.Item.Props & { className?: string }) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "grid cursor-default grid-cols-[1rem_1fr] items-center gap-2 py-1.5 pr-3 pl-2.5 text-sm outline-hidden select-none",
        "data-highlighted:bg-emerald-500/10 data-highlighted:text-emerald-400",
        "transition-colors duration-100",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemIndicator className="col-start-1 flex items-center justify-center">
        <Check className="w-3.5 h-3.5" />
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemText className="col-start-2">{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

export {
  SelectRoot as Select,
  SelectTrigger,
  SelectValue,
  SelectPopup,
  SelectList,
  SelectItem,
}
