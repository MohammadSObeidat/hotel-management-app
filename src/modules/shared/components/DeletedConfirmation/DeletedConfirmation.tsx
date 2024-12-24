import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import img from '../../../../assets/images/Email.png'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface props {
  handleClose: () => void,
  open: boolean,
  text: string,
  deleteFun: () => Promise<void>
}

export default function DeletedConfirmation({handleClose, open, text, deleteFun}: props) {
  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Delete Item
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
            <img src={img} alt="" />
          </Box>
          <Typography gutterBottom variant='body1' sx={{fontWeight: 'bold', paddingTop: 4, textAlign: 'center'}}>{text}</Typography>
          <Typography gutterBottom variant='body1' style={{color: '#49494999', textAlign: 'center'}}>are you sure you want to delete this item ? if you are sure just click on delete it</Typography>
        </DialogContent>
        <DialogActions>
          <Button sx={{marginBlock: 2}} autoFocus onClick={deleteFun} variant="contained" color="error">
            Delete this item
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  )
}

