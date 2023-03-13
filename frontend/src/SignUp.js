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
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import SignIn from './SignIn';
import AuthPage from './AuthPage';

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

// theme = responsiveFontSizes(theme);


export default function SignUp(props) {
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   });
  // };
  const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string(),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    age: yup.number(),
    phoneno: yup.number(),
    username: yup.string().required("required"),
  });

  const initialValuesRegister = {
    firstName: "",
    lastName: " ",
    email: "",
    password: "",
    age: "",
    phoneno: "",
    username: "",
  };

  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const register = async (values) => {
    const user = {
      firstName: values.firstName,
      lastName: values.lastName,
      username: values.username,
      email: values.email,
      password: values.password,
      age: values.age,
      phoneno: values.phoneno
    };
  
    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });
  
      const data = await response.json();
      console.log(data);
      if (data){
        props.onFormSwitch('login')
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    try {
      await registerSchema.validate(values, { abortEarly: false });
      await register(values);
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
            <Avatar sx={{ m: 1, bgcolor: '#EE6E01' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Formik onSubmit={handleFormSubmit} initialValues={initialValuesRegister} validationSchema={registerSchema}>
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
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.firstName}
                        error={
                          Boolean(touched.firstName) && Boolean(errors.firstName)
                        }
                        helperText={touched.firstName && errors.firstName}
                        // autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="family-name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.lastName}
                        error={Boolean(touched.lastname) && Boolean(errors.lastName)}
                        helperText={touched.lastName && errors.lastName}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="username"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        // autoFocus
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.username}
                        error={Boolean(touched.username) && Boolean(errors.username)}
                        helperText={touched.username && errors.username}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
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
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="age"
                        fullWidth
                        id="age"
                        label="Age"
                        // autoFocus
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.age}
                        error={Boolean(touched.age) && Boolean(errors.age)}
                        helperText={touched.age && errors.age}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete='0'
                        name="phoneno"
                        fullWidth
                        id="phoneno"
                        label="PhoneNo."
                        // autoFocus
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.phoneno}
                        error={Boolean(touched.phoneno) && Boolean(errors.phoneno)}
                        helperText={touched.phoneno && errors.phoneno}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.password}
                        error={Boolean(touched.password) && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                      />
                    </Grid>
                    {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign Up
                  </Button>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link onClick={() => props.onFormSwitch('login')} variant="body2">
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Formik>
          </Box>
          {/* <Copyright sx={{ mt: 5 }} /> */}
        </Container>
      </ThemeProvider>
    </>
  );
}