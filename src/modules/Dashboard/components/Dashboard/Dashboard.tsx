import img from '../../../../assets/images/Frame 1564.png'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { useEffect, useState } from 'react';
import { axiosInstance, DASHBOARD_URL } from '../../../../services/EndPoints';
import PieChartComponent from '../../../shared/components/Chart/Chart';

export default function Dashboard() {
  const [rooms, setRooms] = useState(0)
  const [facilities, setFacilities] = useState(0)
  const [ads, setAds] = useState(0)
  const [pending, setPending] = useState(0)
  const [completed, setCompleted] = useState(0)
  const [user, setUser] = useState(0)
  const [admin, setAdmin] = useState(0)

  const getChart = async () => {
    try {
      const res = await axiosInstance.get(DASHBOARD_URL.CHART)
      console.log(res);
      setRooms(res?.data?.data?.rooms)
      setFacilities(res?.data?.data?.facilities)
      setAds(res?.data?.data?.ads)
      setPending(res?.data?.data?.bookings?.pending)
      setCompleted(res?.data?.data?.bookings?.completed)
      setUser(res?.data?.data?.users?.user)
      setAdmin(res?.data?.data?.users?.admin)
    } catch (error) {
      console.log(error);
    }
  }
  

  useEffect(() => {
    getChart()
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
        <PieChartComponent one={pending} tow={completed} colorOne={'rgba(54, 162, 235, 0.2)'} colorTow={'rgba(255, 99, 132, 0.2)'} nameOne={'pending'} nameTwo={'completed'}/>
        <PieChartComponent one={user} tow={admin} colorOne={'rgba(54, 162, 235, 0.2)'} colorTow={'rgba(255, 99, 132, 0.2)'} nameOne={'user'} nameTwo={'admin'}/>
      </Box>
    </Box>
  )
}
