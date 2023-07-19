import * as React from 'react';
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
import SignUp from './SignUp';
import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import * as yup from "yup";
import { Formik } from "formik";

// import { Link , Route } from 'react-router-dom';

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// const theme = createTheme();

let theme = createTheme({
  palette: {
    primary: {
      main: '#EE6E01',
    },
    secondary: {
      main: '#EE6E01',
    },
  },
  typography: {
    htmlFontSize: 16,
    // fontFamily: ["Aboreto", "cursive"].join(",") 
  }
});

theme = responsiveFontSizes(theme);

export default function SignIn(props) {
  // console.log("enters SignIn");
  const navigate = useNavigate();
  const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
  });

  const initialValuesLogin = {
    email: "",
    password: "",
  };

  const login = async (values) => {
    try {
      const loggedInResponse = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const loggedIn = await loggedInResponse.json();
      console.log(loggedIn);
      if(loggedIn.message !== undefined){
        alert(loggedIn.message);
      }
      if(loggedInResponse.status === 200)
      {
        console.log("entered responce if");
        localStorage.setItem("check", "true");
        localStorage.setItem("token", loggedIn.token);
        // navigate('/profile');
        window.location.href = 'http://localhost:3000/profile';
      }

    } catch(err){
      console.error(err);
    }
  };

  // const handleSubmit =  => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   });


  //   if (data.get('email') === "admin" && data.get('password') === "admin"){
  //     // console.log("bitch");
  //     localStorage.setItem('check', 'true');
  //     navigate('/profile');
  //   }

  // };
  const handleFormSubmit = async (values, onSubmitProps) => {
    try {
      await loginSchema.validate(values, { abortEarly: false });
      await login(values);
    } catch (error) {
      const errors = {};
      if (error.inner) {
        error.inner.forEach((err) => {
          errors[err.path] = err.message;
        });
      }
      onSubmitProps.setErrors(errors);
    }
  };

  // console.log("returns out of SignIN");
  return (
    <>
      <center><Typography variant="h2" fontFamily={["Aboreto", "cursive"].join(",")}>Greddit</Typography></center>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Formik onSubmit={handleFormSubmit} initialValues={initialValuesLogin} validationSchema={loginSchema}>
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
              }) => (
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    error={Boolean(touched.email) && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    error={Boolean(touched.password) && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                  {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    // onClick={() => { if (localStorage.getItem('check')) navigate('/') }}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
                    <Grid item>
                      <Link onClick={() => props.onFormSwitch('register')} variant="body2" >
                        {"Don't have an account? Sign Up"}
                        {/* <SignUp /> */}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Formik>
          </Box>
          {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
        </Container>
      </ThemeProvider>
    </>
  );
}