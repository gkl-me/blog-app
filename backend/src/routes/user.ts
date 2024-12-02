import { Hono } from "hono";
import z, { string } from "zod"
import { getPrimsa } from "../../db";
import bcrypt from 'bcryptjs'
import { sign } from "hono/jwt";
import { jsx } from "hono/jsx";

export const userRouter = new Hono<{
    Bindings:{
      DATABASE_URL:string
      JWT_SECRET:string
    },
    Variables:{
      userId:string
    }
  }>()
  

//register route
userRouter.post('/signup', async (c)=>{
    const body = await c.req.json()

    //zod validation
    const signupSchema = z.object({
        name:z.string(),
        email:z.string().email(),
        password:z.string().min(3)
    })

    const validateSignUp = signupSchema.safeParse(body)
    if(!validateSignUp.success){
        c.status(411)
        return c.json({
            message:'Invalid User data'
        })
    }

    //password hashing
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(body.password,salt)

    const primsa = getPrimsa(c)
    let newUser;
    try {
     newUser = await primsa.user.create({
            data:{
                name:body.name,
                email:body.email,
                password:hashPassword
            }
        })
        
    } catch (error) {
        c.status(400)
        return c.json({
            message:'Duplicate user found'
        })
    }

    //jwt gen
    const token = await sign({id:newUser.id},c.env.JWT_SECRET)

    if(newUser){
        return c.json({
            name:newUser.name,
            token:token
        })
    }
})


userRouter.post('/signin',async(c) => {

    const {email,password} = await c.req.json()

    const signinSchema  = z.object({
        email:z.string().email(),
        password:z.string().min(3)
    })

    const validateSignIn = signinSchema.safeParse({email,password})
    if(!validateSignIn.success){
        c.status(411)
        return c.json({
            message:"Invalid inputs"
        })
    }

    const prisma = getPrimsa(c)
    const userFound = await prisma.user.findUnique({
        where:{
            email:email,
        }
    })

    if(!userFound){
        c.status(403)
        return c.json({
            message:'User not found'
        })
    }

    //password compare
    const passwordMatch = await bcrypt.compare(password,userFound.password)
    if(!passwordMatch){
        c.status(403)
        return c.json({
            message:"Invalid user credentials"
        })
    }

    //jwt generation 
    const token = await sign({id:userFound.id},c.env.JWT_SECRET)

    return c.json({
        name:userFound.name,
        token,
    })

})