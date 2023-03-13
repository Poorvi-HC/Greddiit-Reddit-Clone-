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
import { useParams } from 'react-router-dom';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import CreatePost from "./CreatePost.tsx";
import { Divider, Icon, IconButton } from '@mui/material';
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';
import ArrowCircleDownOutlinedIcon from '@mui/icons-material/ArrowCircleDownOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import { fontFamily } from '@mui/system';
import AddComment from './AddComment.tsx';
// function Copyright() {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Open(props) {
    const { subgreddiitId } = useParams();
    console.log(subgreddiitId);
    const [subgreddits, setSubgreddits] = useState([]);
    const [posts, setPosts] = useState([]);
    const [clicked, setClicked] = useState(false);
    const [upvoted, setUpvote] = useState(false);
    const token = localStorage.getItem('token');
    // const subgreddiitId = localStorage.getItem('subgreddit_id');

    const upvote = async (props) => {
        console.log("enter upvote");
        console.log(subgreddiitId);

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
        console.log(subgreddiitId);

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

    const save = async (props) => {
        const postId = props;
        console.log(postId);
        try {
            const response = await fetch(`http://localhost:5000/mySubGreddit/${subgreddiitId}/Post/${postId}/save`, {
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

    const follow = async (props) => {
        const postId = props;
        try {
            const response = await fetch(`http://localhost:5000/mySubGreddit/${subgreddiitId}/Post/${postId}/follow`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();
            console.log(data);
            if (data) {
                alert(data.message);
                window.location.reload();
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        console.log("")
        const token = localStorage.getItem('token');
        if (token) {
            const fetchSubgreddit = async () => {
                try {
                    const response = await fetch(`http://localhost:5000/mySubGreddit/${subgreddiitId}`, {
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
            fetchSubgreddit();

            const fetchPosts = async () => {
                localStorage.getItem('subgreddit_id');
                try {
                    const response = await fetch(`http://localhost:5000/mySubGreddit/${subgreddiitId}/Post/list`, {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                        },
                    });
                    const data = await response.json();
                    console.log(data);
                    if (data) {
                        setPosts(data);
                    }
                } catch (err) {
                    console.error(err);
                }
            }
            fetchPosts();
        }
    }, [])

    console.log(subgreddits);
    console.log(posts);
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Album layout
          </Typography>
        </Toolbar>
      </AppBar> */}
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        // pt: 2,
                        // pb: 1,
                    }}
                >
                    <Container >
                        <Grid container spacing={2}>
                            <Grid xs={3}>
                                <Typography
                                    component="h3"
                                    variant="h3"
                                    align="left"
                                    //   color="text.primary"
                                    gutterBottom
                                >
                                    {subgreddits.name_subgre}
                                </Typography>
                                <Typography variant="h5" align="left" color="text.secondary" paragraph>
                                    {subgreddits.description}
                                </Typography>
                                <ImageList cols={1} rowHeight={150}>
                                    <ImageListItem><img src={require('./pictures/macaron.jpg')} width="250" /></ImageListItem>
                                    <ImageListItem><img src={require('./pictures/books.jpg')} width="250" /></ImageListItem>
                                    <ImageListItem><img src={require('./pictures/oranges.jpg')} width="250" /></ImageListItem>
                                    {/* <ImageListItem><img src={require('./pictures/forest.jpg')} width="250" height="100" /></ImageListItem> */}
                                </ImageList>

                            </Grid>

                            <Grid container xs={9}>
                                <CreatePost />
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
                                                        <IconButton onClick={() => save(post._id)}><BookmarkOutlinedIcon /></IconButton>
                                                        <Button size="small" onClick={()=> follow(post._id)}>Follow</Button>
                                                        <AddComment posts={post} />
                                                    </CardActions>
                                                    <Divider />
                                                    <CardContent sx={{ flexGrow: 1 }}>
                                                        {post.comments.map((comment) => (
                                                            <Grid item key={comment._id} >
                                                                <Typography fontFamily={["Lora", "serif"].join(",")} variant="body1" ><strong>{comment.user}</strong>: &nbsp; {comment.text}</Typography>
                                                            </Grid>
                                                        ))}

                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Container>
                            </Grid>

                        </Grid>
                        {/* </Stack> */}
                    </Container>
                </Box >
            </main >
        </ThemeProvider >
    );
}