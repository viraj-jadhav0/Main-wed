import { cn } from "@/lib/utils"

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export function CardSkeleton() {
  return (
    <div className="rounded-3xl border border-border bg-card p-5">
      <Skeleton className="aspect-[4/3] w-full rounded-2xl" />
      <Skeleton className="mt-4 h-6 w-3/4" />
      <Skeleton className="mt-2 h-4 w-full" />
      <Skeleton className="mt-2 h-4 w-1/2" />
    </div>
  )
}

export function ServiceCardSkeleton() {
  return (
    <div className="rounded-3xl border border-border bg-card p-5">
      <Skeleton className="aspect-[4/3] w-full rounded-2xl" />
      <Skeleton className="mt-4 h-6 w-3/4" />
      <Skeleton className="mt-2 h-4 w-full" />
      <Skeleton className="mt-4 h-4 w-1/3" />
    </div>
  )
}
