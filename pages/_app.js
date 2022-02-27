import { useRouter } from "next/router";
import BottomNavbar from "../components/BottomNavbar";
import NavBar from "../components/TopNavbar";
import AuthWrapper from "../context/AuthWrapper";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  
  return (
    <AuthWrapper>
     {(router.asPath !== '/signup' && router.asPath !== '/login') && <NavBar />} 
      <Component {...pageProps} />
      {(router.asPath !== '/signup' && router.asPath !== '/login') && <BottomNavbar />} 
    </AuthWrapper>
  );
}

export default MyApp;
