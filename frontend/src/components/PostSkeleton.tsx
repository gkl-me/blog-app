import { Skeleton } from "@/components/ui/skeleton"
import { Link } from "react-router-dom" 
import { ArrowLeft } from 'lucide-react'

export default function PostSkeleton() {
  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <Link to="/home" className="inline-flex items-center text-orange-600 hover:text-orange-800 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to all posts
      </Link>
      <header className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-6 w-24" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        <Skeleton className="h-10 w-3/4 mb-4" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>
      </header>
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </article>
  )
}

