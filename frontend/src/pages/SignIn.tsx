import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'

//siginin schema 
const signinSchema = z.object({
    email:z.string().email({message:'Invalid email address'}),
    password:z.string().min(3,{message:'weak password'})
})



const SignIn = () => {
    
    const form = useForm<z.infer<typeof signinSchema>>({
        resolver:zodResolver(signinSchema),
        defaultValues:{
            email:'',
            password:""
        }
    })

    function onSubmit(values:z.infer<typeof signinSchema>){
        console.log(values)
    }

  return (
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
  )
}

export default SignIn