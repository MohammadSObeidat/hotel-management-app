import './Payment.css'
import payImg from '../../../../assets/images/payment.png'
import { AddressElement, CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import React, { useEffect } from 'react';
import { axiosInstance, BOOKING_URL_USER } from '../../../../services/EndPoints';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Payment() {
    const navigate = useNavigate()
    const location = useLocation()
    const id = location.state.id
    
    const stripe = useStripe();
    const elements = useElements();

    const payBooking = async (bookingId: string, token: string) => {
        try {
            const res = await axiosInstance.post(BOOKING_URL_USER.PAY_BOOKING(bookingId),
                {token: token}
            )
            console.log(res);
            navigate('/payment-done')
            toast.success(res?.data?.message)
        } catch (error) {
            console.log(error);
        }
    }

    const paymentHandler = async (e:  React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        try {
            if (!elements || !stripe) return ;
            // get value 
            const cardElement = elements.getElement(CardElement)
            const addressElement = elements.getElement(AddressElement)

            if (!cardElement || !addressElement) return ;

            const addressValue = await addressElement.getValue()
            console.log({addressValue});
            

            // create token
            const {error, token} = await stripe.createToken(cardElement)
            if (error) return;
            const tokenValue = token?.id

            // send the token to the backend
            payBooking(id, tokenValue)
            console.log({token});

        } catch (error) {
            console.log(error);
        }
        
    }

    useEffect(() => {
        scrollTo(0,0)
    }, [])

  return (
    <Box component="section" className='form-wrapper'>
        <Container maxWidth="lg" sx={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Box sx={{width: '100%'}}>
                <Grid container spacing={2}>
                    <Grid size={{lg: 7, md: 7, sm: 7, xs: 12}}>
                        <img style={{width: '100%', height: '100%'}} src={payImg} alt="" />
                    </Grid>
                    <Grid size={{lg: 5, md: 5, sm: 5, xs: 12}} sx={{minHeight: '60vh', margin: 'auto 0'}}>
                        <form onSubmit={paymentHandler}>
                            <AddressElement options={{mode: 'billing'}} />
                            <Box className='card'>
                                <CardElement/>
                            </Box>
                            <Button type='submit' sx={{backgroundColor: '#3ec4bd', marginTop: '30px', width: '100%'}} variant="contained">Continue to Book</Button>
                        </form>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    </Box>
  )
}
