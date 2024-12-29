import './StaticSection.css'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';
  
interface staticData {
    id: number,
    img: string,
    title: string,
    description: string
}

interface props {
    title: string,
    items: staticData[]
}


export default function StaticSection({title, items}: props) {
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      setTimeout(() => {
        setLoading(false); // After 2 seconds, set loading to false (or when data is loaded)
      }, 2000);
    }, [])

  return (
    <Box component="section" sx={{maxWidth: '1140px',color: '#152C5B', margin: {lg: '0px 150px', md: '0px 100px', sm: '0px 0px 30px', xs: '0px 0px 30px'}, padding: '20px 20px'}}>
        <Typography sx={{ fontFamily: 'Poppins', fontWeight: 500, fontSize: '24px' }}>{title}</Typography>
        <Box className="static-items" sx={{marginTop: '15px'}}>
          {items.map((item: staticData) => {
            return  <Box key={item.id} className="static-item">
                        {loading ? (
                          <Skeleton variant="rounded" sx={{ fontSize: '1rem' }} width="250px" height={150}/>
                        ) :
                        <Box className="popular-choice"> 
                            <img style={{width: '100%', height: '100%'}} src={item.img} alt="" />
                        </Box>}
                        {loading ? (
                          <Skeleton variant="text" sx={{ fontSize: '1rem' }} width="150px"/>
                        ) :
                        (<>
                        <Typography sx={{fontFamily: 'Poppins', fontWeight: 400, fontSize: '20px', color: '#152C5B', marginTop: '15px'}}>{item.title}</Typography>
                        <Typography sx={{fontFamily: 'Poppins', fontWeight: 300, fontSize: '15px', color: '#B0B0B0'}}>{item.description}</Typography>
                        </>)
                        }
                    </Box>
          })}
        </Box>
    </Box>
  )
}
