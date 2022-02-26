import { Avatar } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import styles from './VideoPost.module.css';
import { AuthContext } from '../../context/AuthWrapper';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { db } from '../../firebase';

const VideoPost = ({post}) => {
  console.log(post, "my data");

  const {user} = useContext(AuthContext);
  const [like, setLike] = useState(false);

  function playVideo(e){
    e.stopPropagation();
    e.target.play();
  }

  useEffect(() => {
    if(post.likes.includes(user.uid)){
      setLike(true);
    }
    else{
      setLike(false);
    }
  }, [user, post])
  

  function handleLikeButton(uid){
    if(post.likes.includes(uid)){
      updateDoc(doc(db,"posts", post.postId), {
        likes: arrayRemove(uid)
      })
    }
    else{
      updateDoc(doc(db,"posts", post.postId), {
        likes: arrayUnion(uid)
      });
    }
  }

  return (
    <div className={styles.main_video_container}>
      <video onClick={playVideo} src={post.postUrl} />
      <div className={styles.video_info}>
        <div style={{backgroundColor: "rgba(0, 0, 0, 0.397)", borderRadius: "15px", padding: "0px 14px"}} className={styles.avatar_name}>
          <Avatar sx={{width: "35px", height: "35px"}} alt="Cindy Baker" src={post.profileUrl} />
          <p style={{color: "white"}}>{post.userName}</p>
        </div>
        <div onClick={()=>{handleLikeButton(user.uid)}} style={{backgroundColor: "rgba(0, 0, 0, 0.397)", borderRadius: "15px", padding: "0px 14px", color: "red", cursor: "pointer"}} className={styles.like_count}>
          <FavoriteOutlinedIcon style={like?{color: "red"}:{color:"white"}}/> 
          <span style={{color: "white"}}>{post.likes.length > 0 && post.likes.length}</span>
        </div>
      </div>
    </div>
  )
}

export default VideoPost;