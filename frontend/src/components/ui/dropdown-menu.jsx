import {
  Menu as MenuPrimitive,
  MenuTrigger as MenuTriggerPrimitive,
  MenuContent as MenuContentPrimitive,
  MenuItem as MenuItemPrimitive,
  MenuSeparator as MenuSeparatorPrimitive,
  MenuGroup as MenuGroupPrimitive,
  MenuItemIndicator as MenuItemIndicatorPrimitive,
  MenuArrow as MenuArrowPrimitive,
  MenuPortal as MenuPortalPrimitive,
  MenuGroupLabel as MenuGroupLabelPrimitive,
  MenuRadioGroup as MenuRadioGroupPrimitive,
  MenuRadioItem as MenuRadioItemPrimitive,
  MenuCheckboxItem as MenuCheckboxItemPrimitive,
} from "@base-ui/react/menu"
import { Check, ChevronRight, Circle } from "lucide-react"
import { cn } from "@/lib/utils"
import React from 'react'

const Menu = MenuPrimitive.Root
const MenuTrigger = MenuTriggerPrimitive
const MenuGroup = MenuGroupPrimitive
const MenuPortal = MenuPortalPrimitive
const MenuRadioGroup = MenuRadioGroupPrimitive

const MenuSubTrigger = React.forwardRef(
  ({ className, inset, children, ...props }, ref) => (
    <MenuPrimitive.SubTrigger
      ref={ref}
      className={cn(
        "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
        inset && "pl-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto size-4" />
    </MenuPrimitive.SubTrigger>
  )
)
MenuSubTrigger.displayName = MenuPrimitive.SubTrigger.displayName

const MenuSubContent = React.forwardRef(
  ({ className, ...props }, ref) => (
    <MenuPrimitive.SubContent
      ref={ref}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  )
)
MenuSubContent.displayName = MenuPrimitive.SubContent.displayName

const MenuContent = React.forwardRef(
  ({ className, sideOffset = 4, ...props }, ref) => (
    <MenuPortal>
      <MenuContentPrimitive
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-white p-1 text-gray-900 shadow-lg ring-1 ring-black ring-opacity-5 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      />
    </MenuPortal>
  )
)
MenuContent.displayName = MenuContentPrimitive.displayName

const MenuItem = React.forwardRef(
  ({ className, inset, ...props }, ref) => (
    <MenuItemPrimitive
      ref={ref}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm px-3 py-2 text-sm outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  )
)
MenuItem.displayName = MenuItemPrimitive.displayName

const MenuCheckboxItem = React.forwardRef(
  ({ className, children, checked, ...props }, ref) => (
    <MenuCheckboxItemPrimitive
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <MenuItemIndicatorPrimitive>
          <Check className="h-4 w-4" />
        </MenuItemIndicatorPrimitive>
      </span>
      {children}
    </MenuCheckboxItemPrimitive>
  )
)
MenuCheckboxItem.displayName = MenuCheckboxItemPrimitive.displayName

const MenuRadioItem = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <MenuRadioItemPrimitive
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <MenuItemIndicatorPrimitive>
          <Circle className="h-2.5 w-2.5 fill-current" />
        </MenuItemIndicatorPrimitive>
      </span>
      {children}
    </MenuRadioItemPrimitive>
  )
)
MenuRadioItem.displayName = MenuRadioItemPrimitive.displayName

const MenuLabel = React.forwardRef(
  ({ className, inset, ...props }, ref) => (
    <MenuGroupLabelPrimitive
      ref={ref}
      className={cn(
        "px-2 py-1.5 text-sm font-semibold text-gray-500",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  )
)
MenuLabel.displayName = MenuGroupLabelPrimitive.displayName

const MenuSeparator = React.forwardRef(
  ({ className, ...props }, ref) => (
    <MenuSeparatorPrimitive
      ref={ref}
      className={cn("-mx-1 my-1 h-px bg-gray-200", className)}
      {...props}
    />
  )
)
MenuSeparator.displayName = MenuSeparatorPrimitive.displayName

const MenuArrow = React.forwardRef(
  ({ className, ...props }, ref) => (
    <MenuArrowPrimitive
      ref={ref}
      className={cn("fill-gray-200", className)}
      {...props}
    />
  )
)
MenuArrow.displayName = MenuArrowPrimitive.displayName

export {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuCheckboxItem,
  MenuRadioItem,
  MenuLabel,
  MenuSeparator,
  MenuGroup,
  MenuPortal,
  MenuArrow,
  MenuSubTrigger,
  MenuSubContent,
  MenuRadioGroup,
}