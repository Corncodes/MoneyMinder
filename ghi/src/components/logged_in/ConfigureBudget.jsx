import { useEffect, useState } from "react";
import { useStore } from "../../ContextStore";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { FetchWrapper } from '../../fetch-wrapper';
import { useNavigate } from 'react-router-dom';


const ConfigureBudget = ({ createdBudget, baseUrl }) => {
    const [expenseItems, setExpenseItems] = useState([])
    const [keyCounter, setKeyCounter] = useState(0)
	const [totalSpending, setTotalSpending] = useState(0)
	const { token } = useAuthContext()
	const { setBudgetsData } = useStore()
	const availableSpend = createdBudget.monthly_income
	const FastAPI = new FetchWrapper(baseUrl)
	const navigate = useNavigate()

    const addExpense = () => {
        setExpenseItems([...expenseItems, {
			expenseName: '',
            expenseAmount: 0,
            key: keyCounter
        }])
        setKeyCounter(keyCounter => keyCounter += 1)
    }

	const deleteExpense = (index) => {
		let updatedExpenseItems = expenseItems.filter((expense) => expense.key !== index)
		setExpenseItems(updatedExpenseItems)
		let spend = 0
		for (const expense of updatedExpenseItems) {
			spend += parseInt(expense.expenseAmount)
		}
		setTotalSpending(spend)
	}

    const handleExpenseNameChange = (e, index) => {
		let updatedExpenseItems = [...expenseItems]
        updatedExpenseItems[index].expenseName = e.target.value
        setExpenseItems(updatedExpenseItems)
    }

    const handleExpenseAmountChange = (e, index) => {
        let updatedExpenseItems = [...expenseItems]
        updatedExpenseItems[index].expenseAmount = e.target.value
        setExpenseItems(updatedExpenseItems)
		let spend = 0
		for (const expense of updatedExpenseItems) {
			spend += parseInt(expense.expenseAmount)
		}
		setTotalSpending(spend)
    }

	const handleSubmitOrSave = async (e, completed) => {
		e.preventDefault();
		for (let expense of expenseItems) {
			let expenseBody = {}
			expenseBody.expense_name = expense.expenseName
			expenseBody.amount = parseInt(expense.expenseAmount)
			expenseBody.budget_id = createdBudget.id
			const expenseData = await FastAPI.post('/api/expenses', expenseBody, token)
		}
		let budgetBody = {}
		budgetBody.name = createdBudget.name
		budgetBody.monthly_income = createdBudget.monthly_income
		budgetBody.primary_budget = createdBudget.primary_budget
		budgetBody.complete = completed
		budgetBody.monthly_spending_total = totalSpending
		budgetBody.monthly_balance = availableSpend - totalSpending
		const budgetData = await FastAPI.put(`/api/budgets/${createdBudget.id}`, budgetBody, token)

	}

	const handleSubmit = async (e) => {
		await handleSubmitOrSave(e, true)
		const data = await FastAPI.get(`/api/budgets`, token)
		setBudgetsData(data.budgets)
		navigate(`/budgets/${createdBudget.id}`)
	}

	const handleSave = async (e) => {
		await handleSubmitOrSave(e, false)
		navigate("/budgets")
	}

	return (
		<div>
			<h1>{createdBudget.name}</h1>
			<p>Available Spend:</p>
			<p>${availableSpend - totalSpending}</p>
			<p>Total Spending</p>
			<p>${totalSpending}</p>
			{expenseItems.length === 0 ? <p>Add Some Expense Items Below!</p> : expenseItems.map((expense, index) => {
				return (
					<div key={index}>
						<label>Expense Name</label>
						<input
							onChange={(e) => handleExpenseNameChange(e, index)}
							value={expenseItems[index].expenseName}
							type="text"
							required
							/>
						<label>Expense Amount</label>
						<input
							onChange={(e) => handleExpenseAmountChange(e, index)}
							value={expenseItems[index].expenseAmount}
							type="number"
							min="0"
							required
							/>
						<button onClick={() => deleteExpense(expense.key)}>Delete Expense</button>
					</div>
				)
			})}
				<button onClick={(e) => handleSubmit(e)}>Submit</button>
				<button onClick={(e) => handleSave(e)}>Save and Exit</button>
			<button onClick={() => addExpense()}>Add Expense</button>
		</div>
		);
	}

	export default ConfigureBudget;
