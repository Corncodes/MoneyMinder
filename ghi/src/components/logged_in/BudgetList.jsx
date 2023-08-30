// background: linear-gradient(145deg, #FFFFFF, #B3B5B8);
// border-radius: 57%;
// box-shadow: 13.81px 13.81px 63px #ABADB0, -13.81px -13.81px 63px #FFFFFF;
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginForm from "../logged_out/LoginForm";
import CreateBudgetForm from "../logged_in/CreateBudgetForm";
import { useStore } from "../../ContextStore";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { FetchWrapper } from '../../fetch-wrapper';


const BudgetList = ({ baseUrl }) => {
	const FastAPI = new FetchWrapper(baseUrl)
	const { token } = useAuthContext()
	const { budgetsData, setBudgetsData } = useStore()

	const getData = async () => {
		const data = await FastAPI.get('/api/budgets', token)
		setBudgetsData(data.budgets)
	}

	useEffect(() => {
		token && getData()
	}, [token])

	const deleteBudget = async (id) => {
		setBudgetsData(budgetsData.filter(budget => budget.id !== id))
		const data = await FastAPI.delete(`/api/budgets/${id}`, token)
	}


  if (token) {
		return (
		<>
			<div>
				<p>This will be the page where someone can perform CRUD operations on any/all of their budgets.</p>
				{budgetsData.map(budget => {
					return (
						<div key={budget.id}>
							<p>{budget.name}</p>
							<button onClick={() => deleteBudget(budget.id)}>Delete Budget</button>
						</div>
					)
				})}
        	<NavLink to="/budgets/new">Create Budget</NavLink>
			</div>
		</>
		);

	} else {
		return (
			<LoginForm />
		)
	}
}

export default BudgetList;
