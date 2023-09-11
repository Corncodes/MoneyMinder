import { useState } from 'react';
import { FetchWrapper } from '../../fetch-wrapper';
import useToken from '@galvanize-inc/jwtdown-for-react';
import { useNavigate } from 'react-router-dom';

// Material Imports
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import WalletOutlinedIcon from '@mui/icons-material/WalletOutlined';
import Typography from "@mui/material/Typography";
import { CssBaseline } from '@mui/material';
import Container from "@mui/material/Container";
import Copyright from '../ui/Copyright';

const CreateAccountForm = ({ baseUrl }) => {
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const { login } = useToken()
const navigate = useNavigate()
const FastAPI = new FetchWrapper(baseUrl)

const handleFirstName = (e) => {
    setFirstName(e.target.value);
    };

const handleLastName = (e) => {
    setLastName(e.target.value);
    };

const handleEmail = (e) => {
    setEmail(e.target.value);
    };

const handlePassword = (e) => {
    setPassword(e.target.value);
    };

const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {}
    body.email = email
    body.password = password
    body.first_name = firstName
    body.last_name = lastName

    const data = await FastAPI.post('/api/accounts', body)
    login(email, password)
    navigate('/budgets')
    setEmail('')
    setPassword('')
    setFirstName('')
    setLastName('')
};

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#242424" }}>
          <WalletOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box
          component="form"
          onSubmit={(e) => handleSubmit(e)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={handleFirstName}
                value={firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                onChange={handleLastName}
                value={lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleEmail}
                value={email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={handlePassword}
                value={password}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: "#242424" }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}

export default CreateAccountForm;
