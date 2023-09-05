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
import Grid from "@mui/material/Grid";
import { IconButton } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";


const BudgetList = ({ baseUrl }) => {
	const FastAPI = new FetchWrapper(baseUrl)
	const { token } = useAuthContext()
	const { budgetsData, setBudgetsData } = useStore()
	const navigate = useNavigate()


	const [expanded, setExpanded] = React.useState("");

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };


	const handleClick = () => {
		navigate('/budgets/new')
	}

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


const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));



  if (token) {
  return (
    <>
    <Container component="main" maxWidth="sm">
    <div style={{ marginBottom: "20px"}}>
		{budgetsData.map((budget) => (
			<Accordion
			sx={{ mt: 1, mb: 1 }}
			key={budget.id}
			expanded={expanded === `panel${budget.id}`}
			onChange={handleChange(`panel${budget.id}`)}
			>
			<AccordionSummary aria-controls={`panel${budget.id}-content`} id={`panel${budget.id}-header`}>
            <Typography>{budget.name}</Typography>
          </AccordionSummary>
			<AccordionDetails>
            <Typography>
				Monthly Income
			</Typography>
			<Typography sx={{ fontWeight: "bold" }}>
				{budget.monthly_income?.toLocaleString("en-US", {style:"currency", currency:"USD"})}
			</Typography>
			<Typography>
				Total Spent
			</Typography>
			<Typography sx={{ fontWeight: "bold" }}>
				{budget.monthly_spending_total?.toLocaleString("en-US", {style:"currency", currency:"USD"})}		
			</Typography>
			<Typography>
				Remaining
			</Typography>
			<Typography sx={{ fontWeight: "bold" }}>
				{budget.monthly_balance?.toLocaleString("en-US", {style:"currency", currency:"USD"})}				
			</Typography>
			<Button variant="contained" startIcon={<StarBorder/>}>Primary Budget</Button>
			<Button variant="contained" startIcon={<EditIcon/>}onClick={() => deleteBudget(budget.id)}>Edit Budget</Button>
            <Button variant="contained" startIcon={<DeleteForeverIcon/>}onClick={() => deleteBudget(budget.id)}>Delete Budget</Button>
          </AccordionDetails>
			</Accordion>
		))}

    </div>
      <Card onClick={handleClick} variant="outlined" sx={{ 
          
          ':hover': {
              boxShadow: 5,
              cursor: 'pointer',
			},
        }}>
        <CardContent>
          <Grid container justifyContent="center" alignItems="center" direction="column">
          <IconButton onClick={handleClick} aria-label="create" size="large">
			<AddIcon />
          </IconButton>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Create A Budget</Typography>
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
