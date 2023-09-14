import { useEffect, useState } from "react";
import { useStore } from "../../ContextStore";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { FetchWrapper } from '../../fetch-wrapper';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { Divider } from '@mui/material';
import Avatar from "@mui/material/Avatar";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DoneIcon from '@mui/icons-material/Done';
import AddIcon from '@mui/icons-material/Add';
import WalletOutlinedIcon from '@mui/icons-material/WalletOutlined';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import CancelIcon from '@mui/icons-material/Cancel';
import AnimatedNumbers from 'react-animated-numbers';


const ReconfigureBudget = ({ updatedBudget, baseUrl, setBudgetCreated}) => {
  const [expenseItems, setExpenseItems] = useState(updatedBudget.expenses)
  const [keyCounter, setKeyCounter] = useState(0)
	const [totalSpending, setTotalSpending] = useState(updatedBudget.monthly_spending_total)
	const [startingExpenseIds, setStartingExpenseIds] = useState(updatedBudget.expenses.map(expense => expense.expense_id))
	const { token } = useAuthContext()
	const { setBudgetsData } = useStore()
	const FastAPI = new FetchWrapper(baseUrl)
	const navigate = useNavigate()

	useEffect(() => {
		if (updatedBudget.expenses.length > 0) {
			setKeyCounter(updatedBudget.expenses[updatedBudget.expenses.length - 1].expense_id + 1)
		}
	}, [])

  const addExpense = () => {
  setKeyCounter(keyCounter => keyCounter += 1)
    setExpenseItems([...expenseItems, {
      expense_name: '',
      amount: 0,
      expense_id: keyCounter
    }])
  }

	const deleteExpense = async (id) => {
		let updatedExpenseItems = expenseItems.filter((expense) => expense.expense_id !== id)
		setExpenseItems(updatedExpenseItems)
		let spend = 0
		for (const expense of updatedExpenseItems) {
			spend += parseInt(expense.amount)
		}
		setTotalSpending(spend)
		if (startingExpenseIds.includes(id)) {
			await FastAPI.delete(`/api/expenses/${id}`, token)
		}
	}

    const handleExpenseNameChange = (e, index) => {
		let updatedExpenseItems = [...expenseItems]
      updatedExpenseItems[index].expense_name = e.target.value
      setExpenseItems(updatedExpenseItems)
    }

    const handleExpenseAmountChange = (e, index) => {
      let updatedExpenseItems = [...expenseItems]
      updatedExpenseItems[index].amount = e.target.value
      setExpenseItems(updatedExpenseItems)
      let spend = 0
      for (const expense of updatedExpenseItems) {
        const trimmedAmount = String(expense.amount).trim();
        if (trimmedAmount !== '') {
          spend += parseInt(trimmedAmount);
      }}
      setTotalSpending(spend);
    }

	const submit = async (e) => {
		e.preventDefault();
		for (let expense of expenseItems) {
			if (startingExpenseIds.includes(expense.expense_id)) {
				let expenseBody = {}
				expenseBody.expense_name = expense.expense_name
				expenseBody.amount = parseInt(expense.amount)
				expenseBody.budget_id = updatedBudget.id
				expenseBody.ordering = 0
				await FastAPI.put(`/api/expenses/${expense.expense_id}`, expenseBody, token)
			} else {
				let expenseBody = {}
				expenseBody.expense_name = expense.expense_name
				expenseBody.amount = parseInt(expense.amount)
				expenseBody.budget_id = updatedBudget.id
				await FastAPI.post('/api/expenses', expenseBody, token)
			}
		}
		let budgetBody = {}
		budgetBody.name = updatedBudget.name
		budgetBody.monthly_income = updatedBudget.monthly_income
		budgetBody.primary_budget = updatedBudget.primary_budget
		budgetBody.complete = true
		budgetBody.monthly_spending_total = totalSpending
		budgetBody.monthly_balance = updatedBudget.monthly_income - totalSpending
		await FastAPI.put(`/api/budgets/${updatedBudget.id}`, budgetBody, token)
	}

	const handleSubmit = async (e) => {
		await submit(e)
		const data = await FastAPI.get(`/api/budgets`, token)
		setBudgetsData(data.budgets)
		navigate(`/budgets/${updatedBudget.id}`)
	}

	const handleCancel = async (e) => {
		navigate(`/budgets/${updatedBudget.id}`)
	}

  return (
		<Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          mt: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main', justifyContent: 'center' }}>
          <WalletOutlinedIcon />
        </Avatar>
        <Grid container direction='column' alignItems='center' justify='center'>
          <Typography 
            variant="h6" 
            sx={{ fontWeight: "bold" }}
          >
            {updatedBudget.name}
          </Typography>
          <Typography 
          variant="overline"
          >
            Total Spending
          </Typography>
          <Grid container direction="row" justifyContent="center" alignItems="center">
            <Typography variant="h6">$</Typography>
          <Typography variant='h5'>
          <AnimatedNumbers 
          animateToNumber={totalSpending}
          includeComma
          locale="en-us"
          configs={[
            { mass: 1, tension: 220, friction: 100 },
            { mass: 1, tension: 180, friction: 130 },
            { mass: 1, tension: 280, friction: 90 },
            { mass: 1, tension: 180, friction: 135 },
            { mass: 1, tension: 260, friction: 100 },
            { mass: 1, tension: 210, friction: 180 },
          ]}
          />
          </Typography>
          </Grid>
          <Typography 
          variant="overline"
          >
            Remaining
          </Typography>
          <Grid container direction="row" justifyContent="center" alignItems="center">
            <Typography variant="h6">$ </Typography>
          <Typography variant='h5'>
          <AnimatedNumbers 
          animateToNumber={updatedBudget.monthly_income - totalSpending}
          locale="en-US"
          includeComma
          configs={[
            { mass: 1, tension: 220, friction: 100 },
            { mass: 1, tension: 180, friction: 130 },
            { mass: 1, tension: 280, friction: 90 },
            { mass: 1, tension: 180, friction: 135 },
            { mass: 1, tension: 260, friction: 100 },
            { mass: 1, tension: 210, friction: 180 },
          ]}
          />
          </Typography>
          </Grid>
        </Grid>
        {expenseItems.length === 0 ? (
        <Typography variant="overline">Get Started Below!</Typography>
        ) : (
          expenseItems.map((expense, index) => (
          <div key={index}>
            <Box component="form" sx={{ mt: 1 , alignItems: 'center'}}>
              <TextField
              margin="normal"
              label="Expense Name"
              variant="outlined"
              fullWidth
              inputProps={{ maxLength: 20 }}
              onChange={(e) => handleExpenseNameChange(e, index)}
              value={expenseItems[index].expense_name}
              type="text"
              required
              />
              <TextField
              margin="normal"
              label="Expense Amount"
              variant="outlined"
              fullWidth
              onChange={(e) => handleExpenseAmountChange(e, index)}
              value={expenseItems[index].amount}
              type="number"
              inputProps={{ min: '0' }}
              required
              />
              <Box textAlign="center">
                <Button
                variant="contained"
                startIcon={<DeleteForeverIcon/>}
                color="warning"
                size="small"
                sx={{ mt: 2, mb: 3 }}
                onClick={() => deleteExpense(expense.expense_id)}
                >
                  Delete Expense
                </Button>
              </Box>
            </Box>
            <Divider />
          </div>
          ))
        )}
        <Card sx={{ mt: 2, border: "none", boxShadow: "none", bgcolor: "background.default"}}>
          <Button 
          variant="contained"
          color="secondary"
          startIcon={<AddIcon/>} 
          fullWidth
          sx={{ mt: 2, mb: 2 }}
          onClick={() => addExpense()}
          >
            Expense
          </Button>
          <Button 
          variant="outlined" 
          color="warning"
          fullWidth
          sx={{ mt: 2, mb: 2 }}
          startIcon={<KeyboardReturnIcon />} 
          onClick={() => setBudgetCreated(false)}
          >
            Return
          </Button>
          <Button
          variant="contained" 
          color="primary" 
          fullWidth
          sx={{ mt: 2, mb: 2 }}
          startIcon={<DoneIcon/>}
          onClick={(e) => handleSubmit(e)}
          >
            Submit
          </Button>
          <Button
          variant="text" 
          color="warning" 
          fullWidth
          sx={{ mt: 2, mb: 8}}
          startIcon={<CancelIcon/>}
          onClick={(e) => handleCancel(e)}
          >
            Cancel
          </Button>
        </Card>
      </Box>
		</Container>
  );
}

export default ReconfigureBudget;
