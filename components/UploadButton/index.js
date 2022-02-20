import { Box, Button } from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import { LinearProgress } from '@mui/material';
import React from 'react';

const UploadButton = () => {
  return (
    <>
      <LinearProgress sx={{mt: '1px'}} variant="determinate" value={50} color="secondary" />
      <Box  sx={{ display:{xs: 'none', sm:'flex'}, justifyContent:'center', my: '1.25rem' }}>
        <Button sx={{px: '3rem', py: '0.5rem'}} startIcon={<MovieIcon />} disableRipple={false} variant="outlined" component="label" >
          <input style={{display: "none"}} accept='video/mp4,video/x-m4v,video/*' id="contained-button-file" multiple type="file" />
          Upload
        </Button>
      </Box>
    </>
  )
}

export default UploadButton;