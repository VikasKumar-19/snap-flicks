import React, { useContext, useState } from 'react'
import TextField from '@mui/material/TextField';
import styles from './SignUp.module.css';
import logo from '../../assets/snap-flicks-logo.png';
import Button from '@mui/material/Button';
import Image from 'next/image';
import Link from 'next/link';
import { CircularProgress } from '@mui/material';
import { AuthContext } from '../../context/AuthWrapper';
import { useRouter } from 'next/router';
import { db, storage } from '../../firebase';
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const SignUp = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({isError: false, errorMessage: ""});


  const {signUpUser, user} = useContext(AuthContext);
  const router = useRouter();

  async function uploadProfileImage(file, userObj){
    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: 'image/jpeg'
    };
    
    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, `${userObj.uid}/images/` + file);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      }, 
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        console.log(error.message);
      }, 
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          userObj.imageUrl = downloadURL;
          await setDoc(doc(db,"users", userObj.uid), userObj);
          console.log("doc added");
          setIsLoading(false);
        });
      }
    );
  }


  async function handleSignUpUser(){
    try{
        setIsLoading(true);
        const userConfig = await signUpUser(email, password);
        let userId = userConfig.user.uid;
        let userObj = {
            name: name,
            email: email,
            uid: userId
        }
        await uploadProfileImage(profileImage, userObj);
    }
    catch(err){
        console.log(err.message);
        setIsLoading(false);
    }
  }

  if(user && !isLoading){
    router.push("/")
    return <div>loading...</div>
  }


  return (
      <div className={styles.main_container}>
        <div className={styles.signup_card_container}>
            <div className={styles.signup_card}>
                <Image src={logo} height="60" width="180" alt='logo'/>
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