import './AdsUser.css'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';
import { ADS_URL_USER, axiosInstance } from '../../../../services/EndPoints';

interface room {
    images: string,
    price: number
}

interface adsData {
    room: room
}

export default function AdsUser() {
    const [ads, setAds] = useState([])
    const [loading, setLoading] = useState(true);
  
    const getAds = async () => {
        try {
          const res = await axiosInstance.get(ADS_URL_USER.GET_ADS)
          console.log(res);
          setAds(res?.data?.data?.ads)
        } catch (error) {
          console.log(error);
        }
      }
    
      useEffect(() => {
        getAds()
        setTimeout(() => {
          setLoading(false); // After 2 seconds, set loading to false (or when data is loaded)
        }, 2000);
      }, [])

  return (
    <Box component="section" sx={{maxWidth: '1140px',color: '#152C5B', margin: {lg: '0px 150px', md: '0px 100px', sm: '0px 0px 30px', xs: '0px 0px 30px'}, padding: '20px 20px'}}>
        <Typography sx={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '24px' }}>Ads</Typography>
        <Box className="static-items" sx={{marginTop: '15px'}}>
          {ads.slice(0,4).map((item: adsData, index) => {
            return  <Box key={index} className="static-item">
                      {loading ? (
                          <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width="250px" height={150}/>
                        ) : (
                      <img style={{width: '100%', height: '100%'}} src={item?.room?.images} alt="" />
                        )}
                        {loading ? (
                          <Skeleton variant="text" sx={{ fontSize: '1rem' }} width="150px" />
                        ) : (
                          <Typography className="price">${item.room.price} per night</Typography>
                        )}
                    </Box>
          })}
        </Box>
    </Box>
  )
}
