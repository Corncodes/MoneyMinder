// BudgetList component for the MoneyMinder React application
// This component displays all user budgets in a list format with options to view, edit, and delete
// Uses Material-UI components for consistent styling and user experience

import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginForm from "../logged_out/LoginForm";
import { useStore } from "../../ContextStore";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { FetchWrapper } from '../../fetch-wrapper';

// Import React for state management
import * as React from "react";

// Import Material-UI components for layout and styling
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Star from "@mui/icons-material/Star";
import StarBorder from "@mui/icons-material/StarBorder";
import WalletOutlinedIcon from '@mui/icons-material/WalletOutlined';
import Grid from "@mui/material/Grid";
import { IconButton } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import Paper from '@mui/material/Paper';

// Import Material-UI typography and layout components
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

// Import Material-UI accordion components for expandable budget details
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

/**
 * BudgetList component that displays all user budgets
 * 
 * @param {Object} props - Component props
 * @param {string} props.baseUrl - Base URL for API requests
 */
const BudgetList = ({ baseUrl }) => {
	// Initialize API wrapper and get authentication token
	const FastAPI = new FetchWrapper(baseUrl);
	const { token } = useAuthContext();
	
	// Get budgets data from global context store
	const { budgetsData, setBudgetsData } = useStore();
	
	// Navigation hook for programmatic routing
	const navigate = useNavigate();
	
	// Local state for UI interactions
	const [isPrimaryBudget, setIsPrimaryBudget] = useState(false);
	const [expanded, setExpanded] = React.useState("");

	/**
	 * Fetch all budgets from the API and sort them by primary status
	 * Primary budgets are displayed first in the list
	 */
	const getData = async () => {
		const data = await FastAPI.get('/api/budgets', token)
		let sortedBudgetsData = [];
		for (let budget of data.budgets) {
			if (budget.primary_budget) {
				sortedBudgetsData.unshift(budget);  // Primary budgets first
			} else {
				sortedBudgetsData.push(budget);     // Other budgets after
			}
		}
		setBudgetsData(sortedBudgetsData)
	}

	// Fetch budgets when component mounts or token changes
	useEffect(() => {
		if (token) {getData()}
	}, [token])

	/**
	 * Delete a budget from the database and update local state
	 * 
	 * @param {number} id - ID of the budget to delete
	 */
	const deleteBudget = async (id) => {
		// Optimistically update UI by removing from local state
		setBudgetsData(budgetsData.filter(budget => budget.id !== id))
		// Make API call to delete from database
		await FastAPI.delete(`/api/budgets/${id}`, token)
	}

	/**
	 * Navigate to the detailed view of a specific budget
	 * 
	 * @param {number} id - ID of the budget to view
	 */
	const viewBudget = (id) => {
		navigate(`/budgets/${id}`)
	}

	/**
	 * Navigate to the create new budget form
	 */
	const handleClick = () => {
		navigate('/budgets/new')
	}

	/**
	 * Handle accordion expansion state changes
	 * 
	 * @param {string} card - ID of the accordion card
	 * @returns {Function} Event handler for accordion changes
	 */
	const handleChange = (card) => (event, newExpanded) => {
		setExpanded(newExpanded ? card : false);
	}

	// Render the budget list interface
	return (
		<>
		<Container component="main" maxWidth="xs">
			{/* Header section with wallet icon and title */}
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
				<Avatar sx={{ m: 1, bgcolor: '#242424'}}>
					<WalletOutlinedIcon />
				</Avatar>
				<Typography variant="h6">
					Budgets
				</Typography>
			</Box>
			
			{/* Budget list container */}
			<div style={{ marginBottom: "20px"}}>
				{budgetsData.map((budget) => (
        <Accordion
        sx={{ mt: 2, mb: 2 }}
        key={budget.id}
        expanded={expanded === `card${budget.id}`}
        onChange={handleChange(`card${budget.id}`)}
        >
          <Paper elevation={4}>
            <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls={`card${budget.id}-content`}
            id={`card${budget.id}-header`}
            >
              <Typography variant="body1">{budget.name}</Typography>
            </AccordionSummary>
          </Paper>
          <AccordionDetails>
            <Grid 
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 2}}
            >
              <Grid item align="center">
                <Typography variant="body1" noWrap>Monthly Income</Typography>
                <Typography variant="body1" sx={{fontWeight: "bold" }}>
                  {budget.monthly_income?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
					minimumFractionDigits: 0,
    				maximumFractionDigits: 0,
                    })}
                </Typography>
              </Grid>
            </Grid>
            <Grid>
              <Divider sx={{ mt: 2}}/>
            </Grid>
            <Grid 
            container 
            direction="row"
            justifyContent="space-evenly"
            align="center"
            sx={{ mt: 2 }}
            >
              <Grid item>
                <Typography variant="body1" noWrap>Total Spent</Typography>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  {budget.monthly_spending_total?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
					minimumFractionDigits: 0,
    				maximumFractionDigits: 0,
                  })}
                </Typography>
              </Grid>
              <Divider orientation="vertical" flexItem  />
              <Grid item >
                <Typography variant="body1">Remaining</Typography>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  {budget.monthly_balance?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
					minimumFractionDigits: 0,
    				maximumFractionDigits: 0,

                  })}
                </Typography>
              </Grid>
            </Grid>
            <Grid 
            container
            direction="row"
            justifyContent="space-between"
            align="center"
            sx={{ mt: 4, mb: 2 }}
            >
              <Grid item>
                <Button variant="contained" color="error" size="medium" startIcon={<DeleteForeverIcon/>}onClick={() => deleteBudget(budget.id)}>Delete Budget</Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="warning" size="medium" startIcon={<VisibilityIcon />}onClick={() => viewBudget(budget.id)}>View Budget</Button>
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
      }}
      >
        <CardContent>
          <Grid container align="center" direction="column" sx={{mt: 2}}>
            <Grid>
            <AddIcon fontSize='large' />
            </Grid>
            <Typography variant="overline" sx={{ fontWeight: 'bold'}}>Create A Budget</Typography>
          </Grid>
        </CardContent>
      </Card>
    </Container>
    </>
  );
}

export default BudgetList;
