import PostSkeleton from '@/components/PostSkeleton';
import PostView from '@/components/PostView'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { BACKEND_API, getName, getToken } from '@/config'
import axios, { AxiosError } from 'axios'
import { useToast } from '@/hooks/use-toast';
import { BlogInterface } from './Home';
import Header from '@/components/ui/header';

function Post() {

  const {id} = useParams();

  const token = getToken()
  const username = getName() as string
  const [isLoading,setIsLoading] = useState(false)
  const [error,setError] = useState(null)
  const [post, setPost] = useState<BlogInterface>()
  const {toast} = useToast()
  
  useEffect(() => {
    setIsLoading(true)
    if(error) {
      toast({
        title: error,
        duration: 2000,
      })
    }
    setError(null)
    async function getPost(){
      try {
        const post = await axios.get(`${BACKEND_API}/api/v1/blog/${id}`,{
          headers: {
            Authorization:`Bearer ${token}`,
          },
        })
        if(post){
          console.log(post);
          setPost(post.data)
          setIsLoading(false)
        }
      } catch (error) {
        console.log(error)
        if(error instanceof AxiosError){
          setError(error?.response?.data?.message || "Failed to fetch post")
          toast({
            title: error?.response?.data?.message || "Failed to fetch post",
            duration: 2000,
          })
        }
      }
    }
    getPost()
  },[])

  return (
  <div className="min-h-screen flex flex-col bg-grid-pattern bg-grid">
    <Header name={username}/>
    <div className="mt-36 w-1/2 mx-auto">

    {isLoading ? (  
      <PostSkeleton />
    ):(
      <PostView  author={post?.author.name} title={post?.title} content={post?.content} date="12 jand 2025"  />

    )}
    </div>
    </div>
  )
}

export default Post