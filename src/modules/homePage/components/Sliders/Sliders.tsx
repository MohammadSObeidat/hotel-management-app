import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img from '../../../../assets/images/foto_keluarga.png'
import Grid from '@mui/material/Grid2';
import { Box, Rating, Typography } from "@mui/material";

// const reviewData = [
//   {
//     img: img,
//     title: 'Happy Family',
//     rate: (
//       <Rating
//         name="simple-controlled"
//         value={5}
//         readOnly
//         size="large"
//       />
//     ),
//     comment: 'What a great trip with my family and I should try again next time soon ...',
//     person: 'Angga, Product Designer'
//   },
//   {
//     img: img,
//     title: 'Happy Family',
//     rate: (
//       <Rating
//         name="simple-controlled"
//         value={4}
//         readOnly
//         size="large"
//       />
//     ),
//     comment: 'What a great trip with my family and I should try again next time soon ...',
//     person: 'Angga, Product Designer'
//   },
//   {
//     img: img,
//     title: 'Happy Family',
//     rate: (
//       <Rating
//         name="simple-controlled"
//         value={5}
//         readOnly
//         size="large"
//       />
//     ),
//     comment: 'What a great trip with my family and I should try again next time soon ...',
//     person: 'Angga, Product Designer'
//   },
//   {
//     img: img,
//     title: 'Happy Family',
//     rate: (
//       <Rating
//         name="simple-controlled"
//         value={4}
//         readOnly
//         size="large"
//       />
//     ),
//     comment: 'What a great trip with my family and I should try again next time soon ...',
//     person: 'Angga, Product Designer'
//   },
// ]

export default function Sliders() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box component="section" sx={{maxWidth: '1140px',color: '#152C5B', margin: {lg: '0px 150px', md: '0px 100px', sm: '0px 0px 30px', xs: '0px 0px 30px'}, padding: '100px 20px'}}>
      <Slider {...settings}>
            {/* <div>
              {reviewData.map((item) => {
                return <Box component="section" sx={{maxWidth: '1140px',color: '#152C5B', margin: {lg: '0px 150px', md: '0px 100px', sm: '0px 0px 30px', xs: '0px 0px 30px'}, padding: '100px 20px'}}>
                        <Box component={'image'}>
                          <img src={item.img} alt="" />
                        </Box>
                        <Box>
                          <Typography>{item.title}</Typography>
                          <Box>{item.rate}</Box>
                          <Typography>{item.comment}</Typography>
                          <Typography>{item.person}</Typography>
                        </Box>
                      </Box>
              })}
            </div> */}
            <Box>
              <Grid container spacing={12}>
              <Grid size={{lg: 6, md: 6, sm: 12, xs: 12}}>
                <Box>
                  <img src={img} alt="" />
                </Box>
                </Grid>
                <Grid size={{lg: 6, md: 6, sm: 12, xs: 12}} sx={{display: 'flex'}}>
                <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                  <Typography sx={{fontFamily: 'Poppins', fontSize: '24px', fontWeight: 500, color: '#152C5B', marginBottom: '40px'}}>Happy Family</Typography>
                  <Box sx={{marginBottom: '8px'}}>
                    <Rating
                        name="simple-controlled"
                        value={5}
                        readOnly
                        size="large"
                      />
                  </Box>
                  <Typography sx={{fontFamily: 'Poppins', fontSize: '32px', fontWeight: 400, color: '#152C5B', marginBottom: '8px'}}>What a great trip with my family and I should try again next time soon ...</Typography>
                  <Typography sx={{fontFamily: 'Poppins', fontSize: '18px', fontWeight: 300, color: '#B0B0B0'}}>Angga, Product Designer</Typography>
                </Box>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid container spacing={12}>
              <Grid size={{lg: 6, md: 6, sm: 12, xs: 12}}>
                <Box>
                  <img src={img} alt="" />
                </Box>
                </Grid>
                <Grid size={{lg: 6, md: 6, sm: 12, xs: 12}} sx={{display: 'flex'}}>
                <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                  <Typography sx={{fontFamily: 'Poppins', fontSize: '24px', fontWeight: 500, color: '#152C5B', marginBottom: '40px'}}>Happy Family</Typography>
                  <Box sx={{marginBottom: '8px'}}>
                    <Rating
                        name="simple-controlled"
                        value={4}
                        readOnly
                        size="large"
                      />
                  </Box>
                  <Typography sx={{fontFamily: 'Poppins', fontSize: '32px', fontWeight: 400, color: '#152C5B', marginBottom: '8px'}}>What a great trip with my family and I should try again next time soon ...</Typography>
                  <Typography sx={{fontFamily: 'Poppins', fontSize: '18px', fontWeight: 300, color: '#B0B0B0'}}>Angga, Product Designer</Typography>
                </Box>
                </Grid>
              </Grid>
            </Box>
          </Slider>
          </Box>
  )
}
