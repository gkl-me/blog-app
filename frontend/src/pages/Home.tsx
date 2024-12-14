import BlogCard from "@/components/BlogCard"
import BlogCardSkeleton from "@/components/CardSeleton"
import Header from "@/components/ui/header"
import Post from "./Post"
import CreatePost from "./CreatePost"



const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-grid-pattern bg-grid">
      <Header name="John Doe"/>
      <div className="w-1/2 mx-auto mt-36">
      <BlogCardSkeleton />
      <BlogCardSkeleton />
      <BlogCard />
      <Post />
      <CreatePost />
      </div>
    </div>
  )
}

export default Home