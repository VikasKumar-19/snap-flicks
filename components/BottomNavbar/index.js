import React, {useState, useEffect, useContext} from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import VideoCallRoundedIcon from '@mui/icons-material/VideoCallRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import { useRouter } from 'next/router';
import { Alert } from '@mui/material';
import { LinearProgress } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { db, storage } from '../../firebase';
import { arrayUnion, doc, onSnapshot, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { AuthContext } from '../../context/AuthWrapper';



const BottomNavbar = () => {
  const [userData, setUserData] = useState(null);
  const [value, setValue] = useState(0);
  const router = useRouter();
  const [uploadError, setUploadError] = useState({error: false, errorMsg: ""});
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const {user} = useContext(AuthContext);

  async function uploadUserPost(file, userObj, postId){
    
    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, `${userObj.uid}/posts/${postId}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        console.log('Upload is ' + progress + '% done');
      }, 
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        setUploadError({error: true, errorMsg: error});
      }, 
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          let postObj = {
            postId: postId,
            postUrl: downloadURL,
            likes: [],
            userName: userData.name,
            uid: userData.uid,
            profileUrl: userData.imageUrl,
            timeStamp: serverTimestamp()
          }

          await setDoc(doc(db,"posts", postId), postObj);
          console.log("doc added");
          await updateDoc(doc(db, "users", userObj.uid), {
            posts: arrayUnion(postId)
          })
          setIsLoading(false);
        });
      }
    );
  }

  useEffect(()=>{
    if(user){
      const unsub = onSnapshot(doc(db, "users", user.uid),(doc)=>{
        setUserData(doc.data());
      })

      return ()=>{
        unsub();
      }
    }

  }, [])


  async function handleUploadFile(e){
    console.log("komk");
    const file = e.target.files[0];
    if(!file){
      setUploadError({error: true, errorMsg: "Please Select a video file to upload"});
      setTimeout(()=>{
        setUploadError({error: false, errorMsg: ""});
      }, 2000);

      return;
    }

    if((file.size / (1024 * 1024)) > 50){
      setUploadError({error: true, errorMsg: "File should not be greater than 50mb"});
      setTimeout(() => {
        setUploadError({error: false, errorMsg: ""});
      }, 2000);
      return;
    }

    const postId = uuidv4();
    setIsLoading(true);

    await uploadUserPost(file, userData, postId);

  }


  return (
    <>
      {uploadError.error && <Alert severity="error">{uploadError.errorMsg}</Alert>}
      <Box  sx={{ display:{sm:"none"}, position: 'sticky', bottom: 0, left: 0, right: 0, width: '100%'}} elevation={3} >
        {
          isLoading &&
          <LinearProgress sx={{mt: '1px'}} variant="determinate" value={progress} color="secondary"  />
        }
        <BottomNavigation
          sx={{backgroundColor: "#f7eff1" }}
          showLabels={false}
          value={value}
          onChange={(event, newValue) => {

            console.log(event,"so");
            setValue(newValue);
            switch(newValue){
              case 0: router.push("/");
                      break;
              case 1: router.push("/explore");
                      break;
              case 2: router.push("/profile");
                      break;
              
            }
          }}
        >
          <BottomNavigationAction disableTouchRipple={true} label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction disableTouchRipple={true} label="Explore" icon={<ExploreIcon />} />
          <BottomNavigationAction disableTouchRipple={true} label="Profile" icon={<AccountCircleRoundedIcon />} />
          <BottomNavigationAction disableTouchRipple={true} label="Upload" icon={
            <Button sx={{border: 'none', color:"inherit"}} fullWidth disableRipple={true} component="label">
              <input onChange={handleUploadFile} style={{display: "none"}} accept='video/mp4,video/x-m4v,video/*' id="contained-button-file" multiple type="file" />
              <VideoCallRoundedIcon  />
            </Button>
              // <VideoCallRoundedIcon />
            
          } />
        </BottomNavigation>
      </Box>
    </>
  )
}

export default BottomNavbar;