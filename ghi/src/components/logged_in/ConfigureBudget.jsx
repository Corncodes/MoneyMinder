import { useEffect, useState } from "react";
import LoginForm from "../logged_out/LoginForm";
import { useStore } from "../../ContextStore";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { FetchWrapper } from '../../fetch-wrapper';


const ConfigureBudget = ({ budgetName, monthlyIncome, budgetId, baseUrl }) => {
	const [budgetData, setBudgetData] = useState({})
    const [expenseItems, setExpenseItems] = useState([])
    const [keyCounter, setKeyCounter] = useState(0)
	// const FastAPI = new FetchWrapper(baseUrl)
	// const { token } = useAuthContext()

	// const getData = async () => {
	// 	const data = await FastAPI.get('/api/budgets', token)
	// 	setBudgetData(data.budgets)
	// }

	// useEffect(() => {
	// 	token && getData()
	// }, [token])

	// const deleteBudget = async (id) => {
	// 	setBudgetData([...budgetData].filter(budget => budget.id !== id))
	// 	const data = await FastAPI.delete(`/api/budgets/${id}`, token)
	// }

	// const updateBudget = async (id) => {
	// 	const data = await FastAPI.update(`/api/budgets/${id}`, token)
	// }

	// const handleFirstSubmit = async (e) => {
	// 	e.preventDefault();


	// 	const body = {}
	// 	body.name = budgetName
	// 	body.monthly_income = monthlyIncome
	// 	const data = await FastAPI.put(`/api/budgets/${budgetId}`, body, token)
	// 	setCreatedBudget(data)
	// 	setBudgetCreated(true)
	// };

    // console.log('THIS IS THE BUDGET NAME', budgetName)
    // console.log('THIS IS THE MONTHLY INCOME', monthlyIncome)
    // console.log('THIS IS THE BUDGET ID', budgetId)

    const addExpense = () => {
        setExpenseItems([...expenseItems, {
            expenseName: '',
            expenseAmount: 0,
            key: keyCounter
        }])
        setKeyCounter(keyCounter => keyCounter += 1)
    }

    const handleExpenseNameChange = (e, index) => {
        let updatedExpenseItems = [...expenseItems]
        updatedExpenseItems[index].expenseName = e.target.value
        setExpenseItems(updatedExpenseItems)
    }

	return (
			<div>
				<p>This should populate with the configure budget component</p>
                {expenseItems.map(expense => {
					return (
						<div key={expense.key}>
                            <label>Expense Name</label>
                            <input
                                onChange={(e) => handleExpenseNameChange(e, expense.key)}
                                value={expenseItems[expense.key].expenseName}
                                type="text"
                                required
                            />
						</div>
					)
				})}
                <button onClick={addExpense}>Add Expense</button>
			</div>
		);
}

export default ConfigureBudget;
