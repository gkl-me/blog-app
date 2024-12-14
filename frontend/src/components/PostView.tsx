import { CalendarDays, ArrowLeft } from 'lucide-react'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Link } from 'react-router-dom'
import { BlogCardProps } from './BlogCard'



export default function PostView({author,title,content,date}:Partial<BlogCardProps>) {
  // In a real application, you would fetch the post data based on the slug


  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <Link to="/home" className="inline-flex items-center text-orange-600 hover:text-orange-800 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to all posts
      </Link>
      <header className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <CalendarDays className="w-4 h-4" />
              {date}
            </span>
          </div>
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">{title}</h1>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>{author?.[0]}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{author}</span>
        </div>
      </header>
      <div 
        className="prose prose-orange lg:prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: content! }}
      />
    </article>
  )
}

