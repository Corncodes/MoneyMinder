import { useEffect, useState } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useStore } from "../../ContextStore";
import { useNavigate, useParams } from "react-router-dom";
import { FetchWrapper } from "../../fetch-wrapper";
import { CircularProgress } from "@mui/material";

import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import WalletOutlinedIcon from "@mui/icons-material/WalletOutlined";
import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { PieChart, pieArcClasses } from "@mui/x-charts/PieChart";
import Paper from "@mui/material/Paper";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const BudgetView = ({ baseUrl }) => {
  const { token } = useAuthContext();
  const { id } = useParams();
  const { budgetsData } = useStore();
  const FastAPI = new FetchWrapper(baseUrl);
  const [budget, setBudget] = useState([]);
  const [pieDataLoaded, setPieDataLoaded] = useState(false);
	const [data, setData] = useState([])
  const navigate = useNavigate();

  const getBudgetData = async () => {
    const data = await FastAPI.get(`/api/budgets/${id}`, token);
    setBudget(data);
  };

  useEffect(() => {
    if (budgetsData.length == 0 && token) {
      getBudgetData();
    } else if (budgetsData.length > 0) {
      setBudget([...budgetsData].filter((b) => b.id == id)[0]);
    }
  }, [token]);

	const storage = []

  useEffect(() => {
    if (budget.expenses) {
      for (const expense of budget.expenses) {
        storage.push({
          // id: expense.expense_id,
          value: expense.amount,
          label: expense.expense_name,
        });
				if (
          budget.monthly_balance &&
          storage.length === budget.expenses.length
					) {
          storage.push({
            value: budget.monthly_balance,
            label: "Remaining",
            color: "green",
          });
        }
				setData(storage)
				setPieDataLoaded(true)
      }
		}
  }, [budget]);

  const size = {
    width: 330,
    height: 250,
  };

  if (budget.length === 0) {
    return (
      <div>
        <Box
          sx={{
            mt: 1,
            mb: 5,
            fontSize: "large",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#242424", justifyContent: "center" }}>
            <WalletOutlinedIcon />
          </Avatar>
          <Grid
            container
            direction="column"
            sx={{ mt: 4, mb: 6, display: 'flex', placeContent: 'center' }}
          >
            <CircularProgress
              sx={{ justifyContent: "center", alignItems: "center" }}
            />
          </Grid>
        </Box>
      </div>
    );
  } else {
    return (
      <>
        <Container component="main" maxWidth="sm">
          <Box
            sx={{
              mt: 1,
              mb: 4,
              fontSize: "large",
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
              justifyContent: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#242424", justifyContent: "center" }}>
              <WalletOutlinedIcon />
            </Avatar>
            <Typography variant="h4" sx={{ fontWeight: "bold", marginTop: 3 }}>
              Budget Overview:
            </Typography>
            <Typography variant="h4">{budget.name}</Typography>
          </Box>
          <Box
            sx={{
              mb: 5,
              backgroundColor: "#e1ffe4",
              borderRadius: "5px",
              fontSize: "large",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {pieDataLoaded && (
              <>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", marginTop: 3 }}
                >
                  Budget Breakdown
                </Typography>
                <PieChart
                  series={[
                    {
                      data,
                      highlightScope: { faded: "global", highlighted: "item" },
                      faded: { innerRadius: 30, additionalRadius: -30 },
                      innerRadius: 30,
                      outerRadius: 90,
                      paddingAngle: 2,
                      cornerRadius: 3,
                      startAngle: 0,
                      endAngle: 360,
                      cx: 100,
                      // cy: 150,
                    },
                  ]}
                  sx={{
                    [`& .${pieArcClasses.faded}`]: {
                      fill: "gray",
                    },
                  }}
                  {...size}
                />
              </>
            )}
          </Box>

          <Box>
            <Grid container spacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={6}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", padding: "0px 10px" }}
                >
                  Big <br />
                  Picture
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="overline" noWrap>
                  Monthly Income
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", padding: "0px 10px" }}
                >
                  {budget.monthly_income?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="overline" noWrap>
                  Total Spend
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", padding: "0px 10px" }}
                >
                  {budget.monthly_spending_total?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="overline" noWrap>
                  Remaining
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", padding: "0px 10px" }}
                >
                  {budget.monthly_balance?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <div style={{ marginBottom: "60px" }}></div>
          <Typography variant="h5" align="center" sx={{ fontWeight: "bold" }}>
            Expense List
          </Typography>

          {budget.expenses.map((expense) => {
            return (
              <Paper
                key={expense.expense_id}
                sx={{
                  p: 2,
                  margin: "auto",
                  maxWidth: 500,
                  flexGrow: 1,
                  backgroundColor: "#ddf2ff",
                  marginBottom: "10px",
                }}
              >
                <Grid
                  container
                  spacing={3}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid item xs={6}>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                      {expense.expense_name}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                      {expense.amount?.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            );
          })}

          <Card sx={{ mt: 2, border: "none", boxShadow: "none" }}>
            <Button
              variant="contained"
              fullWidth
              color="warning"
              sx={{ mt: 2, mb: 2 }}
              startIcon={<EditIcon />}
              onClick={() => navigate(`/budgets/${id}/edit`)}
            >
              Edit Budget
            </Button>

            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2, mb: 8, backgroundColor: "#242424" }}
              startIcon={<KeyboardReturnIcon />}
              onClick={() => navigate(`/budgets/`)}
            >
              Return
            </Button>
          </Card>
        </Container>
      </>
    );
  }
};

export default BudgetView;
