import { createContext, useContext, useState } from "react";

// Create a context to store the user data so that it can be accessed throughout the application
export const AuthContext = createContext();

// Custom hook to access the user data stored in the context
// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
    return useContext(AuthContext);
}


export const AuthContextProvider = ({ children }) => {
    // Parse converts localstored string value into object and null if no value is present in localstorage
    const [authUser,setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null) 
    // Provider is a component that takes a value prop to be passed to the consumers which we will be passing to the App component
    return <AuthContext.Provider value={{authUser,setAuthUser}}>
        {children}
    </AuthContext.Provider>
}