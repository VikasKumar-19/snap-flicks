import { Alert, Box, Button } from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import { LinearProgress } from '@mui/material';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { db, storage } from '../../firebase';
import { arrayUnion, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const UploadButton = ({userData}) => {

  const [uploadError, setUploadError] = useState({error: false, errorMsg: ""});
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

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


  async function handleUploadFile(e){
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
      {
        isLoading &&
        <LinearProgress sx={{mt: '1px'}} variant="determinate" value={progress} color="secondary"  />
      }
      <Box  sx={{ display:{xs: 'none', sm:'flex'}, justifyContent:'center', my: '1.25rem' }}>
        {
          uploadError.error? <Alert severity="error">{uploadError.errorMsg}</Alert>
          :
          <Button disabled={isLoading} sx={{px: '3rem', py: '0.5rem'}} startIcon={<MovieIcon />} disableRipple={false} variant="outlined" component="label" >
            <input onChange={handleUploadFile}  style={{display: "none"}} accept='video/mp4,video/x-m4v,video/*' id="contained-button-file" multiple type="file" />
            {isLoading?"Uploading...":"Upload"}
          </Button>
        }
      </Box>
    </>
  )
}

export default UploadButton;