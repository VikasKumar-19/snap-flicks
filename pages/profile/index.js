import { useRouter } from 'next/router';
import React, { useContext } from 'react'
import ProfileView from '../../components/ProfileView';
import { AuthContext } from '../../context/AuthWrapper';

const ProfilePage = () => {

  const {user} = useContext(AuthContext);
  const router = useRouter();

  if(!user){
    router.push("/login");
    return <>loading...</>
  } 

  return (
    <div>
      <ProfileView />
    </div>
  )
}

export default ProfilePage;