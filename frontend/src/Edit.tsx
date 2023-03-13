import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import * as yup from "yup";
import { Formik } from "formik";
import { Box } from "@mui/material";
import ProfilePage from "./ProfilePage";
import { useNavigate } from "react-router-dom";
// import ProfilePage from "./ProfilePage";


export default function Edit(props) {
    const [open, setOpen] = React.useState(false);
    const { user } = props;
    // // const [user_info, setUser] = useState(user);
    // console.log("user_info");
    // console.log(user_info);
    // console.log("user");
    // console.log(user);
    const navigate = useNavigate();

    // console.log(user);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCloseEdit = () => {
        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    }

    const EditSchema = yup.object().shape({
        firstName: yup.string(),
        lastName: yup.string(),
        email: yup.string().email("invalid email"),
        password: yup.string(),
        age: yup.number(),
        phoneno: yup.string(),
        username: yup.string(),
    });

    // console.log("why no user_info");
    // console.log(user_info);
    // const initialValuesEdit = {
    //     firstName: {user.firstName},
    //     lastName: "",
    //     email: "",
    //     password: "",
    //     age: "",
    //     phoneno: "",
    //     username: "",
    // };

    const initialValuesEdit = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        age: user.age,
        phoneno: user.phoneno,
        username: user.username,
    };

    // const dispatch = useDispatch();
    //   const navigate = useNavigate();
    const edit = async (values) => {
        const edited_user = {
            firstName: values.firstName,
            lastName: values.lastName,
            username: values.username,
            email: values.email,
            password: values.password,
            age: values.age,
            phoneno: values.phoneno,
        };
        const token = localStorage.getItem('token');
        try {
            const response = await fetch("http://localhost:5000/profile/edit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(edited_user)
            });

            const data = await response.json();
            console.log(data);
            if (data.message !== undefined ) {
                alert(data.message);
                window.location.reload();
            }
            if (data){
                window.location.reload();
            }
        } catch (err) {
            // alert(err);
            console.error(err);
        }
    };

    const handleFormSubmit = async (values, onSubmitProps) => {
        try {
            await EditSchema.validate(values, { abortEarly: false });
            await edit(values);
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
        <div>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
        Edit
      </Button> */}
            <Button size="large" className="m-2" onClick={handleClickOpen}>
                <Typography fontSize={20} fontFamily={["Lora", "serif"].join(",")}> Edit </Typography>
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle fontFamily={["Lora", "serif"].join(",")}
                    fontSize={25}>Edit</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
            Edit the information
          </DialogContentText> */}
                    <Formik onSubmit={handleFormSubmit} initialValues={initialValuesEdit} validationSchema={EditSchema}>
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
                            <Box component="form" noValidate onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            // autoComplete="localStorage.getItem('fname')"
                                            // defaultValue={user_info.firstName}
                                            // onChange={(e) => {localStorage.setItem("fname", e.target.value)}}
                                            autoFocus
                                            margin="dense"
                                            id="firstName"
                                            label="First Name"
                                            type="text"
                                            fullWidth
                                            variant="standard"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.firstName}
                                            error={
                                                Boolean(touched.firstName) && Boolean(errors.firstName)
                                            }
                                            helperText={touched.firstName && errors.firstName}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            // autoComplete="entered last name"
                                            // defaultValue={user_info.lastName}
                                            // onChange={(e) => {localStorage.setItem("lname", e.target.value)}}
                                            autoFocus
                                            margin="dense"
                                            id="lastName"
                                            label="Last Name"
                                            type="text"
                                            fullWidth
                                            variant="standard"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.lastName}
                                            error={
                                                Boolean(touched.lastName) && Boolean(errors.lastName)
                                            }
                                            helperText={touched.lastName && errors.lastName}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            // defaultValue={user_info.username}
                                            // onChange={(e) => {localStorage.setItem("uname", e.target.value)}}
                                            autoFocus
                                            margin="dense"
                                            id="username"
                                            label="Username"
                                            type="text"
                                            fullWidth
                                            variant="standard"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.username}
                                            error={Boolean(touched.username) && Boolean(errors.username)}
                                            helperText={touched.username && errors.username}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            // defaultValue={user_info.email}
                                            // onChange={(e) => {localStorage.setItem("email", e.target.value)}}
                                            autoFocus
                                            margin="dense"
                                            id="email"
                                            label="Email Address"
                                            type="email"
                                            fullWidth
                                            variant="standard"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.email}
                                            error={Boolean(touched.email) && Boolean(errors.email)}
                                            helperText={touched.email && errors.email}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            // defaultValue={user_info.age}
                                            // onChange={(e) => {localStorage.setItem("age", e.target.value)}}
                                            autoFocus
                                            margin="dense"
                                            id="age"
                                            label="Age"
                                            type="text"
                                            fullWidth
                                            variant="standard"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.age}
                                            error={Boolean(touched.age) && Boolean(errors.age)}
                                            helperText={touched.age && errors.age}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            // defaultValue={user_info.phoneno}
                                            // onChange={(e) => {localStorage.setItem("contact", e.target.value)}}
                                            autoFocus
                                            margin="dense"
                                            id="contact"
                                            label="Contact Number"
                                            type="text"
                                            fullWidth
                                            variant="standard"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.phoneno}
                                            error={Boolean(touched.phoneno) && Boolean(errors.phoneno)}
                                            helperText={touched.phoneno && errors.phoneno}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            // defaultValue={localStorage.getItem('password')}
                                            autoFocus
                                            // defaultValue={user.password}
                                            margin="dense"
                                            id="password"
                                            label="New Password"
                                            type="password"
                                            fullWidth
                                            variant="standard"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.password}
                                            error={Boolean(touched.password) && Boolean(errors.password)}
                                            helperText={touched.password && errors.password}
                                        />
                                    </Grid>
                                    {/* <Grid item xs={12}>
                            <TextField
                                // defaultValue={localStorage.getItem('password')}
                                onChange={(e) => {localStorage.setItem("password", e.target.value)}}
                                autoFocus
                                margin="dense"
                                id="password-check"
                                label="Re-enter new Password"
                                type="password"
                                fullWidth
                                variant="standard"
                            />
                        </Grid> */}
                                </Grid>
                                <DialogActions>
                                    <Button autoFocus size="large" className="m-2" onClick={handleClose}><Typography fontSize={20} fontFamily={["Lora", "serif"].join(",")}>Cancel</Typography></Button>
                                    <Button autoFocus size="large" className="m-2" type="submit" onClick={handleCloseEdit}><Typography fontSize={20} fontFamily={["Lora", "serif"].join(",")}>Edit</Typography></Button>
                                </DialogActions>
                            </Box>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
        </div>
    );
}
