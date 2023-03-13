import * as React from 'react';
import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import LockIcon from '@mui/icons-material/Lock';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import SignUp from './SignUp';
import FacebookIcon from '@mui/icons-material/Facebook';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import { Link , Route } from 'react-router-dom';
import theme from './theme';
import Following from "./Following.tsx";
import Follower from "./Follower.tsx";
import Edit from "./Edit.tsx";
import Info from "./Info.tsx";
import AuthPage from './AuthPage';
// let theme = createTheme();

// theme = responsiveFontSizes(theme);

// import React from 'react';
// import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';

export default function ProfilePage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    user_followers:[],
    user_following:[],
    age:0,
    phoneno:0
  });

  console.log("entered profile function");
  console.log(localStorage.getItem('token'));

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("entered UseEffect");
    if (token) {
      console.log("entered profile page");
      // Check the token with the server to verify it is still valid
      fetch('http://localhost:5000/profile', {
       
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        }
      })
        .then(response => {
          if (response.ok) {
            console.log(response);
            console.log("Responce not ok at all");
            setAuthenticated(true);
            response.json().then(user => {
              setUser(user);
            });
          } else {
            // Invalid token, remove it from local storage
            console.log(response);
            console.log("Responce not ok");
            localStorage.removeItem('token');
            localStorage.removeItem('check');
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, []);

  console.log("Authenticated?");
  // if (!authenticated) {
  //   console.log("No");
  //   return (
  //     <AuthPage />
  //   );
  // }
  console.log("YES");
  // const token = localStorage.getItem("token");
  // console.log(token.id);
  // console.log(user);
  localStorage.setItem('user_id', user._id);
  // module.exports = user;
  return (
    
    <ThemeProvider theme={theme}>
      {/* { authenticated ? ( */}
      <Box className="vh-100" fluid="true">
        <Container className="container py-5 h-100">
          {/* <center> */}
          <Card style={{ 'borderRadius': '10px' }}>
            <CardActionArea className="text-center">
              <div className="mt-3 mb-4">
                {/* <CardMedia src="./user.jpg"
                    className="rounded-circle" fluid style={{ 'width': '100px' }} /> */}
                {/* <AccountCircleIcon fontSize='large'></AccountCircleIcon> */}
                <center><Avatar
                  // alt="Julie"
                  // src={require("/home/poorvi/Documents/Sem-4/DASS/Assignment1/create-react-app/src/user.jpg")}
                  sx={{ width: 140, height: 140 }}
                /></center>
              </div>
              <div className='m-4'>
                <Typography variant="h3" component="div" fontFamily={["Lora", "serif"].join(",")}>{user.firstName} {user.lastName}</Typography>
              </div>
              <CardContent className="text-muted mb-4">
                {/* <Typography fontFamily={["Lora", "serif"].join(",")} variant="h6">@Programmer <span className="mx-2">|</span> <Link href="#!">mdbootstrap.com</Link></Typography> */}
                <div className="mb-4 pb-2 m-2">
                  <IconButton>
                    <FacebookIcon fontSize="large" />
                  </IconButton>
                  <IconButton className="mx-1">
                    <TwitterIcon fontSize="large" />
                  </IconButton>
                  <IconButton>
                    <InstagramIcon fontSize="large" />
                  </IconButton>
                </div>
                {/* <center> */}
                <div className="mb-4 pb-2 m-1">
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      {/* <Button rounded size="large" className="m-2">
                        <Typography fontSize={20} fontFamily={["Lora", "serif"].join(",")}>Info</Typography>
                      </Button> */}
                      <Info user={user}/>
                    </Grid>
                    <Grid item xs={4}>
                      <Button size="large" className="m-2">
                        <Typography fontSize={20} fontFamily={["Lora", "serif"].join(",")}>Follow</Typography>
                      </Button>
                    </Grid>
                    <Grid item xs={4}>
                      {/* <Button rounded size="large" className="m-2">
                    <Typography fontSize={20} fontFamily={["Lora", "serif"].join(",")}> Edit </Typography>
                  </Button> */}
                      <Edit user={user}/>
                    </Grid>
                  </Grid>
                </div>
                {/* </center> */}
                {/* <div className="container d-flex justify-content-between text-center mt-0 mb-0"> */}
                <div className="row px-0 ms-0">
                  {/* <div className="col">
                      <Typography className="mb-1 h5" variant="h5">34</Typography>
                      <Button>
                        <Typography className="small text-muted mb-0" variant="h6">Wallets Balance</Typography>
                      </Button>
                    </div> */}
                  <div className="col">
                    <Typography className="mb-1 h5" variant="h5" fontFamily={["Lora", "serif"].join(",")}>{user.user_followers.length}</Typography>
                    {/* <Button onClick={() => {return(<Follow/>)}}> */}
                    {/* <Button onClick={()=>{return(<Follow/>)}}>
                      // <Typography className="small text-muted mb-0" variant="h6" fontFamily={["Lora", "serif"].join(",")}>Followers</Typography>
                    </Button> */}
                    <Follower />
                  </div>
                  <div className="col">
                    <Typography className="mb-1 h5" variant="h5" fontFamily={["Lora", "serif"].join(",")}>{user.user_following.length}</Typography>
                    {/* <Button> */}
                    {/* <Typography className="small text-muted mb-0" fontFamily={["Lora", "serif"].join(",")} variant="h6">Following</Typography> */}
                    {/* </Button> */}
                    <Following />
                  </div>
                </div>
                {/* </div> */}
              </CardContent>
            </CardActionArea>
          </Card>
          {/* </center> */}
        </Container>
      </Box>
    </ThemeProvider>
  );
}