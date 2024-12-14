'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import Header from '@/components/ui/header'
import { BACKEND_API, getName, getToken } from '@/config'
import axios, { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'

export default function CreatePost() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const username = getName() as string

  const navigate = useNavigate()

  const token = getToken()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    // In a real application, you would send this data to your API
    const formData = new FormData(event.currentTarget)
    const postData = Object.fromEntries(formData)

    try {
      
      const creatPost = await axios.post(`${BACKEND_API}/api/v1/blog/create`,{
        title: postData.title,
        content: postData.content,
        author: username,
      },{
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      if(creatPost.status === 200){
        console.log('Post created successfully')
        setIsSubmitting(false)
        navigate('/home')
      } 

    } catch (error) {
      if(error instanceof AxiosError){
        console.error(error?.response?.data?.message || 'Failed to create post')
        setIsSubmitting(false)
      }
    }
  }

  return (
    <div className='min-h-screen bg-grid-pattern bg-grid'>
        <Header name={username} />
    <div className="pt-40 container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create New Post</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea id="content" name="content" required className="min-h-[200px]" />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Post'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
    </div>
  )
}

