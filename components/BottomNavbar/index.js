import React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import VideoCallRoundedIcon from '@mui/icons-material/VideoCallRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';


const BottomNavbar = () => {

  const [value, setValue] = React.useState(0);


  return (
    <div>
      <Box  sx={{ display:{sm:"none"}, position: 'fixed', bottom: 0, left: 0, right: 0, width: '100%' }} elevation={3} >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction label="Explore" icon={<ExploreIcon />} />
          <BottomNavigationAction label="Profile" icon={<AccountCircleRoundedIcon />} />
          <BottomNavigationAction label="Upload" icon={
            <Button sx={{border: 'none'}} fullWidth disableRipple={true} component="label">
              <input style={{display: "none"}} accept='video/mp4,video/x-m4v,video/*' id="contained-button-file" multiple type="file" />
              <VideoCallRoundedIcon />
            </Button>
              // <VideoCallRoundedIcon />
            
          } />
        </BottomNavigation>
      </Box>
    </div>
  )
}

export default BottomNavbar;