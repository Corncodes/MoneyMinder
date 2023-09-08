import { useEffect, useState } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useStore } from "../../ContextStore";
import { useNavigate, useParams } from 'react-router-dom';
import { FetchWrapper } from '../../fetch-wrapper';
import { CircularProgress } from "@mui/material";



import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import WalletOutlinedIcon from '@mui/icons-material/WalletOutlined';
import Grid from "@mui/material/Grid";
import EditIcon from '@mui/icons-material/Edit';
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import { PieChart, pieArcClasses } from '@mui/x-charts/PieChart';



import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

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

    const data = [
        { id: 0, value: 10 },
        { id: 1, value: 15 },
        { id: 2, value: 20 },
        ];

	if (budget.length === 0) {
        return (
            <div>
          <Box
            sx={{
              mt: 1,
			  mb: 5,
			  fontSize: 'large',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#242424', justifyContent: 'center' }}>
                <WalletOutlinedIcon />
            </Avatar>
            <Grid
                container 
				direction="column"
				justifyContent="center"
				alignItems='center'
				sx={{ mt: 4, mb: 6 }}>
            <CircularProgress sx={{ justifyContent: 'center', alignItems: 'center' }}/>
            
            </Grid>
            </Box>
            </div>
        )
    } else {
        return (
            <>
        <Container component="main" maxWidth="sm">
          <Box
            sx={{
              mt: 1,
			  mb: 5,
			  fontSize: 'large',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#242424', justifyContent: 'center' }}>
                <WalletOutlinedIcon />
            </Avatar>
		    <Typography variant="h6">
              {budget.name}
            </Typography>
                <PieChart
                series={[
                    {
                    data,
                    highlightScope: { faded: 'global', highlighted: 'item' },
                    faded: { innerRadius: 30, additionalRadius: -30 },
                    },
                ]}
                sx={{
                    [`& .${pieArcClasses.faded}`]: {
                    fill: 'gray',
                    },
                }}
                height={200}
                />
            </Box>

            <Grid 
				container 
				direction="column"
				justifyContent="center"
				alignItems='center'
				sx={{ mt: 4, mb: 6 }}>
					<Grid item xs={4}>
						<Typography variant="overline" noWrap>Monthly Income</Typography>
						<Typography variant="h4" sx={{fontWeight: "bold" }}>
						{budget.monthly_income?.toLocaleString("en-US", {
							style: "currency",
							currency: "USD",
						})}
						</Typography>

					</Grid>
                    
					<Grid item xs={4}>
						<Typography variant="overline" noWrap>Total Spent</Typography>
						<Typography variant="h4" sx={{ fontWeight: "bold" }}>
						{budget.monthly_spending_total?.toLocaleString("en-US", {
							style: "currency",
							currency: "USD",
						})}
						</Typography>
					</Grid>
                
					<Grid item xs={4}>
						<Typography variant="overline" noWrap>Remaining</Typography>
						<Typography variant="h4" sx={{ fontWeight: "bold" }}>
						{budget.monthly_balance?.toLocaleString("en-US", {
							style: "currency",
							currency: "USD",
						})}
						</Typography>
					</Grid>
            </Grid>

                
                <div style={{ marginBottom: "60px"}}></div>
                <Typography variant='body1' align='center'>Expense Items</Typography>

                {budget.expenses.map(expense => {
                    return (
                        <div key={expense.expense_id}>

                            <Grid 
                            container 
                            direction="row"
                            justifyContent="center"
                            alignItems='center'
                            sx={{ mt: 2 }}>
					        <Grid item xs={4}>
                            <Typography variant='overline'>{expense.expense_name}</Typography>
                            <Typography variant='h4' sx={{ fontWeight: "bold" }}>{expense.amount?.toLocaleString("en-US", {
							style: "currency",
							currency: "USD",
						})}</Typography>
                        </Grid>
                        </Grid>

                        </div>
                    )
                })}

                        <Card sx={{ mt: 2, border: "none", boxShadow: "none"}}>
                            <Button 
                            variant="contained" 
                            fullWidth
                            color="warning" 
                            sx={{ mt: 2, mb: 2 }}
                            startIcon={<EditIcon/>}onClick={() => navigate(`/budgets/${id}/edit`)}>
                                Edit Budget
                            </Button>

                            <Button 
                            variant="contained" 
                            fullWidth 
                            sx={{ mt: 2, mb: 8, backgroundColor: '#242424'}} 
                            startIcon={<KeyboardReturnIcon/>}onClick={() => navigate(`/budgets/`)}>
                                Return
                            </Button>
                        </Card>

            </Container>
            </>
            );
        }
}
	

	export default BudgetView;
