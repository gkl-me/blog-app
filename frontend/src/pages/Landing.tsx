import { Button } from "@/components/ui/button";
import "../styles/grid-pattern.css"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import {motion} from 'motion/react';
import Header from "@/components/ui/header";

function Landing() {
  return (
    <div className="h-screen flex flex-col bg-grid-pattern bg-grid">
      <Header name=""/>
      <div className="h-full items-center flex justify-center w-full ">
    <div className="h-1/2 w-1/2 flex justify-center">
     
        <div className="flex flex-col  mt-10 items-center font-bold">
          <h1 className="font-bold md:text-5xl sm:text-2xl " >Welcome to Blog App</h1>
          <p className="text-xl mb-2 font-thin">Let's talk about it</p>
          <div>
          <motion.div
           className="flex gap-3 mt-2"
  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
  animate={{ opacity: 1, scale: 1, rotate: 0 }}
  transition={{
    duration: 0.6,
    ease: "easeOut",
    type: "spring",
    stiffness: 100,
  }}
>
 
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-black mb-3">Sign In</Button>
            </DialogTrigger>
            <DialogContent>
               <SignIn />
            </DialogContent>
        </Dialog>

        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"}>Sign Up</Button>
            </DialogTrigger>
            <DialogContent>
               <SignUp />
            </DialogContent>
        </Dialog>

      </motion.div>

          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Landing;
