import { useEffect, useState } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useStore } from "../../ContextStore";
import { useNavigate, useParams } from 'react-router-dom';
import { FetchWrapper } from '../../fetch-wrapper';

import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Divider } from "@mui/material";
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';


const AccountView = ({ baseUrl }) => {
	const { token } = useAuthContext()
	const FastAPI = new FetchWrapper(baseUrl)
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

				<Grid 
				container 
				sx={{ 
					mt: 4, 
					mb: 4,
					justifyContent: 'center',
					alignItems: 'center'}}>
					<Typography variant='h4'>Howdy, {accountData.first_name}!</Typography>
				</Grid>
				<Paper elevation={4}>
				<Grid 
				container 
				direction="column">

					<Grid item sx={{ mt: 4, mb: 4, ml: 4}}>
						<Typography variant='overline'>First Name: </Typography>

						<Typography variant='h6'>{accountData.first_name}</Typography>
					</Grid>
					<Divider />
					<Grid item sx={{ mt: 4, mb: 4, ml: 4}}>
						<Typography variant='overline'>Last Name: </Typography>

						<Typography variant='h6'>{accountData.last_name}</Typography>
					</Grid>
					<Divider />
					<Grid item sx={{ mt: 4, mb: 4, ml: 4}}>
						<Typography variant='overline'>Email: </Typography>

						<Typography variant='h6'>{accountData.email}</Typography>
					</Grid>
				</Grid>
			</Paper>
			<Grid 
			container
			sx={{mt: 8, mb: 8, justifyContent: 'center', alignItems: 'center'}}>
				<Button 
				variant="contained" 
				color="warning"
				size="large"
				sx={{ mt: 2, mb: 2 }}
				startIcon={<KeyboardReturnIcon />} 
				onClick={() => navigate(`/budgets/`)}>
				Return
				</Button>
			</Grid>
			</Container>
			</>
		);
	} 
}

	export default AccountView;
