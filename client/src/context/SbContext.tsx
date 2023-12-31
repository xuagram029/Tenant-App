import React, { useState, createContext, useContext, ReactNode} from "react"

interface SideBarType { 
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const defaultSideBarContext: SideBarType = { 
    open: false,
    setOpen: () => {}
}

export const SideBarContext = createContext(defaultSideBarContext)

interface SideBarContextProps { 
    children: ReactNode
}

export const SideBarContextProvider:React.FC<SideBarContextProps> = ({ children }:SideBarContextProps) => {
    const [open, setOpen] = useState(false)
    return(
        <SideBarContext.Provider
        value={{ open, setOpen}}
        >
            {children}
        </SideBarContext.Provider>
    )
}