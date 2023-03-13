import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
// import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import PagesIcon from '@mui/icons-material/Pages';
import Button from "@mui/material/Button";
import theme from "./theme";
import { Container, DialogContent } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import NewSubGreddit from "./NewSubGreddit.tsx";
import Open from "./OpenSubGreddit.tsx";
import { useNavigate } from 'react-router-dom';



// list of subgreddits
// 1. no. of people in subgreddit
// 2. No. of posts so far
// 3. Name
// 4. Description
// 5. Comma seperated list of banned keywords
// 6. Delete button (deletes all related posts, reports etc)
// 7. Open button that moves to the webpage for the subgreddit


export default function MySubGreddiit() {
    const [subgreddits, setSubgreddits] = useState([]);
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        console.log("")
        const token = localStorage.getItem('token');
        if (token) {
            const fetchSubgreddits = async () => {
                try {
                    const response = await fetch("http://localhost:5000/mySubGreddit/list", {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                        },
                    });
                    const data = await response.json();
                    console.log(data);
                    setSubgreddits(data);
                } catch (err) {
                    console.error(err);
                }
            };
            fetchSubgreddits();

        }
    }, [])

    const handleOpen = async (subgreddiitId) => {
        console.log(subgreddiitId);
        localStorage.setItem('subgreddit_id', subgreddiitId);
        window.location.href = `http://localhost:3000/mysubgreddit/${subgreddiitId}`;
    }

    return (
        <ThemeProvider theme={theme}>
            <Paper
                sx={{
                    p: 2,
                    margin: 'auto',
                    maxWidth: 500,
                    flexGrow: 1,
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
            >
                <Grid container className="container" spacing={2}>
                    <Grid item>
                        <NewSubGreddit />
                    </Grid>
                    <Divider />
                    <Grid item>
                        <Grid container className="container" spacing={2}>
                            {subgreddits.map((subgreddit) => (
                                <Grid item key={subgreddit._id}>
                                    <Grid container spacing={2}>
                                        <Grid item>
                                            <Grid item container spacing={2}>
                                                <Grid item>
                                                    <Typography fontFamily={["Lora", "serif"].join(",")} gutterBottom variant="h6" component="div">
                                                        {subgreddit.name_subgre}
                                                    </Typography>
                                                    <Typography fontFamily={["Lora", "serif"].join(",")} variant="body1" gutterBottom>
                                                        Followers: {subgreddit.followers.length}
                                                    </Typography>
                                                    <Typography fontFamily={["Lora", "serif"].join(",")} variant="body1" color="text.primary">
                                                        Posts: 16
                                                    </Typography>
                                                    <Typography fontFamily={["Lora", "serif"].join(",")} variant="body2" color="text.secondary">
                                                        {/* Lorem ipsum I love me myself and I, self love bitch...She can kill me and you and fuck us all upand all her friends are big bullies I wanna kill myself  */}
                                                        {subgreddit.description}
                                                    </Typography>
                                                    {/* Lorem ipsum I love me myself and I, self love bitch...She can kill me and you and fuck us all upand all her friends are big bullies I wanna kill myself  */}
                                                    <Typography fontFamily={["Lora", "serif"].join(",")} variant="body1" color="text.prmiary">Banned Keywords: </Typography>
                                                    {subgreddit.banned_keywords.map((word) => (
                                                        <Typography fontFamily={["Lora", "serif"].join(",")} variant="body2" color="text.secondary">{word}</Typography>
                                                    ))}

                                                </Grid>
                                                <Grid item container>
                                                    {/* <Button> */}

                                                    <Button variant="outlined" onClick={() => handleOpen(subgreddit._id)} >
                                                        <Typography fontFamily={["Lora", "serif"].join(",")} sx={{ cursor: 'pointer' }} variant="body2">
                                                            Open
                                                        </Typography>
                                                    </Button>
                                                    &ensp;
                                                    <Button variant="outlined">
                                                        <Typography fontFamily={["Lora", "serif"].join(",")} sx={{ cursor: 'pointer' }} variant="body2">
                                                            Remove
                                                        </Typography>
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                            {/* <Grid item>
                                    <Typography variant="subtitle1" component="div">
                                        $19.00
                                    </Typography>
                                </Grid> */}
                                        </Grid>
                                    </Grid>
                                    <br />
                                    {/* </Card> */}
                                    <Divider />
                                    {/* &nbsp; */}
                                    {/* &nbsp; */}
                                    <br />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </ThemeProvider >
    )
}