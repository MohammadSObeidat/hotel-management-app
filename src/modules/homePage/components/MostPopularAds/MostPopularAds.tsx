import './MostPopularAds.css'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { useEffect, useState } from 'react';
import { ADS_URL_USER, axiosInstance, FAVORITE_ROOMS } from '../../../../services/EndPoints';
import Skeleton from '@mui/material/Skeleton';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';

interface room {
  _id: string,
  images: string,
  price: number
}

interface adsData {
  room: room
}

export default function MostPopularAds() {
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

  const addToFavorite = async (id: string) => {
    try {
      const res = await axiosInstance.post(FAVORITE_ROOMS.ADD_TO_FAVORITE, {
        roomId: id
      })
      console.log(res);
      toast.success(res?.data?.message)
    } catch (error: any) {
      toast.error(error?.response?.data?.message)
    }
  }

  useEffect(() => {
    getAds()
    setTimeout(() => {
      setLoading(false); // After 2 seconds, set loading to false (or when data is loaded)
    }, 2000);
  }, [])

  return (
    <Box component="section" sx={{maxWidth: '1140px',color: '#152C5B', margin: {lg: '0px 150px 30px', md: '0px 100px 30px', sm: '0px 0px 30px', xs: '0px 0px 30px'}, padding: '30px 20px'}}>
        <Typography sx={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '24px' }}>Most popular ads</Typography>
        <Box className="items" sx={{marginTop: '15px'}}>
          {ads.slice(0,5).map((item: adsData, index) => {
            return  <Box key={index} className="item">
                      {loading ? <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width="250px" height={150}/> : <Box className="bg"></Box>}
                      {loading ? (
                          <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width="250px" height={150}/>
                        ) : (
                      <img style={{width: '100%', height: '100%'}} src={item?.room?.images} alt="" />

                        )}
                      {loading ? 
                      (<Skeleton variant="text" sx={{ fontSize: '1rem' }} width="150px" />)
                      :
                      (<Box className="icons">
                        {localStorage.getItem('token') ? <Button type='button' onClick={() => addToFavorite(item?.room?._id)}><FavoriteIcon  sx={{color: '#fff', fontSize: '40px', marginRight: '10px'}}/></Button> : ''}
                        {/* // <FavoriteIcon  sx={{color: '#fff', fontSize: '40px', marginRight: '10px'}}/> */}
                        <Link to={`details-page/${item.room._id}`}>
                          <RemoveRedEyeOutlinedIcon sx={{color: '#fff', fontSize: '40px'}}/>
                        </Link>
                      </Box>)}
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
