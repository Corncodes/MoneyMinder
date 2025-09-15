// Navigation component for the MoneyMinder React application
// This component provides a responsive navigation bar with drawer for mobile devices
// Handles authentication state and provides navigation links based on user login status

// import React from "react";
// import { NavLink } from 'react-router-dom';

// function Nav() {
// 	return (
//     <nav>
//       <div>
//         <NavLink to="/">Login Form </NavLink>
//         <NavLink to="/sign-up">Sign Up </NavLink>
//         <NavLink to="/budgets">Budgets List </NavLink>
//         <NavLink to="/test">Test Page</NavLink>
//       </div>
//     </nav>
//   );
// }

// export default Nav;

// Import React for state management
import * as React from "react";
import PropTypes from "prop-types";

// Import Material-UI components for responsive navigation
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// Import React Router components for navigation
import { Link } from "react-router-dom";

// Import authentication hooks
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import useToken from "@galvanize-inc/jwtdown-for-react";

// Import API wrapper for logout functionality
import { FetchWrapper } from './fetch-wrapper';

// Width of the mobile drawer
const drawerWidth = 240;

/**
 * Responsive navigation component with drawer for mobile devices
 * 
 * @param {Object} props - Component props
 * @param {Object} props.window - Window object for responsive behavior
 * @param {string} props.baseUrl - Base URL for API requests
 */
function DrawerAppBar(props) {
  const { window, baseUrl } = props;
  
  // State for mobile drawer open/close
  const [mobileOpen, setMobileOpen] = React.useState(false);
  
  // Get authentication token and logout function
  const { token } = useAuthContext();
  const FastAPI = new FetchWrapper(baseUrl);
  const { logout } = useToken();

  // Define navigation items based on authentication status
  let navItems = token
    ? [
        // Navigation items for authenticated users
        {
          name: "Test",
          url: "/test",
        },
        {
          name: "Budgets",
          url: "/budgets",
        },
        {
          name: "Account",
          url: "/account",
        },
      ]
    : [
        // Navigation items for unauthenticated users
        {
          name: "Home",
          url: "/",
        },
        {
          name: "Log In",
          url: "/",
        },
        {
          name: "Sign Up",
          url: "/sign-up",
        },
      ];

  /**
   * Toggle mobile drawer open/close state
   */
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  /**
   * Render the mobile drawer content
   */
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MoneyMinder
      </Typography>
      <Divider />
      <List>
        {/* Render navigation items as list */}
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <Link
                to={`${item.url}`}
                style={{ color: "#424242", textDecoration: "none" }}
              >
                <ListItemText
                  primary={item.name}
                />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
        {token &&(
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <Link
                to={'/'}
                style={{ color: "#424242", textDecoration: "none" }}
                onClick={() => logout()}
              >
                <ListItemText
                  primary={'Sign out'}
                />
              </Link>
            </ListItemButton>
          </ListItem>
        )}

      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: "#242424" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            MoneyMinder
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button key={item.name} sx={{ color: "#fff" }}>
                <Link
                  to={`${item.url}`}
                  style={{ color: "#ffffff", textDecoration: "none" }}
                >
                  {item.name}
                </Link>
              </Button>
            ))}

          {token && (
            <Button sx={{ color: "#fff" }}>
              <Link
                to={'/'}
                style={{ color: "#ffffff", textDecoration: "none" }}
                onClick={() => logout()}
              >
                {'Sign Out'}
              </Link>
            </Button>
          )}

          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
