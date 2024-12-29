import './Favorites.css'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { axiosInstance, FAVORITE_ROOMS } from '../../../../../../services/EndPoints';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';


interface roomData {
  _id: string
  images: string[],
  price: number,
}

export default function Favorites() {
  const [favorite, setFavorite] = useState([])
  const [loading, setLoading] = useState(true);
  
  const getFavorite = async () => {
    try {
      const res = await axiosInstance.get(FAVORITE_ROOMS.GET_FAVORITE_ROOMS)
      setFavorite(res?.data?.data?.favoriteRooms[0].rooms)
    } catch (error) {
      console.log(error);
    }
  }

  const removeFavorite = async (id: string) => {
    try {
        const res = await axiosInstance.delete(FAVORITE_ROOMS.REMOVE_FAVORITE(id), {
            data: { roomId: id }
        })
        getFavorite()
        toast.success(res?.data?.message)
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    getFavorite()
    setTimeout(() => {
      setLoading(false); // After 2 seconds, set loading to false (or when data is loaded)
    }, 2000);
  }, [])

  return (
    <>
    <Box component="section" sx={{maxWidth: '1142px',color: '#152C5B', margin: {lg: '0px auto', md: '0px auto', sm: '0px auto', xs: '0px auto'}, padding: '30px 20px'}}>
      <Box sx={{marginBottom: '70px'}}>
        <Typography sx={{ textAlign: 'center', fontFamily: 'Poppins', fontWeight: 600, fontSize: '36px' }}>Your Favorites</Typography>
        <Typography sx={{ fontFamily: 'Poppins', fontWeight: 300, fontSize: '18px', color: '#B0B0B0' }}>Home     /    Favorites</Typography>
      </Box>
        <Typography sx={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '24px' }}>Your Rooms</Typography>
        <Box className="rooms" sx={{marginTop: '15px'}}>
          {favorite.map((item: roomData, index) => {
            return  <Box key={index} className="room">
                      {loading ? <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width="250px" height={150}/> : <Box className="bg-color"></Box>}
                      {loading ? (
                          <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width="250px" height={150}/>
                        ) : (
                      <img style={{width: '100%', height: '215px'}} src={item.images[0]} alt="" />

                        )}
                      {loading ? 
                      (<Skeleton variant="text" sx={{ fontSize: '1rem' }} width="150px" />)
                      :
                      (<Box className="icons">
                        {localStorage.getItem('token') ? <Button type='button' onClick={() => {
                            removeFavorite(item._id)
                        }}><FavoriteIcon  sx={{color: '#fff', fontSize: '40px', marginRight: '10px'}}/> </Button> : ''}
                      </Box>)}
                        {loading ? (
                          <Skeleton variant="text" sx={{ fontSize: '1rem' }} width="150px" />
                        ) : (
                          <Typography className="price">${item.price} per night</Typography>
                        )}
                    </Box>
          })}
        </Box>
    </Box>
    </>
  )
}
