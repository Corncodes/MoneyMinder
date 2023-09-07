import { useEffect, useState } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useStore } from "../../ContextStore";
import { useNavigate, useParams } from 'react-router-dom';
import { FetchWrapper } from '../../fetch-wrapper';
import { CircularProgress } from "@mui/material";

import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Grid from "@mui/material/Grid";
import EditIcon from '@mui/icons-material/Edit';
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";


const AccountView = ({ baseUrl }) => {
	const { token } = useAuthContext()
  	const { id } = useParams()
	const { budgetsData } = useStore()
	const FastAPI = new FetchWrapper(baseUrl)
  	const [budget, setBudget] = useState([])
	const navigate = useNavigate()
  	const [decodedToken, setDecodedToken] = useState('')
	const [accountData, setAccountData] = useState({})

  const parseJwt = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

	const getAccountData = async (email) => {
			const data = await FastAPI.get(`/api/accounts/${email}`, token)
			setAccountData(data)
	}

  useEffect(() => {
    if (token) {
      setDecodedToken(parseJwt(token))
    }
  }, [token])

	useEffect(() => {
		if (Object.keys(decodedToken).length) {
			getAccountData(decodedToken.account.email)
		}
	}, [decodedToken])


if (Object.keys(accountData).length) {
		return (
			<>
        <Container component="main" maxWidth="sm">
          <Box
            sx={{
              mt: 1,
			  mb: 5,
			  fontSize: 'large',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#242424', justifyContent: 'center' }}>
                <AccountCircleIcon />
            </Avatar>
		    <Typography variant="h6">
              Account Info
            </Typography>
			</Box>
			<Grid container direction="column">
				<Grid item xs={4}>
					<Typography variant='h3'>Howdy, {accountData.first_name}</Typography>
				</Grid>
				<Grid item xs={4}>
					<Typography>First name: {accountData.first_name}</Typography>
				</Grid>
				<Grid item xs={4}>
					<Typography>Last name: {accountData.last_name}</Typography>
				</Grid>
				<Grid item xs={4}>
					<Typography>Email: {accountData.email}</Typography>
				</Grid>
			</Grid>
			</Container>
			</>
		);
	} else {
		return (
			<p>Loading.............</p>
		)
	}
}

	export default AccountView;
