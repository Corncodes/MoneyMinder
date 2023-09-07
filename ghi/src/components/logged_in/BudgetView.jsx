import { useEffect, useState } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useStore } from "../../ContextStore";
import { useNavigate, useParams } from 'react-router-dom';
import { FetchWrapper } from '../../fetch-wrapper';
import { CircularProgress } from "@mui/material";



const BudgetView = ({ baseUrl }) => {
	const { token } = useAuthContext()
    const { id } = useParams()
	const { budgetsData } = useStore()
	const FastAPI = new FetchWrapper(baseUrl)
    const [budget, setBudget] = useState([])
	const navigate = useNavigate()

    const getBudgetData = async () => {
        const data = await FastAPI.get(`/api/budgets/${id}`, token)
        setBudget(data)
    }

    useEffect(() => {
        if (budgetsData.length == 0 && token) {
            getBudgetData()
        } else if (budgetsData.length > 0) {
            setBudget([...budgetsData].filter( b => b.id == id)[0])
        }
    }, [token])

	if (budget.length === 0) {
        return (
            <CircularProgress /> // CENTER THIS
        )
    } else {
        return (
            <div>
                <h1> {budget.name} </h1>
                <h2>Pie Chart Here</h2>
                <h3>Monthly Income: {budget.monthly_income}</h3>
                <h3>Total Spending: {budget.monthly_spending_total}</h3>
                <h3>Remaining Balance: {budget.monthly_balance}</h3>
                <h3>Expenses:</h3>
                {budget.expenses.map(expense => {
                    return (
                        <div key={expense.expense_id}>
                            <p>Name: {expense.expense_name}</p>
                            <p>Amount: {expense.amount}</p>
                        </div>
                    )
                })}
            <button onClick={() => navigate(`/budgets/${id}/edit`)}>Edit Budget</button>
            <button onClick={() => navigate(-1)}>Return</button>
            </div>
            );
        }
	}

	export default BudgetView;
