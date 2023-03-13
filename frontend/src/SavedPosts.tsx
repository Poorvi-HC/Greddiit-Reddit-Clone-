import * as React from 'react';
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
import theme from './theme.js';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IconButton } from '@mui/material';
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';
import ArrowCircleDownOutlinedIcon from '@mui/icons-material/ArrowCircleDownOutlined';
import {Divider} from '@mui/material';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// const theme = createTheme();


export default function SavedPosts() {
    const [subgreddits, setSubgreddits] = useState([]);
    const [posts, setPosts] = useState([]);
    const [clicked, setClicked] = useState(false);
    const [upvoted, setUpvote] = useState(false);
    const token = localStorage.getItem('token');
    const [saved, setSaved] = useState(false);
    // const subgreddiitId = localStorage.getItem('subgreddit_id');

    const upvote = async (props) => {
        console.log("enter upvote");
        // console.log(subgreddiitId);
        const subgreddiitId = localStorage.getItem('subgreddit_id');
        const postId = props;
        console.log(postId);
        try {
            const response = await fetch(`http://localhost:5000/mySubGreddit/${subgreddiitId}/Post/${postId}/upvote`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();
            console.log(data);
            if (data) {
                window.location.reload();
            }
        } catch (err) {
            console.log(err);
        }
    }

    const downvote = async (props) => {
        console.log("enter downvote");
        // console.log(subgreddiitId);
        const subgreddiitId = localStorage.getItem('subgreddit_id');

        const postId = props;
        console.log(postId);
        try {
            const response = await fetch(`http://localhost:5000/mySubGreddit/${subgreddiitId}/Post/${postId}/downvote`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();
            console.log(data);
            if (data) {
                window.location.reload();
            }
        } catch (err) {
            console.log(err);
        }
    }

    // const save = async (props) => {
    //     const postId = props;
    //     console.log(postId);
    //     try {
    //         const response = await fetch(`http://localhost:5000/mySubGreddit/${subgreddiitId}/Post/${postId}/save`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${token}`,
    //             },
    //         });
    //         const data = await response.json();
    //         console.log(data);
    //         if (data) {
    //             window.location.reload();
    //         }
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }
    const remove = async (props) => {
        console.log("remove saved post");
        const subgreddiitId = localStorage.getItem('subgreddit_id');
        const postId = props;

        try {
            const response = await fetch(`http://localhost:5000/mySubGreddit/${subgreddiitId}/Post/${postId}/saved/remove`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();
            console.log(data);
            if (data) {
                window.location.reload();
            }
        } catch (err) {
            console.log(err);
        }
    }

    // const follow = async (props) => {
    //     console.log("follow user post");
    //     const subgreddiitId = localStorage.getItem('subgreddit_id');
    //     const postId = props;

    //     try {
    //         const response = await fetch(`http://localhost:5000/mySubGreddit/${subgreddiitId}/Post/${postId}/saved/remove`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${token}`,
    //             },
    //         });
    //         const data = await response.json();
    //         console.log(data);
    //         if (data) {
    //             window.location.reload();
    //         }
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    useEffect(() => {
        console.log("")
        const token = localStorage.getItem('token');
        if (token) {
            // const fetchSubgreddit = async () => {
            //     try {
            //         const response = await fetch(`http://localhost:5000/mySubGreddit/${subgreddiitId}`, {
            //             headers: {
            //                 "Authorization": `Bearer ${token}`,
            //             },
            //         });
            //         const data = await response.json();
            //         console.log(data);
            //         setSubgreddits(data);
            //     } catch (err) {
            //         console.error(err);
            //     }
            // };
            // fetchSubgreddit();

            const fetchPosts = async () => {
                try {
                    const response = await fetch('http://localhost:5000/Post/savedlist', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        // body: JSON.stringify({ ids })
                    });
                    const data = await response.json();
                    console.log(data);
                    if (data.message !== "NO SAVED POSTS YET") {
                        setPosts(data);
                    }
                } catch (error) {
                    console.error(error);
                }
            };
            // usage
            fetchPosts();
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
                        >
                            Saved Posts
                        </Typography>
                        <Typography variant="h5" align="center" color="text.secondary" paragraph>
                            All the saved posts that were saved by the user currently logged in.
                        </Typography>
                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {posts.map((post) => (
                            <Grid item key={post._id} xs={12}  >
                                <Card
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                >
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {post.title}
                                        </Typography>
                                        <Typography>
                                            {post.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <IconButton sx={{ ':hover': { bgcolor: '#EE6E01', color: 'white' } }} onClick={() => upvote(post._id)}> <ArrowCircleUpOutlinedIcon /> </IconButton>
                                        <Typography fontFamily={["Lora", "serif"].join(",")}>{post.upvotes.length}</Typography>
                                        &nbsp;
                                        <IconButton sx={{ ':hover': { bgcolor: 'red', color: 'white' } }} onClick={() => downvote(post._id)}> <ArrowCircleDownOutlinedIcon /></IconButton>
                                        <Typography fontFamily={["Lora", "serif"].join(",")}>{post.downvotes.length}</Typography>
                                        &nbsp;
                                        {/* <Button size="small"></Button> */}
                                        {/* <IconButton onClick={() => save(post._id)}> <BookmarkBorderOutlinedIcon />  </IconButton> */}
                                        <Button size="small">Follow</Button>
                                        <Button size="small" onClick={()=>remove(post._id)}>Remove</Button>
                                    </CardActions>
                                    <Divider />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        {post.comments.map((comment) => (
                                            <Grid item key={comment._id} >
                                                <Typography fontFamily={["Lora", "serif"].join(",")} variant="body1" sx={{ color: "#000000" }}><strong>{comment.user}</strong>: &nbsp; {comment.text}</Typography>
                                            </Grid>
                                        ))}

                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
        </ThemeProvider>
    );
}