// background: linear-gradient(145deg, #FFFFFF, #B3B5B8);
// border-radius: 57%;
// box-shadow: 13.81px 13.81px 63px #ABADB0, -13.81px -13.81px 63px #FFFFFF;
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import LoginForm from "../logged_out/LoginForm";
import CreateBudgetForm from "../logged_in/CreateBudgetForm";
import { useStore } from "../../ContextStore";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { FetchWrapper } from '../../fetch-wrapper';


const BudgetList = ({ baseUrl }) => {
  console.log(document.cookie);
  const store = useStore();
	const FastAPI = new FetchWrapper(baseUrl)
	const { token } = useAuthContext()
	//   const data = FastAPI.get('/api/budgets', token)
	const getData = async () => {
		const data = await FastAPI.get('/api/budgets', token)
		console.log(data)
	}


  if (1) {
		return (
		<>
			<div>
				<p>This will be the page where someone can perform CRUD operations on any/all of their budgets.</p>
				{/* <p> ${data} </p> */}
        <NavLink to="/budgets/new">Create Budget</NavLink>
			</div>
			<button onClick={getData}>get da data</button>
		</>
		);

	} else {
		return (
			<LoginForm />
		)	
	}
}

export default BudgetList;
