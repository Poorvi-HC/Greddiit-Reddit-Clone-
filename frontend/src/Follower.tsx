import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { DialogProps } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { Typography, Grid } from "@mui/material";

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        bgcolor: (theme) => (theme.palette.mode),
        color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        // border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        p: 1,
        m: 1,
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}

export default function Follower() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");
  const [followers, setFollowers] = React.useState([]);
  const token = localStorage.getItem('token');

  const follower = async () => {
    try {
      const responce = await fetch("http://localhost:5000/profile/followers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      const data = await responce.json();
      console.log(data);
      if (data) {
        setFollowers(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeFollower = async (props) => {
    const followerId = props;
    try {
      const response = await fetch(`http://localhost:5000/profile/remove/${followerId}/followers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      if (data) {
        console.log(data);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };


  const handleClickOpen = (scrollType: DialogProps["scroll"]) => () => {
    setOpen(true);
    setScroll(scrollType);
    follower();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);


  return (
    <div>
      <Button onClick={handleClickOpen('paper')}><Typography className="small mb-0" variant="h6" fontFamily={["Lora", "serif"].join(",")}>Followers</Typography></Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Followers</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          // display="grid"
          >
            {followers.map((follower) => (
              <Grid key={follower._id} xs={12} >
                <MenuItem onClick={handleClose}>
                  <Item><Avatar /></Item>
                  <Item><Typography>{follower.username}</Typography></Item>
                  <Item><Button onClick={()=>removeFollower(follower._id)}>Remove</Button></Item>
                </MenuItem>
              </Grid>
            ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {/* <Button onClick={handleClose}>Subscribe</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
