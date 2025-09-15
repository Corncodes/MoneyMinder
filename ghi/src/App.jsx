// Main App component for the MoneyMinder React application
// This file sets up routing, authentication, and the overall application structure

import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import ContextProvider from "./ContextStore";

// Import navigation component
import Nav from './Nav.jsx'

// Import test page component
import TestPage from "./components/logged_in/TestPage";

// Import components for unauthenticated users
import LoginForm from "./components/logged_out/LoginForm.jsx";
import CreateAccountForm from "./components/logged_out/CreateAccountForm";

// Import components for authenticated users
import BudgetList from "./components/logged_in/BudgetList";
import CreateBudgetForm from "./components/logged_in/CreateBudgetForm";
import ConfigureBudget from "./components/logged_in/ConfigureBudget";
import BudgetView from "./components/logged_in/BudgetView";
import EditBudgetForm from "./components/logged_in/EditBudgetForm";
import AccountView from "./components/logged_in/AccountView";

// Import Material-UI theming components
import { createTheme, ThemeProvider, colors } from "@mui/material";

// Create the default Material-UI theme
// Currently using default theme, but can be customized with custom colors
const defaultTheme = createTheme({
  // palette: {
  //   primary: {
  //     main:
  //   },
  //   secondary: {
  //     main:

  //   }
  // }
});

/**
 * Protected route component that requires authentication
 * Redirects to login if user is not authenticated
 */
const ProtectedRoute = () => {
  const { token } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true)

  // Add a small delay to prevent flash of login screen
  useEffect(() => {
    setTimeout(() => {setIsLoading(false)}, 650)
  }, [])

  // Show login form if not authenticated and loading is complete
  if (!token && !isLoading) {
    return <LoginForm />;
  } else {
    return <Outlet />;
  }
}

/**
 * Unprotected route component for pages that should redirect
 * authenticated users to the main application
 */
const UnprotectedRoute = () => {
  const location = useLocation()
  const { token } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true)

  // Add a small delay to prevent flash of content
  useEffect(() => {
    setTimeout(() => {setIsLoading(false)}, 650)
  }, [])

  // Redirect authenticated users to budgets page
  if (token && !isLoading) {
    return <Navigate to="/budgets" replace state={{ from: location }} />;
  }
  return <Outlet />
}

/**
 * Main App component that sets up the application structure
 * Includes authentication provider, theme provider, and routing
 */
function App() {
  const baseUrl = process.env.REACT_APP_API_HOST;

  return (
    // Wrap the entire app with authentication provider
    <AuthProvider baseUrl={baseUrl}>
        {/* Apply Material-UI theme to all components */}
        <ThemeProvider theme={defaultTheme}>
            {/* Provide global context for state management */}
            <ContextProvider>
                {/* Set up client-side routing */}
                <BrowserRouter>
                {/* Navigation component appears on all pages */}
                <Nav baseUrl={baseUrl}/>
                
                {/* Define all application routes */}
                <Routes>
                  {/* Routes for unauthenticated users */}
                  <Route element={<UnprotectedRoute />}>
                    <Route path="/sign-up" element={<CreateAccountForm baseUrl={baseUrl} />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/" element={<LoginForm />} />
                  </Route>

                  {/* Routes for authenticated users */}
                  <Route element={<ProtectedRoute />}>
                    {/* Budget management routes */}
                    <Route path="/budgets">
                      <Route index element={<BudgetList baseUrl={baseUrl} />} />
                      <Route path="new" element={<CreateBudgetForm baseUrl={baseUrl} />} />
                      <Route path=":id" >
                        <Route index element={<BudgetView baseUrl={baseUrl} />} />
                        <Route path="edit" element={<EditBudgetForm baseUrl={baseUrl} />} />
                      </Route>
                    </Route>
                  </Route>

                  {/* Test route for development */}
                  <Route path="/test" element={<TestPage />} />
                  
                  {/* Account management routes */}
                  <Route path="/account">
                    <Route index element={<AccountView baseUrl={baseUrl} />} />
                  </Route>
                </Routes>
                </BrowserRouter>
            </ContextProvider>
        </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
