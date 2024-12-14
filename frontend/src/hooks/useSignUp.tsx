import { setName, setToken } from "@/config"
import axios, { AxiosError } from "axios"
import { useState } from "react"
import { BACKEND_API } from "@/config"
import { useNavigate } from "react-router-dom"

interface SignUpProps {
    name: string
    password: string
    email: string
}


export function useSignUp() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)



    const naviagate = useNavigate()

    async function signup({ name, password, email }: SignUpProps) {
        setIsLoading(true)
        setError(null)
        try {
            const res = await axios.post(`${BACKEND_API}/api/v1/user/signup`, {
                name,
                password,
                email,
            })
            if (res) {
                setToken(res.data.token)
                setName(res.data.name)
                naviagate('/home')
            }
        } catch (error) {
            if(error instanceof AxiosError){
                setError(error?.response?.data?.message || "Signup failed")
            }
            } finally {
            setIsLoading(false)
        }
    }

    return { signup, isLoading, error }
}

export default useSignUp
