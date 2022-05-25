import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { theme } from "./theme";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import useToken from './useToken';
import { useLocation, useNavigate } from 'react-router-dom';

export const TokenContext = React.createContext();

function App() {
  const tokenlessPages = [
    '/login',
    '/signup'
  ];
  let location = useLocation();
  const navigate = useNavigate();
  const { token, setToken } = useToken();
  
  useEffect(() => {
    console.log(token);
    console.log(location);
    if (!token && !tokenlessPages.includes(location.pathname)) {
      navigate('/login');
    } else if (token && tokenlessPages.includes(location.pathname)) {
      navigate('/my/home');
    }
  }, [location, token])
  return (
    <div>
      <header>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <TokenContext.Provider value={{token: token, setToken: setToken}}>
            <Outlet/>
          </TokenContext.Provider>
        </ThemeProvider>
      </header>
    </div>
  );
}

export default App;
