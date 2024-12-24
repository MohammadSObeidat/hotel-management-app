import './AdsList.css'
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
import { ADS_URL, axiosInstance, ROOMS_URL } from '../../../../services/EndPoints';
import { ThreeDot } from "react-loading-indicators";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import DeletedConfirmation from '../../../shared/components/DeletedConfirmation/DeletedConfirmation';
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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface room {
  roomNumber: string,
  price: number,
  discount: number,
  capacity: number
}

interface adsData {
  _id: number
  room: room,
  isActive: string
}

interface createData {
  room: string,
  discount: number,
  isActive: boolean
}

interface roomData {
  _id: number,
  roomNumber: string
}

export default function AdsList() {
  const [ads, setAds] = useState([])
  const [rooms, setRooms] = useState([])
  const [load, setLoad] = useState(true)
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [id, setId] = useState(0)
  const [room, setRoom] = useState('');
  const [active, setActive] = useState('');

  const {
    register,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    handleSubmit,
  } = useForm();

  const handleClickOpen = (id: number) => {
    setId(id)
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenCreate = (id: number) => {
    if (id !== 0) {
      const getOneAds = async () => {
        try {
          const res = await axiosInstance.get(ADS_URL.GET_ONE_ADS(id))
          console.log(res);
          setValue('discount', res?.data?.data?.ads?.room?.discount)
          setValue('isActive', res?.data?.data?.ads?.isActive)
        } catch (error) {
          console.log(error);
        }
      }
      getOneAds()
    }
    setOpenCreate(true);
    reset({name: ''})
    setId(id)
  };
  
  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  const getAds = async () => {
    if (ads.length > 0) setLoad(false)
    try {
      const res = await axiosInstance.get(ADS_URL.GET_ADS)
      console.log(res);
      setAds(res?.data?.data?.ads)
      setLoad(false)
    } catch (error) {
      console.log(error);
    }
  }

  const getRooms = async () => {
    try {
      const res = await axiosInstance.get(ROOMS_URL.GET_ROOMS)
      console.log(res);
      setRooms(res?.data?.data?.rooms)
      // setRoomsCount(res?.data?.data?.totalCount)
      setLoad(false)
    } catch (error) {
      console.log(error);
    }
  }

  const deleteAds = async () => {
    try {
      const res = await axiosInstance.delete(ADS_URL.DELETE_ADS(id))
      console.log(res);
      handleClose()
      getAds()
      toast.success('Deleted Successfully')
    } catch (error) {
      console.log(error);
    }
  }

  const createAds = async (data: createData) => {
    // console.log(data);
    try {
      const res = await axiosInstance[id === 0 ? 'post' : 'put'](
        id === 0 ? ADS_URL.CREATE_ADS : ADS_URL.UPDATE_ADS(id), data)
      console.log(res);
      handleCloseCreate()
      getAds()
      toast.success(id === 0 ? res?.data?.message : res?.data?.message)
    } catch (error: any) {
      toast.error(error?.response?.data?.message)
    }
  }

  const handleChangeRoom = (event: SelectChangeEvent) => {
    setRoom(event.target.value as string);
  };

  const handleChangeActive = (event: SelectChangeEvent) => {
    setActive(event.target.value as string);
  };

  useEffect(() => {
    getAds()
    getRooms()
  }, [])

  return (
    <>
      <Box component="section" sx={{p: 4, display: 'flex', justifyContent: 'space-between'}}>
        <Box>
          <Typography variant="h3" component="h2" sx={{fontSize: '20px', fontWeight: 'bold'}}>ADS Table Details</Typography>
          <Typography variant="body2" component="h2" sx={{fontSize: '14px', }}>You can check all details</Typography>
        </Box>
        <Stack spacing={2} direction="row">
          <Button type='button' variant="contained" sx={{paddingInline: 2}} onClick={() => {
            handleClickOpenCreate(0)
          }}><AddIcon sx={{marginRight: 1}}/> Add New Ads</Button>
        </Stack>
      </Box>
      {/* ================= Delete =============== */}

      <DeletedConfirmation handleClose={handleClose} open={open} text={'Delete This Ads  Room ?'} deleteFun={deleteAds} />
      
      {/* ============================= */}

      {/* ============== Create =============== */}
      <BootstrapDialog
        onClose={handleCloseCreate}
        aria-labelledby="customized-dialog-title"
        open={openCreate}
      >
        <form onSubmit={handleSubmit(createAds)}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        {id===0 ?'Add Ads' : 'Edit Ads'}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseCreate}
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
          <Box sx={{ minWidth: 120 }}>
            {id === 0 ? <FormControl fullWidth error={!!errors?.room}>
              <InputLabel id="demo-simple-select-error-label">Room Name</InputLabel>
              <Select
                labelId="demo-simple-select-error-label"
                id="demo-simple-select-error"
                value={room}
                label="Room Name"
                helperText={errors?.room?.message}
                // error={!!errors?.room}
                {...register('room',  {
                  required: 'Room is required'
                })}
                onChange={handleChangeRoom}
              >
                {rooms.map((room: roomData) => {
                  return <MenuItem value={room?._id}>{room?.roomNumber}</MenuItem>
                })}
              </Select>
              {errors?.room && (
                <FormHelperText sx={{ color: 'red' }}>{String(errors?.room?.message)}</FormHelperText>
              )}
            </FormControl> : ''}
          </Box>
          <Box sx={{textAlign: 'center'}}>
            <Box sx={{marginBlock: 3}}>
              <TextField id="outlined-basic" label="Discount" variant="outlined" sx={{width: '100%'}}
              helperText={errors?.discount?.message}
              error={!!errors?.discount}
              type="text"
              // focused={id === 0 ? true : true}
              {...register('discount',  {
                required: 'Discount is required'
              })} />
            </Box>
          </Box>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth error={!!errors?.isActive}>
              <InputLabel id="demo-simple-select-label">Active</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={active}
                label="Active"
                helperText={errors?.isActive?.message}
                // error={!!errors?.isActive}
                 {...register('isActive',  {
                  required: 'Active is required'
                })}
                onChange={handleChangeActive}
              >
                <MenuItem value={true}>true</MenuItem>
                <MenuItem value={false}>false</MenuItem>
                {/* <MenuItem value={30}>Thirty</MenuItem> */}
              </Select>
              {errors?.isActive && (
                <FormHelperText sx={{ color: 'red' }}>{String(errors?.isActive?.message)}</FormHelperText>
              )}
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button type='submit' sx={{marginBlock: 2, paddingInline: 5}} autoFocus variant="contained" disabled={isSubmitting}>
            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1 mx-1"></span>}
            Save
          </Button>
        </DialogActions>
        </form>
      </BootstrapDialog>
      {/* ===================================== */}
      <Box component="section" sx={{p: 4}}  onClick={() => {
        if (activeMenuId) setActiveMenuId(null)
      }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>room Name</StyledTableCell>
                <StyledTableCell align="center">Price</StyledTableCell>
                <StyledTableCell align="center">Discount</StyledTableCell>
                <StyledTableCell align="center">Capacity</StyledTableCell>
                <StyledTableCell align="center">Active</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            {load && <StyledTableCell className='py-5 text-center' colSpan={6}><ThreeDot color="#3f31cc" size="medium" text="" textColor="#NaNNaNNaN" /></StyledTableCell>}
            <TableBody>
              {load ? '' : ads.length > 0 ? ads.map((item: adsData, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {item?.room?.roomNumber}
                  </StyledTableCell>
                  <StyledTableCell align="center">{item?.room?.price}</StyledTableCell>
                  <StyledTableCell align="center">{item?.room?.discount}</StyledTableCell>
                  <StyledTableCell align="center">{item?.room?.capacity}</StyledTableCell>
                  <StyledTableCell align="center">{String(item?.isActive)}</StyledTableCell>
                  <StyledTableCell align="center" className='action'>
                    <Button className='btn-menu' onClick={() => setActiveMenuId(prevId => (prevId === item?._id ? null : item?._id))}>
                      <i style={{cursor:"pointer", color: 'black'}} className="fa-solid fa-ellipsis"></i>
                    </Button>
                    <List sx={{p: 0}} className={`menu ${activeMenuId === item?._id ? 'show' : ''}`}>
                      <ListItem className='list-item'>
                        <Button className='btn-menu'>
                          <i title='View' className="fa-solid fa-eye text-primary"></i> 
                          <ListItemText primary="View" />
                        </Button>
                      </ListItem>
                        <ListItem className='list-item'>
                          <Button className='btn-menu' onClick={() => {
                          handleClickOpenCreate(item?._id)
                        }}>
                            <i title='Edit' className="fa-solid fa-pen-to-square text-primary"></i> 
                            <ListItemText primary="Edit" />
                          </Button>
                        </ListItem>
                      <ListItem className='list-item'>
                        <Button className='btn-menu' onClick={() => {
                          handleClickOpen(item?._id)
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
        </TableContainer>
      </Box>
    </>
  )
}
