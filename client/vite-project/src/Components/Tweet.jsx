import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { PostsContext } from '../Context/PostsContext';
import { useContext } from 'react';
import PropTypes from 'prop-types';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};



export default function Tweet(id) {

    const [countLetter, setCountLetter] = React.useState(1)

    const [open, setOpen] = React.useState(false);
    const { addPost, setContent, setTitle, setauthorImg, dateRegistration, IdentifyTheUser, content } = useContext(PostsContext)

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleCount = (event) => {
        const input = event.target.value;
        const remainingCount = 140 - input.length;
        if (remainingCount >= 0) {
          setCountLetter(remainingCount);
          setContent(input);
        } else {
          // Block adding new letters when count goes below zero
          event.target.value = input.slice(0, 140);
        }
      };
      


    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Write new Post
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    New Post
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <div className="twitter boxContainer">
                        <input type='text' onChange={(e) => setTitle(e.target.value)} className="twitter tweetHeader" placeholder='Enter a Title'></input>
                        <span className="close"></span>
                        <div className="lineSplit"></div>
                        <textarea className="messageBox" id="postMessage" placeholder="What's happening?" onChange={handleCount}></textarea>
                        <label className="wordCounter" id="wordCounter">{countLetter}/140</label>
                        <input type="button" className="postButton" id="submitPost" value="Tweet" onClick={() => addPost(id, setOpen)} />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Exit
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
