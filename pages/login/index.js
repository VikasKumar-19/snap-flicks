import React, { useContext, useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import styles from './LogIn.module.css';
import logo from '../../assets/snap-flicks-logo.png'
import image1 from '../../assets/image_1.jpg'
import image2 from '../../assets/image_2.jpg'
import image3 from '../../assets/image_3.jpg'
import image4 from '../../assets/image_4.jpg'
import image5 from '../../assets/image_5.jpg'
import Button from '@mui/material/Button';
import Image from 'next/image';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { AuthContext } from '../../context/AuthWrapper';
import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';
import Link from 'next/link';

const LogIn = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({isError: false, errorMessage: ""});
  const [loading, setLoading] = useState(false);

  const {loginAuthenticate, user} = useContext(AuthContext);
 
  async function handleLoginButton(){
    setLoading(true);
    try{
        const result = await loginAuthenticate(email, password);
        console.log(result);
        setError({isError: false, errorMessage: ""});
    }
    catch(err){
        setError({isError: true, errorMessage: "Wrong email or password entered"})
        setTimeout(()=>{
            setError({isError: false, errorMessage: ""});
        }, 3000)
    }
    setLoading(false);
  }

  const router = useRouter();
  if(user){
    router.push('/');
    return <>Loading...</>
  }

  return (
      <>    
        <div className={styles.main_container}>
            <div className={styles.carousal_background_container}>
                <div className={styles.main_carousal}>
                <Carousel showThumbs={false} autoPlay={true} infiniteLoop={true} interval={2000} showArrows={false} showIndicators={false} showStatus={false}>
                    <Image src={image1} />
                    <Image src={image2} />
                    <Image src={image3} />
                    <Image src={image4} />
                    <Image src={image5} />
                </Carousel>
                </div>
            </div>
            <div className={styles.right_content}>
                <div className={styles.login_card_container}>
                    <div className={styles.login_card}>
                        <Image src={logo} height="60" width="180" />
                        <TextField value={email} onChange={(e)=>{setEmail(e.target.value)}} id="outlined-basic" size='small' label="Email" variant="outlined" fullWidth type={'email'} />
                        <TextField password={password} onChange={(e)=>{setPassword(e.target.value)}} id="outlined-basic" size='small' label="Password" variant="outlined" fullWidth type={'password'} />
                        <div style={{color: "red"}}>{error.isError && error.errorMessage}</div>
                        <Button onClick={handleLoginButton} variant='contained' fullWidth disabled={loading}>
                            {loading?<CircularProgress size="1.5rem" />: "Login"}
                        </Button>
                        <Link href='/forgotPassword'><a><div className={styles.forgot_option} style={{color: "blue"}}>Forgot Password?</div></a></Link>
                    </div>
                    <div className={styles.signup_option}>
                        Don't have an account? <Link href='/signup'><a><span style={{color: "blue"}}>Sign Up</span></a></Link>
                    </div>
                </div>
            </div>
        </div>
      </>
  )
}

export default LogIn;