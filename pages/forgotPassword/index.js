import React, { useContext, useState } from 'react'
import TextField from '@mui/material/TextField';
import styles from './ForgotPassword.module.css';
import logo from '../../assets/snap-flicks-logo.png';
import Button from '@mui/material/Button';
import Image from 'next/image';
import { AuthContext } from '../../context/AuthWrapper';
import { useRouter } from 'next/router';
import Link from 'next/link';

const ForgotPassword = () => {

  const [email, setEmail] = useState('');
  const {forgotPassword} = useContext(AuthContext);
  const [error, setError] = useState({isError: false, errorMessage: ""});
  const router = useRouter();

  async function handleForgotPassword(){
    try{
      const resp = await forgotPassword(email);
      setError({isError: false, errorMessage: 'Reset link is sent to your email'});
      setTimeout(()=>{
        router.push('/login')
      }, 2000)
    }
    catch(err){
      setError({isError: true, errorMessage: "User not found"});
    }
  }

  return (
      <div className={styles.main_container}>
        <div className={styles.signup_card_container}>
            <div className={styles.signup_card}>
                <Image src={logo} height="60" width="180" alt='logo' />
                <TextField value={email} onChange={(e)=>{setEmail(e.target.value)}} id="outlined-basic" size='small' label="Email" variant="outlined" fullWidth type={'email'} />
                {/* <TextField id="outlined-basic" size='small' label="Password" variant="outlined" fullWidth type={'password'} /> */}

                <Button onClick={handleForgotPassword} variant='contained' fullWidth>
                    Send Resent Link 
                </Button>
                <div style={{color: `${error.isError?"red":"green"}`}}>{error.errorMessage}</div>
            </div>
            <div className={styles.login_option}>
                Already have an account? <Link href='/login'><a><span style={{color: "blue"}}>Login</span></a></Link>
            </div>
            <div className={styles.login_option}>
                Create New Account <Link href='/signup'><a><span style={{color: "blue"}}>Signup</span></a></Link>
            </div>
        </div>
    </div>
  )
}

export default ForgotPassword;