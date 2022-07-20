import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext({})

export const UserProvider = ({children}) => {
    const [userLogin,setUserLogin] = useState(JSON.parse(localStorage.getItem("@DEStoq:user"))|| null)
    useEffect(()=>{
        setUserLogin(localStorage.getItem("@DEStoq:user"))
    },[])
   

    return(
        <UserContext.Provider value={{userLogin}}>
            {children}
        </UserContext.Provider>
    )
}
export const useUser = ()=> useContext(UserContext)