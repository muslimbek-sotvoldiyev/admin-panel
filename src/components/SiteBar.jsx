import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  CssBaseline,
  Box,
} from "@mui/material";
import { Menu as MenuIcon, Home, Group } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const NAV_ITEMS = [
  { title: "Bosh sahifa", icon: <Home />, path: "/" },
  { title: "Services", icon: <Group />, path: "/services" },
];

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            <span className="select-none"> Hospital</span>
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        open={isDrawerOpen}
        sx={{
          width: isDrawerOpen ? 240 : 70,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isDrawerOpen ? 240 : 70,
            transition: "width 0.3s",
            overflowX: "hidden",
          },
        }}
      >
        <Toolbar />
        <List>
          {NAV_ITEMS.map((item, index) => (
            <ListItem
              button="true"
              component="button"
              key={index}
              onClick={() => handleNavigate(item.path)}
              sx={{
                display: "flex",
                justifyContent: isDrawerOpen ? "flex-start" : "center",
                padding: "10px 16px",
              }}
            >
              <ListItemIcon sx={{ justifyContent: "center" }}>
                {item.icon}
              </ListItemIcon>
              {isDrawerOpen && <ListItemText primary={item.title} />}
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default Navbar;
