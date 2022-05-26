import PropTypes from 'prop-types';
import { Box, Drawer, useMediaQuery } from '@mui/material';
import { Logo } from './logo';
import { NavItem } from './nav-item';
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';

const mainItems = [
  {
    href: '/my/home',
    icon: (<DashboardIcon fontSize="small" />),
    title: 'Dashboard'
  },
  {
    href: '/my/profile',
    icon: (<PersonIcon fontSize="small" />),
    title: 'Profile'
  },
  {
    href: '/my/timetracker',
    icon: (<AccessTimeIcon fontSize="small" />),
    title: 'Time Tracker'
  },
  {
    href: '/my/todoapp',
    icon: (<AssignmentIcon fontSize="small" />),
    title: 'Todos'
  },
  {
    href: '/my/settings',
    icon: (<SettingsIcon fontSize="small" />),
    title: 'Settings'
  },
  {
    href: '/my/food_manager',
    icon: (<FastfoodIcon fontSize="small" />),
    title: 'Food & Nutrition'
  },
  {
    href: '/my/bulletin_board',
    icon: (<NotificationsIcon fontSize="small" />),
    title: 'Bulletin Board'
  },
  {
    href: '/my/transportation',
    icon: (<DirectionsBusIcon fontSize="small" />),
    title: 'Transportation'
  }
];
const employeeItems = [
  {
    href: '/my/documents',
    icon: (<InsertDriveFileIcon fontSize="small" />),
    title: 'Documents'
  },
  {
    href: '/my/dormitoryemp',
    icon: (<MapsHomeWorkIcon fontSize="small" />),
    title: 'Dormitory'
  },
]
const managerItems = [
  {
    href: '/my/hr_desk',
    icon: (<PeopleIcon fontSize="small" />),
    title: 'Human Resources'
  },
  {
    href: '/my/reports',
    icon: (<BarChartIcon fontSize="small" />),
    title: 'Financial Reports'
  },
]

export const DashboardSidebar = (props) => {
  const { user, open, onClose } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  });

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <a>
                <Logo
                  sx={{
                    height: 42,
                    width: 42
                  }}
                />
              </a>
          </Box>
        </div>
        <Box sx={{ flexGrow: 1 }}>
          {mainItems.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
          {(user?.role === "E") && (
						employeeItems.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          )))}
          {(user?.role === "C") && (
						managerItems.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          )))}
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            color: '#FFFFFF',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
