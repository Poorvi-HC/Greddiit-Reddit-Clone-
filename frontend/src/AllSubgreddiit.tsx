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
import SearchIcon from '@mui/icons-material/Search';
import { InputBase, IconButton, ButtonGroup } from '@mui/material';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';

export default function AllSubGreddiit() {
    const [subgreddits_joined, setSubgreddits_joined] = useState([]);
    const [org_subgreddits_joined, setorg_subgreddits_joined] = useState([]);
    const [subgreddits_all, setSubgreddits_all] = useState([]);
    const [org_subgreddits_all, setorg_subgreddits_all] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    // const [searchResults_remain, setSearchResults_remain] = useState([]);
    const navigate = useNavigate();
    const [sortOption, setSortOption] = useState('creationDate');
    const [searchText, setSearchText] = useState('');
    const [joined, setjoined] = useState(false);
    // const [moderator, setModerator] = useState(false);

    useEffect(() => {
        console.log("")
        const token = localStorage.getItem('token');
        if (token) {
            // const fetchJoinedSubgreddits = async () => {
            //     try {
            //         const response = await fetch("http://localhost:5000/SubGreddit/list/join", {
            //             headers: {
            //                 "Authorization": `Bearer ${token}`,
            //             },
            //         });
            //         const data = await response.json();
            //         console.log(data);
            //         setSubgreddits_joined(data);
            //         setorg_subgreddits_joined(data);
            //     } catch (err) {
            //         console.error(err);
            //     }
            // };
            // fetchJoinedSubgreddits();

            const fetchSubgreddits = async () => {
                try {
                    const response = await fetch("http://localhost:5000/Subgreddit/list", {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                        },
                    });
                    const data = await response.json();
                    console.log(data);
                    setSubgreddits_all(data);
                    setorg_subgreddits_all(data);
                } catch (err) {
                    console.error(err);
                }
            };
            fetchSubgreddits();
        }
    }, [])

    // console.log('all');
    // console.log(subgreddits_all);
    // console.log('joined');
    // console.log(org_subgreddits_joined);
    // // const remaining = subgreddits_all.filter((subgreddit) => {
    // //     return !org_subgreddits_joined.includes(subgreddit);
    // // });
    // const org_subgreddit_remain = subgreddits_all.filter((subgreddit) => {
    //     const subgredditStr = JSON.stringify(subgreddit);
    //     return !org_subgreddits_joined.some((joinedSubgreddit) => {
    //       const joinedSubgredditStr = JSON.stringify(joinedSubgreddit);
    //       return subgredditStr === joinedSubgredditStr;
    //     });
    //   });

    //   console.log("remaining");
    //   let subgreddits_remain = org_subgreddit_remain;
    //   console.log(subgreddits_remain);
    // // console.log(remaining);

    // const [subgreddits_remain, setSubgreddits_remain] = useState([]);
    // const [org_subgreddits_remain, setorg_subgreddits_remain] = useState([]);
    // setSubgreddits_remain(remaining);

    const sorting = (option) => {
        console.log(option);
        console.log("help");
        if (sortOption === option) {
            return;
        }

        if (option === "asc") {
            const sortedSubgreddits_all = [...subgreddits_all].sort((a, b) =>
                a.name_subgre.localeCompare(b.name_subgre, undefined, {
                    sensitivity: "base",
                })
            );
            setSubgreddits_all(sortedSubgreddits_all);
            // setSortOption("asc");
        } else if (option === "des") {
            const sortedSubgreddits_all = [...subgreddits_all].sort((a, b) =>
                b.name_subgre.localeCompare(a.name_subgre, undefined, {
                    sensitivity: "base",
                })
            );
            setSubgreddits_all(sortedSubgreddits_all);
            // setSortOption("des");
        } else if (option === "creationDate") {
            setSubgreddits_all(org_subgreddits_all);
            // setSortOption("creationDate");
            // console.log("in sorted rightnow");
            // console.log(subgreddits_remain);
        }
        else if (option === "followers") {
            console.log("enters followers");
            const sortedSubgreddits_all = [...subgreddits_all].sort((a, b) =>
                b.followers.length - a.followers.length
            );
            setSubgreddits_all(sortedSubgreddits_all);
        }

        setSortOption(option);
    };

    // const sorting_remain = (option) => {
    //     console.log(option);
    //     console.log("help");
    //     if (sortOption === option) {
    //         return;
    //     }
    //     if (option === "asc") {
    //         const sortedSubgreddits_remain = [...subgreddits_remain].sort((a, b) =>
    //             a.name_subgre.localeCompare(b.name_subgre, undefined, {
    //                 sensitivity: "base",
    //             })
    //         );
    //         subgreddits_remain = sortedSubgreddits_remain;
    //         console.log("in sorted rightnow");
    //     console.log(subgreddits_remain);
    //     }
    //     else if (option === "des") {
    //         const sortedSubgreddits_remain = [...subgreddits_remain].sort((a, b) =>
    //             b.name_subgre.localeCompare(a.name_subgre, undefined, {
    //                 sensitivity: "base",
    //             })
    //         );
    //         subgreddits_remain = sortedSubgreddits_remain;
    //         console.log("in sorted rightnow");
    //         console.log(subgreddits_remain);
    //         // setSortOption("des");
    //     }
    //     else if (option === "creationDate") {
    //         subgreddits_remain = org_subgreddit_remain;
    //         // setSortOption("creationDate");
    //         console.log("in sorted rightnow");
    //         console.log(subgreddits_remain);
    //     }
    //     setSortOption(option);
    // }

    const searchSubgreddits = (text) => {
        const options = {
            includeScore: true,
            keys: ["name_subgre"],
            threshold: 0.3,
        };
        const fuse = new Fuse(subgreddits_all, options);
        const results = fuse.search(text.toLowerCase());
        setSearchResults(results.map((result) => result.item));
    };

    // const searchSubgreddits_remain = (text) => {
    //     const options = {
    //         includeScore: true,
    //         keys: ["name_subgre"],
    //         threshold: 0.3,
    //     };
    //     const fuse = new Fuse(subgreddits_remain, options);
    //     const results = fuse.search(text.toLowerCase());
    //     setSearchResults_remain(results.map((result) => result.item));
    // };

    useEffect(() => {
        sorting(sortOption);
    }, [subgreddits_all, sortOption]);

    // useEffect(() => {
    //     sorting_remain(sortOption);
    // }, [subgreddits_remain, sortOption]);

    // useEffect(() => {
    //     searchSubgreddits_joined(searchText);
    // }, [searchText]);

    useEffect(() => {
        searchSubgreddits(searchText);
    }, [searchText]);
    // useEffect(() => {
    //     const options = {
    //         includeScore: true,
    //         keys: ['name_subgre']
    //     };
    //     const fuse = new Fuse(subgreddits, options);
    //     const results = fuse.search(searchText);
    //     setSubgreddits(results.map(result => result.item));
    // }, [searchText, subgreddits]);
    const join_check = (user_id, subgreddit) => {
        console.log(subgreddit);
        console.log(user_id);
        // if(subgreddit_info.followers === []){
        //     return false;
        // }
        if (subgreddit.followers.includes(user_id)) {
            return true;
        }
        else {
            return false;
        }
    };

    const token = localStorage.getItem('token');

    const join = async (user_id, subgreddit) => {
        console.log("Joining request sent");
        console.log(user_id);
        console.log(subgreddit);
        try {
            const response = await fetch(`http://localhost:5000/SubGreddit/${subgreddit._id}/joinrequest`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await response.json();
            console.log(data);
            if (data) {
                console.log(data);
                // window.location.reload();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleOpen = async (subgreddiitId, moderator) => {
        console.log(subgreddiitId);
        console.log(moderator);
        localStorage.setItem('subgreddit_id', subgreddiitId);
        const userId = localStorage.getItem('user_id');
        if (userId === moderator) {
            window.location.href = `http://localhost:3000/mysubgreddit/${subgreddiitId}`;
        }
        else {
            window.location.href = `http://localhost:3000/subgreddit/${subgreddiitId}`
        }
    };


    // console.log(displaysubgreddits);
    let isModerator = false;
    // setdisplaySubGreddit(subgreddits);
    const moderator_check = (moderator_id) => {
        const user_id = localStorage.getItem('user_id');
        if (user_id === moderator_id) {
            return true;
        }
        return false;
    };

    const displaysubgreddits = searchText ? searchResults : subgreddits_all;
    // const displaysubgreddits_remain = searchText ? searchResults_remain : subgreddits_remain;
    const user_id = localStorage.getItem('user_id');
    console.log(user_id);
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
                        <Paper
                            component="form"
                            sx={{ p: '2px 4px', display: 'flex', marginTop: 3, marginBottom: 3, alignItems: 'center', width: 445 }}
                        >
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Search Subgreddits"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                inputProps={{ 'aria-label': 'search google maps' }}
                            />
                            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={() => searchSubgreddits(searchText)}>
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                    </Grid>
                    <Grid item container>
                        {/* <Grid item xs={2}>
                                <Typography fontFamily={["Lora", "serif"].join(",")} fontSize="large">SORT: </Typography>
                            </Grid> */}
                        <Grid item xs={12}>
                            <center>
                                <ButtonGroup variant="outlined" aria-label="outlined button group" size="small">
                                    <Button onClick={() => sorting("asc")}>Ascending</Button>
                                    <Button onClick={() => sorting("des")}>Descending</Button>
                                    <Button onClick={() => sorting("creationDate")}>Creation Date</Button>
                                    <Button onClick={() => sorting("followers")}>Followers</Button>
                                </ButtonGroup>
                            </center>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container className="container" spacing={2} marginTop={2}>
                            <Divider />
                            <Typography variant="h4" fontFamily={["Lora", "serif"].join(",")}>&ensp; Joined Subgreddits</Typography>
                            <Divider />
                            {displaysubgreddits.filter((subgreddit) => subgreddit.followers.includes(user_id)).map((subgreddit) => (
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
                                                        Posts: 17
                                                    </Typography>
                                                    <Typography fontFamily={["Lora", "serif"].join(",")} variant="body2" color="text.secondary">
                                                        {/* Lorem ipsum I love me myself and I, self love bitch...She can kill me and you and fuck us all upand all her friends are big bullies I wanna kill myself  */}
                                                        {subgreddit.description}
                                                    </Typography>
                                                    <Typography fontFamily={["Lora", "serif"].join(",")} variant="body1" color="text.prmiary">Banned Keywords: </Typography>
                                                    {subgreddit.banned_keywords.map((word) => (
                                                        <Typography fontFamily={["Lora", "serif"].join(",")} variant="body2" color="text.secondary">{word}</Typography>
                                                    ))}
                                                </Grid>
                                                <Grid item container>
                                                    <Button variant="outlined" onClick={() => handleOpen(subgreddit._id, subgreddit.moderator)}>
                                                        <Typography fontFamily={["Lora", "serif"].join(",")} sx={{ cursor: 'pointer' }} variant="body2">
                                                            Open
                                                        </Typography>
                                                    </Button>
                                                    &ensp;
                                                    {isModerator = moderator_check(subgreddit.moderator)}
                                                    {
                                                        isModerator ? (
                                                            <>
                                                                <Button variant="outlined" disabled>
                                                                    <Typography fontFamily={["Lora", "serif"].join(",")} sx={{ cursor: 'pointer' }} variant="body2">
                                                                        Leave
                                                                    </Typography>
                                                                </Button>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Button variant="outlined" >
                                                                    <Typography fontFamily={["Lora", "serif"].join(",")} sx={{ cursor: 'pointer' }} variant="body2">
                                                                        Leave
                                                                    </Typography>
                                                                </Button>
                                                            </>
                                                        )
                                                    }
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
                    <Grid item>
                        <Grid container className="container" spacing={2} marginTop={0}>
                            <Divider />
                            <Typography variant="h4" fontFamily={["Lora", "serif"].join(",")}>&ensp; Remaining Subgreddits</Typography>
                            <Divider />
                            {displaysubgreddits.filter((subgreddit) => !subgreddit.followers.includes(user_id)).map((subgreddit) => (
                                <Grid item key={subgreddit._id}>
                                    <Grid container spacing={2}>
                                        <Grid item>
                                            <Grid item container spacing={2}>
                                                <Grid item>
                                                    <Typography fontFamily={["Lora", "serif"].join(",")} gutterBottom variant="h6" component="div">
                                                        {subgreddit.name_subgre}
                                                    </Typography>
                                                    <Typography fontFamily={["Lora", "serif"].join(",")} variant="body2" gutterBottom>
                                                        Followers: {subgreddit.followers.length}
                                                    </Typography>
                                                    <Typography fontFamily={["Lora", "serif"].join(",")} variant="body2" color="text.primary">
                                                        Posts: 17
                                                    </Typography>
                                                    <Typography fontFamily={["Lora", "serif"].join(",")} variant="body2" color="text.secondary">
                                                        {/* Lorem ipsum I love me myself and I, self love bitch...She can kill me and you and fuck us all upand all her friends are big bullies I wanna kill myself  */}
                                                        {subgreddit.description}
                                                    </Typography>
                                                </Grid>
                                                <Grid item container>
                                                    {/* <Button> */}
                                                    {join_check(user_id, subgreddit) ? (
                                                        <>
                                                            <Button variant="outlined" onClick={() => handleOpen(subgreddit._id, subgreddit.moderator)} >
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
                                                        </>
                                                    ) : (
                                                        <Button variant="outlined">
                                                            <Typography fontFamily={["Lora", "serif"].join(",")} sx={{ cursor: 'pointer' }} variant="body2" onClick={() => join(user_id, subgreddit)}>
                                                                Join
                                                            </Typography>
                                                        </Button>
                                                    )}

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
