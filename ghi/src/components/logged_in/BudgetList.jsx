import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useStore } from "../../ContextStore";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { FetchWrapper } from "../../fetch-wrapper";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import WalletOutlinedIcon from "@mui/icons-material/WalletOutlined";
import Grid from "@mui/material/Grid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

const BudgetList = ({ baseUrl }) => {
  const FastAPI = new FetchWrapper(baseUrl);
  const { token } = useAuthContext();
  const { budgetsData, setBudgetsData } = useStore();
  const navigate = useNavigate();
  const [expanded, setExpanded] = React.useState("");

  const getData = async () => {
    const data = await FastAPI.get("/api/budgets", token);
    let sortedBudgetsData = [];
    for (let budget of data.budgets) {
      if (budget.primary_budget) {
        sortedBudgetsData.unshift(budget);
      } else {
        sortedBudgetsData.push(budget);
      }
    }
    setBudgetsData(sortedBudgetsData);
  };

  useEffect(() => {
    if (token) {
      getData();
    }
  }, [token]);

  const deleteBudget = async (id) => {
    setBudgetsData(budgetsData.filter((budget) => budget.id !== id));
    await FastAPI.delete(`/api/budgets/${id}`, token);
  };

  const viewBudget = (id) => {
    navigate(`/budgets/${id}`);
  };

  const handleClick = () => {
    navigate("/budgets/new");
  };

  const handleChange = (card) => (event, newExpanded) => {
    setExpanded(newExpanded ? card : false);
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
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
          <Avatar sx={{ m: 1, bgcolor: "#242424" }}>
            <WalletOutlinedIcon />
          </Avatar>
          <Typography variant="h6">Budgets</Typography>
        </Box>
        <div style={{ marginBottom: "20px" }}>
          {budgetsData.map((budget) => (
            <Accordion
              sx={{ mt: 2, mb: 2 }}
              key={budget.id}
              expanded={expanded === `card${budget.id}`}
              onChange={handleChange(`card${budget.id}`)}
            >
              <Paper elevation={4}>
                <AccordionSummary
                  // sx={{ bgcolor: "primary.light" }}
                  expandIcon={<ArrowDropDownIcon sx={{ color: "white" }} />}
                  aria-controls={`card${budget.id}-content`}
                  id={`card${budget.id}-header`}
                >
                  <Typography variant="body1">{budget.name}</Typography>
                </AccordionSummary>
              </Paper>
              <AccordionDetails>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ mt: 2 }}
                >
                  <Grid item align="center">
                    <Typography variant="body1" noWrap>
                      Monthly Income
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
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
                  <Divider sx={{ mt: 2 }} />
                </Grid>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-evenly"
                  align="center"
                  sx={{ mt: 2 }}
                >
                  <Grid item>
                    <Typography variant="body1" noWrap>
                      Total Spent
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
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
                    <Typography variant="body1">Remaining</Typography>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      {budget.monthly_balance?.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  align="center"
                  sx={{ mt: 4, mb: 2 }}
                >
                  <Grid item>
                    <Button
                      variant="contained"
                      size="medium"
                      startIcon={<DeleteForeverIcon />}
                      color="warning"
                      onClick={() => deleteBudget(budget.id)}
                    >
                      Delete Budget
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      size="medium"
                      color="primary"
                      startIcon={<VisibilityIcon />}
                      onClick={() => viewBudget(budget.id)}
                    >
                      View Budget
                    </Button>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
        <Card
          onClick={handleClick}
          variant="outlined"
          sx={{
            borderRadius: "20px",
            border: "1px solid #344620",
            bgcolor: "#606C38",
            color: "#fff",
            mb: 6,
            mt: 8,
            ":hover": {
              boxShadow: 5,
              cursor: "pointer",
            },
          }}
        >
          <CardContent>
            <Grid container align="center" direction="column" sx={{ mt: 2 }}>
              <Grid>
                <AddIcon fontSize="large" />
              </Grid>
              <Typography variant="overline" sx={{ fontWeight: "bold" }}>
                Create A Budget
              </Typography>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default BudgetList;
