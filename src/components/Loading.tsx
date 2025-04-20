import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

const Loading = () => {
  return (
    <div className="space-y-2">
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-4 w-[200px]" />
  </div>
  )
}

export default Loading