import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { theme } from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import useToken from "./useToken";
import useUser from "./useUser";
import useAPI from "./useAPI";
import { useLocation, useNavigate } from "react-router-dom";

export const TokenContext = React.createContext();
export const TitleContext = React.createContext();

const pageTitles = {
  "/login": "Login",
  "/signup": "Signup",
  "/my/home": "Dashboard",
  "/my/timetracker": "Time Tracker",
  "/my/todoapp": "Todos",
  "/my/transportation": "Transportation",
  "/my/documents": "Documents",
  "/my/bulletin_board": "Bulletin Board",
  "/my/hr_desk": "Human Resources",
  "/my/dormitoryemp": "Dormitory",
  "/my/servicecounteremp": "Service Counter",
  "/my/salary": "Salary",
  "/my/reports": "Financial Reports",
};

function App() {
  const tokenlessPages = ["/login", "/signup"];
  let location = useLocation();
  const navigate = useNavigate();
  const { token, setToken } = useToken();
  const { user, setUser } = useUser();
  const api = useAPI();
  const [title, setTitle] = useState(null);
  useEffect(() => {
    // console.log(user);
    // console.log(token);
    // console.log(location.pathname);
    if (!token && !tokenlessPages.includes(location.pathname)) {
      navigate("/login");
    } else if (token && tokenlessPages.includes(location.pathname)) {
      navigate("/my/home");
    }
  }, [location, token]);
  // useEffect(() => {
  //   if (token) {
  //     api({
  //       url: "auth/users/me/"
  //     })
  //       .then(resp => {
  //         console.log(resp.data);
  //         setUser(resp.data);
  //       })
  //   }
  // }, [token])
  useEffect(() => {
    for (var key in pageTitles) {
      if (location.pathname.startsWith(key)) {
        setTitle(pageTitles[key]);
        return;
      }
    }
    setTitle(null);
  }, [location]);
  useEffect(() => {
    document.title = (title ? title + " | " : "") + "Group 404";
  }, [title]);

  return (
    <div>
      <header>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <TitleContext.Provider value={{ title: title, setTitle: setTitle }}>
            <TokenContext.Provider value={{ token: token, setToken: setToken }}>
              <Outlet />
            </TokenContext.Provider>
          </TitleContext.Provider>
        </ThemeProvider>
      </header>
    </div>
  );
}

export default App;
