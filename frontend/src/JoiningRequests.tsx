  import * as React from 'react';
  import { useState, useEffect } from 'react';
  import AppBar from '@mui/material/AppBar';
  import Button from '@mui/material/Button';
  import CameraIcon from '@mui/icons-material/PhotoCamera';
  import Card from '@mui/material/Card';
  import CardActions from '@mui/material/CardActions';
  import CardContent from '@mui/material/CardContent';
  import CardMedia from '@mui/material/CardMedia';
  import CssBaseline from '@mui/material/CssBaseline';
  import Grid from '@mui/material/Grid';
  import Stack from '@mui/material/Stack';
  import Box from '@mui/material/Box';
  import Toolbar from '@mui/material/Toolbar';
  import Typography from '@mui/material/Typography';
  import Container from '@mui/material/Container';
  import Link from '@mui/material/Link';
  import { createTheme, ThemeProvider } from '@mui/material/styles';
  import theme from "./theme.js";
  import AccountCircleIcon from '@mui/icons-material/AccountCircle';
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];


  export default function JoiningRequests() {
    const user_id = localStorage.getItem("user_id");
    const subgreddiitId = localStorage.getItem("subgreddit_id");
    const [requests, setRequests] = useState([]);

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        const fetchRequests = async () => {
          try {
            const response = await fetch(`http://localhost:5000/mySubGreddit/${subgreddiitId}/request/list`, {
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
              },
            });
            const data = await response.json();
            console.log(data);
            setRequests(data);
          } catch (err) {
            console.error(err);
          }
        };
        fetchRequests();
      }
    }, [])

    const RejectRequest = async (rejectId) => {
      // remove from requests
      console.log("entered reject");
      console.log(rejectId);
      const subgreddiitId = localStorage.getItem("subgreddit_id");
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch(`http://localhost:5000/mySubGreddit/${subgreddiitId}/request/${rejectId}/reject`, {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          });
          const data = await response.json();
          console.log(data);
          if(data){
            alert(data.message);
            window.location.reload();
          }
        } catch (err) {
          console.error(err);
        }
      }
    }

    const AcceptRequest = async (acceptId) => {
      // remove from requests
      console.log("entered accept");
      console.log(acceptId);
      const subgreddiitId = localStorage.getItem("subgreddit_id");
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch(`http://localhost:5000/mySubGreddit/${subgreddiitId}/request/${acceptId}/accept`, {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          });
          const data = await response.json();
          console.log(data);
          if(data){
            alert(data.message);
            window.location.reload();
          }
          // setSubgreddits(data);
        } catch (err) {
          console.error(err);
        }
      }
    }

    console.log(requests);
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <main>
          {/* Hero unit */}
          <Box
            sx={{
              bgcolor: 'background.paper',
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                fontFamily={["Lora", "serif"].join(",")}
                gutterBottom
              >
                Joining Requests
              </Typography>
              {/* <Typography variant="h5" align="center" color="text.secondary" paragraph>
                Something short and leading about the collection below—its contents,
                the creator, etc. Make it short and sweet, but not too short so folks
                don&apos;t simply skip over it entirely.
              </Typography> */}
              {/* <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <Button variant="contained">Main call to action</Button>
                <Button variant="outlined">Secondary action</Button>
              </Stack> */}
            </Container>
          </Box>
          <Container sx={{ py: 8 }} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {requests.map((request) => (
                <Grid item key={request._id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>

                      <Typography gutterBottom variant="h6" component="h2">
                        <AccountCircleIcon />
                        &ensp;
                        {request.username}
                      </Typography>
                      {/* <Typography>
                        This is a media card. You can use this section to describe the
                        content.
                      </Typography> */}
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={() => AcceptRequest(request._id)}>Accept</Button>
                      <Button size="small" onClick={() => RejectRequest(request._id)}>Reject</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
      </ThemeProvider>
    );
  }
