import img from '../../../../assets/images/payDone.png'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function PaymentDone() {
  return (
    <Box sx={{minHeight: '100vh', display:'flex',flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Typography sx={{ textAlign: 'center', fontFamily: 'Poppins', fontWeight: 600, fontSize: '36px', color: '#152C5B' }}>Pay! Completed</Typography>
        <img src={img} alt="" />
        <Typography sx={{ textAlign: 'center', fontFamily: 'Poppins', fontWeight: 300, fontSize: '18px', color: '#B0B0B0', width: '400px' }}>
            We will inform you via email later
            once the transaction has been accepted
        </Typography>
        <Link to={'/'} className='btn btn-primary mt-5 px-4'>Back to Home</Link>
    </Box>
  )
}
