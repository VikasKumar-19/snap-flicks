import { Avatar } from '@mui/material';
import React, { useContext } from 'react'
import BottomNavbar from '../BottomNavbar';
import NavBar from '../TopNavbar';
import UploadButton from '../UploadButton';
// import reel1 from '../../assets/reel1.mp4';
import styles from './HomeProfileFeeds.module.css';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { AuthContext } from '../../context/AuthWrapper';
import { useRouter } from 'next/router';


const HomeProfileFeeds = () => {

  const router = useRouter();
  const {user} = useContext(AuthContext);
  
  if(!user){
    router.push("/login");
    return<>Loading...</>
  }

  function playVideo(e){
    e.stopPropagation();
    e.target.play();
  }

  return (
    <>
      <NavBar />
      <UploadButton />
      <div className={styles.videos_container}>
        <div className={styles.main_video_container}>
          <video onClick={playVideo} src='https://whatsappstatusline.com/wp-content/uploads/2021/09/Anime-4k-Full-Screen-Status-Video.mp4?_=4' />
          <div className={styles.video_info}>
            <div className={styles.avatar_name}>
              <Avatar sx={{width: "35px", height: "35px"}} alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
              <p>Cindy Baker</p>
            </div>
            <div className={styles.like_count}>
              <FavoriteBorderOutlinedIcon />  
              <span>10</span>
            </div>
          </div>
        </div>
        <div className={styles.main_video_container}>
          <video />
          <div className={styles.video_info}>
            <div className={styles.avatar_name}>
              <Avatar sx={{width: "35px", height: "35px"}} alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
              <p>Cindy Baker</p>
            </div>
            <div className={styles.like_count}>
              <FavoriteBorderOutlinedIcon />  
              <span>10</span>
            </div>
          </div>
        </div>
      </div>
      <BottomNavbar />
    </>
  )
}

export default HomeProfileFeeds;