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


export default function Users() {
    const user_id = localStorage.getItem("user_id");
    const subgreddiitId = localStorage.getItem("subgreddit_id");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const fetchUsers = async () => {
                try {
                    const response = await fetch(`http://localhost:5000/mySubGreddit/${subgreddiitId}/users`, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                    });
                    const data = await response.json();
                    console.log(data);
                    setUsers(data);
                } catch (err) {
                    console.error(err);
                }
            };
            fetchUsers();
        }
    }, [])

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
                            gutterBottom
                            fontFamily={["Lora", "serif"].join(",")}
                        >
                            Users
                        </Typography>

                        <Typography
                            component="h1"
                            variant="h4"
                            align="center"
                            color="text.secondary"
                            gutterBottom
                            fontFamily={["Lora", "serif"].join(",")}
                        >
                        UnBlocked Users:
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
                        {users.map((user) => (
                            <Grid item key={user._id} xs={12}>
                                <Card
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                >
                                    <CardContent sx={{ flexGrow: 1 }}>

                                        <Typography gutterBottom fontFamily={["Lora", "serif"].join(",")} variant="h6" component="h2">
                                            <AccountCircleIcon />
                                            &ensp;
                                            {user.username}
                                        </Typography>
                                        {/* <Typography>
                      This is a media card. You can use this section to describe the
                      content.
                    </Typography> */}
                                    </CardContent>
                                    {/* <CardActions>
                                        <Button size="small" onClick={() => AcceptRequest(user._id)}>Follow</Button>
                                    </CardActions> */}
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
        </ThemeProvider>
    );
}
