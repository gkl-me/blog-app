import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, } from "@/components/ui/avatar"
import { CalendarDays, ChevronRight } from 'lucide-react'
import { Link } from "react-router-dom"

interface BlogCardProps {
  title: string
  content: string
  author: string
  date: string

}

export default function BlogCard({ 
  title = "Understanding Modern Web Development",
  content = "Explore the latest trends and best practices in modern web development...",
  author = "Hello",
  date = "Dec 14, 2023",
}: BlogCardProps) {
  return (
    <Link to='/post' >
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="w-4 h-4" />
            {date}
          </div>
        </div>
        <h3 className="text-xl font-semibold tracking-tight group-hover:text-orange-600 transition-colors">
          {title}
        </h3>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <p className="text-muted-foreground">
          {content}
        </p>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>{author[0]}</AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{author}</span>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-orange-600 transition-colors" />
      </CardFooter>
    </Card>
    </Link>
  )
}

