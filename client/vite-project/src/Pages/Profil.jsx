import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UsersContext } from '../Context/UsersContext';
import { Button } from '@mui/material';
import Tweet from '../Components/Tweet'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import '../styles/profil.css'


export default function Profil() {
  const [open, setOpen] = useState(false);

  // functions are used to handle the opening and closing of a dialog box that prompts the user to confirm if they want to delete their account.
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const nav = useNavigate()
  const { Users, setUsers } = useContext(UsersContext);
  const { id } = useParams();

  const [newName, setNewName] = useState("");
  const [newImg, setNewImg] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const [showName, setShowName] = useState(false);
  const [showImg, setShowImg] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  const [currentSize, setCurrentSize] = useState(0);
  const sizeImg = [150, 250, 350];

  //The component also defines a biggerImg function that is called when the user clicks on their profile picture to enlarge it.
  const biggerImg = () => {
    setCurrentSize((currentSize + 1) % sizeImg.length);
  };

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : [];
  });

  //to delete user from database with fetch id 
  const deleteUser = async () => {
    fetch(`http://localhost:7000/api/deleteUser/${id}`)
    nav('/Login')
  }

  //The deleteUser function sends a DELETE request to the server to delete the user's account and navigate to the login page.
  const FindIdUser = async (id) => {
    const userprofil = Users.find((u) => u._id == id);
    setUser(userprofil);
  };

  useEffect(() => {
    const storedId = localStorage.getItem('userId');
    if (storedId) {
      FindIdUser(storedId);
    } else {
      FindIdUser(id);
    }
    return () => {
      localStorage.removeItem('user');
      localStorage.removeItem('userId');
    };
  }, []);

  useEffect(() => {
    if (user && user._id) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('userId', user._id);
    }
  }, [user]);

  //function update user informations
  const ChangeInfoUser = () => {
    let newUser = {
      img: newImg || user.img,
      name: newName || user.name,
      password: newPassword || user.password,
      mail: user.mail,
      description: newDescription || user.description
    };
    
    fetch(`http://localhost:7000/api/edit/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers((prev) => [...prev, newUser]);
        ClosedInput()
        alert('updated')
        nav('/Login')
      });
  };
  // closed all input 
  const ClosedInput = () => {
    setShowName(false);
    setShowImg(false);
    setShowPassword(false);
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Remove User ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you certain that you wish to remove your user identification? Please note that if you proceed with this action, you will no longer be able to access your account.          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleClose()}>Disagree</Button>
          <Button onClick={()=>deleteUser()} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <div className='profil'>
        <h2> Welcome back {user?.name}</h2>
        {user && (user.img == undefined ? <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" style={{ width: 100 }} /> :
          <img src={user.img} onClick={biggerImg} style={{ width: sizeImg[currentSize], borderRadius: 90 }}
          />)}
        <div className='right-post-create'>
          <Tweet id={id}/>
        </div>


        <button style={{ fontSize: 10, backgroundColor: 'grey' }} onClick={() => setShowImg(!showImg)} className='abs-ico-pen-img'>Edit</button>
        {showImg ?
          <input type='text'
            onChange={(e) => setNewImg(e.target.value)}
            placeholder='enter a image' />
          : ''}

        <p>Description: {user?.description} <button className='abs-ico-pen-img'
          style={{ fontSize: 10, backgroundColor: 'grey' }}

          onClick={() => setShowDescription(!showDescription)}> Edit </button>
        </p>
        {showDescription ?
          <textarea maxLength={420}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder='enter a description'
            style={{ height: "200px", width: "100%" }}
          ></textarea> : ''}

        <p>Email: {user?.mail} </p>

        <p>Password: {user?.password} <button
          style={{ fontSize: 10, backgroundColor: 'grey' }}
          onClick={() => setShowPassword(!showPassword)}
          className='abs-ico-pen-img'>Edit </button> </p>
        {showPassword ? <input type='password'
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder='enter a new password' /> : ''}

        <p>Name: {user?.name} <button
          style={{ fontSize: 10, backgroundColor: 'grey' }}
          onClick={() => setShowName(!showName)}
          className='abs-ico-pen-img'>Edit</button></p>
        {showName ? <input type='text'
          onChange={(e) => setNewName(e.target.value)}
          placeholder='enter a new name' /> : ''}
        <div>

        </div>
        <Button
          variant="contained"
          onClick={() => ChangeInfoUser()}
        >Save</Button>
        <Button
          variant="alert"
          onClick={() => handleClickOpen()}
          style={{ backgroundColor: 'red', fontSize: '9px' }}
        >
          Delete
        </Button>

      </div>
    </>
  );

}
