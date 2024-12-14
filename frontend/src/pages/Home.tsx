
import BlogCard from "@/components/BlogCard"
import BlogCardSkeleton from "@/components/CardSeleton"
import Header from "@/components/ui/header"
import { BACKEND_API, getName, getToken } from "@/config"
import { useToast } from "@/hooks/use-toast"
import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"

interface BlogInterface {
  id: string
  title: string
  content: string
  author: {
    name:string,
    email:string
  },
  author_id:string
}

const Home = () => {

  const [isLoading,setIsLoading] = useState(false)
  const [blogs,setBlogs] = useState<BlogInterface[]>()
  const [error, setError] = useState<string | null>(null)
  const {toast} = useToast()

  const username = getName() as string
  const token = getToken()
  useEffect(() => {
    if(error){
      toast({
        title: error,
        duration: 2000,
      })
    }
    async function getBlogs () {
      try {
        setIsLoading(true)
        const response = await axios.post(`${BACKEND_API}/api/v1/blog/bulk`,{},{
          headers: {
            Authorization:`Bearer ${token}`,
          },
        })
        if(response){
          setBlogs(response.data)
          setIsLoading(false)
        }
        console.log(response)
      } catch (error) {
        console.error(error)
        if(error instanceof AxiosError){
          setError(error?.response?.data?.message || "Failed to fetch blogs")
        }
      }
    }
    getBlogs()
  },[])

  return (
    <div className="min-h-screen flex flex-col bg-grid-pattern bg-grid">
      <Header name={username}/>
      
      <div className="mt-36 w-1/2 mx-auto">
      {isLoading ? 
      (
       <div className="flex flex-col gap-3">
          <BlogCardSkeleton/> 
          <BlogCardSkeleton/> 
       </div>
    ):(
       blogs?.map((blog: BlogInterface, index) => (
         <BlogCard key={index} author={blog.author.name} title={blog.title} content={blog.content} date="12 Jan 2025"  />
       ))
    )}
      </div>

      </div>
  )
}

export default Home