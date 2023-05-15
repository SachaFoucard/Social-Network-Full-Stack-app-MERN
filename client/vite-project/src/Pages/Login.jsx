import * as React from 'react';
import { useEffect, useState } from 'react';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useContext } from 'react';
import { UsersContext } from '../Context/UsersContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { mailLog, setmailLog, userNameLog, setnameLog, passwordLog, setpasswordLog, LoadDataUsers } = useContext(UsersContext);
  const [showgif, setshowgif] = useState(false);

  const navigation = useNavigate();

  useEffect(() => {
    LoadDataUsers();
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    const email = mailLog;
    const password = passwordLog;

    // Get user if exists in the database
    const response = await fetch(`http://localhost:7000/api/user/login?email=${email}&password=${password}`);
    const data = await response.json();
    const id = data._id;

    if (id) {
      transitionLogin(id)
    } else {
      alert('User does not exist! Please go to registration.');
    }
  };

  const transitionLogin = (id) => {
    setshowgif(true);
    setTimeout(() => {
      setshowgif(false);
      navigation(`/profil/${id}`);
    }, 2000);
  };
  return (
    <>
      {showgif ? (
        <img id='loadgif' src="./loading.gif" alt="Loading" style={{width:100}} />
      ) : (
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setmailLog(e.target.value)}
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
                onChange={(e) => setpasswordLog(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Login
          </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/Login" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
}