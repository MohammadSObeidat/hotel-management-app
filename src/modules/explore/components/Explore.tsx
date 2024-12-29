import './Explore.css'
import { Link, useSearchParams } from "react-router-dom"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';
import { axiosInstance, FAVORITE_ROOMS, ROOM_URL_USER } from '../../../services/EndPoints';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { toast } from 'react-toastify';
import { Button } from '@mui/material';

interface roomData {
  _id: string
  images: string[],
  price: number,
}

export default function Explore() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [roomCount, setRoomCount] = useState(0)
  const [params] = useSearchParams()
  // Optionally, you can convert URLSearchParams to a regular object for easier use:
  const queryObject = Object.fromEntries(params.entries());
  console.log(queryObject); // Logs the query params as an object
  
  const getRooms = async (page: number, size: number, startDate?: string, endDate?: string) => {
    try {
      const res = await axiosInstance.get(ROOM_URL_USER.GET_ROOMS, 
        {params: {page: page, size: size, startDate: startDate, endDate: endDate}}
      )
      setRooms(res?.data?.data?.rooms)
      setRoomCount(res?.data?.data?.totalCount)
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

  const handlePageChange = (event, value: number) => {
    setPage(value); // Set the page number when a user clicks on a page or the next/previous button
  };

  useEffect(() => {
    getRooms(page, 20, queryObject.startDate, queryObject.endDate)
    setTimeout(() => {
      setLoading(false); // After 2 seconds, set loading to false (or when data is loaded)
    }, 2000);
  }, [page])

  return (
    <Box component="section" sx={{maxWidth: '1142px',color: '#152C5B', margin: {lg: '0px auto', md: '0px auto', sm: '0px auto', xs: '0px auto'}, padding: '30px 20px'}}>
      <Box sx={{marginBottom: '70px'}}>
        <Typography sx={{ textAlign: 'center', fontFamily: 'Poppins', fontWeight: 600, fontSize: '36px' }}>Explore ALL Rooms</Typography>
        <Typography sx={{ fontFamily: 'Poppins', fontWeight: 300, fontSize: '18px', color: '#B0B0B0' }}>Home     /    Explore</Typography>
      </Box>
        <Typography sx={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '24px' }}>All Rooms</Typography>
        <Box className="rooms" sx={{marginTop: '15px'}}>
          {rooms.map((item: roomData, index) => {
            return  <Box key={index} className="room">
                      {loading ? <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width="250px" height={150}/> : <Box className="bg-color"></Box>}
                      {loading ? (
                          <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width="250px" height={150}/>
                        ) : (
                      <img style={{width: '100%', height: '215px'}} src={item.images[0]} alt="" />

                        )}
                      {/* <img style={{width: '100%', height: '100%'}} src={item?.room?.images} alt="" /> */}
                      {loading ? 
                      (<Skeleton variant="text" sx={{ fontSize: '1rem' }} width="150px" />)
                      :
                      (<Box className="icons">
                        {localStorage.getItem('token') ?  <Button type='button' onClick={() => addToFavorite(item._id)}><FavoriteIcon  sx={{color: '#fff', fontSize: '40px', marginRight: '10px'}}/></Button> : ''}
                        <Link to={`/details-page/${item._id}`}>
                          <RemoveRedEyeOutlinedIcon sx={{color: '#fff', fontSize: '40px'}}/>
                        </Link>
                      </Box>)}
                        {loading ? (
                          <Skeleton variant="text" sx={{ fontSize: '1rem' }} width="150px" />
                        ) : (
                          <Typography className="price">${item.price} per night</Typography>
                        )}
                    </Box>
          })}
        </Box>
        <Stack spacing={2} sx={{paddingBlock: 8}}>
          <Pagination 
          sx={{display: 'flex', justifyContent: 'center'}} 
          count={roomCount ? Math.ceil(roomCount / 20) : 0}
          color="primary"
          page={page}
          onChange={handlePageChange}/>
        </Stack>
    </Box>
  )
}
