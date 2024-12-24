import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { UseAuthContext } from '../../../../context/AuthContext';
import { imageBaseURL } from '../../../../services/EndPoints';

export default function Navbar() {
  const {userData} = UseAuthContext()

  return (
    <AppBar position="static" color='inherit' sx={{position: 'sticky', top: '0', zIndex: 1}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{display: 'flex', justifyContent: 'end'}}>
          <Box sx={{ flexGrow: 0, display: "flex", alignItems: 'center', gap: '15px' }}>
              <IconButton sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={`${imageBaseURL}/${userData?.profileImage}`} />
                {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
              </IconButton>       
              <Typography variant='h6'>{userData?.userName}</Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
