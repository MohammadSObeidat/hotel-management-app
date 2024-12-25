import './SideBar.css'
// images
import homeImg from '../../../../assets/images/home.png'
import userImg from '../../../../assets/images/users.png'
import roomImg from '../../../../assets/images/rooms.png'
import tableImg from '../../../../assets/images/union.png'
import passwordImg from '../../../../assets/images/password.png'
import logoutImg from '../../../../assets/images/logout (1).png'
import Grid from '@mui/material/Grid2';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import Box from '@mui/material/Box';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form'
import { axiosInstanceURL, USERS_URL } from '../../../../services/EndPoints'
import { toast } from 'react-toastify'
import { TextField } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface passwordData {
  oldPassword: string,
  newPassword: string,
  confirmPassword: string
}

export default function SideBar() {
  const navigate = useNavigate()
  const [activeItem, setActiveItem] = useState('home');  // Store the active item
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('password')
  const [typeNewPassword, setTypeNewPassword] = useState('password')
  const [typeConfrimPassword, setTypeConfrimPassword] = useState('password')
  const {
      register,
      formState: { errors, isSubmitting },
      handleSubmit,
      watch
    } = useForm()

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data: passwordData) => {
    try {
      const res = await axiosInstanceURL.post(USERS_URL.CHANGE_PASSWORD, data)
      console.log(res);
      toast.success(res?.data?.message)
      navigate('/dashboard')
    } catch (error: any) {
      toast.error(error?.response?.data?.message)
    }
  }

  const changeType = () => {
    if (type === 'password') {
      setType('text')
    } else {
      setType('password')
    }
  }

  const changeTypeNew = () => {
    if (typeNewPassword === 'password') {
      setTypeNewPassword('text')
    } else {
      setTypeNewPassword('password')
    }
  }

  const changeTypeConfrim = () => {
    if (typeConfrimPassword === 'password') {
      setTypeConfrimPassword('text')
    } else {
      setTypeConfrimPassword('password')
    }
  }

  return (
    <>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Change Your Password
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers sx={{width: '500px'}}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 12, sm: 12 }}>
                <Box component="section" sx={{position: 'relative'}}>
                  <TextField sx={{width: '100%'}}  label="Old Password" variant="outlined" 
                    helperText={errors?.oldPassword?.message}
                    error={!!errors?.oldPassword}
                    type={type}
                    {...register('oldPassword', {
                      required: 'Old assword is required'
                    })}/>
                    {type === 'password' ? <Button variant="text" sx={{position: 'absolute', right:'0', top:'10px', background: 'transparent'}}
                      onClick={changeType}>
                      <VisibilityOffIcon color='action'/>
                    </Button> : 
                    <Button variant="text" sx={{position: 'absolute', right:'0', top:'10px', background: 'transparent'}}
                      onClick={changeType}>
                      <VisibilityIcon color='action'/>
                    </Button>}
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 12, sm: 12 }}>
                <Box component="section" sx={{position: 'relative'}}>
                  <TextField sx={{width: '100%'}}  label="New password" variant="outlined" 
                    helperText={errors?.newPassword?.message}
                    error={!!errors?.newPassword}
                    type={typeNewPassword}
                    {...register('newPassword', {
                      required: 'New password is required'
                    })}/>
                    {typeNewPassword === 'password' ? <Button variant="text" sx={{position: 'absolute', right:'0', top:'10px', background: 'transparent'}}
                      onClick={changeTypeNew}>
                      <VisibilityOffIcon color='action'/>
                    </Button> : 
                    <Button variant="text" sx={{position: 'absolute', right:'0', top:'10px', background: 'transparent'}}
                      onClick={changeTypeNew}>
                      <VisibilityIcon color='action'/>
                    </Button>}
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 12, sm: 12 }}>
                <Box component="section" sx={{position: 'relative'}}>
                  <TextField sx={{width: '100%'}}  label="Confirm password" variant="outlined" 
                    helperText={errors?.confirmPassword?.message}
                    error={!!errors?.confirmPassword}
                    type={typeConfrimPassword}
                    {...register('confirmPassword', {
                      required: 'Confirm password is required',
                      validate: (confirmPassword) => 
                        confirmPassword === watch('newPassword') || "Password do not match",
                    })}/>
                    {typeConfrimPassword === 'password' ? <Button variant="text" sx={{position: 'absolute', right:'0', top:'10px', background: 'transparent'}}
                      onClick={changeTypeConfrim}>
                      <VisibilityOffIcon color='action'/>
                    </Button> : 
                    <Button variant="text" sx={{position: 'absolute', right:'0', top:'10px', background: 'transparent'}}
                      onClick={changeTypeConfrim}>
                      <VisibilityIcon color='action'/>
                    </Button>}
                </Box>
              </Grid>
              <Button type="submit" variant="contained" sx={{width: '100%', marginTop: '20px', paddingBlock: '10px'}} disabled={isSubmitting}>
                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1 mx-1"></span>}
                Change Password
              </Button>
            </Grid>
          </form>
        </DialogContent>
      </BootstrapDialog>


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
            <MenuItem icon={<img src={passwordImg} alt="" />} onClick={handleClickOpen}> Change password </MenuItem>
            <MenuItem icon={<img src={logoutImg} alt="" />}
            onClick={() => {
              localStorage.removeItem('token')
              navigate('/auth/login')
            }}> Logout </MenuItem>
          </Menu>
        </Sidebar>
      </Box>
    </>
  )
}
