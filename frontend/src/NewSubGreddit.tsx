import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Formik } from "formik";
import { Box } from "@mui/material";
import * as yup from "yup";

export default function NewSubGreddit() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        window.location.reload();
    };

    const MySubGredditSchema = yup.object().shape({
        name_subgre: yup.string().required("required"),
        description: yup.string().required("required"),
        tags: yup.string().required("required"),
        banned_keywords: yup.string().required("required"),
        // moderator: yup.string().required("required");
    });

    const initialValuesMySubGreddit = {
        name_subgre: "",
        description: "",
        tags: "",
        banned_keywords: "",
    };

    const MySubGreddit = async (values) => {
        const banned_keywords = values.banned_keywords;
        let words = banned_keywords.split(',');
        console.log(words);
        localStorage.setItem('banned_keywords', words);
        
        const newsubgre = {
            name_subgre: values.name_subgre,
            description: values.description,
            tags: values.tags,
            banned_keywords: words,
            moderator: localStorage.getItem('user_id'),
        };

        try {
            const response = await fetch("http://localhost:5000/mySubGreddit/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newsubgre)
            });

            const data = await response.json();
            // console.log("new subgreddit registered");
            console.log(data);
            if (data) {
                alert(data.message);
                handleClose()
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleFormSubmit = async (values, onSubmitProps) => {
        console.log("enters handleForm");
        try {
            await MySubGredditSchema.validate(values, { abortEarly: false });
            await MySubGreddit(values);
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
                <Typography fontSize={20} fontFamily={["Lora", "serif"].join(",")}> Add New Subgreddit </Typography>
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle fontFamily={["Lora", "serif"].join(",")}
                    fontSize={25}>Add new Sub Greddit</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
            Edit the information
          </DialogContentText> */}
                    <Formik onSubmit={handleFormSubmit} initialValues={initialValuesMySubGreddit} validationSchema={MySubGredditSchema}>
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
                                    <Grid item xs={12}>
                                        <TextField
                                            // autoComplete="localStorage.getItem('fname')"
                                            // defaultValue={localStorage.getItem('fname')}
                                            // onChange={(e) => {localStorage.setItem("fname", e.target.value)}}
                                            autoFocus
                                            margin="dense"
                                            id="name_subgre"
                                            label="Name of SubGreddit"
                                            type="text"
                                            fullWidth
                                            variant="standard"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.name_subgre}
                                            error={
                                                Boolean(touched.name_subgre) && Boolean(errors.name_subgre)
                                            }
                                            helperText={touched.name_subgre && errors.name_subgre}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            // autoComplete="entered last name"
                                            // defaultValue={localStorage.getItem('lname')}
                                            // onChange={(e) => {localStorage.setItem("lname", e.target.value)}}
                                            autoFocus
                                            margin="dense"
                                            id="description"
                                            label="Description"
                                            type="text"
                                            fullWidth
                                            variant="standard"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.description}
                                            error={
                                                Boolean(touched.description) && Boolean(errors.description)
                                            }
                                            helperText={touched.description && errors.description}

                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            // defaultValue={localStorage.getItem('uname')}
                                            // onChange={(e) => {localStorage.setItem("uname", e.target.value)}}
                                            autoFocus
                                            margin="dense"
                                            id="tags"
                                            label="Tags"
                                            type="text"
                                            fullWidth
                                            variant="standard"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.tags}
                                            error={
                                                Boolean(touched.tags) && Boolean(errors.tags)
                                            }
                                            helperText={touched.tags && errors.tags}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            // defaultValue={localStorage.getItem('email')}
                                            // onChange={(e) => {localStorage.setItem("email", e.target.value)}}
                                            autoFocus
                                            margin="dense"
                                            id="banned_keywords"
                                            label="Banned Keywords"
                                            type="text"
                                            fullWidth
                                            variant="standard"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.banned_keywords}
                                            error={
                                                Boolean(touched.banned_keywords) && Boolean(errors.banned_keywords)
                                            }
                                            helperText={touched.banned_keywords && errors.banned_keywords}
                                        />
                                    </Grid>
                                </Grid>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button type="submit">Add</Button>
                                </DialogActions>
                            </Box>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
        </div >
    );
}
