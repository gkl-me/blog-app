import { Hono } from 'hono'
import { getPrimsa } from '../db'

const app = new Hono<{
  Bindings:{
    DATABASE_URL:string
  }
}>()

app.get('/', async (c) => {
  
  const primsa = await getPrimsa(c)
  const user  = await primsa.user.create({
    data:{
      name:'gokul',
      email:'Gkl3.com',
      password:'Hellow1'
    }
  })

  return c.json({
    server:'healthy serve'
  })

})

export default app
