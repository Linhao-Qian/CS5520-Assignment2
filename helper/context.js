import { createContext, useState } from "react";

export const Context = createContext();

// Use React Context to communicate changes to all the components.
export const ContextProvider = ({children}) => {
    const [theme, setTheme] = useState('light');
    const [activities, setActivities] = useState([]);
    const [diet, setDiet] = useState([]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const addAnActivity = (newActivity) => {
        setActivities(prevActivity => [...prevActivity, newActivity]);
    }

    const addADietEntry = (newDietEntry) => {
        setDiet(prevDietEntry => [...prevDietEntry, newDietEntry]);
    }

    return (
        <Context.Provider value={{theme, activities, diet, toggleTheme, addAnActivity, addADietEntry}}>
            {children}
        </Context.Provider>
    )
}