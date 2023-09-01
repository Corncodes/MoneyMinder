import useToken from "@galvanize-inc/jwtdown-for-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useStore } from "../../ContextStore";
import { useNavigate } from "react-router-dom";

// Material Imports
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import WalletOutlinedIcon from '@mui/icons-material/WalletOutlined';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "../ui/Copyright";

// const defaultTheme = createTheme();

const LoginForm = () => {
    const store = useStore()
    const { login } = useToken();

    const navigate = useNavigate()
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        login(data.get('email'), data.get('password'));
        navigate('/budgets')
        e.target.reset()
    };


      return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#242424' }}>
              <WalletOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <Box component="form" onSubmit={(e) => handleSubmit(e)} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 3, mb: 2, backgroundColor: "#242424" }}
              >
                Sign In
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link href="/sign-up" variant="body2">
                    {"Don't have an account? Sign Up!"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    //   </ThemeProvider>
    );
}
export default LoginForm;
