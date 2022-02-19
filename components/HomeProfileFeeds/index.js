import { Avatar } from '@mui/material';
import React from 'react'
import BottomNavbar from '../BottomNavbar';
import NavBar from '../TopNavbar';
import UploadButton from '../UploadButton';
// import reel1 from '../../assets/reel1.mp4';
import styles from './HomeProfileFeeds.module.css';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';


const HomeProfileFeeds = () => {
  return (
    <>
      <NavBar />
      <UploadButton />
      <div className={styles.videos_container}>
        <div class={styles.main_video_container}>
          <video src='https://vod-progressive.akamaized.net/exp=1645306129~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F654%2F16%2F403274150%2F1724417260.mp4~hmac=a09b339f8315fcf249d26c8b67158ce0533cbc518b28aba15a38353e550df3de/vimeo-prod-skyfire-std-us/01/654/16/403274150/1724417260.mp4?filename=production+ID%3A4057257.mp4'  />
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
        <div class={styles.main_video_container}>
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
        <div class={styles.main_video_container}>
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
        <div class={styles.main_video_container}>
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