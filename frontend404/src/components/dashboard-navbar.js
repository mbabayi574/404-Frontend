import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { AppBar, Avatar, Badge, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { Bell as BellIcon } from '../icons/bell';
import { UserCircle as UserCircleIcon } from '../icons/user-circle';
import { Users as UsersIcon } from '../icons/users';
import avatar from 'images/avatar.jpg';
import { TitleContext } from "App";
import { useContext } from 'react';
import useUser from 'useUser';

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3]
}));

export const DashboardNavbar = (props) => {
  const { user, onSidebarOpen, onLogout, ...other } = props;
  const { title } = useContext(TitleContext);
	const today = new Date();

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280
          },
          width: {
            lg: 'calc(100% - 280px)'
          }
        }}
        {...other}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2
          }}
        >
          <IconButton
            onClick={onSidebarOpen}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: 'none'
              }
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Typography variant="h5" color="text.primary" sx={{width: "20vw"}}>
            {title}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
					<Typography variant="h6" color="text.primary">
						Today: {today.getFullYear()} / {today.getMonth() + 1} / {today.getDate()}
					</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="h5" color="text.primary" sx={{width: "20vw", textAlign: "end"}}>
						{user.first_name} {user.last_name}
					</Typography>
          <Tooltip title="Logout">
            <IconButton sx={{ ml: 2 }}
              onClick={onLogout}
            >
              <LogoutIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Avatar
            sx={{
              height: 40,
              width: 40,
              ml: 1
            }}
            // src={avatar}
          >
            <UserCircleIcon fontSize="small" />
          </Avatar>
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onSidebarOpen: PropTypes.func
};
