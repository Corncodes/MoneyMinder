import React from "react";
import { NavLink } from 'react-router-dom';

function Nav() {
	return (
		<nav>
			<div>
				<NavLink to="/">Login Form </NavLink>
				<NavLink to="/sign-up">Sign Up </NavLink>
				<NavLink to="/budgets">Budgets</NavLink>
			</div>
		</nav>
	);
}

export default Nav;