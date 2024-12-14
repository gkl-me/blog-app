import { setToken } from "@/config"
import axios, { AxiosError } from "axios"
import { useState } from "react"
import { BACKEND_API } from "@/config"
import { useNavigate } from "react-router-dom"

interface SignUpProps {
    password: string
    email: string
}


export function useSignIn() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const naviagate = useNavigate()

    async function signin({  password, email }: SignUpProps) {
        setIsLoading(true)
        setError(null)
        try {
            const res = await axios.post(`${BACKEND_API}/api/v1/user/signin`, {
                password,
                email,
            })
            if (res) {
                setToken(res.data.token)
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

    return { signin, isLoading, error }
}

export default useSignIn
