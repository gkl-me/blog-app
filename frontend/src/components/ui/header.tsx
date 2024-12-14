import image from '../../assets/image.png'
import { Avatar, AvatarFallback } from './avatar'
import { Button } from './button'

function Header({name}:{name:string}) {
  return (
    <div className="fixed top-0 left-0 w-full z-50">

    <div className="flex justify-center">
    <div className="bg-gray-300 flex justify-between p-4 pt-4 rounded-lg mt-4 h-full  w-4/5 sm:w-1/2  bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20 border border-white-100">
        <div className='flex'>
        <img src={image} alt="" className='w-8 h-8 cursor' />
        <h1 className='font-thin font-sans'>Blog</h1>
        </div>
        {name? (<Avatar>
          <AvatarFallback className="border-2 bg-gray-400">
            {name[0]}
          </AvatarFallback>
        </Avatar>):
        <Button size={'sm'}>Login</Button> }
    </div>
    </div>
        </div>
  )
}

export default Header