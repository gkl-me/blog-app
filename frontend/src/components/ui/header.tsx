import { useNavigate } from 'react-router-dom'
import image from '../../assets/image.png'
import { Avatar, AvatarFallback } from './avatar'
import { Button } from './button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { removeToken } from '@/config'

function Header({name}:{name:string}) {
  
  const navigate  = useNavigate()
  function logout(){
    removeToken()
    navigate('/')
  }


  return (
    <div className="fixed top-0 left-0 w-full z-50">

    <div className="flex justify-center">
    <div className="bg-gray-300 flex justify-between p-4 pt-4 rounded-lg mt-4 h-full  w-4/5 sm:w-1/2  bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20 border border-white-100">
        <div className='flex'>
        <img src={image} alt="" className='w-8 h-8 cursor' />
        <h1 className='font-thin font-sans'>Blog</h1>
        </div>
        {name? (<DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarFallback className="border-2 bg-gray-400">
                {name[0]}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem className="flex flex-col items-start gap-1">
              <span className="text-sm font-medium">{name}</span>
              <Button onClick={() => {
                navigate('/create')
              }} size="sm" variant="default" className="w-full">
                Public
              </Button>
              <Button onClick={logout} size="sm" variant="default" className="w-full">
                LogOut
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ):
        <Button size={'sm'}>Login</Button> }
    </div>
    </div>
        </div>
  )
}

export default Header