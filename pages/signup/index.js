import React from 'react'
import TextField from '@mui/material/TextField';
import styles from './SignUp.module.css';
import logo from '../../assets/Instagram-Logo.png'
import Button from '@mui/material/Button';
import Image from 'next/image';

const SignUp = () => {
  return (
      <div className={styles.main_container}>
        <div className={styles.signup_card_container}>
            <div className={styles.signup_card}>
                <Image src={logo} height="60" width="180" />
                <TextField id="outlined-basic" size='small' label="Email" variant="outlined" fullWidth type={'email'} />
                <TextField id="outlined-basic" size='small' label="Password" variant="outlined" fullWidth type={'password'} />
                <TextField id="outlined-basic" size='small' label="Full Name" variant="outlined" fullWidth />
                <Button disableRipple={false} fullWidth variant="outlined" component="label" >
                    <input style={{display: "none"}} accept='image/*' id="contained-button-file" multiple type="file" />
                    Upload Profile Image
                </Button>
                <Button variant='contained' fullWidth>
                    Sign Up
                </Button>
            </div>
            <div className={styles.login_option}>
                Already have an account? <span style={{color: "blue"}}>Login</span>
            </div>
        </div>
    </div>
  )
}

export default SignUp;