// import React, {useState, useEffect} from 'react';
// import {Avatar,TextField, Button, Paper, Grid, Typography, Container} from '@material-ui/core';
// import LockedOutLinedIcon from '@material-ui/icons/LockOutlined';
// import {GoogleLogin} from '@react-oauth/google';
// // import { GoogleOAuthProvider } from '@react-oauth/google';
// // import jwtDecode from "jwt-decode";
// import {useDispatch} from 'react-redux';
// import {useNavigate } from 'react-router-dom';
// import { signIn, signUp} from '../../actions/auth';
// // import dotenv from 'dotenv';

// import Icon from './icon'
// import Input from './Input';
// import useStyles from './styles';
// // import useStyles from "./styles";
// import { gapi } from "gapi-script";
// // import { useDispatch } from "react-redux";
// // import { useNavigate } from "react-router-dom";
// // import { signIn, signUp } from "../../actions/auth";
// import dotenv from "dotenv";

// dotenv.config();
// const initialState = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   password: "",
//   confirmPassword: "",
// };

// const Auth = () => {
//   const classes = useStyles();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [showPassword, setShowPassword] = useState(true);
//   const [issignUp, setIssignUp] = useState(false);
//   const [formData, setFormData] = useState(initialState);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (issignUp) {
//       dispatch(signUp(formData, navigate));
//     } else {
//       dispatch(signIn(formData, navigate));
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleShowPassword = () =>
//     setShowPassword((prevShowPassword) => !prevShowPassword);

//   const switchMode = () => {
//     setIssignUp((prevIssignUp) => !prevIssignUp);
//     setShowPassword(false);
//   };

//   const googleSuccess = async (res) => {
//     const result = res?.profileObj;
//     const token = res?.tokenId;

//     try {
//       dispatch({ type: "AUTH", data: { result, token } });

//       navigate("/");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const googleFailure = (error) => {
//     console.log(error);
//     console.log("Google Sign In was unsuccessfull. Try again later");
//   };


//   useEffect(() => {
//     function start() {
//       gapi.auth2.init({
//         client_id: process.env.CLIENT_ID,
//       });
//     }
//     gapi.load("client:auth2", start);
//   });

//   return (
//     <Container component="main" maxWidth="xs">
//       <Paper className={classes.paper} elevation={3}>
//         <Avatar className={classes.avatar}>
//           <LockedOutLinedIcon/>
//         </Avatar>
//         <Typography variant="h5">{issignUp ? "Sign Up" : "Sign In"}</Typography>
//         <form className={classes.form} onSubmit={handleSubmit}>
//           <Grid container spacing={2}>
//             {issignUp && (
//               <>
//                 <Input
//                   name="firstName"
//                   label="First Name"
//                   handleChange={handleChange}
//                   autoFocus
//                   half
//                 />
//                 <Input
//                   name="lastName"
//                   label="Last Name"
//                   handleChange={handleChange}
//                   half
//                 />
//               </>
//             )}
//             <Input
//               name="email"
//               label="Email Address"
//               handleChange={handleChange}
//               type="email"
//             />
//             <Input
//               name="password"
//               label="Password"
//               handleChange={handleChange}
//               type={showPassword ? "text" : "password"}
//               handleShowPassword={handleShowPassword}
//               autoComplete
//             />
//             {issignUp && (
//               <Input
//                 name="confirm Password"
//                 label="Repeat Password"
//                 handleChange={handleChange}
//                 type="password"
//               />
//             )}
//           </Grid>
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//             className={classes.submit}
//           >
//             {issignUp ? "Sign Up" : "Sign In"}
//           </Button>
//         </form>
//         <GoogleLogin
//           clientId= {process.env.CLIENT_ID}
//           render={(renderProps) => (
//             <Button
//               className={classes.googleButton}
//               color="primary"
//               fullWidth
//               onClick={renderProps.onClick}
//               disabled={renderProps.disabled}
//               startIcon={<Icon />}
//               variant="contained"
//             >
//               Google Sign In
//             </Button>
//           )}
//           onSuccess={googleSuccess}
//           onFailure={googleFailure}
//           cookiePolicy="single_host_origin"
//         />
//         <Grid container justifyContent="center">
//           <Grid item>
//             <Button onClick={switchMode}>
//               {issignUp
//                 ? "Already have an Account? Sign In"
//                 : "Don't have an Account? Sign Up"}
//             </Button>
//           </Grid>
//         </Grid>
//       </Paper>
//     </Container>
//   );
// };

