import { useState } from 'react';
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { FetchWrapper } from '../../fetch-wrapper';


const CreateBudgetForm = ({ baseUrl }) => {
	const [budgetName, setBudgetName] = useState('');
	const [monthlyIncome, setMonthlyIncome] = useState('');
    const { token } = useAuthContext()

	const FastAPI = new FetchWrapper(baseUrl)

	const handleBudgetNameChange = (e) => {
		setBudgetName(e.target.value);
	};

	const handleMonthlyIncomeChange = (e) => {
		setMonthlyIncome(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const body = {}
		body.name = budgetName
		body.monthly_income = monthlyIncome

		const data = await FastAPI.post('/api/budgets', body, token)
		setBudgetName('')
		setMonthlyIncome('')
	};

	return (
		<div className="form">
			<div>
				<h1>Create a Budget</h1>
			</div>

			<form onSubmit={(e) => handleSubmit(e)}>
				<label>Budget Name</label>
				<input
					onChange={handleBudgetNameChange}
					value={budgetName}
					type="text"
					required
				/>

				<label>Monthly Income</label>
				<input
					onChange={handleMonthlyIncomeChange}
					value={monthlyIncome}
					type="number"
					required
				/>

				<input type="submit" value="Add Expenses" />
			</form>
		</div>
	);
}

export default CreateBudgetForm;
