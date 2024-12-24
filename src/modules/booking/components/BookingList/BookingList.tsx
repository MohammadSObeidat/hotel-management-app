import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { axiosInstance, BOOKING_URL } from '../../../../services/EndPoints';
import { ThreeDot } from "react-loading-indicators";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import room from '../../../../assets/images/room.jpg'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface room {
  roomNumber: string
}

interface user {
  userName: string
}

interface bookingData {
  _id: number
  user: user
  room: room,
  totalPrice: number,
  status: string,
  startDate: string,
  endDate: string
}

interface detalisBooking {
  user: user,
  room: room,
  startDate: string,
  endDate: string,
  totalPrice: number,
}

export default function BookingList() {
  const [booking, setBooking] = useState([])
  const [bookingCount, setBookingCount] = useState(0)
  const [load, setLoad] = useState(true)
  const [page, setPage] = useState(1);
  const [detalisBooking, setDetalisBooking] = useState<detalisBooking | null>(null)
  const [open, setOpen] = useState(false);

  const handleClickOpen = (id: number) => {
    const getDetalisBooking = async () => {
      try {
        const res = await axiosInstance.get(BOOKING_URL.DETAILS_BOOKING(id))
        console.log(res);
        setDetalisBooking(res?.data?.data?.booking)
      } catch (error) {
        console.log(error);
      }
    }
    getDetalisBooking()
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getBooking = async (page: number, size: number) => {
    try {
      const res = await axiosInstance.get(BOOKING_URL.GET_BOOKING, 
        {params: {page: page, size: size}}
      )
      console.log(res);
      setBooking(res?.data?.data?.booking)
      setBookingCount(res?.data?.data?.totalCount)
      setLoad(false)
    } catch (error) {
      console.log(error);
    }
  }

  const handlePageChange = (event, value: number) => {
    setPage(value); // Set the page number when a user clicks on a page or the next/previous button
  };

  useEffect(() => {
    getBooking(page, 20)
  }, [page])


  return (
    <>
      <Box component="section" sx={{p: 4, display: 'flex', justifyContent: 'space-between'}}>
        <Box>
          <Typography variant="h3" component="h2" sx={{fontSize: '20px', fontWeight: 'bold'}}>Booking Table Details</Typography>
          <Typography variant="body2" component="h2" sx={{fontSize: '14px', }}>You can check all details</Typography>
        </Box>
      </Box>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Booking Details
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers sx={{width: '500px'}}>
          <Box sx={{textAlign: 'center'}}>
            <img style={{width: '350px'}} src={room} alt="" />
          </Box>
          <Box sx={{display: 'flex', justifyContent: 'space-around', marginTop: '10px'}}>
            <Box>
              <Typography gutterBottom variant='body1' style={{ textAlign: 'center'}}>User Name</Typography>
              <Typography gutterBottom variant='body1' style={{color: '#49494999', textAlign: 'center'}}>{detalisBooking?.user?.userName}</Typography>
            </Box>
            <Box>
              <Typography gutterBottom variant='body1' style={{ textAlign: 'center'}}>Room Number</Typography>
              <Typography gutterBottom variant='body1' style={{color: '#49494999', textAlign: 'center'}}>{detalisBooking?.room?.roomNumber}</Typography>
            </Box>
          </Box>
          <hr/>
          <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
            <Box>
              <Typography gutterBottom variant='body1' style={{ textAlign: 'center'}}>Start Date</Typography>
              <Typography gutterBottom variant='body1' style={{color: '#49494999', textAlign: 'center'}}>{detalisBooking?.startDate}</Typography>
            </Box>
            <Box>
              <Typography gutterBottom variant='body1' style={{ textAlign: 'center'}}>End Date</Typography>
              <Typography gutterBottom variant='body1' style={{color: '#49494999', textAlign: 'center'}}>{detalisBooking?.endDate}</Typography>
            </Box>
          </Box>
          <hr/>
          <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
            <Typography gutterBottom variant='h5' style={{ textAlign: 'center'}}>Total:</Typography>
            <Typography gutterBottom variant='h5' style={{ textAlign: 'center', color: 'green'}}>$ {detalisBooking?.totalPrice}.00</Typography>
          </Box>
        </DialogContent>
        
      </BootstrapDialog>


      <Box component="section" sx={{p: 4}}  onClick={() => {
      }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>User</StyledTableCell>
                <StyledTableCell align="center">Room Number</StyledTableCell>
                <StyledTableCell align="center">Price</StyledTableCell>
                <StyledTableCell align="center">Status</StyledTableCell>
                <StyledTableCell align="center">Start Date</StyledTableCell>
                <StyledTableCell align="center">End Date</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            {load && <StyledTableCell className='py-5 text-center' colSpan={7}><ThreeDot color="#3f31cc" size="medium" text="" textColor="#NaNNaNNaN" /></StyledTableCell>}
            <TableBody>
              {load ? '' : booking.length > 0 ? booking.map((item: bookingData, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {item?.user?.userName}
                  </StyledTableCell>
                  <StyledTableCell align="center">{item?.room?.roomNumber}</StyledTableCell>
                  <StyledTableCell align="center">{item?.totalPrice}</StyledTableCell>
                  <StyledTableCell align="center">{item?.status}</StyledTableCell>
                  <StyledTableCell align="center">{new Date(item?.startDate).toISOString().split('T')[0]}</StyledTableCell>
                  <StyledTableCell align="center">{new Date(item?.endDate).toISOString().split('T')[0]}</StyledTableCell>
                  <StyledTableCell align="center" className='action'>
                  <Button sx={{color: 'blue'}} className='btn-menu' onClick={() => {
                    handleClickOpen(item?._id)
                  }}>
                    <RemoveRedEyeOutlinedIcon/>
                  </Button>
                  </StyledTableCell>
                </StyledTableRow>
              )) :  <StyledTableRow>
                      <StyledTableCell className='py-5 text-center' colSpan={7}>
                        <Typography variant="h3" component="h2" sx={{ fontWeight: 'bold'}}>No Data ...</Typography>
                      </StyledTableCell>
                    </StyledTableRow>}
            </TableBody>
          </Table>
          <Stack spacing={2} sx={{paddingBlock: 4}}>
            <Pagination 
            sx={{display: 'flex', justifyContent: 'end'}} 
            count={bookingCount ? Math.ceil(bookingCount / 20) : 0}
            color="primary"
            page={page}
            onChange={handlePageChange}/>
          </Stack>
        </TableContainer>
      </Box>
    </>
  )
}
