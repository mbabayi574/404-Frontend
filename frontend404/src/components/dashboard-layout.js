import { useState, useEffect, useContext } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { DashboardNavbar } from './dashboard-navbar';
import { DashboardSidebar } from './dashboard-sidebar';
import { Outlet, useNavigate } from "react-router-dom";
import { TokenContext } from 'App';
import useUser from 'useUser';
import useAPI from 'useAPI';

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 280
  }
}));

export const DashboardLayout = () => {
  const api = useAPI();
  const {setToken, token} = useContext(TokenContext);
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const handleLogout = () => {
    setToken({refresh: null, access: null});
    setUser(null);
  }
  useEffect(() => {
    if (token) {
      api({
        url: "auth/users/me/"
      })
        .then(resp => {
          console.log(resp.data);
          setUser(resp.data);
        })
    }
  }, [token])
  return (
    <>
      <CssBaseline />
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%'
          }}
        >
          <Outlet />
        </Box>
      </DashboardLayoutRoot>
      <DashboardNavbar
        onSidebarOpen={() => setSidebarOpen(true)}
        onLogout={handleLogout}
      />
      <DashboardSidebar
        onClose={() => setSidebarOpen(false)}
        open={isSidebarOpen}
      />
    </>
  );
};
