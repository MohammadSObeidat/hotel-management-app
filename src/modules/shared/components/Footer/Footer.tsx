import './Footer.css'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <Box component="section" sx={{maxWidth: '1140px',color: '#152C5B', margin: {lg: '0px 150px', md: '0px 100px', sm: '0px 0px 30px', xs: '0px 0px 30px'}, padding: '50px 20px'}}>
        <Grid container spacing={2}>
            <Grid size={{lg: 3, md: 3, sm: 6, xs: 12}}>
                <Typography variant='h1' sx={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '26px' }}><span style={{color: '#0d6efd'}}>Stay</span>cation</Typography>
                <Typography sx={{ color: '#B0B0B0', fontFamily: 'Poppins', fontWeight: 300, fontSize: '16px', width: '257px', marginTop: '8px' }}>We kaboom your beauty holiday instantly and memorable.</Typography>
            </Grid>
            <Grid size={{lg: 3, md: 3, sm: 6, xs: 12}}>
                <Typography variant='body1' sx={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '18px' }}>For Beginners</Typography>
                <Typography sx={{ color: '#B0B0B0', fontFamily: 'Poppins', fontWeight: 300, fontSize: '16px', width: '257px', marginTop: '8px' }}>New Account</Typography>
                <Typography sx={{ color: '#B0B0B0', fontFamily: 'Poppins', fontWeight: 300, fontSize: '16px', width: '257px', marginTop: '8px' }}>Start Booking a Room</Typography>
                <Typography sx={{ color: '#B0B0B0', fontFamily: 'Poppins', fontWeight: 300, fontSize: '16px', width: '257px', marginTop: '8px' }}>Use Payments</Typography>
            </Grid>
            <Grid size={{lg: 3, md: 3, sm: 6, xs: 12}}>
                <Typography variant='body1' sx={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '18px' }}>Explore Us</Typography>
                <Typography sx={{ color: '#B0B0B0', fontFamily: 'Poppins', fontWeight: 300, fontSize: '16px', width: '257px', marginTop: '8px' }}>Our Careers</Typography>
                <Typography sx={{ color: '#B0B0B0', fontFamily: 'Poppins', fontWeight: 300, fontSize: '16px', width: '257px', marginTop: '8px' }}>Privacy</Typography>
                <Typography sx={{ color: '#B0B0B0', fontFamily: 'Poppins', fontWeight: 300, fontSize: '16px', width: '257px', marginTop: '8px' }}>Terms & Conditions</Typography>
            </Grid>
            <Grid size={{lg: 3, md: 3, sm: 6, xs: 12}}>
            <Typography variant='body1' sx={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '18px' }}>Connect Us</Typography>
                <Typography sx={{ color: '#B0B0B0', fontFamily: 'Poppins', fontWeight: 300, fontSize: '16px', width: '257px', marginTop: '8px' }}>support@staycation.id</Typography>
                <Typography sx={{ color: '#B0B0B0', fontFamily: 'Poppins', fontWeight: 300, fontSize: '16px', width: '257px', marginTop: '8px' }}>021 - 2208 - 1996</Typography>
                <Typography sx={{ color: '#B0B0B0', fontFamily: 'Poppins', fontWeight: 300, fontSize: '16px', width: '257px', marginTop: '8px' }}>Staycation, Kemang, Jakarta</Typography>
            </Grid>
        </Grid>
    </Box>
  )
}
