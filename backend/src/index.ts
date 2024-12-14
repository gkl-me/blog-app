import { Hono } from 'hono'
import { userRouter } from './routes/user'
import { verify } from 'hono/jwt'
import { blogRouter } from './routes/blog'
import { cors } from 'hono/cors'

const app = new Hono<{
  Bindings:{
    DATABASE_URL:string
    JWT_SECRET:string
  },
  Variables:{
    userId:string
  }
}>()


// Extremely permissive CORS for debugging
app.use(cors())

app.use('/api/v1/blog/*',async (c,next)=>{
  const jwt = c.req.header('Authorization')
  if(!jwt){
    c.status(401)
    return c.json({
      message:"Unauthorized access"
    })
  }
  const token = jwt?.split(" ")[1]

  let payload;
  try {
     payload = await verify(token,c.env.JWT_SECRET)
  } catch (error) {
    c.status(403)
    return c.json({
      message:"Unauthorized token"
    })
  }
  c.set('userId',payload.id as string)
  await next()
})


app.route('api/v1/user',userRouter)
app.route('api/v1/blog',blogRouter)

export default app
