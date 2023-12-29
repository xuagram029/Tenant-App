import React, { Dispatch, ReactNode, createContext, useEffect, useReducer } from "react"

interface User { 
  firstName: string,
  lastName: string,
  userName: string,
  password: string,
  email:string,
  mobile: number | null
}

interface State { 
  user: User | null,
  loading: boolean,
  error: string | null
}

type Action = 
  {type: 'LOGIN_START'}
  | {type: 'LOGIN_SUCESS', payload: User}
  | {type: 'LOGIN_FAIL', payload: string}
  | {type: 'LOGOUT'}
  
const INITIAL_STATE: State = {
    user: JSON.parse(localStorage.getItem('user') as string) || null,
    loading: false, 
    error: null
}

interface AuthContextValue extends State { 
  dispatch: Dispatch<Action>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const AuthReducer = (state: State, action: Action) => {
  switch(action.type){
    case "LOGIN_START":
      return{
        user: null,
        loading: true,
        error: null
      }
    case "LOGIN_SUCESS":
      return{
        user: action.payload,
        loading: true,
        error: null
      }
    case "LOGIN_FAIL":
      return{
        user: null,
        loading: true,
        error: action.payload
      }
    case "LOGOUT":
      return{
        user: null,
        loading: false,
        error: null
      }
    default: 
      return state
  }
}

interface AuthContextProviderProps {
  children: ReactNode
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user))
  }, [state.user])

  const contextValue: AuthContextValue = { ...state, dispatch };
  
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}