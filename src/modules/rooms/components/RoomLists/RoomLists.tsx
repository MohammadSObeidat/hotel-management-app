import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { axiosInstance, ROOMS_URL } from '../../../../services/EndPoints';
import { ThreeDot } from "react-loading-indicators";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { toast } from 'react-toastify';
import Pagination from '@mui/material/Pagination';
import DeletedConfirmation from '../../../shared/components/DeletedConfirmation/DeletedConfirmation';
import { Link, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

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

interface roomData {
  _id: number
  roomNumber: string,
  images: string,
  price: number,
  discount: number,
  capacity: number
}


export default function RoomLists() {
  const navigate = useNavigate()
  const [rooms, setRooms] = useState([])
  const [roomsCount, setRoomsCount] = useState(0)
  const [load, setLoad] = useState(true)
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(0)
  const [page, setPage] = useState(1); 

  const handleClickOpen = (id: number) => {
    setId(id)
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getRooms = async (page: number, size: number) => {
    if (rooms.length > 0) setLoad(false)
    try {
      const res = await axiosInstance.get(ROOMS_URL.GET_ROOMS,
        {params: {page: page, size: size}}
      )
      console.log(res);
      setRooms(res?.data?.data?.rooms)
      setRoomsCount(res?.data?.data?.totalCount)
      setLoad(false)
    } catch (error) {
      console.log(error);
    }
  }

  const deleteRoom = async () => {
    try {
      const res = await axiosInstance.delete(ROOMS_URL.DELETE_ROOM(id))
      console.log(res);
      handleClose()
      getRooms(page, 10)
      toast.success('Deleted Successfully')
    } catch (error) {
      console.log(error);
    }
  }

  const handlePageChange = (event, value: number) => {
    setPage(value); // Set the page number when a user clicks on a page or the next/previous button
  };

  useEffect(() => {
    getRooms(page, 10)
  }, [page])

  return (
    <>
      <Box component="section" sx={{p: 4, display: 'flex', justifyContent: 'space-between'}}>
        <Box>
          <Typography variant="h3" component="h2" sx={{fontSize: '20px', fontWeight: 'bold'}}>Rooms Table Details</Typography>
          <Typography variant="body2" component="h2" sx={{fontSize: '14px', }}>You can check all details</Typography>
        </Box>
        <Stack spacing={2} direction="row">
          <Button type='button' variant="contained" sx={{paddingInline: 2}} onClick={() => {
            navigate(`/rooms/${'new-room'}`)
          }}><AddIcon sx={{marginRight: 1}}/> Add New Room</Button>
        </Stack>
      </Box>
      {/* ================= Delete =============== */}
      
        <DeletedConfirmation handleClose={handleClose} open={open} text={'Delete This Room ?'} deleteFun={deleteRoom} />
      
      {/* ============================= */}

      
      <Box component="section" sx={{p: 4}}  onClick={() => {
        if (activeMenuId) setActiveMenuId(null)
      }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>room Number</StyledTableCell>
                <StyledTableCell align="center">Image</StyledTableCell>
                <StyledTableCell align="center">Price</StyledTableCell>
                <StyledTableCell align="center">Discount</StyledTableCell>
                <StyledTableCell align="center">Capacity</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            {load && <StyledTableCell className='py-5 text-center' colSpan={6}><ThreeDot color="#3f31cc" size="medium" text="" textColor="#NaNNaNNaN" /></StyledTableCell>}
            <TableBody>
              {load ? '' : rooms.length > 0 ? rooms.map((room: roomData, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {room?.roomNumber}
                  </StyledTableCell>
                  <StyledTableCell align="center"><img style={{minWidth: '70px', maxWidth: '70px', minHeight: '50px', maxHeight: '50px', borderRadius: '8px'}} src={room?.images} alt="" /></StyledTableCell>
                  <StyledTableCell align="center">{room?.price}</StyledTableCell>
                  <StyledTableCell align="center">{room?.discount}</StyledTableCell>
                  <StyledTableCell align="center">{room?.capacity}</StyledTableCell>
                  <StyledTableCell align="center" className='action'>
                    <Button className='btn-menu' onClick={() => setActiveMenuId(prevId => (prevId === room?._id ? null : room?._id))}>
                      <i style={{cursor:"pointer", color: 'black'}} className="fa-solid fa-ellipsis"></i>
                    </Button>
                    <List sx={{p: 0}} className={`menu ${activeMenuId === room?._id ? 'show' : ''}`}>
                      <ListItem className='list-item'>
                        <Button className='btn-menu'>
                          <i title='View' className="fa-solid fa-eye text-primary"></i> 
                          <ListItemText primary="View" />
                        </Button>
                      </ListItem>
                        <ListItem className='list-item'>
                          <Link to={`/rooms/${room?._id}`}>
                            <Button className='btn-menu' >
                              <i title='Edit' className="fa-solid fa-pen-to-square text-primary"></i> 
                              <ListItemText primary="Edit" />
                            </Button>
                          </Link>
                        </ListItem>
                      <ListItem className='list-item'>
                        <Button className='btn-menu' onClick={() => {
                          handleClickOpen(room?._id)
                        }}>
                          <i title='Delete' className="fa-solid fa-trash text-primary"></i> 
                          <ListItemText primary="Delete" />
                        </Button>
                      </ListItem>
                    </List>
                  </StyledTableCell>
                </StyledTableRow>
              )) :  <StyledTableRow>
                      <StyledTableCell className='py-5 text-center' colSpan={6}>
                        <Typography variant="h3" component="h2" sx={{ fontWeight: 'bold'}}>No Data ...</Typography>
                      </StyledTableCell>
                    </StyledTableRow>}
            </TableBody>
          </Table>
          <Stack spacing={2} sx={{paddingBlock: 4}}>
            <Pagination 
            sx={{display: 'flex', justifyContent: 'end'}} 
            count={roomsCount ? Math.ceil(roomsCount / 10) : 0} 
            color="primary"
            page={page}
            onChange={handlePageChange}/>
          </Stack>
        </TableContainer>
      </Box>
    </>
  )
}
