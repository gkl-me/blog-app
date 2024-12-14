export function setToken (token: string) {
    localStorage.setItem("token", token)
}

export function getToken () {
    return localStorage.getItem("token")
}

export function removeToken () {
    localStorage.removeItem("token")
    localStorage.removeItem("username")
}

export function setName (name:string){
    localStorage.setItem("username", name)
}

export function getName(){
    return localStorage.getItem("username")
}


export const BACKEND_API="http://localhost:8787"
