// background: linear-gradient(145deg, #FFFFFF, #B3B5B8);
// border-radius: 57%;
// box-shadow: 13.81px 13.81px 63px #ABADB0, -13.81px -13.81px 63px #FFFFFF;
import LoginForm from "../logged_out/LoginForm";
import { useStore } from "../../ContextStore";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";




const BudgetList = () => {
  const store = useStore();
	const { token } = useAuthContext();




	if (token) {
		return (
			<div>
				<p>This will be the page where someone can perform CRUD operations on any/all of their budgets.</p>
			</div>
		);



	} else {
		return (
			<LoginForm />
		)
	}
}


export default BudgetList;