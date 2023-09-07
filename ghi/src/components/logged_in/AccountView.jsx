import { useEffect, useState } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useStore } from "../../ContextStore";
import { useNavigate, useParams } from 'react-router-dom';
import { FetchWrapper } from '../../fetch-wrapper';
import { CircularProgress } from "@mui/material";



const AccountView = ({ baseUrl }) => {
	const { token } = useAuthContext()
  const { id } = useParams()
	const { budgetsData } = useStore()
	const FastAPI = new FetchWrapper(baseUrl)
  const [budget, setBudget] = useState([])
	const navigate = useNavigate()
  const [decodedToken, setDecodedToken] = useState('')
	const [accountData, setAccountData] = useState({})

  const parseJwt = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

	const getAccountData = async (email) => {
			const data = await FastAPI.get(`/api/accounts/${email}`, token)
			setAccountData(data)
	}

  useEffect(() => {
    if (token) {
      setDecodedToken(parseJwt(token))
    }
  }, [token])

	useEffect(() => {
		if (Object.keys(decodedToken).length) {
			getAccountData(decodedToken.account.email)
		}
	}, [decodedToken])


if (Object.keys(accountData).length) {
		return (
			<>
				<h1>Howdy, {accountData.first_name}</h1>
				<h3>First name: {accountData.first_name}</h3>
				<h3>Last name: {accountData.last_name}</h3>
				<h3>Email: {accountData.email}</h3>
			</>
		);
	} else {
		return (
			<p>Loading.............</p>
		)
	}
}

	export default AccountView;
