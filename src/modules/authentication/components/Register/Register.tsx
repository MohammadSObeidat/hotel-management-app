// images 
import img from '../../../../assets/images/Group 33.png'

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { Button, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { EmailValidation } from '../../../../services/Validation';
import { toast } from 'react-toastify';
import { axiosInstanceURL, USERS_URL } from '../../../../services/EndPoints';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface registerData {
  userName: string,
  email: string,
  password: string,
  confirmPassword: string,
  phoneNumber: string,
  country: string,
  role: string,
  profileImage: string
}

export default function Register() {
  const [type, setType] = useState('password')
  const [typeConfirm, setTypeConfirm] = useState('password')
  const navigate = useNavigate()
  const location = useLocation()
    const {
      register,
      formState: { errors, isSubmitting },
      handleSubmit,
      watch
    } = useForm({defaultValues: {...location.state, role: 'user'}});
  
    const onSubmit = async (data: registerData) => {
      const formData = new FormData()
      formData.append('userName', data.userName)
      formData.append('email', data.email)
      formData.append('password', data.password)
      formData.append('confirmPassword', data.confirmPassword)
      formData.append('phoneNumber', data.phoneNumber)
      formData.append('country', data.country)
      formData.append('role', data.role)
      formData.append('profileImage', data.profileImage[0])

      try {
        const res = await axiosInstanceURL.post(USERS_URL.REGISTER, formData)
        console.log(res);
        navigate('/login')
        toast.success(res?.data?.message)
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

    const changeTypeConfirm = () => {
      if (typeConfirm === 'password') {
        setTypeConfirm('text')
      } else {
        setTypeConfirm('password')
      }
    }

  return (
    <>
      <Box className="auth-container">
        <Container maxWidth="lg" sx={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box component="section" sx={{bgcolor: '#FFFFFF', p: 2,width: '100%' }}>
            <Grid container spacing={2} >
              <Grid size={{ lg: 6, md: 6, sm: 6,  xs: 12 }}>
                <Typography variant="h5" component="h2" className='title'><Typography className='title' variant="h5" component="h2" sx={{color:'#3252DF'}}>Stay</Typography>cation</Typography>
                <Box component="section" sx={{p: 5}}>
                  <Typography variant="h5" className='form-title'>Sign up</Typography>
                  <Typography variant="body1" className='form-info'>If you already have an account register</Typography>
                  <Typography variant="body1" className='form-info'>You can  <Link to={'/login'} style={{textDecoration: 'none', color: '#ff5722',fontWeight: 'bold'}}>Login here !</Link></Typography>
                  <Box component="section" sx={{pt: 4}}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Grid container spacing={1}>
                        <Grid size={{ xs: 12, md: 12, sm: 12 }}>
                          <TextField sx={{width: '100%'}}  label="User Name" variant="outlined" 
                            helperText={errors?.userName?.message}
                            error={!!errors?.userName}
                            type="text"
                            {...register('userName', {
                              required: 'User name is required'
                            })}/>
                        </Grid>
                        <Grid size={{ xs: 12, md: 12, sm: 12 }}>
                          <TextField sx={{width: '100%', display: 'none'}}  label="role" variant="outlined" 
                            helperText={errors?.role?.message}
                            error={!!errors?.role}
                            type="text"
                            {...register('role', {
                              required: 'role is required'
                            })}/>
                        </Grid>
                        <Grid size={{ xs: 12, md: 12, sm: 12 }}>
                          <TextField sx={{width: '100%'}}  label="Email Address" variant="outlined" 
                            helperText={errors?.email?.message}
                            error={!!errors?.email}
                            type="email"
                            {...register('email', EmailValidation)}/>
                        </Grid>
                        <Grid size={{lg: 6, md: 12, sm: 12, xs: 12}}>
                          <TextField sx={{width: '100%'}}  label="Phone Number" variant="outlined" 
                            helperText={errors?.phoneNumber?.message}
                            error={!!errors?.phoneNumber}
                            type="text"
                            {...register('phoneNumber', {
                              required: 'Phone number is required'
                            })}/>
                        </Grid>
                        <Grid size={{lg: 6, md: 12, sm: 12, xs: 12}}>
                          <TextField sx={{width: '100%'}}  label="Country" variant="outlined" 
                            helperText={errors?.country?.message}
                            error={!!errors?.country}
                            type="text"
                            {...register('country', {
                              required: 'Country is required'
                            })}/>
                        </Grid>
                        <Grid size={{ xs: 12, md: 12, sm: 12 }}>
                          <Box component="section" sx={{position: 'relative'}}>
                            <TextField sx={{width: '100%'}}  label="Password" variant="outlined" 
                              helperText={errors?.password?.message}
                              error={!!errors?.password}
                              type={type}
                              {...register('password', {
                                required: 'Password is required'
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
                            <TextField sx={{width: '100%'}}  label="Confirm Password" variant="outlined" 
                              helperText={errors?.confirmPassword?.message}
                              error={!!errors?.confirmPassword}
                              type={typeConfirm}
                              {...register('confirmPassword', {
                                required: 'Confirm password is required',
                                validate: (confirmPassword) =>
                                  confirmPassword === watch('password') || "Password do not match",
                              })}/>
                              {typeConfirm === 'password' ? <Button variant="text" sx={{position: 'absolute', right:'0', top:'10px', background: 'transparent'}}
                                onClick={changeTypeConfirm}>
                                <VisibilityOffIcon color='action'/>
                              </Button> : 
                              <Button variant="text" sx={{position: 'absolute', right:'0', top:'10px', background: 'transparent'}}
                                onClick={changeTypeConfirm}>
                                <VisibilityIcon color='action'/>
                              </Button>}
                          </Box>
                        </Grid>
                        <Grid size={{ xs: 12, md: 12, sm: 12 }}>
                          <TextField sx={{width: '100%'}} variant="outlined" 
                            helperText={errors?.profileImage?.message}
                            error={!!errors?.profileImage}
                            type="file"
                            {...register('profileImage', {
                              required: 'Profile image is required'
                            })}/>
                        </Grid>
                        <Button type="submit" variant="contained" sx={{width: '100%', marginTop: '35px', paddingBlock: '10px'}} disabled={isSubmitting}>
                          {isSubmitting && <span className="spinner-border spinner-border-sm mr-1 mx-1"></span>}
                          Sign up
                        </Button>
                      </Grid>
                    </form>
                  </Box>
                </Box>
              </Grid>
              <Grid size={{ lg: 6, md: 6, sm: 6,  xs: 12 }}>
                <img src={img} alt="" style={{width: '100%', minHeight: '100%'}}/>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  )
}
