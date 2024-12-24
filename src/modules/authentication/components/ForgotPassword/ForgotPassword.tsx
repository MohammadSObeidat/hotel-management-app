// images 
import img from '../../../../assets/images/forgot.png'

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { Button, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { EmailValidation } from '../../../../services/Validation';
import { toast } from 'react-toastify';
import { axiosInstanceURL, USERS_URL } from '../../../../services/EndPoints';
import { Link, useNavigate } from 'react-router-dom';

interface forgotData {
  email: string,
}

export default function ForgotPassword() {
  const navigate = useNavigate()
  const {
      register,
      formState: { errors, isSubmitting },
      handleSubmit,
    } = useForm();


   const onSubmit = async (data: forgotData) => {
      try {
        const res = await axiosInstanceURL.post(USERS_URL.FORGOT_PASSWORD, data)
        console.log(res);
        toast.success(res?.data?.data?.message)
        navigate('/reset-password', {state: {email: data?.email}})
      } catch (error: any) {
        toast.error(error?.response?.data?.message)
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
                  <Typography variant="h5" className='form-title'>Forgot password</Typography>
                  <Typography variant="body1" className='form-info'>If you already have an account register</Typography>
                  <Typography variant="body1" className='form-info'>You can  <Link to={'/login'} style={{textDecoration: 'none', color: '#ff5722',fontWeight: 'bold'}}>Login here !</Link></Typography>
                  <Box component="section" sx={{pt: 4}}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 12, sm: 12 }}>
                          <TextField sx={{width: '100%', marginTop: '10px'}}  label="Email Address" variant="outlined" 
                            helperText={errors?.email?.message}
                            error={!!errors?.email}
                            type="email"
                            {...register('email', EmailValidation)}/>
                        </Grid>
                        <Button type="submit" variant="contained" sx={{width: '100%', marginTop: '30px'}} disabled={isSubmitting}>
                          {isSubmitting && <span className="spinner-border spinner-border-sm mr-1 mx-1"></span>}
                          Send mail
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

