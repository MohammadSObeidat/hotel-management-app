// images 
import img from '../../../../assets/images/Group 33 (1).png'

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
import { Link, useNavigate } from 'react-router-dom';
import { UseAuthContext } from '../../../../context/AuthContext';

interface loginData {
  email: string,
  password: string
}

export default function Login() {
  const navigate = useNavigate()
  const [type, setType] = useState('password')
  const {saveLoginData} = UseAuthContext()
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data: loginData) => {
    try {
      const res = await axiosInstanceURL.post(USERS_URL.LOGIN, data)
      console.log(res);
      const token = res?.data?.data?.token
      localStorage.setItem('token', token)
      saveLoginData()
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

  return (
    <>
      <Box className="auth-container">
        <Container maxWidth="md" sx={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box component="section" sx={{bgcolor: '#FFFFFF', p: 2,width: '100%' }}>
            <Grid container spacing={2} >
              <Grid size={{ lg: 6, md: 6, sm: 6,  xs: 12 }}>
                <Typography variant="h5" component="h2" className='title'><Typography className='title' variant="h5" component="h2" sx={{color:'#3252DF'}}>Stay</Typography>cation</Typography>
                <Box component="section" sx={{p: 5}}>
                  <Typography variant="h5" className='form-title'>Sign in</Typography>
                  <Typography variant="body1" className='form-info'>If you don’t have an account register</Typography>
                  <Typography variant="body1" className='form-info'>You can  <Link to={'/register'} style={{textDecoration: 'none', color: '#000', fontWeight: 'bold'}}>Register here !</Link></Typography>
                  <Box component="section" sx={{pt: 4}}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 12, sm: 12 }}>
                          <TextField sx={{width: '100%'}}  label="Email Address" variant="outlined" 
                            helperText={errors?.email?.message}
                            error={!!errors?.email}
                            type="email"
                            {...register('email', EmailValidation)}/>
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
                        <Link to={'/forgot-password'} style={{width: '100%', textDecoration: 'none', color: '#000', textAlign: 'end'}}>Forgot Password ?</Link>
                        <Button type="submit" variant="contained" sx={{width: '100%'}} disabled={isSubmitting}>
                          {isSubmitting && <span className="spinner-border spinner-border-sm mr-1 mx-1"></span>}
                          Login
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
