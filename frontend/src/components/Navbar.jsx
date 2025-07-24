import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  IconButton,
  AppBar,
  Typography,
  Box,
  Divider,
  useTheme,
  CssBaseline,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ListIcon from '@mui/icons-material/List';
import AddBoxIcon from '@mui/icons-material/AddBox';
import BarChartIcon from '@mui/icons-material/BarChart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

export default function SidebarNav({ onNavigate, user, setToken }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const navigate = useNavigate();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const drawerItems = [
    { text: 'Task List', icon: <ListIcon />, action: () => onNavigate('list') },
    ...(user?.role === 'Admin' ? [{
      text: 'Create Task', icon: <AddBoxIcon />, action: () => onNavigate('create')
    }] : []),
    { text: 'Analytics', icon: <BarChartIcon />, action: () => onNavigate('analytics') },
    { text: 'Notifications', icon: <NotificationsIcon />, action: () => onNavigate('notifications') },
    {
      text: 'Logout', icon: <LogoutIcon />, action: () => {
        setToken(null);
        localStorage.removeItem('token');
      }
    }
  ];

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap>
          Task Manager
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {drawerItems.map(({ text, icon, action }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={action}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Task Manager
            </Typography>
          </Box>

          {/* Avatar and Name */}
          {user && (
            <Box sx={{  alignItems: 'start' }}>
              <Tooltip title="Account settings">
                <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                  <Avatar src={user.avatarUrl}>{user.name[0]}</Avatar>
                </IconButton>
              </Tooltip>
              <Typography sx={{ ml: 1 }}>{user.name}</Typography>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => {
                    handleMenuClose();
  onNavigate('change-password');
}}>Change Password</MenuItem>
<MenuItem onClick={() => {
  handleMenuClose();
  onNavigate('update-profile');
}}>Update Profile Picture</MenuItem>


              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="menu folders">
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { width: drawerWidth }
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              backgroundColor: theme.palette.mode === 'dark' ? '#3c3b3bff' : undefined,
              color: theme.palette.mode === 'dark' ? '#ffffff' : undefined,
            }
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
