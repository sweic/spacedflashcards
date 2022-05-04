import React, {useState} from 'react'
import {useContext, createContext} from 'react'

interface AuthContextType {
    user: string,
    setUser: React.Dispatch<React.SetStateAction<string>>
}

const defaultValues = {
    user: '',
    setUser: () => {}
}

const AuthContext = createContext<AuthContextType>(defaultValues)
export const AuthProvider = ({children} : {children: any}) => {
    const [user, setUser] = useState("")

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>

    )
}

export const useAuth = () => {
    return useContext(AuthContext) as AuthContextType
}

