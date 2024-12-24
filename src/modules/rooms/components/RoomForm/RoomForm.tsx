import './RoomForm.css'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { axiosInstance, FACILITIES_URL, ROOMS_URL } from '../../../../services/EndPoints';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import fileImg from '../../../../assets/images/v2.png'

interface roomData {
  roomNumber: string,
  imgs: string,
  price: string,
  capacity: string,
  discount: string,
  facilities: string
}

interface facilitieData {
  _id: number
  name: string,
}

export default function RoomForm() {
  const {roomId} = useParams()
  const isNewRoom = roomId === 'new-room'
  const id = String(roomId)
  const navigate = useNavigate()
  const [facilitie, setFacilitie] = useState([])
  const [facilities, setFacilities] = useState([]);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue
  } = useForm();

  const onSubmit = async (data: roomData) => {
    const formData = new FormData()
    formData.append('roomNumber', data?.roomNumber)
    formData.append('imgs', data?.imgs[0])
    formData.append('price', data?.price)
    formData.append('capacity', data?.capacity)
    formData.append('discount', data?.discount)
    // formData.append('facilities', data?.facilities)
    data?.facilities.forEach((facilityId: string) => {
      formData.append('facilities[]', facilityId); // Appending each facility as a separate value
    });

    try {
      const res = await axiosInstance[isNewRoom ? 'post' : 'put'](
        isNewRoom ? ROOMS_URL.CREATE_ROOM : ROOMS_URL.UPDATE_ROOM(id), formData)
      console.log(res);
      navigate('/rooms')
      toast.success(isNewRoom ? res?.data?.message : res?.data?.message)
    } catch (error: any) {
      toast.error(error?.response?.data?.message)
    }
    
  }

  const getFacilities = async () => {
    try {
      const res = await axiosInstance.get(FACILITIES_URL.GET_FACILITIES)
      console.log(res);
      setFacilitie(res?.data?.data?.facilities)
    } catch (error) {
      console.log(error);
    }
  }

  const getRoom = async () => {
    try {
      const res = await axiosInstance.get(ROOMS_URL.GET_ROOM(id))
      console.log(res);
      // setValue ======================
      setValue('roomNumber', res?.data?.data?.room?.roomNumber)
      setValue('price', res?.data?.data?.room?.price)
      setValue('capacity', res?.data?.data?.room?.capacity)
      setValue('discount', res?.data?.data?.room?.discount)
      // Correct handling of 'facilities' to store all items
      const facilitiesArray = res?.data?.data?.room?.facilities.map(item => item.name);
      setValue('facilities', facilitiesArray);
    } catch (error) {
      console.log(error);
    }
  }

  const handleChangeRoom = (event: SelectChangeEvent) => {
    const selectedFacilities = event.target.value;
    setFacilities(selectedFacilities);
  };

  useEffect(() => {
    getFacilities()
    getRoom()
  }, [])

  return (
    <>
      <Box>
        <Container maxWidth="md" sx={{minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
          <Box component="section" sx={{bgcolor: '#FFFFFF', p: 4,width: '100%' }}>
            <Grid container spacing={2} >
              <Grid size={{ lg: 12, md: 12, sm: 12,  xs: 12 }}>
                <Box component="section" sx={{p: 5}}>
                  <Box component="section" sx={{pt: 4}}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Grid container spacing={2}>
                        <Grid size={{lg: 12, xs: 12, md: 12, sm: 12 }}>
                          <TextField sx={{width: '100%'}}  label="Room Number" variant="outlined" 
                            helperText={errors?.roomNumber?.message}
                            error={!!errors?.roomNumber}
                            type="text"
                            disabled={isNewRoom ? false : true}
                            {...register('roomNumber', {
                              required: 'Room umber is required'
                            })}/>
                        </Grid>
                        <Grid size={{lg: 6, md: 12, sm: 12, xs: 12}}>
                          <TextField sx={{width: '100%'}}  label="Price" variant="outlined" 
                            helperText={errors?.price?.message}
                            error={!!errors?.price}
                            type="number"
                            {...register('price', {
                              required: 'Price is required'
                            })}/>
                        </Grid>
                        <Grid size={{lg: 6, md: 12, sm: 12, xs: 12}}>
                          <TextField sx={{width: '100%'}}  label="capacity" variant="outlined" 
                            helperText={errors?.capacity?.message}
                            error={!!errors?.capacity}
                            type="number"
                            {...register('capacity', {
                              required: 'Capacity is required'
                            })}/>
                        </Grid>
                        <Grid size={{lg: 6, md: 12, sm: 12, xs: 12}}>
                          <TextField sx={{width: '100%'}}  label="Discount" variant="outlined" 
                            helperText={errors?.discount?.message}
                            error={!!errors?.discount}
                            type="number"
                            {...register('discount', {
                              required: 'Discount is required'
                            })}/>
                        </Grid>
                        <Grid size={{lg: 6, md: 12, sm: 12, xs: 12}}>
                          <FormControl fullWidth error={!!errors?.facilities}>
                            <InputLabel id="demo-simple-select-error-label">facilities</InputLabel>
                            <Select
                              labelId="demo-simple-select-error-label"
                              id="demo-simple-select-error"
                              value={facilities}
                              label="facilities"
                              multiple
                              helperText={errors?.facilities?.message}
                              // error={!!errors?.room}
                              {...register('facilities',  {
                                required: 'Facilities is required'
                              })}
                              onChange={handleChangeRoom}
                            >
                              {facilitie.map((item: facilitieData, index) => {
                                return <MenuItem key={index} value={item._id}>{item.name}</MenuItem>
                              })}
                            </Select>
                            {errors?.room && (
                              <FormHelperText sx={{ color: 'red' }}>{String(errors?.room?.message)}</FormHelperText>
                            )}
                          </FormControl> 
                        </Grid>
                        <Grid size={{lg: 12, md: 12, sm: 12, xs: 12}}>
                          <Box sx={{backgroundColor: '#F1FFF0', border: '2px dotted #009247'}}>
                            <label htmlFor='file' style={{cursor: 'pointer', textAlign: 'center', width: '100%', paddingBlock: '15px'}}>
                              <img src={fileImg} alt="" />
                              <p style={{ marginTop: '10px'}}>Drag & Drop or <span style={{color: '#009247', marginTop: '10px'}}>Choose a Room Images</span> to Upload</p>
                            </label>
                            {/* <input id='file' type="file" style={{display: 'none'}} {...register('imgs',  {
                              required: 'Image is required'
                            })}/> */}
                            <TextField sx={{width: '100%', display: 'none'}}  label="imgs" variant="outlined" 
                              id='file'
                              helperText={errors?.imgs?.message}
                              error={!!errors?.imgs}
                              type="file"
                              {...register('imgs', {
                                required: 'Image is required'
                              })}/>
                          </Box>
                        </Grid>
                        <Box sx={{width: '100%', display: 'flex', justifyContent: 'end', gap: '40px', marginTop: '50px'}}>
                          <Button type="button" variant="outlined" sx={{paddingInline: '40px'}} onClick={() => {
                            navigate('/rooms')
                          }}>
                            Cancel
                          </Button>
                          <Button type="submit" variant="contained" sx={{paddingInline: '20px'}} disabled={isSubmitting}>
                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1 mx-1"></span>}
                            Save
                          </Button>
                        </Box>
                      </Grid>
                    </form>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  )
}
