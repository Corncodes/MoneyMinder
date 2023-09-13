import { useEffect, useState } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useStore } from "../../ContextStore";
import { useNavigate, useParams } from "react-router-dom";
import { FetchWrapper } from "../../fetch-wrapper";
import { CircularProgress, Divider } from "@mui/material";
import * as React from "react";
import Card from "@mui/material/Card";
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
  const storage = [];
  const palette = [
    "#606C38",
    "#493829",
    "#8f3b1b",
    "#283618",
    "#4e6172",
    "#BC6C25",
  ];

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
          <Avatar sx={{
            m: 1, bgcolor: "#242424", justifyContent: "center" }}>
            <WalletOutlinedIcon />
          </Avatar>
          <Grid
            container
            direction="column"
            sx={{
              mt: 4, mb: 6, display: "flex", placeContent: "center" }}
          >
            <CircularProgress
              sx={{
                justifyContent: "center", alignItems: "center" }}
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
                  sx={{
                    // fontWeight: "bold",
                    textAlign: "center",
                  }}
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
              backgroundColor: "#ffd8ab",
              borderRadius: "20px",
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
                  sx={{
                    // fontWeight: "bold",
                    marginTop: 3,
                  }}
                >
                  Budget Breakdown
                </Typography>
                <PieChart
                  colors={palette}
                  series={[
                    {
                      data,
                      highlightScope: { faded: "global", highlighted: "item" },
                      faded: { innerRadius: 30, additionalRadius: -30 },
                      innerRadius: 20,
                      outerRadius: 90,
                      paddingAngle: 3,
                      cornerRadius: 5,
                      startAngle: 0,
                      endAngle: 360,
                      cx: 100,
                      cy: 100
                    },
                  ]}
                  sx={{
                    [`& .${pieArcClasses.faded}`]: {
                      fill: "gray",
                    },
                    pieArcClasses,
                  }}
                  {...size}
                />
              </>
            )}
          </Box>
          <Box>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{
                mt: 2,
              }}
            >
              <Grid item align="center">
                <Typography
                  variant="h5"
                  sx={{
                    // fontWeight: "bold",
                    padding: "0px 10px",
                  }}
                >
                  Monthly Income
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    // fontWeight: "bold",
                  }}
                >
                  {budget.monthly_income?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </Typography>
              </Grid>
            </Grid>
            <Grid>
              <Divider
                sx={{
                  mt: 2,
                }}
              />
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="space-evenly"
              align="center"
              sx={{
                mt: 2,
              }}
            >
              <Grid item>
                <Typography
                  variant="h5"
                  sx={{
                    // fontWeight: "bold",
                    padding: "0px 10px",
                  }}
                >
                  Total Spent
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    // fontWeight: "bold",
                  }}
                >
                  {budget.monthly_spending_total?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </Typography>
              </Grid>
              <Divider orientation="vertical" flexItem />
              <Grid item>
                <Typography
                  variant="h5"
                  sx={{
                    // fontWeight: "bold",
                    padding: "0px 10px",
                  }}
                >
                  Remaining
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    // fontWeight: "bold",
                  }}
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
          <Typography
            variant="h4"
            align="center"
            sx={{
              marginBottom: "10px",
            }}
          >
            Expense List
          </Typography>
          <Box
            sx={{
              p: 2,
              flexGrow: 1,
              backgroundColor: "#FEFAE0",
              marginBottom: "15px",
              borderBottom: "1px solid #344620",
            }}
          >
            <Grid container spacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={6}>
                <Typography variant="h5">Name</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h5" sx={{
                  paddingLeft: "12px"
                }}>Amount</Typography>
              </Grid>
            </Grid>
          </Box>
          {budget.expenses.map((expense) => {
            return (
              <Paper
                key={expense.expense_id}
                sx={{
                  p: 2,
                  // margin: "auto",
                  alignContent: "",
                  // maxWidth: 500,
                  flexGrow: 1,
                  backgroundColor: "#606C38",
                  color: "#ffffff",
                  marginBottom: "10px",
                }}
              >
                <Grid
                  container
                  spacing={3}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid item xs={6}>
                    <Typography
                      variant="h5"
                      sx={{
                        // fontWeight: "bold",
                      }}
                    >
                      {expense.expense_name}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      variant="h5"
                      sx={{
                        // fontWeight: "bold",
                        borderLeft: "2px solid #fff",
                        paddingLeft: "10px"

                      }}
                    >
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
          <Card
            sx={{
              mt: 2,
              border: "none",
              boxShadow: "none",
              bgcolor: "#fefae0",
            }}
          >
            <Button
              variant="contained"
              fullWidth
              color="secondary"
              sx={{
                mt: 2,
                mb: 2,
              }}
              startIcon={<EditIcon />}
              onClick={() => navigate(`/budgets/${id}/edit`)}
            >
              Edit Budget
            </Button>
            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                mb: 8,
                backgroundColor: "#242424",
              }}
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
