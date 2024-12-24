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
import { axiosInstance, USERS_URL } from '../../../../services/EndPoints';
import { ThreeDot } from "react-loading-indicators";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import noImage from '../../../../assets/images/noImage.png'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';

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

interface userData {
  _id: number
  userName: string
  profileImage: string,
  email: string,
  country: string,
  phoneNumber: number,
  role: string,
  createdAt: string
}

interface userProfile {
  userName: string
  profileImage: string,
  email: string,
  country: string,
  phoneNumber: number,
  role: string,
  createdAt: string
}

export default function UsersList() {
  const [users, setUsers] = useState([])
  const [usersCount, setUsersCount] = useState(0)
  const [load, setLoad] = useState(true)
  const [page, setPage] = useState(1);
  const [userProfile, setUserProfile] = useState<userProfile | null>(null)
  const [open, setOpen] = useState(false);

  const handleClickOpen = (id: string) => {
    const getUserProfile = async () => {
      try {
        const res = await axiosInstance.get(USERS_URL.GET_USER_PROFILE(id))
        console.log(res);
        setUserProfile(res?.data?.data?.user)
      } catch (error) {
        console.log(error);
      }
    }
    getUserProfile()
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getUsers = async (page: number, size: number) => {
    try {
      const res = await axiosInstance.get(USERS_URL.GET_USERS, 
        {params: {page: page, size: size}}
      )
      console.log(res);
      setUsers(res?.data?.data?.users)
      setUsersCount(res?.data?.data?.totalCount)
      setLoad(false)
    } catch (error) {
      console.log(error);
    }
  }

  const handlePageChange = (event, value: number) => {
    setPage(value); // Set the page number when a user clicks on a page or the next/previous button
  };

  useEffect(() => {
    getUsers(page, 20)
  }, [page])


  return (
    <>
      <Box component="section" sx={{p: 4, display: 'flex', justifyContent: 'space-between'}}>
        <Box>
          <Typography variant="h3" component="h2" sx={{fontSize: '20px', fontWeight: 'bold'}}>Users Table Details</Typography>
          <Typography variant="body2" component="h2" sx={{fontSize: '14px', }}>You can check all details</Typography>
        </Box>
      </Box>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          User Profile
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
        <DialogContent dividers sx={{width: '400px'}}>
          <Box sx={{textAlign: 'center'}}>
            <img style={{width: '300px', height: '200px'}} src={userProfile?.profileImage} alt="" />
          </Box>
          <Typography variant="h3" component="h2" sx={{fontSize: '30px', fontWeight: 'bold', color: 'red', textAlign: 'center', marginTop: '10px'}}>{userProfile?.userName}</Typography>
          <Box sx={{ p: 4}}>
            <Typography variant="body1" component="h2" sx={{fontSize: '17px'}}><EmailOutlinedIcon sx={{marginRight: 1}}/> {userProfile?.email}</Typography>
            <Typography variant="body1" component="h2" sx={{fontSize: '17px'}}><LocalPhoneOutlinedIcon sx={{marginRight: 1}}/> {userProfile?.phoneNumber}</Typography>
            <Typography variant="body1" component="h2" sx={{fontSize: '17px'}}><PublicOutlinedIcon sx={{marginRight: 1}}/> {userProfile?.country}</Typography>
            <Typography variant="body1" component="h2" sx={{fontSize: '17px'}}><AdminPanelSettingsOutlinedIcon sx={{marginRight: 1}}/> {userProfile?.role}</Typography>
            <Typography variant="body1" component="h2" sx={{fontSize: '17px'}}><DateRangeOutlinedIcon sx={{marginRight: 1}}/> {userProfile?.createdAt}</Typography>
          </Box>
        </DialogContent>
        
      </BootstrapDialog>


      <Box component="section" sx={{p: 4}}  onClick={() => {
      }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>User Name</StyledTableCell>
                <StyledTableCell align="center">Image</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
                <StyledTableCell align="center">Phone Number</StyledTableCell>
                <StyledTableCell align="center">Country</StyledTableCell>
                <StyledTableCell align="center">Role</StyledTableCell>
                <StyledTableCell align="center">Create At</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            {load && <StyledTableCell className='py-5 text-center' colSpan={8}><ThreeDot color="#3f31cc" size="medium" text="" textColor="#NaNNaNNaN" /></StyledTableCell>}
            <TableBody>
              {load ? '' : users.length > 0 ? users.map((user: userData, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {user?.userName}
                  </StyledTableCell>
                  <StyledTableCell align="center"><img style={{minWidth: '50px', maxWidth: '50px', minHeight: '50px', maxHeight: '50px'}} src={user?.profileImage ? user?.profileImage : noImage} alt="" /></StyledTableCell>
                  <StyledTableCell align="center">{user?.email}</StyledTableCell>
                  <StyledTableCell align="center">{user?.phoneNumber}</StyledTableCell>
                  <StyledTableCell align="center">{user?.country}</StyledTableCell>
                  <StyledTableCell align="center">{user?.role}</StyledTableCell>
                  <StyledTableCell align="center">{new Date(user?.createdAt).toISOString().split('T')[0]}</StyledTableCell>
                  <StyledTableCell align="center" className='action'>
                  <Button sx={{color: 'blue'}} className='btn-menu' onClick={() => {
                    handleClickOpen(String(user?._id))
                  }}>
                    <RemoveRedEyeOutlinedIcon/>
                  </Button>
                  </StyledTableCell>
                </StyledTableRow>
              )) :  <StyledTableRow>
                      <StyledTableCell className='py-5 text-center' colSpan={8}>
                        <Typography variant="h3" component="h2" sx={{ fontWeight: 'bold'}}>No Data ...</Typography>
                      </StyledTableCell>
                    </StyledTableRow>}
            </TableBody>
          </Table>
          <Stack spacing={2} sx={{paddingBlock: 4}}>
            <Pagination 
            sx={{display: 'flex', justifyContent: 'end'}} 
            count={usersCount ? Math.ceil(usersCount / 20) : 0}
            color="primary"
            page={page}
            onChange={handlePageChange}/>
          </Stack>
        </TableContainer>
      </Box>
    </>
  )
}
