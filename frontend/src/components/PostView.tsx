import { CalendarDays, Clock, ArrowLeft } from 'lucide-react'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Link } from 'react-router-dom'

export default function PostView() {
  // In a real application, you would fetch the post data based on the slug
  const post = {
    title: "Understanding Modern Web Development",
    content: `
      <p>Modern web development has evolved significantly over the past few years. With the advent of powerful frameworks and libraries, developers now have more tools at their disposal than ever before.</p>
      <h2>The Rise of JavaScript Frameworks</h2>
      <p>Frameworks like React, Vue, and Angular have revolutionized the way we build web applications. They provide a structured approach to creating interactive and dynamic user interfaces.</p>
      <h2>Server-Side Rendering and Static Site Generation</h2>
      <p>Technologies like Next.js have brought the best of both worlds: the interactivity of client-side applications and the performance benefits of server-side rendering.</p>
      <h2>The Importance of Performance</h2>
      <p>As web applications grow more complex, optimizing for performance becomes crucial. Techniques like code splitting, lazy loading, and effective caching strategies are essential for creating fast and responsive web experiences.</p>
    `,
    author: {
      name: "John Doe",
      image: "/placeholder.svg?height=40&width=40"
    },
    date: "Dec 14, 2023",
    readingTime: "5 min read",
    category: "Development",
    coverImage: "/placeholder.svg?height=400&width=800"
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <Link to="/home" className="inline-flex items-center text-orange-600 hover:text-orange-800 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to all posts
      </Link>
      <header className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <Badge variant="secondary" className="bg-orange-100 text-orange-700">
            {post.category}
          </Badge>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <CalendarDays className="w-4 h-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readingTime}
            </span>
          </div>
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">{post.title}</h1>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>{post.author.name[0]}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{post.author.name}</span>
        </div>
      </header>
      <div 
        className="prose prose-orange lg:prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  )
}

