import React, { useContext, useState } from 'react'
import TextField from '@mui/material/TextField';
import styles from './SignUp.module.css';
import logo from '../../assets/snap-flicks-logo.png';
import Button from '@mui/material/Button';
import Image from 'next/image';
import Link from 'next/link';
import { CircularProgress } from '@mui/material';
import { AuthContext } from '../../context/AuthWrapper';
import { uploadProfileImage } from '../../utilities/utilities';

const SignUp = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({isError: false, errorMessage: ""});


  const {signUpUser} = useContext(AuthContext)

  async function handleSignUpUser(){
    try{
        const user = await signUpUser(email, password);
        let userId = user.user.uid;
        uploadProfileImage(userId, profileImage)
    }
    catch(err){
        console.log(err.message);
    }
  }

  
  return (
      <div className={styles.main_container}>
        <div className={styles.signup_card_container}>
            <div className={styles.signup_card}>
                <Image src={logo} height="60" width="180" />
                <TextField onChange={(e)=>{setEmail(e.target.value)}} value={email} id="outlined-basic" size='small' label="Email" variant="outlined" fullWidth type={'email'} />
                <TextField onChange={(e)=>{setPassword(e.target.value)}} value={password} id="outlined-basic" size='small' label="Password" variant="outlined" fullWidth type={'password'} />
                <TextField onChange={(e)=>{setName(e.target.value)}} id="outlined-basic" size='small' label="Full Name" variant="outlined" fullWidth />
                <Button disableRipple={false} fullWidth variant="outlined" component="label" >
                    <input onChange={(e)=>{setProfileImage(e.target.files[0])}} style={{display: "none"}} accept='image/*' id="contained-button-file" type="file" />
                    Upload Profile Image
                </Button>
                <Button onClick={handleSignUpUser} variant='contained' fullWidth disabled={isLoading}>
                    {isLoading?<CircularProgress size="1.5rem" />: "SignUp"}
                </Button>
            </div>
            <div className={styles.login_option}>
                Already have an account? <Link href='/login'><a><span style={{color: "blue"}}>Login</span></a></Link>
            </div>
        </div>
    </div>
  )
}

export default SignUp;