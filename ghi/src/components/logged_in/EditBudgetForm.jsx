import { useState, useEffect } from 'react';
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { FetchWrapper } from '../../fetch-wrapper';
import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from "../../ContextStore";
import ReconfigureBudget from './ReconfigureBudget.jsx'
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from '../ui/Copyright';


const EditBudgetForm = ({ baseUrl }) => {
  const { id } = useParams()
	const [budgetName, setBudgetName] = useState('');
	const [monthlyIncome, setMonthlyIncome] = useState('');
	const [budgetCreated, setBudgetCreated] = useState(false)
  const [budget, setBudget] = useState({name: '', monthly_income: 0})
	const [input, setInput] = useState('');
  const { token } = useAuthContext()
	const { budgetsData, setBudgetsData } = useStore()
  const navigate = useNavigate()
	const FastAPI = new FetchWrapper(baseUrl)

  const getBudgetData = async () => {
    const data = await FastAPI.get(`/api/budgets/${id}`, token)
    setBudget(data);
  }

  useEffect(() => {
    if (budgetsData.length == 0 && token) {
      getBudgetData()
    } else if (budgetsData.length > 0) {
      setBudget([...budgetsData].filter( b => b.id == id)[0])
      }
    }, [token])

	const handleBudgetNameChange = (e) => {
    let updatedBudget = {...budget, name: e.target.value}
	  setBudget(updatedBudget);
	};

	const handleMonthlyIncomeChange = (e) => {
    let updatedBudget = {...budget, monthly_income: e.target.value}
	  setBudget(updatedBudget);
	};

	const handleFirstSubmit = async (e) => {
		e.preventDefault();

    const {account_id, expenses, id, ...body} = budget
		await FastAPI.put(`/api/budgets/${id}`, body, token)
		setBudgetCreated(true)
	};

	if (!budgetCreated) {
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
            <Typography component="h1" variant="h5">
              Edit Budget
            </Typography>
            <Box component="form" onSubmit={(e) => handleFirstSubmit(e)} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="budgetName"
                label="Budget Name"
                name="Budget Name"
                onChange={handleBudgetNameChange}
                value={budget.name}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="Monthly Income"
                label="Monthly Income"
                type="number"
                id="monthlyIncome"
                onChange={handleMonthlyIncomeChange}
                value={budget.monthly_income}
                InputProps={{
                  inputProps: {
                    min: 0
                  }
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "#242424" }}
              >
                Save and Continue
              </Button>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 2, backgroundColor: "#242424" }}
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );

	}
	else {
		return (
			<ReconfigureBudget
				updatedBudget={budget}
				baseUrl={baseUrl}
        budgetCreated={budgetCreated}
        setBudgetCreated={setBudgetCreated}
			/>
		);
	}
}

export default EditBudgetForm;
