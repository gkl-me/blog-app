import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import useSignIn from '@/hooks/useSigIn'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

//siginin schema 
const signinSchema = z.object({
    email:z.string().email({message:'Invalid email address'}),
    password:z.string().min(3,{message:'weak password'})
})



const SignIn = () => {

    const {toast } = useToast()
    const {signin,isLoading,error} = useSignIn()

    useEffect(() => {
        if (error) {
            toast({
                title: error,
                duration: 2000,
            })
        }
    }, [error, toast])
    
    const form = useForm<z.infer<typeof signinSchema>>({
        resolver:zodResolver(signinSchema),
        defaultValues:{
            email:'',
            password:""
        }
    })

    async function onSubmit(values:z.infer<typeof signinSchema>){
        await signin(values)
    }

  return (
    isLoading ? (
        <div className="flex justify-center items-center">
            <p>Loading...</p> {/* Add a loading spinner or message */}
        </div>
    ) : (

<div className='flex flex-col gap-2'>
    <h1 className='text-center text-lg  font-semibold'>Sign In</h1>

    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField 
                control={form.control}
                name='email'
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder='email' {...field} autoComplete='off' />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
            <FormField
                control={form.control}
                name='password'
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input placeholder='password' {...field}  autoComplete='off'/>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <Button className='w-full mt-2' type='submit'>Sign In</Button>
        </form>
    </Form>
                </div>
  ))
}

export default SignIn