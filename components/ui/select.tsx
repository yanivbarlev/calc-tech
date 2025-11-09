"use client"

import * as React from "react"

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, ...props }, ref) => {
    return (
      <select
        className={className}
        ref={ref}
        {...props}
      />
    )
  }
)
Select.displayName = "Select"

const SelectTrigger = Select
const SelectValue = ({ children, ...props }: any) => <>{children}</>
const SelectContent = ({ children, ...props }: any) => <>{children}</>
const SelectItem = ({ children, value, ...props }: any) => (
  <option value={value} {...props}>
    {children}
  </option>
)

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem }
