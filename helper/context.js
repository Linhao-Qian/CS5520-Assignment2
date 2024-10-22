import { createContext, useState } from "react";

export const Context = createContext();

// Use React Context to communicate changes to all the components.
export const ContextProvider = ({children}) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <Context.Provider value={{theme, toggleTheme}}>
            {children}
        </Context.Provider>
    )
}