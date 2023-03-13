import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import {Grid} from "@mui/material";
import {Divider} from "@mui/material";
import  Edit  from "./Edit.tsx";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2)
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1)
  }
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function Info(props) {
  const [open, setOpen] = React.useState(false);
  const { user } = props;
  console.log(user);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // const user = [user, ]

  // React.useEffect(() => {
  //   localStorage.setItem('fname','Julie');
  //   localStorage.setItem('lname','L. Arsenault');
  //   localStorage.setItem('uname','julie_arsenault');
  //   localStorage.setItem('email','julie.arsenault@gmail.com');
  //   localStorage.setItem('age','20');
  //   localStorage.setItem('contact','71045837485');
  // })

  return (
    <div>
      <Button onClick={handleClickOpen} size="large" className="m-2">
        <Typography fontSize={20} fontFamily={["Lora", "serif"].join(",")}>Info</Typography>
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
          fontFamily={["Lora", "serif"].join(",")}
          fontSize={25}
        >
          User Information
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Grid container xs={20}>
            <Grid item xs={20} sm={10}>
              <Typography fontSize={25} fontFamily={["Lora", "serif"].join(",")} color={"#EE6E01"}>First Name :</Typography>
            </Grid>
            <Grid item xs={20} sm={10}>
              <Typography fontSize={20} fontFamily={["Lora", "serif"].join(",")}> &emsp;&emsp;&emsp; {user.firstName} </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Grid container xs={20}>
            {/* <Divider /> */}
            <Grid item xs={20} sm={10}>
              <Typography fontSize={25} fontFamily={["Lora", "serif"].join(",")} color={"#EE6E01"}> Last Name : </Typography>
            </Grid>
            <Grid item xs={20} sm={10}>
              <Typography fontSize={20} fontFamily={["Lora", "serif"].join(",")}> &emsp;&emsp;&emsp; {user.lastName} </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Grid container xs={20}>
            <Grid item xs={20} sm={10}>
              <Typography fontSize={25} fontFamily={["Lora", "serif"].join(",")} color={"#EE6E01"}>Username : </Typography>
            </Grid>
            <Grid item xs={20} sm={10}>
              <Typography fontSize={20} fontFamily={["Lora", "serif"].join(",")}>&emsp;&emsp;&emsp; {user.username}  </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Grid container xs={20}>
            <Grid item xs={20} sm={10}>
              <Typography fontSize={25} fontFamily={["Lora", "serif"].join(",")} color={"#EE6E01"}>Email Address : </Typography>
            </Grid>
            <Grid item xs={20} sm={10}>
              <Typography fontSize={20} fontFamily={["Lora", "serif"].join(",")}>&emsp;&emsp;&emsp; {user.email} </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Grid container xs={20}>
            <Grid item xs={20} sm={10}>
              <Typography fontSize={25} fontFamily={["Lora", "serif"].join(",")} color={"#EE6E01"}>Age : </Typography>
            </Grid>
            <Grid item xs={20} sm={10}>
              <Typography fontSize={20} fontFamily={["Lora", "serif"].join(",")}>&emsp;&emsp;&emsp; {user.age}  </Typography>
            </Grid>
          </Grid>
          <Divider/>
          <Grid container xs={20}>
            <Grid item xs={20} sm={10}>
              <Typography fontSize={25} fontFamily={["Lora", "serif"].join(",")} color={"#EE6E01"}> Contact Number : </Typography>
            </Grid>
            <Grid item xs={20} sm={10}>
              <Typography fontSize={20} fontFamily={["Lora", "serif"].join(",")}> &emsp;&emsp;&emsp; {user.phoneno}  </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
        <Button autoFocus size="large" className="m-2" onClick={handleClose}>
            <Typography fontSize={20} fontFamily={["Lora", "serif"].join(",")} >Cancel</Typography>
        </Button>
        {/* <Button autoFocus onClick={handleClose}> */}
            <Edit user={user}/>
          {/* </Button> */}
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
