import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Container, Divider } from "@mui/material";
import Copyright from "../ui/Copyright";
import { PieChart } from "@mui/x-charts/PieChart";
import Paper from "@mui/material/Paper";


class HomePage extends React.Component {
  render() {
    return (
      <Container maxWidth="sm">
            <Box
                sx={{
                mt: 3,
                mb: 5,
                fontSize: 'large',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}>
                <Typography variant="h3">
                MoneyMinder
                </Typography>
                <Typography variant="body1">Budgeting. Made simple.</Typography>
            </Box>

                <Paper elevation={4} sx={{ borderRadius: "5%"}}>
                    <Grid
                    container 
                    direction="column"
                    justifyContent="center"
                    alignItems="center">       
                        <Grid item>
                            <Typography variant='h6'>Dalonte's Expenses</Typography>
                        </Grid>
                            <PieChart
                                colors={['green', 'blue', 'red', 'orange']}
                                series={[
                                    {
                                    data: [
                                        { id: 0, value: 2500, label: 'Mortgage' },
                                        { id: 1, value: 150, label: 'Insurance' },
                                        { id: 2, value: 375, label: 'Car' },
                                        { id: 3, value: 250, label: 'Phone',}
                                    ],
                                    innerRadius: 30,
                                    outerRadius: 90,
                                    paddingAngle: 2,
                                    cornerRadius: 3,
                                    startAngle: 0,
                                    endAngle: 360,
                                    cx: 100,
                                    },
                                ]}
                                width={350}
                                height={200}/>
                    </Grid>
          <Box>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{ mt: 2 }}
            >
              <Grid item align="center">
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", padding: "0px 10px" }}
                >
                  Monthly Income
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  $7,500
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
              sx={{ mt: 2}}
            >
              <Grid item>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", padding: "0px 10px" }}
                >
                  Total Spent
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  $3,275
                </Typography>
              </Grid>
              <Divider orientation="vertical" flexItem />
              <Grid item sx={{ mb: 3}}>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", padding: "0px 10px" }}
                >
                  Remaining
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  $4,225
                </Typography>
              </Grid>
            </Grid>
          </Box>
                </Paper>
            

        <Box mt={5} px={4} >
        <Copyright sx={{ mt: 8, mb: 4 }} />
        </Box>
      </Container>
      
    );
  }
}

export default HomePage;
