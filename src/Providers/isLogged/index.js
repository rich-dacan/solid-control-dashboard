import {  createContext, useContext, useState } from "react";


export const IsLoggedContext = createContext(null)

export const IsLoggedProvider = ({children})=> {

    const [isLogged, setIsLogged] = useState(false)
 

    const userLogged = () => {
        setIsLogged(true)
    }

    const userLogOut = () => {
        localStorage.removeItem("@DEStoq:token")
        setIsLogged(false)
    }

    return(
        <IsLoggedContext.Provider value={{isLogged,userLogged,userLogOut}}>
            {children}
        </IsLoggedContext.Provider>
    )
}

export const useIslogged = ()=> useContext(IsLoggedContext)