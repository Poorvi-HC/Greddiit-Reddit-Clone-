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
import { useParams } from "react-router-dom";

export default function AddComment(props) {
    const { posts } = props;
    const [open, setOpen] = React.useState(false);
    const token = localStorage.getItem("token");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        window.location.reload();
    };

    const CommentSchema = yup.object().shape({
        text: yup.string().required("required"),
    });

    const initialValuesComment = {
        text: "",
    };

    const Comment = async (values) => {
        console.log("enters comment");
        const subgreddiitId = localStorage.getItem("subgreddit_id");
        console.log("here");
        // const { posts } = useParams();
        console.log(posts);
        const PostId = posts._id;
        console.log(PostId);
        const newComment = {
            text: values.text,
        };

        try {
            const response = await fetch(`http://localhost:5000/mySubGreddit/${subgreddiitId}/Post/${PostId}/comment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(newComment),
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
            await CommentSchema.validate(values, { abortEarly: false });
            await Comment(values);
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
            <Button size="small" onClick={handleClickOpen}>Comment</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle fontFamily={["Lora", "serif"].join(",")}
                    fontSize={25}>Add new comment</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
            Edit the information
          </DialogContentText> */}
                    <Formik onSubmit={handleFormSubmit} initialValues={initialValuesComment} validationSchema={CommentSchema}>
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
                                            id="text"
                                            label="Content Maker"
                                            type="text"
                                            fullWidth
                                            variant="standard"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.text}
                                            error={
                                                Boolean(touched.text) && Boolean(errors.text)
                                            }
                                            helperText={touched.text && errors.text}
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
