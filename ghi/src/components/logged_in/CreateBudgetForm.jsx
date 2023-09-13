import { useState } from 'react';
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { FetchWrapper } from '../../fetch-wrapper';
import { useNavigate } from 'react-router-dom';
import ConfigureBudget from './ConfigureBudget.jsx'
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from '../ui/Copyright';
import Avatar from "@mui/material/Avatar";
import WalletOutlinedIcon from '@mui/icons-material/WalletOutlined';
import CancelIcon from '@mui/icons-material/Cancel';


const CreateBudgetForm = ({ baseUrl }) => {
	const [budgetName, setBudgetName] = useState('');
	const [monthlyIncome, setMonthlyIncome] = useState('');
	const [budgetCreated, setBudgetCreated] = useState(false)
	const [createdBudget, setCreatedBudget] = useState({})
	const [input, setInput] = useState('');
  const { token } = useAuthContext();
  const navigate = useNavigate()
	const FastAPI = new FetchWrapper(baseUrl)

	const handleBudgetNameChange = (e) => {
		setBudgetName(e.target.value);
	};

	const handleMonthlyIncomeChange = (e) => {
		setMonthlyIncome(e.target.value);
	};

	const handleCancel = async (e) => {
		navigate(`/budgets/`)
	}

	const handleFirstSubmit = async (e) => {
		e.preventDefault();

		const body = {}
		body.name = budgetName
		body.monthly_income = monthlyIncome
		const data = await FastAPI.post('/api/budgets', body, token)
		setCreatedBudget(data)
		setBudgetCreated(true)
	};
	if (!budgetCreated) {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            mt: 1,
            mb: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{ m: 1, bgcolor: "primary.main", justifyContent: "center" }}
          >
            <WalletOutlinedIcon />
          </Avatar>
          <Typography variant="h6">Create a Budget</Typography>
        </Box>
        <Box
          component="form"
          onSubmit={(e) => handleFirstSubmit(e)}
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="budgetName"
            label="Budget Name"
            name="Budget Name"
            inputProps={{ maxLength: 20 }}
            onChange={handleBudgetNameChange}
            value={budgetName}
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
            value={monthlyIncome}
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Continue
          </Button>
        </Box>
        <Button
          variant="contained"
          color="warning"
          fullWidth
          sx={{ mt: 2, mb: 2 }}
          startIcon={<CancelIcon />}
          onClick={(e) => handleCancel(e)}
        >
          Cancel
        </Button>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    );
	}
	else {
		return (
			<ConfigureBudget
				createdBudget={createdBudget}
				baseUrl={baseUrl}
			/>
		);
	}
}

export default CreateBudgetForm;
