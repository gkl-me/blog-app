import { getToken } from "@/config"
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

function ProtectedRoute() {

    const naviagte = useNavigate()

    useEffect(() => {
        const token = getToken()
        if(!token){
            naviagte("/")
        }
    },[naviagte])

  return (
    <Outlet/>
  )
}

export default ProtectedRoute