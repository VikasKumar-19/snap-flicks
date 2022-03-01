import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthWrapper';
import { db } from '../../firebase';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import BottomNavbar from '../BottomNavbar';
import NavBar from '../TopNavbar';
import styles from "./ProfileView.module.css";

const ProfileView = () => {

  const [isBioActive, setIsBioActive] = useState(false);
  const [bioDescription, setIsBioDescription] = useState("");
  const [userData, setUserData] = useState(null);
  const [postIds, setPostIds] = useState([]);
  const [postsData, setPostsData] = useState([]);
  const [totalLikes, setTotalLikes] = useState(0);
  const [bioData, setBioData] = useState("");
  const bioSection = useRef(0);
  
  const {user} = useContext(AuthContext);

  function handleBioActive(e){
    e.stopPropagation();
    setIsBioActive(true);
  }

  useEffect(()=>{
    const unsub = onSnapshot(doc(db, "users", user.uid), (doc)=>{
      setUserData(doc.data());
      setPostIds(doc.data().posts);
      setBioData(doc.data().bio);
    })
    return ()=>{
      unsub();
    }
  }, [user])

  useEffect(()=>{
    let postsData = [];
    let totalLikes = 0;
    postIds.map((postId)=>{
      onSnapshot(doc(db, "posts", postId), (doc)=>{
        let postData = doc.data();
        totalLikes += postData.likes.length;
        postsData.push(postData);
        postsData.sort((a, b)=>{
          return b.timeStamp.seconds - a.timeStamp.seconds;
        })
        setPostsData([...postsData]);
        setTotalLikes(totalLikes);
      })
    })

  },[postIds]);

  useEffect(() => {
    function turnOffIsBio(e){
        setIsBioActive(false);
    }
    document.addEventListener("click", turnOffIsBio);
  
    return () => {
      document.removeEventListener("click", turnOffIsBio);
    }
  }, [])

  useEffect(async ()=>{
    if(!isBioActive && isBioActive !== undefined && bioSection.current){
      let bioData = bioSection.current.textContent;
      setBioData(bioData);
      await updateDoc(doc(db, "users", user.uid), {
        bio: bioData.length > 0? bioData: "",
      })
    }
  }, [isBioActive])

  return (
    <>
    {
      userData && 
      <div className={styles.profile_container}>
        <div>
          <div className={styles.profile_info_section}>
            <div className={styles.profile_info_one}>
              <div className={styles.identity_card}>
                <div className={styles.profile_img_container}>
                  {
                    userData.imageUrl ? <img src={userData.imageUrl}  alt="profile image" />
                    : <div style={{ cursor: "pointer",width: "120px", height: "120px", borderRadius: "50% ", backgroundColor: "gray", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                        <CameraAltIcon style={{color: "white"}} />
                        <span style={{fontSize: "16px", color: "white"}}>Upload photo</span>
                      </div>
                  }
                </div>
                <span style={{fontWeight: "700"}}>{userData.name}</span>
              </div>
              <div className={styles.posts_numbers}>
                <div style={{fontWeight: "600"}} className={styles.profile_posts_details}>
                  <div>{userData.posts.length}</div>
                  <div>Posts</div>
                </div>
                <div style={{fontWeight: "600"}} className={styles.profile_posts_details}>
                  <div>{totalLikes}</div>
                  <div>Total Likes</div>
                </div>
              </div>
            </div>
            <div className={styles.profile_info_two}>
              {
                bioDescription.length > 0?
                <p className={styles.bioActive_button} onClick={handleBioActive} style={{fontWeight: 600}}>Edit your Bio 📝</p>:
                <p className={styles.bioActive_button} onClick={handleBioActive} style={{fontWeight: 600}}>Click to add description ✍</p>
              }
              <div className={`${styles.bio_section}   ${isBioActive && styles.bio_active}`} onClick={(e)=>{e.stopPropagation()}}  >
                <div ref={bioSection} contentEditable={isBioActive} spellCheck={false} className={styles.main_bio_section}>
                  {bioData}
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
            {
              postsData.length > 0?
              postsData.map((post)=>{
                return(
                  <div key={post.postId} className={styles.post_container}>
                    <video src={post.postUrl} />
                  </div>
                );
              })
              : <span style={{fontSize: "24px", margin: "25px 0px"}}>No Posts</span>
            }
          </div>
        </div>
      </div>
    }
    </>
  )
}

export default ProfileView;