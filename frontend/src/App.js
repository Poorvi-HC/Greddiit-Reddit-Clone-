import * as React from "react";
import { useState } from "react";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import ProTip from './ProTip';
import SignIn from './SignIn.js';
import SignUp from './SignUp.js';
import AuthPage from './AuthPage.js';
import Navbar from './Navbar.js';
import ProfilePage from './ProfilePage.js';
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"
// import Random from './random.js';
import SavedPosts from './SavedPosts.tsx';
// import Follower from './Follower.tsx';
import MySubGreddiit from "./MySubGreddiit.tsx";
import Open from "./OpenSubGreddit.tsx";
import SubGredditNavbar from "./SubGredditNavbar.tsx";
import AllSubGreddiit from "./AllSubgreddiit.tsx";
import JoiningRequests from "./JoiningRequests.tsx";
import Users from "./Users.js";
// import { Provider } from "react-redux";
// import { store } from "./store";
// import MySubGreddit from "./MySubGreddit.tsx";


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

export default function App() {
  // console.log("I entered App.js");
  // const [currentForm, setCurrentForm] = useState('login');

  // const toggleForm = (formName) => {
  //   setCurrentForm(formName);
  // }
  // return (
  //   // <Container maxWidth="sm">
  //   //   <Box sx={{ my: 4 }}>
  //   //     <Typography variant="h4" component="h1" gutterBottom>
  //   //       Create React App example
  //   //     </Typography>
  //   //     <ProTipropsp />
  //   //     <Copyright />
  //   //   </Box>
  //   // </Container>
  //   <div id="App">
  //     {
  //       currentForm === "login" ? <SignIn onFormSwitch={toggleForm} /> : <SignUp onFormSwitch={toggleForm} />
  //     }
  //   </div>
  // );
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<AuthPage />} />
        <Route element={<Navbar />} >
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/mysubgreddit' element={<MySubGreddiit />} />
          <Route path='/subgreddit' element={<AllSubGreddiit/>}/>
          <Route path='/subgreddit/:subgreddiitId' element={<Open />} />
          {/* <Route path='/random' element={<Random />} /> */}
          {/* <Route path="/follow" element={<Follow/>} /> */}
        </Route>
        <Route element={<SubGredditNavbar />}>
          <Route path='/mysubgreddit/:subgreddiitId' element={<Open />} />
          <Route path='/saved' element={<SavedPosts/>}/>
          <Route path='/mysubgreddit/:subgreddiitId/requests' element={<JoiningRequests/>}/>
          <Route path='/mysubgreddit/:subgreddiitId/users' element ={<Users/>}/>
        </Route>
        {/* <Route path="*" element={<NotFound />} />  */}
      </Routes>
    </BrowserRouter>
  );
}
