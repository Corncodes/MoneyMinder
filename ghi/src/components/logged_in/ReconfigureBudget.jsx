import { useEffect, useState } from "react";
import { useStore } from "../../ContextStore";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { FetchWrapper } from '../../fetch-wrapper';
import { useNavigate } from 'react-router-dom';


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
			spend += parseInt(expense.amount)
		}
		setTotalSpending(spend)
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
		<div>
			<h1>{updatedBudget.name}</h1>
			<p>Available Spend:</p>
			<p>${updatedBudget.monthly_income - totalSpending}</p>
			<p>Total Spending</p>
			<p>${totalSpending}</p>
			{expenseItems.length === 0 ? <p>Add Some Expense Items Below!</p> : expenseItems.map((expense, index) => {
				return (
					<div key={index}>
						<label>Expense Name:</label>
						<input
							onChange={(e) => handleExpenseNameChange(e, index)}
							value={expenseItems[index].expense_name}
							type="text"
							required
							/>
						<label>Expense Amount</label>
						<input
							onChange={(e) => handleExpenseAmountChange(e, index)}
							value={expenseItems[index].amount}
							type="number"
							min="0"
							required
							/>
						<button onClick={() => deleteExpense(expense.expense_id)}>Delete Expense</button>
					</div>
				)
			})}
				<button onClick={(e) => handleSubmit(e)}>Submit</button>
				<button onClick={(e) => handleCancel(e)}>Cancel</button>
			<button onClick={() => addExpense()}>Add Expense</button>
			<button onClick={() => setBudgetCreated(false)}>Return</button>
		</div>
		);
	}

	export default ReconfigureBudget;
