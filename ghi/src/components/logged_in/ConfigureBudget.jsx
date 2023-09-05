import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DoneIcon from '@mui/icons-material/Done';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';

import { useStore } from '../../ContextStore';
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';
import { FetchWrapper } from '../../fetch-wrapper';
import { useNavigate } from 'react-router-dom';

const ConfigureBudget = ({ createdBudget, baseUrl }) => {
  const [expenseItems, setExpenseItems] = useState([]);
  const [keyCounter, setKeyCounter] = useState(0);
  const [totalSpending, setTotalSpending] = useState(0);
  const { token } = useAuthContext();
  const { setBudgetsData } = useStore();
  const availableSpend = createdBudget.monthly_income;
  const FastAPI = new FetchWrapper(baseUrl);
  const navigate = useNavigate();

  const addExpense = () => {
    setExpenseItems([...expenseItems, { expenseName: '', expenseAmount: 0, key: keyCounter }]);
    setKeyCounter((keyCounter) => keyCounter + 1);
  };

  const deleteExpense = (index) => {
    let updatedExpenseItems = expenseItems.filter((expense) => expense.key !== index);
    setExpenseItems(updatedExpenseItems);
    let spend = 0;
    for (const expense of updatedExpenseItems) {
      spend += parseInt(expense.expenseAmount);
    }
    setTotalSpending(spend);
  };

  const handleExpenseNameChange = (e, index) => {
    let updatedExpenseItems = [...expenseItems];
    updatedExpenseItems[index].expenseName = e.target.value;
    setExpenseItems(updatedExpenseItems);
  };

  const handleExpenseAmountChange = (e, index) => {
    let updatedExpenseItems = [...expenseItems];
    updatedExpenseItems[index].expenseAmount = e.target.value;
    setExpenseItems(updatedExpenseItems);
    let spend = 0;
    for (const expense of updatedExpenseItems) {
      spend += parseInt(expense.expenseAmount);
    }
    setTotalSpending(spend);
  };

  const handleSubmitOrSave = async (e, completed) => {
    e.preventDefault();
    for (let expense of expenseItems) {
      let expenseBody = {};
      expenseBody.expense_name = expense.expenseName;
      expenseBody.amount = parseInt(expense.expenseAmount);
      expenseBody.budget_id = createdBudget.id;
      const expenseData = await FastAPI.post('/api/expenses', expenseBody, token);
    }
    let budgetBody = {};
    budgetBody.name = createdBudget.name;
    budgetBody.monthly_income = createdBudget.monthly_income;
    budgetBody.primary_budget = createdBudget.primary_budget;
    budgetBody.complete = completed;
    budgetBody.monthly_spending_total = totalSpending;
    budgetBody.monthly_balance = availableSpend - totalSpending;
    const budgetData = await FastAPI.put(`/api/budgets/${createdBudget.id}`, budgetBody, token);
  };

  const handleSubmit = async (e) => {
    handleSubmitOrSave(e, true);
    const data = await FastAPI.get(`/api/budgets`, token);
    setBudgetsData(data.budgets);
    navigate(`/budgets/${createdBudget.id}`);
  };

  const handleSave = (e) => {
    handleSubmitOrSave(e, false);
    navigate('/budgets');
  };

  return (
		<Container component="main" maxWidth="sm">
		<CssBaseline />
          <Box
            sx={{
              marginTop: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
		<Typography variant="h3" sx={{ fontWeight: "bold" }}> {createdBudget.name}</Typography>
		<Typography variant="h5">Available Spend</Typography>
		<Typography variant="h3" sx={{ fontWeight: "bold" }}>{(availableSpend - totalSpending).toLocaleString("en-US", {style:"currency", currency:"USD"})}</Typography>
		<Typography variant="h5">Total Spend</Typography>
		<Typography variant="h3" sx={{ fontWeight: "bold" }}>{totalSpending?.toLocaleString("en-US", {style:"currency", currency:"USD"})}</Typography>
		{expenseItems.length === 0 ? (
			<Typography variant="body1">Get Started Below!</Typography>
		) : (
			expenseItems.map((expense, index) => (
			<div key={index}>
				<Box component="form" sx={{ mt: 1 }}>
				<TextField
				margin="normal"
				label="Expense Name"
				variant="outlined"
				fullWidth
				onChange={(e) => handleExpenseNameChange(e, index)}
				value={expenseItems[index].expenseName}
				type="text"
				required
				/>
				<TextField
				margin="normal"
				label="Expense Amount"
				variant="outlined"
				fullWidth
				onChange={(e) => handleExpenseAmountChange(e, index)}
				value={expenseItems[index].expenseAmount}
				type="number"
				inputProps={{ min: '0' }}
				required
				/>
				<Grid container justify="center">
					<Button
					variant="contained"
					startIcon={<DeleteForeverIcon/>}
					color="error"
					size="small"
					sx={{ mt: 2, mb: 4 }}
					onClick={() => deleteExpense(expense.key)}
					>
					Delete Expense
					</Button>
				</Grid>
			</Box>
			</div>
			))
		)}



				<Button 
				variant="outlined"
				startIcon={<AddIcon/>} 
				fullWidth
				sx={{ mt: 2, mb: 2 }}
				onClick={() => addExpense()}>
					Expense
				</Button>


				<Button 
				variant="outlined" 
				color="warning"
				fullWidth
				sx={{ mt: 2, mb: 2 }}
				startIcon={<SaveIcon/>} 
				onClick={(e) => handleSave(e)}>
					Save & Exit
				</Button>


				<Button
				variant="contained" 
				color="success" 
				fullWidth
				sx={{ mt: 2, mb: 2, backgroundColor: "#242424" }}
				startIcon={<DoneIcon/>}
				onClick={(e) => handleSubmit(e)}>
				Submit
				</Button>




				
			</Box>
		</Container>



  );
};

export default ConfigureBudget;
