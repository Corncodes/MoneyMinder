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
import Star from "@mui/icons-material/Star";
import StarBorder from "@mui/icons-material/StarBorder";
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
  const { budgetsData, setBudgetsData } = useStore();
  const FastAPI = new FetchWrapper(baseUrl);
  const [budget, setBudget] = useState([]);
  const [pieDataLoaded, setPieDataLoaded] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [isPrimaryBudget, setIsPrimaryBudget] = useState(false);
  const [primaryBudgetId, setPrimaryBudgetId] = useState(undefined);

  const getBudgetData = async () => {
    const data = await FastAPI.get(`/api/budgets/${id}`, token);
    const budgets = await FastAPI.get(`/api/budgets`, token);
    setBudget(data);
    if (data.primary_budget) {
      setIsPrimaryBudget(true);
    }
    for (const budget of budgets.budgets) {
      if (budget.primary_budget) {
        setPrimaryBudgetId(budget.id);
      }
    }
    setBudgetsData(budgets.budgets);
  };

  useEffect(() => {
    if (budgetsData.length == 0 && token) {
      getBudgetData();
    } else if (budgetsData.length > 0) {
      setBudget([...budgetsData].filter((b) => b.id == id)[0]);
      for (const b of budgetsData) {
        if (b.primary_budget) {
          setPrimaryBudgetId(b.id);
        }
      }
    }
  }, [token]);

  const storage = [];

  useEffect(() => {
    if (budget.expenses) {
      for (const expense of budget.expenses) {
        storage.push({
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
        setData(storage);
        setPieDataLoaded(true);
      }
    }
  }, [budget]);

  const size = {
    width: 330,
    height: 250,
  };

  const handlePrimary = async () => {
    for (let budget of budgetsData) {
      if (budget.id === primaryBudgetId) {
        let body = {};
        body.name = budget.name;
        body.monthly_income = budget.monthly_income;
        body.primary_budget = false;
        body.complete = budget.complete;
        body.monthly_spending_total = budget.monthly_spending_total;
        body.monthly_balance = budget.monthly_balance;
        await FastAPI.put(`/api/budgets/${budget.id}`, body, token);
        break;
      }
    }
    let body = {};
    body.name = budget.name;
    body.monthly_income = budget.monthly_income;
    body.primary_budget = undefined;
    body.complete = budget.complete;
    body.monthly_spending_total = budget.monthly_spending_total;
    body.monthly_balance = budget.monthly_balance;
    if (isPrimaryBudget) {
      body.primary_budget = false;
      await FastAPI.put(`/api/budgets/${budget.id}`, body, token);
    } else {
      body.primary_budget = true;
      await FastAPI.put(`/api/budgets/${budget.id}`, body, token);
    }
    setIsPrimaryBudget(!isPrimaryBudget);
  };

  useEffect(() => {
    if (budget.primary_budget) {
      setIsPrimaryBudget(true);
    }
  }, [budget]);

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
            sx={{ mt: 4, mb: 6, display: "flex", placeContent: "center" }}
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
              flexDirection: "row",
              alignItems: "left",
              justifyContent: "center",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={1}>
                <Button onClick={handlePrimary}>
                  {isPrimaryBudget ? (
                    <Star fontSize="large" />
                  ) : (
                    <StarBorder fontSize="large" />
                  )}
                </Button>
              </Grid>
              <Grid item xs={10}>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "bold", textAlign: "center" }}
                >
                  {budget.name}
                </Typography>
              </Grid>
              <Grid item xs={1}></Grid>
            </Grid>
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
                <Typography variant="h6" noWrap>
                  Monthly Income
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", padding: "0px 10px" }}
                >
                  {budget.monthly_income?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" noWrap>
                  Total Spend
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", padding: "0px 10px" }}
                >
                  {budget.monthly_spending_total?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" noWrap>
                  Remaining
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", padding: "0px 10px" }}
                >
                  {budget.monthly_balance?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <div style={{ marginBottom: "60px" }}></div>
          <Typography variant="h5" align="center" sx={{ fontWeight: "bold" }}>
            Expense List
          </Typography>
          <Box
            sx={{
              p: 2,
              margin: "auto",
              maxWidth: 500,
              flexGrow: 1,
              backgroundColor: "#ffffff",
              marginBottom: "10px",
              borderBottom: '1px solid #ddd'
            }}
          >
            <Grid container spacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={6}>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  Name
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  Amount
                </Typography>
              </Grid>
            </Grid>
          </Box>

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
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
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
