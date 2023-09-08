import { useState, useEffect, useContext, createContext } from 'react'


const ContextStore = createContext(null);


export default function ContextProvider ({ children }) {
    const [someState, setSomeState] = useState('Hello')
	const [budgetsData, setBudgetsData] = useState([])

    const store = {
        budgetsData: budgetsData,
        someState: someState,
        setSomeState: setSomeState,
        setBudgetsData: setBudgetsData,
    }

    return (
        <ContextStore.Provider value={store}>
            {children}
        </ContextStore.Provider>
    )
}

export const useStore = () => useContext(ContextStore)
