import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { theme } from "./theme";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import useToken from './useToken';
import { useLocation, useNavigate } from 'react-router-dom';

export const TokenContext = React.createContext();
export const TitleContext = React.createContext();

const pageTitles = {
  '/login': 'Login',
  '/signup': 'Signup',
  '/my/home': 'Dashboard',
  '/my/timetracker': 'Time Tracker',
  '/my/todoapp': 'Todos',
  '/my/transportation': 'Transportation',
  '/my/documents': 'Documents',
  '/my/announcementsender': 'Bulletin Board',
  '/my/boardemp': 'Bulletin Board',
}

function App() {
  const tokenlessPages = [
    '/login',
    '/signup'
  ];
  let location = useLocation();
  const navigate = useNavigate();
  const { token, setToken } = useToken();
  const [ title, setTitle ] = useState(null);
  useEffect(() => {
    console.log(token);
    console.log(location);
    if (!token && !tokenlessPages.includes(location.pathname)) {
      navigate('/login');
    } else if (token && tokenlessPages.includes(location.pathname)) {
      navigate('/my/home');
    }
  }, [location, token])
  useEffect(() => {
    for (var key in pageTitles) {
      if (location.pathname.startsWith(key)) {
        setTitle(pageTitles[key]);
        return;
      }
    }
    setTitle(null);
  }, [location])
  useEffect(() => {
    document.title = (title ? (title + ' | ') : '') + "Group 404";
  }, [title]);

  return (
    <div>
      <header>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <TitleContext.Provider value={{title: title, setTitle: setTitle}}>
            <TokenContext.Provider value={{token: token, setToken: setToken}}>
              <Outlet/>
            </TokenContext.Provider>
          </TitleContext.Provider>
        </ThemeProvider>
      </header>
    </div>
  );
}

export default App;
