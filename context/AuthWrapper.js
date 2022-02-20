import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import React, {useState, useEffect} from 'react';
import { auth } from '../firebase';


export const AuthContext = React.createContext();

const AuthWrapper = ({children}) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user)=>{
      if(user)
      {
        console.log(user);
        setUser(user);
      }
      else{
        setUser(null);
      }
      setLoading(false);
    })
  }, [auth]);

  function signUpUser(email, password){
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function loginAuthenticate(email, password){
    return signInWithEmailAndPassword(auth, email, password);
  }

  function signOutUser(){
    return signOut(auth);
  }

  function forgotPassword(email){
    return sendPasswordResetEmail(auth, email);
  }

  const store = {
    loginAuthenticate, 
    user, 
    signOutUser, 
    forgotPassword, 
    signUpUser
  }

  return (
    <AuthContext.Provider value={store}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export default AuthWrapper;