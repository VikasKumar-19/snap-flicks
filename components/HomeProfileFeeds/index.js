import React, { useContext, useEffect, useState } from 'react'
import BottomNavbar from '../BottomNavbar';
import NavBar from '../TopNavbar';
import UploadButton from '../UploadButton';
// import reel1 from '../../assets/reel1.mp4';
import styles from './HomeProfileFeeds.module.css';
import { AuthContext } from '../../context/AuthWrapper';
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';
import VideoPost from '../VideoPost';


const HomeProfileFeeds = () => {

  const [userData, setUserData] = useState(null);
  const [postsData, setPostsData] = useState([]);

  const {user} = useContext(AuthContext);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", user.uid), (doc)=>{
          console.log(doc.data());
          setUserData(doc.data());
        })
    return () => {
      unsub();
    }
  }, [user])

  useEffect(()=>{
    const unsub = onSnapshot(query(collection(db, "posts"),orderBy("timeStamp", "desc")), (snapshot)=>{
      let posts=[];
      snapshot.docs.forEach((post)=>{
        posts.push(post.data());
      });
      setPostsData(posts);
    })

    return ()=>{
      unsub();
    }
  },[])

  return (
    <>{
      userData && 
      <>
        <NavBar  userData={userData}/>
        <UploadButton userData={userData}/>
        <div className={styles.videos_container}>
          {
            postsData.map((post)=>{
              return <VideoPost key={post.postId} post={post} />
            })
          }
        </div>
        <BottomNavbar />

      </>
    }
    </>
  )
}

export default HomeProfileFeeds;