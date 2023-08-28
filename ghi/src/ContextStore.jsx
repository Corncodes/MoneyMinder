import { useState, useContext, createContext } from 'react'
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

const ContextStore = createContext(null);


export default function ContextProvider ({ children }) {
    const { token } = useAuthContext();
    const store = {}
    // const testFunction = (words) => console.log(words);
    store.test = `hello world`
    store.token = token
    store.testfunction = 'blah'

    return (
        <ContextStore.Provider value={store}>
            {children}
        </ContextStore.Provider>
    )
}

export const useStore = () => useContext(ContextStore)
