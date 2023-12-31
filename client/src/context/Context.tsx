import { createContext, useEffect, useReducer, ReactNode } from "react";

interface User { 
    firstName: string,
    lastName: string,
    userName: string,
    password: string,
    email:string,
    mobile: number | null,
    resp?: any
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  error: string | null;
  dispatch: React.Dispatch<AuthAction>;
}

interface AuthAction {
  type: string;
  payload?: User | string; // Payload can be User object or error string
}

const INITIAL_STATE: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  loading: false,
  error: null,
};

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: false,
  error: null,
  dispatch: () => {},
});

const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload as User,
        loading: false,
        error: null,
      };
    case "LOGIN_FAIL":
      return {
        user: null,
        loading: false,
        error: action.payload as string,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