// export default Auth;



import React, {useState} from 'react';
import {Avatar,TextField, Button, Paper, Grid, Typography, Container} from '@material-ui/core';
import LockedOutLinedIcon from '@material-ui/icons/LockOutlined'
import {GoogleLogin} from '@react-oauth/google';
// import { GoogleOAuthProvider } from '@react-oauth/google';
import jwtDecode from "jwt-decode";
import {useDispatch} from 'react-redux';
import {useNavigate } from 'react-router-dom';
import { signIn, signUp} from '../../actions/auth';
// import dotenv from 'dotenv';

import Icon from './icon'
import Input from './Input';
import useStyles from './styles';

// dotenv.config();
const initialState = { firstName: '',
                       lastName: '',
                       email: '',
                       password: '',
                       confirmPassword: '',
                      }


const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const  [showPassword, setShowPassword] = useState(false)
  const [issignUp, setIssignUp] = useState(false)
  const [formData, setFormData] = useState(initialState);
  


  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

  const handleSubmit = (event)=>{
    event.preventDefault();

    if(issignUp){
      //pass the form data so we can have it in our db
      //navigate once something happens

      // redux flow - once the form is fiiled we want to dispatch an action (redux) #1
      dispatch(signUp(formData, navigate));
    }else{
      dispatch(signIn(formData, navigate));

    }
  };

//this function makes us write less code compared to the implement in Form.js
//where we hade to setstate for each tag
  const handleChange = (event)=>{
    const et = event.target;
    setFormData({ ...formData, [et.name]:et.value});
  };


  const switchMode = ()=>{
    setIssignUp((prevIssignUp) => !prevIssignUp);
    setShowPassword(false);
  }


  const googleSuccess = async (res) => {
    // this makes sure we dont get an error if it fails ('?.'')
    const result = jwtDecode(res.credential); //undefined
    const token = res?.credential;

      //since using async fun we can use try and catch
    try {
      //dispath aloows us to send data through our folders
      dispatch({ type: 'AUTH', data: {result, token} });
      //
      console.log('about to navigate');
      navigate('/')
    } catch (err) {
      console.log(err);
    }
  };



  const googleFailure =(err) => {
    console.log('Google sign in failed');
    console.log(err);
  };


  return(
<Container component='main' maxWidth='xs'>
  <Paper className={classes.paper} elevation={3}>
    <Avatar className={classes.avatar}>
      <LockedOutLinedIcon/>
    </Avatar>
    <Typography variant='h5'>{issignUp?'Sign Up':'Sign In'}</Typography>
    <form className={classes.form} onSubmit={handleSubmit}>
      <Grid container spacing={2}>
      {
        issignUp && (
          <>
            <Input
              name='firstName'
             label='First Name'
             handleChange={handleChange}
             autoFocus
             half
             />

             <Input
             name='lastName'
             label='Last Name'
             handleChange={handleChange}
             half
             />
          </>
        )}
        <Input
         name='email'
         label='Email Address'
         handleChange={handleChange}
          type='email'/>
        <Input
         name='password'
         label='Password'
         handleChange={handleChange}
          type={showPassword?'text':'password'}
          handleShowPassword={handleShowPassword}/>
        { issignUp && <Input name='confirmPassword' label ='Repeat Password' handleChange={handleChange} type='password'/>}
      </Grid>

      <Button
      type='submit'
       fullWidth
       variant='contained'
       color='primary'
       className={classes.submit}>
        { issignUp? 'Sign Up':'Sign In'}
      </Button>
     
      <GoogleLogin
        // clientId= "475103278644-66bie9o2jk98v69ipl0dnkl1sa932c6b.apps.googleusercontent.com"
        render={(renderProps) => (
          <Button
          className={classes.googleButton}
          color='primary'
          fullWidth
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          startIcon={<Icon/>}
          variant='contained'>
          Google Sign In
          </Button>
          )}
        onSuccess={googleSuccess}
        onFailure={googleFailure}
        cookiePolicy='single_host_origin'
      />
      <Grid container justifyContent='flex-start' className={classes.signUp}>
        <Grid item>
          <Button variant='contained' onClick={switchMode}>
            { issignUp? 'Already Have An Account ? Sign In':'Dont Have An Account ? Sign Up'}
          </Button>
        </Grid>
      </Grid>
    </form>
  </Paper>
</Container>
  )
}

export default Auth;
