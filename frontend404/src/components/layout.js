import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from "@mui/material/IconButton";
import Toolbar from '@mui/material/Toolbar';
import { Logout } from "@mui/icons-material";
import { mainListItems, secondaryListItems } from "./listItems";

const drawerWidth = 240;

export const MyAppBar = () => {
    return (
        <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
        >
            <Toolbar>
            <Typography
                component="h1"
                variant="h6"
                noWrap
                sx={{ flexGrow: 1 }}
            >
                User Name
            </Typography>
            <IconButton>
                <Logout />
            </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export const MyDrawer = () => {
    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <Toolbar />
            <Divider />
            <List component="nav">
                {mainListItems}
                <Divider sx={{ my: 1 }} />
                {secondaryListItems}
            </List>
        </Drawer>
    )
}