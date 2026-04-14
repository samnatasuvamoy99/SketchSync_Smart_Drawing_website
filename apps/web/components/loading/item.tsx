import { cn } from "@/lib/utils"

export function Item({ className, ...props }: any) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-xl border-x-4 p-4 bg-black  border-amber-300 text-white ",
        className
      )}
      {...props}
    />
  )
}

export function ItemMedia({ children }: any) {
  return <div>{children}</div>
}

export function ItemContent({ className, ...props }: any) {
  return <div className={cn("flex flex-col", className)} {...props} />
}

export function ItemTitle({ className, ...props }: any) {
  return <p className={cn("font-medium", className)} {...props} />
}