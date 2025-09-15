// Global context store for the MoneyMinder React application
// This file provides a centralized state management solution using React Context
// Allows components to share state without prop drilling

import { useState, useEffect, useContext, createContext } from 'react'

// Create the context for global state
const ContextStore = createContext(null);

/**
 * Context provider component that wraps the application
 * Provides global state to all child components
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to wrap
 */
export default function ContextProvider ({ children }) {
    // Global state variables
    const [someState, setSomeState] = useState('Hello')
    const [budgetsData, setBudgetsData] = useState([])

    // Create the store object with state and setter functions
    const store = {
        budgetsData: budgetsData,           // Array of user's budgets
        someState: someState,               // Example state variable
        setSomeState: setSomeState,         // Function to update someState
        setBudgetsData: setBudgetsData,     // Function to update budgetsData
    }

    return (
        <ContextStore.Provider value={store}>
            {children}
        </ContextStore.Provider>
    )
}

/**
 * Custom hook to access the global context store
 * Provides easy access to global state and setter functions
 * 
 * @returns {Object} The global store object with state and setters
 */
export const useStore = () => useContext(ContextStore)
