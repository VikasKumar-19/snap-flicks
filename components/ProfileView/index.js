import React, { useEffect, useState } from 'react';
import BottomNavbar from '../BottomNavbar';
import NavBar from '../TopNavbar';
import styles from "./ProfileView.module.css";
import Image from 'next/image';

const ProfileView = () => {

  const [isBioActive, setIsBioActive] = useState(false);
  const [bioDescription, setIsBioDescription] = useState("");

  function handleBioActive(e){
    e.stopPropagation();
    setIsBioActive(true);
  }

  useEffect(() => {
    function turnOffIsBio(e){
        setIsBioActive(false);
    }
    document.addEventListener("click", turnOffIsBio);
  
    return () => {
      document.removeEventListener("click", turnOffIsBio);
    }
  }, [])
  

  return (
    <div>
      <NavBar />
      <div>
        <div className={styles.profile_info_section}>
          <div className={styles.profile_info_one}>
            <div className={styles.profile_img_container}>
              <img src={"https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg"}  alt="profile image" />
              <p style={{fontWeight: "700"}}>Mahan Sharma</p>
            </div>
            <div style={{fontWeight: "600"}} className={styles.profile_posts_details}>
              <div>10</div>
              <div>Posts</div>
            </div>
          </div>
          <div className={styles.profile_info_two}>
            {
              bioDescription.length > 0?
              <p className={styles.bioActive_button} onClick={handleBioActive} style={{fontWeight: 600}}>Edit your Bio 📝</p>:
              <p className={styles.bioActive_button} onClick={handleBioActive} style={{fontWeight: 600}}>Click to add description ✍</p>
            }
            <div className={`${styles.bio_section}   ${isBioActive && styles.bio_active}`} onClick={(e)=>{e.stopPropagation()}}  >
              <div contentEditable={isBioActive} spellCheck={false} className={styles.main_bio_section}>
                Hi there. I am passionate Software Engineer.
              </div>
              {
                isBioActive &&
                <div>
                  {/* <button>B</button>
                  <button>I</button> */}
                </div>
              }
            </div>
          </div>
        </div>
        <div className={styles.profile_posts_section}>
              <div className={styles.post_container}>
                <video src="https://whatsappstatusline.com/wp-content/uploads/2021/09/Anime-4k-Full-Screen-Status-Video.mp4?_=4" />
              </div>
              <div className={styles.post_container}>
                <video src="https://whatsappstatusline.com/wp-content/uploads/2021/09/Anime-4k-Full-Screen-Status-Video.mp4?_=4" />
              </div>
              <div className={styles.post_container}>
                <video src="https://whatsappstatusline.com/wp-content/uploads/2021/09/Anime-4k-Full-Screen-Status-Video.mp4?_=4" />
              </div>
              <div className={styles.post_container}>
                <video src="https://whatsappstatusline.com/wp-content/uploads/2021/09/Anime-4k-Full-Screen-Status-Video.mp4?_=4" />
              </div>
              <div className={styles.post_container}>
                <video src="https://whatsappstatusline.com/wp-content/uploads/2021/09/Anime-4k-Full-Screen-Status-Video.mp4?_=4" />
              </div>
              <div className={styles.post_container}>
                <video src="https://whatsappstatusline.com/wp-content/uploads/2021/09/Anime-4k-Full-Screen-Status-Video.mp4?_=4" />
              </div>
              <div className={styles.post_container}>
                <video src="https://whatsappstatusline.com/wp-content/uploads/2021/09/Anime-4k-Full-Screen-Status-Video.mp4?_=4" />
              </div>
              <div className={styles.post_container}>
                <video src="https://whatsappstatusline.com/wp-content/uploads/2021/09/Anime-4k-Full-Screen-Status-Video.mp4?_=4" />
              </div>
        </div>
      </div>
      <BottomNavbar />
    </div>
  )
}

export default ProfileView;