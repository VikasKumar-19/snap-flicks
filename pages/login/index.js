import React from 'react'
import TextField from '@mui/material/TextField';
import styles from './LogIn.module.css';
import logo from '../../assets/Instagram-Logo.png'
import image1 from '../../assets/image_1.jpg'
import image2 from '../../assets/image_2.jpg'
import image3 from '../../assets/image_3.jpg'
import image4 from '../../assets/image_4.jpg'
import image5 from '../../assets/image_5.jpg'
import Button from '@mui/material/Button';
import Image from 'next/image';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const LogIn = () => {
  return (
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
                    <TextField id="outlined-basic" size='small' label="Email" variant="outlined" fullWidth type={'email'} />
                    <TextField id="outlined-basic" size='small' label="Password" variant="outlined" fullWidth type={'password'} />
                    <div style={{color: "red"}}>Show error here</div>
                    <Button variant='contained' fullWidth>
                        Login
                    </Button>
                    <div style={{color: "blue"}}>Forgot Password?</div>
                </div>
                <div className={styles.signup_option}>
                    Don't have an account? <span style={{color: "blue"}}>Sign Up</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LogIn;