import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Logo from '../../assets/snap-flicks-logo.png'
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import SettingsIcon from '@mui/icons-material/Settings';
import Image from 'next/image';
import { AuthContext } from "../../context/AuthWrapper";

const settings = ["Profile", "Theme", "Logout"];

const NavBar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  async function handleSettingItem(setting){
    if(setting === "Logout"){
      let user = await signOutUser();
      console.log(user);
    }

    handleCloseUserMenu();
  }

  const {signOutUser} = React.useContext(AuthContext);



  return (
    <>
      <AppBar position="static" sx={{backgroundColor: "#dfe6e9"}}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "flex", md: "flex" } }}
            >
              <Image height={60} width={220} src={Logo} className="logoImage" />
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
            </Box>

              <Tooltip sx={{display: {sm: "none"}}} title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, display:{xs:"flex", sm:"none"} }}>
                  <SettingsIcon />
                </IconButton>
              </Tooltip>

            <Box sx={{ flexGrow: 0, display:{xs:"none", sm:"flex"}, alignItems:"center", gap:"20px" }}>
              <Box sx={{display:"flex", gap:"15px"}}>
              <IconButton>
                <HomeIcon sx={{cursor:"pointer"}} fontSize="large"  />
              </IconButton>
              <IconButton>
                <ExploreIcon sx={{cursor:"pointer"}} fontSize="large" />
              </IconButton>
              </Box>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, display:{xs:"flex"} }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={()=>{handleSettingItem(setting)}}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default NavBar;
