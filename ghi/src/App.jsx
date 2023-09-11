import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import ContextProvider from "./ContextStore";
// Components
import Nav from './Nav.jsx'
import TestPage from "./components/logged_in/TestPage";
// Logged Out Components
import LoginForm from "./components/logged_out/LoginForm.jsx";
import CreateAccountForm from "./components/logged_out/CreateAccountForm";
// Logged In Components
import BudgetList from "./components/logged_in/BudgetList";
import CreateBudgetForm from "./components/logged_in/CreateBudgetForm";
import ConfigureBudget from "./components/logged_in/ConfigureBudget";
import BudgetView from "./components/logged_in/BudgetView";
import EditBudgetForm from "./components/logged_in/EditBudgetForm";
import AccountView from "./components/logged_in/AccountView";
// MUI Imports
import { createTheme, ThemeProvider, colors } from "@mui/material";

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

const ProtectedRoute = () => {
  const { token } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {setIsLoading(false)}, 650)
  }, [])

  if (!token && !isLoading) {
    return <LoginForm />;}
  else {return <Outlet />;}
}

const UnprotectedRoute = () => {
  const location = useLocation()
  const { token } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {setIsLoading(false)}, 650)
  }, [])
  if (token && !isLoading) {
    return <Navigate to="/budgets" replace state={{ from: location }} />;
  }
  return <Outlet />
}

function App() {
  const baseUrl = process.env.REACT_APP_API_HOST;

  return (
    <AuthProvider baseUrl={baseUrl}>
      <ThemeProvider theme={defaultTheme}>
        <ContextProvider>
          <BrowserRouter>
          <Nav baseUrl={baseUrl}/>
          <Routes>
            <Route element={<UnprotectedRoute />}>
              <Route path="/sign-up" element={<CreateAccountForm baseUrl={baseUrl} />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/" element={<LoginForm />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/budgets">
                <Route index element={<BudgetList baseUrl={baseUrl} />} />
                <Route path="new" element={<CreateBudgetForm baseUrl={baseUrl} />} />
                <Route path=":id" >
                  <Route index element={<BudgetView baseUrl={baseUrl} />} />
                  <Route path="edit" element={<EditBudgetForm baseUrl={baseUrl} />} />
                </Route>
              </Route>
            </Route>
            <Route path="/test" element={<TestPage />} />
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
