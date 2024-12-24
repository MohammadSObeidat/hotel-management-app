import './SideBar.css'
// images
import homeImg from '../../../../assets/images/home.png'
import userImg from '../../../../assets/images/users.png'
import roomImg from '../../../../assets/images/rooms.png'
import tableImg from '../../../../assets/images/union.png'
import passwordImg from '../../../../assets/images/password.png'
import logoutImg from '../../../../assets/images/logout (1).png'

import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import Box from '@mui/material/Box';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react'
import Typography from '@mui/material/Typography';


export default function SideBar() {
  const navigate = useNavigate()
  const [activeItem, setActiveItem] = useState('home');  // Store the active item
  return (
    <Box className='sidebar-container'>
      <Sidebar>
        <Menu>
          <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '15px', color: '#fff'}}>Staycation</Typography>
          
          <MenuItem component={<Link to="/dashboard" />} icon={<img src={homeImg} alt="" />}
           active={activeItem === 'home'}
           onClick={() => setActiveItem('home')}
           > Home </MenuItem>
          <MenuItem component={<Link to="/users" />} icon={<img src={userImg} alt="" />}
          active={activeItem === 'user'}
          onClick={() => setActiveItem('user')}> Users </MenuItem>
          <MenuItem component={<Link to="/rooms" />} icon={<img src={roomImg} alt="" />}
          active={activeItem === 'room'}
          onClick={() => setActiveItem('room')}> Rooms </MenuItem>
          <MenuItem component={<Link to="/ads" />} icon={<img src={tableImg} alt="" />}
          active={activeItem === 'ads'}
          onClick={() => setActiveItem('ads')}> Ads </MenuItem>
          <MenuItem component={<Link to="/booking" />} icon={<img src={tableImg} alt="" />}
          active={activeItem === 'booking'}
          onClick={() => setActiveItem('booking')}> Bookings </MenuItem>
          <MenuItem component={<Link to="/facilities" />} icon={<img src={tableImg} alt="" />}
          active={activeItem === 'facilities'}
          onClick={() => setActiveItem('facilities')}> Facilities </MenuItem>
          <MenuItem icon={<img src={passwordImg} alt="" />}> Change password </MenuItem>
          <MenuItem icon={<img src={logoutImg} alt="" />}
          onClick={() => {
            localStorage.removeItem('token')
            navigate('/login')
          }}> Logout </MenuItem>
        </Menu>
      </Sidebar>
    </Box>
  )
}
