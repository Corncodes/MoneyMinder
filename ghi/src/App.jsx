import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Test from './components/logged_out/Test.jsx'
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
// Components
import LoginForm from './components/logged_out/LoginForm.jsx'



function App() {
  // const domain = /https:\/\/[^/]+/;
  // const basename = import.meta.env.PUBLIC_URL.replace(domain, "");
  // const baseUrl = process.env.REACT_APP_API_HOST;
  const baseUrl = process.env.REACT_APP_API_HOST;
  console.log(baseUrl)

  return (
    <AuthProvider baseUrl={baseUrl}>
      <LoginForm />
    </AuthProvider>
  )
}

export default App
