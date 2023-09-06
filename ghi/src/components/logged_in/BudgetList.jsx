// background: linear-gradient(145deg, #FFFFFF, #B3B5B8);
// border-radius: 57%;
// box-shadow: 13.81px 13.81px 63px #ABADB0, -13.81px -13.81px 63px #FFFFFF;
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginForm from "../logged_out/LoginForm";
import CreateBudgetForm from "../logged_in/CreateBudgetForm";
import { useStore } from "../../ContextStore";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { FetchWrapper } from '../../fetch-wrapper';


import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Star from "@mui/icons-material/Star";
import StarBorder from "@mui/icons-material/StarBorder";
import WalletOutlinedIcon from '@mui/icons-material/WalletOutlined';
import Grid from "@mui/material/Grid";
import { IconButton } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { Divider } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";


import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { styled } from "@mui/material/styles";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";


const BudgetList = ({ baseUrl }) => {
	const FastAPI = new FetchWrapper(baseUrl)
	const { token } = useAuthContext()
	const { budgetsData, setBudgetsData } = useStore()
	const navigate = useNavigate()
	const [isPrimaryBudget, setIsPrimaryBudget] = useState(false)


	const [expanded, setExpanded] = React.useState("");

    const handleChange = (card) => (event, newExpanded) => {
        setExpanded(newExpanded ? card : false);
    };


	const handleClick = () => {
		navigate('/budgets/new')
	}

	const handlePrimary = (id) => {
		FastAPI.put(`/api/budgets/${id}`, token)
		setIsPrimaryBudget(!isPrimaryBudget);
	};

	const getData = async () => {
		const data = await FastAPI.get('/api/budgets', token)
		setBudgetsData(data.budgets)
	}

	useEffect(() => {
		token && getData()
	}, [token])

	const deleteBudget = async (id) => {
		setBudgetsData(budgetsData.filter(budget => budget.id !== id))
		const data = await FastAPI.delete(`/api/budgets/${id}`, token)
	}

	const editBudget = async (id) => {
		setBudgetsData(budgetsData.filter(budget => budget.id !== id))
		const data = await FastAPI.put(`/api/budgets/${id}`, token)
		window.location.href = `/api/budgets/${id}`;
	}	



	
  if (token) {
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
            <WalletOutlinedIcon />
        </Avatar>
		    <Typography component="h1" variant="h5">
              Budgets
            </Typography>
		</Box>
    <div style={{ marginBottom: "20px"}}>
		{budgetsData.map((budget) => (
			<Accordion
			sx={{ mt: 2, mb: 2 }}
			key={budget.id}
			expanded={expanded === `card${budget.id}`}
			onChange={handleChange(`card${budget.id}`)}
			>
			
			<AccordionSummary 
			expandIcon={<ArrowDropDownIcon />} 
			aria-controls={`card${budget.id}-content`} 
			id={`card${budget.id}-header`}
			sx={{ backgroundColor: '#B4D3B2'}}
			>
            <Typography variant="h6">{budget.name}</Typography>
          </AccordionSummary>
		  			<Grid item>
						<Button onClick={handlePrimary}>{isPrimaryBudget ? <Star /> : <StarBorder /> }</Button>
					</Grid>
			<AccordionDetails>
				<Grid 
				container 
				direction="row"
				justifyContent="center"
				alignItems='center'
				sx={{ mt: 4 }}>
					<Grid item xs={4}>
						<Typography variant="overline" noWrap>Monthly Income</Typography>
						<Typography variant="body1" sx={{fontWeight: "bold" }}>
						{budget.monthly_income?.toLocaleString("en-US", {
							style: "currency",
							currency: "USD",
						})}
						</Typography>

					</Grid>
					<Grid item xs={4}>
						<Typography variant="overline" noWrap>Total Spent</Typography>
						<Typography variant="body1" sx={{ fontWeight: "bold" }}>
						{budget.monthly_spending_total?.toLocaleString("en-US", {
							style: "currency",
							currency: "USD",
						})}
						</Typography>
					</Grid>
					<Grid item xs={2.5}>
						<Typography variant="overline" noWrap>Remaining</Typography>
						<Typography variant="body1" sx={{ fontWeight: "bold" }}>
						{budget.monthly_balance?.toLocaleString("en-US", {
							style: "currency",
							currency: "USD",
						})}
						</Typography>
					</Grid>
				</Grid>
				
			<Grid 
				container spacing={5} 
				justifyContent="center"
				sx={{ mt: 2, mb: 3 }}>
				<Grid item>
					<Button variant="contained" color="warning" size="small" startIcon={<EditIcon/>}onClick={() => editBudget(budget.id)}>Edit Budget</Button>
				</Grid>
				<Grid item>
					<Button variant="contained" color="error" size="small" startIcon={<DeleteForeverIcon/>}onClick={() => deleteBudget(budget.id)}>Delete Budget</Button>
				</Grid>
			</Grid>
          </AccordionDetails>
			</Accordion>
		))}

    </div>
      <Card onClick={handleClick} variant="outlined" sx={{ borderRadius: '20px', border: '1px solid #242424', mb: 6, mt: 8,
          
          ':hover': {
              boxShadow: 5,
              cursor: 'pointer',
			},
        }}>
        <CardContent>
          <Grid container justifyContent="center" alignItems="center" direction="column">
          <IconButton onClick={handleClick} aria-label="create" size="large">
			<AddIcon fontSize='large' />
          </IconButton>
          <Typography variant="overline" sx={{ fontWeight: 'bold'}}>Create A Budget</Typography>
          </Grid>
        </CardContent>
      </Card>
    </Container>
    </>
  );

	} else {
		return (
			<LoginForm />
		)
	}
}

export default BudgetList;
