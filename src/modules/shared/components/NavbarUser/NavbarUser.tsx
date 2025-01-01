import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { UseAuthContext } from '../../../../context/AuthContext';

export default function NavbarUser() {
  const {userData} = UseAuthContext()
  const navigate = useNavigate()
  const [active, setActive] = useState('home')
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  
    
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
    <AppBar position="static" sx={{backgroundColor: '#ffffff', position: 'sticky', top: 0, zIndex: 1}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{marginLeft: {lg: '150px', sm: '0'}}}>
            <Link to={'/'} style={{ textDecoration: 'none', fontSize: '26px', fontFamily: 'Poppins', fontWeight: '500'}}>
              Stay<span style={{color: '#000'}}>cation.</span>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 1, justifyContent: 'end', display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              // color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              <MenuItem>
                <Link to={'/'} style={{ textAlign: 'center', textDecoration: 'none'}}>Home</Link>
              </MenuItem>
              <MenuItem>
                <Link to={'/explore-all-rooms'} style={{ textAlign: 'center', textDecoration: 'none'}}>Explore</Link>
              </MenuItem>
              {localStorage.getItem('token') ? 
              <>
                <MenuItem>
                  <Link to={'/'} style={{ textAlign: 'center', textDecoration: 'none'}}>Reviews</Link>
                </MenuItem>
                <MenuItem>
                  <Link to={'/favorites'} style={{ textAlign: 'center', textDecoration: 'none'}}>Favorites</Link>
                </MenuItem>
                <MenuItem>
                  <Box sx={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
                    <Box sx={{ flexGrow: 0 }}>
                      <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                          <Avatar alt="Remy Sharp" src={userData?.profileImage} />
                        </IconButton>
                      </Tooltip>
                      <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                      >
                        <MenuItem onClick={() => {
                          localStorage.removeItem('token')
                          navigate('/')
                        }}>
                          <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
                        </MenuItem>
                      </Menu>
                    </Box>
                    <Typography sx={{ color: '#000' }}>{userData?.userName}</Typography>
                  </Box>
                </MenuItem>
              </> : <>
                      <Box sx={{display: {xs: 'block'},marginBlock: {xs: '25px'}, marginInline:{xs: '10px'}}}>
                        <Link to={'/auth/register'} className='link-auth'>Register</Link>
                        {/* <Link to={'/auth/login'} className='link-auth'>Login Now</Link> */}
                      </Box>
                      <Box sx={{display: {xs: 'block'},marginBlock: {xs: '25px'}, marginInline:{xs: '10px'}}}>
                        {/* <Link to={'/auth/register'} className='link-auth'>Register</Link> */}
                        <Link to={'/auth/login'} className='link-auth'>Login Now</Link>
                      </Box>
                    </>
            }
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, justifyContent: 'end',alignItems: 'center', marginInline: '40px', display: { xs: 'none', md: 'flex' } }}>
            <Link to={'/'} onClick={() => setActive('home')} className={`link ${active === 'home' ? 'active' : ''}`}>Home</Link>
            <Link to={'/explore-all-rooms'} onClick={() => setActive('explore')} className={`link ${active === 'explore' ? 'active' : ''}`}>Explore</Link>
            {localStorage.getItem('token') ? 
              <>
                <Link to={'/'} onClick={() => setActive('reviews')} className={`link ${active === 'reviews' ? 'active' : ''}`}>Reviews</Link>
                <Link to={'/favorites'} onClick={() => setActive('favorites')} className={`link ${active === 'favorites' ? 'active' : ''}`}>Favorites</Link>
                <Box sx={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                  {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
                  <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src={userData?.profileImage} />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: '45px' }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      <MenuItem onClick={() => {
                        localStorage.removeItem('token')
                        navigate('/')
                      }}>
                        <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
                      </MenuItem>
                    </Menu>
                  </Box>
                  <Typography sx={{ color: '#000' }}>{userData?.userName}</Typography>
                </Box>
              </> : <>
                      <Link to={'/auth/register'} className='link-auth'>Register</Link>
                      <Link to={'/auth/login'} className='link-auth'>Login Now</Link>
                    </>
            }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </>
  )
}
