import img from '../../../../assets/images/Frame 1564.png'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { useEffect, useState } from 'react';
import { ADS_URL, axiosInstance, FACILITIES_URL, ROOMS_URL } from '../../../../services/EndPoints';
import PieChartComponent from '../../../shared/components/Chart/Chart';

export default function Dashboard() {
  const [rooms, setRooms] = useState(null)
  const [facilities, setFacilities] = useState(null)
  const [ads, setAds] = useState(null)
  
  
  const getRooms = async () => {
    try {
      const res = await axiosInstance.get(ROOMS_URL.GET_ROOMS)
      console.log(res);
      setRooms(res?.data?.data?.totalCount)
    } catch (error) {
      console.log(error);
    }
  }

  const getFacilities = async () => {
    try {
      const res = await axiosInstance.get(FACILITIES_URL.GET_FACILITIES)
      console.log(res);
      setFacilities(res?.data?.data?.totalCount)
    } catch (error) {
      console.log(error);
    }
  }

  const getAds = async () => {
    try {
      const res = await axiosInstance.get(ADS_URL.GET_ADS)
      console.log(res);
      setAds(res?.data?.data?.totalCount)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getRooms()
    getFacilities()
    getAds()
  }, [])

  return (
    <Box component="section" sx={{ p: 6 }}>
      <Box component="section" sx={{display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px'}}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Box>
              <Typography variant='h5' gutterBottom sx={{ fontSize: 25 }}>
                {rooms}
              </Typography>
              <Typography variant="h5" component="div" sx={{color: 'text.secondary', fontSize: 20}}>
                Rooms
              </Typography>
            </Box>
            <Avatar alt="Remy Sharp" src={img} />
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 275 }}>
          <CardContent sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Box>
              <Typography variant='h5' gutterBottom sx={{ fontSize: 25 }}>
                {facilities}
              </Typography>
              <Typography variant="h5" component="div" sx={{color: 'text.secondary', fontSize: 20}}>
                Facilities
              </Typography>
            </Box>
            <Avatar alt="Remy Sharp" src={img} />
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 275 }}>
          <CardContent sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Box>
              <Typography variant='h5' gutterBottom sx={{ fontSize: 25 }}>
                {ads}
              </Typography>
              <Typography variant="h5" component="div" sx={{color: 'text.secondary', fontSize: 20}}>
                Ads
              </Typography>
            </Box>
            <Avatar alt="Remy Sharp" src={img} />
          </CardContent>
        </Card>
      </Box>
      <Box sx={{width: '600px'}}>
        <PieChartComponent one={rooms} tow={facilities} three={ads} colorOne={'rgba(54, 162, 235, 0.2)'} colorTow={'rgba(255, 99, 132, 0.2)'} colorThree={'rgba(75, 192, 192, 0.2)'}/>
      </Box>
    </Box>
  )
}
