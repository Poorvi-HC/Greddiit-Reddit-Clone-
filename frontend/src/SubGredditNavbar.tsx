import * as React from "react";
// import './Navbar.js';
// import './Navbar.scss';
import { useNavigate } from "react-router-dom";
// import { theme } from "./theme.js";
// import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import { color } from "@mui/system";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import List from '@mui/material/List';
import { Divider } from '@mui/material';
import PagesIcon from '@mui/icons-material/Pages';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Outlet } from "react-router-dom";
import PeopleIcon from '@mui/icons-material/People';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ReportIcon from '@mui/icons-material/Report';



let theme = createTheme({
    palette: {
        primary: {
            main: '#EE6E01',
        },
        secondary: {
            main: '#EE6E01',
        },
        //   error: {
        //     main: red.A400,
        //   },
    },
});

// theme = responsiveFontSizes(theme);

export default function SubGredditNavbar() {
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!localStorage.getItem('check')) navigate('/');
    }, [navigate]);

    const logout = () => {
        localStorage.removeItem('check');
        navigate('/');
    }

    const subgreddiitId = localStorage.getItem('subgreddit_id');
    // return (<div> test from navbar</div>)

    return (
        <>
            <ThemeProvider theme={theme}>
                {/* <div className="h-100 d-flex flex-column"> */}
                <div style={{ "height": "120px" }}>
                    <AppBar className="navbar navbar-expand-lg bg-light" style={{ "backgroundColor": "#EE6E01" }}>
                        <Container className="container-fluid">
                            <CssBaseline />
                            <IconButton className="navbar-brand" onClick={() => navigate('/profile')}><Typography variant="h5" fontFamily={["Aboreto", "cursive"].join(",")}>Greddit</Typography></IconButton>
                            <Button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </Button>
                            <Box className="collapse navbar-collapse" id="navbarScroll">
                                {/* <ListItemButton> */}
                                <ListItemIcon>
                                    <HomeIcon fontSize="medium" />
                                    &nbsp;
                                    <Link className="nav-link" onClick={() => navigate('/subgreddit')}><Typography variant="subtitle1" fontFamily={["Lora", "serif"].join(",")}>Subgreddiits</Typography></Link>
                                    &nbsp;
                                </ListItemIcon>
                                {/* </ListItemButton> */}
                                &ensp;
                                {/* <ListItemButton className="nav-item"> */}
                                <ListItemIcon>
                                    <PagesIcon fontSize="medium" />
                                    &nbsp;
                                    <Link className="nav-link" onClick={() => navigate('/mysubgreddit')}><Typography variant="subtitle1" fontFamily={["Lora", "serif"].join(",")}>My SubGreddiits</Typography></Link>
                                    &nbsp;
                                </ListItemIcon>
                                {/* </ListItemButton> */}
                                &ensp;
                                {/* <ListItemButton className="nav-item"> */}
                                <ListItemIcon>
                                    <BookmarkIcon fontSize="medium" />
                                    &nbsp;
                                    <Link className="nav-link" href="#">
                                        <Typography variant="subtitle1" fontFamily={["Lora", "serif"].join(",")} onClick={() => navigate('/saved')}>Saved Posts</Typography>
                                    </Link>
                                    &nbsp;
                                </ListItemIcon>
                                &ensp;
                                {/* </ListItemButton> */}
                                {/* <ListItemButton className="nav-item" onClick={() => navigate('/profile')}> */}
                                <ListItemIcon>
                                    <AccountCircleIcon fontSize="medium" />
                                    &nbsp;
                                    <Link className="nav-link" onClick={() => navigate('/profile')}><Typography variant="subtitle1" fontFamily={["Lora", "serif"].join(",")}>User Profile</Typography></Link>
                                    &nbsp;
                                </ListItemIcon>
                                {/* </ListItemButton> */}
                                {/* <ListItemButton className="nav-item" onClick={() => navigate('/profile')}> */}
                                &ensp;
                                <ListItemIcon>
                                    <PeopleIcon fontSize="medium" />
                                    &nbsp;
                                    <Link className="nav-link" onClick={() => navigate(`/mysubgreddit/${subgreddiitId}/users`)}><Typography variant="subtitle1" fontFamily={["Lora", "serif"].join(",")}>Users</Typography></Link>
                                    &nbsp;
                                </ListItemIcon>
                                &ensp;
                                {/* </ListItemButton> */}
                                {/* <ListItemButton className="nav-item" onClick={() => navigate('/profile')}> */}
                                <ListItemIcon>
                                    <LibraryAddIcon fontSize="medium" />
                                    &nbsp;
                                    <Link className="nav-link" onClick={() => navigate(`/mysubgreddit/${subgreddiitId}/requests`)}><Typography variant="subtitle1" fontFamily={["Lora", "serif"].join(",")}>Joining Requests</Typography></Link>
                                    &nbsp;
                                </ListItemIcon>
                                &ensp;
                                {/* </ListItemButton> */}
                                {/* <ListItemButton className="nav-item" onClick={() => navigate('/profile')}> */}
                                <ListItemIcon>
                                    <AnalyticsIcon fontSize="medium" />
                                    &nbsp;
                                    <Link className="nav-link"><Typography variant="subtitle1" fontFamily={["Lora", "serif"].join(",")}>Stats</Typography></Link>
                                    &nbsp;
                                </ListItemIcon>
                                &ensp;
                                {/* </ListItemButton> */}
                                {/* <ListItemButton className="nav-item" onClick={() => navigate('/profile')}> */}
                                <ListItemIcon>
                                    <ReportIcon fontSize="medium" />
                                    &nbsp;
                                    <Link className="nav-link"><Typography variant="subtitle1" fontFamily={["Lora", "serif"].join(",")}>Reported Page</Typography></Link>
                                    &nbsp;
                                </ListItemIcon>
                                &ensp;
                                {/* </ListItemButton> */}
                                <Box component="form" className="d-flex" role="search">
                                    <Button className="btn btn-outline" type="submit" onClick={() => logout()}><Typography variant="h6" fontFamily={["Lora", "serif"].join(",")}>Logout</Typography></Button>
                                </Box>
                            </Box>
                        </Container>
                    </AppBar>
                </div>
                {/* <div className="flex-column flex-grow-1"> */}
                <Outlet />
                {/* </div> */}
                {/* </div> */}
            </ThemeProvider>
        </>

    )
}