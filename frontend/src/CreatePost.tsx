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
import { Stack } from "@mui/material";

export default function CreatePost() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        window.location.reload();
    };

    const PostSchema = yup.object().shape({
        title: yup.string().required("required"),
        description: yup.string().required("required"),
    });

    const initialValuesPost = {
        title: "",
        description: "",
    };

    const Post = async (values) => {
        let tit = values.title;
        let des = values.description;
        let banned_phrases = localStorage.getItem('banned_keywords').split(',');
        console.log(banned_phrases);
        banned_phrases.forEach((phrase) => {
            let regex = new RegExp(phrase, 'gi');
            tit = tit.replace(regex, '*'.repeat(phrase.length));
            des = des.replace(regex, '*'.repeat(phrase.length));
        });
        if (values.title != tit || values.description != des){
            alert("There are some banned-keywords used in the title and description");
        }
        const newPost = {
            title: tit,
            description: des,
            posted_by: localStorage.getItem('user_id'),
            posted_in: localStorage.getItem('subgreddit_id'),
        };

        try {
            const response = await fetch("http://localhost:5000/Post/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newPost)
            });

            const data = await response.json();
            // console.log("new subgreddit registered");
            console.log(data);
            if (data) {
                handleClose()
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleFormSubmit = async (values, onSubmitProps) => {
        console.log("enters handleForm");
        try {
            await PostSchema.validate(values, { abortEarly: false });
            await Post(values);
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
            <Stack
                sx={{ pt: 1, width: '675%' }}
                direction="column"
                spacing={2}
            >
                <Button variant="outlined" onClick={handleClickOpen}>CREATE POST</Button>
            </Stack>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle fontFamily={["Lora", "serif"].join(",")}
                    fontSize={25}>Add new Post</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
            Edit the information
          </DialogContentText> */}
                    <Formik onSubmit={handleFormSubmit} initialValues={initialValuesPost} validationSchema={PostSchema}>
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
                                            id="title"
                                            label="Title of Post"
                                            type="text"
                                            fullWidth
                                            variant="standard"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.title}
                                            error={
                                                Boolean(touched.title) && Boolean(errors.title)
                                            }
                                            helperText={touched.title && errors.title}
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
