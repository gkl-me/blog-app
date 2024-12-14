import { Hono } from "hono";
import { getPrimsa } from "../../db";

export const blogRouter = new Hono<{
    Bindings:{
      DATABASE_URL:string
      JWT_SECRET:string
    },
    Variables:{
      userId:string
    }
  }>()


//create blog route
blogRouter.post('/create',async(c) => {
    const userId = c.get('userId')
    const primsa = getPrimsa(c)

    const {title,content} = await c.req.json()
    let newPost;
    try {
        newPost = await primsa.post.create({
            data:{
                title,
                content,
                author_id:userId
            }
        })
        
    } catch (error) {
        c.status(500)
        return c.json({
            message:"Unable to add post"
        })
    }

    return c.json({
        id:newPost.id
    })

})


//update post route
blogRouter.put('/update',async(c) => {
    const userId = c.get("userId")
    const {postId,title,content} = await c.req.json()

    const prisma = getPrimsa(c)
    const updatedPost = await prisma.post.update({
        where:{
            id:postId,
            author_id:userId
        },
        data:{
            title,
            content
        }
    })

    return c.json({
        message:"Post updated successfully"
    })
})


//view single post 
blogRouter.get('/:id',async(c) => {
    const primsa = getPrimsa(c)
    const postId = c.req.param('id')
    const post  = await primsa.post.findFirst({
        where:{
            id:postId
        },
        include:{
            author:{
                select:{
                    name:true,
                    email:true
                }
            }
        },
    })
    return c.json(post)
})


//get all posts
blogRouter.post('/bulk',async(c)=>{
    const prisma = getPrimsa(c)
    const allPost = await prisma.post.findMany({
        include:{
            author:{
                select:{
                    name:true,
                }
            }
        }
    })
    return c.json(allPost)
})