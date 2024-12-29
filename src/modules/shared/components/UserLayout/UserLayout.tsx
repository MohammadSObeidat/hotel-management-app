import './UserLayout.css'
import { Outlet } from "react-router-dom";
import Footer from '../Footer/Footer';
import NavbarUser from '../NavbarUser/NavbarUser';
import Divider from '@mui/material/Divider';

export default function UserLayout() {
  return (
    <div>
      <NavbarUser/>
      <Outlet/>
      <Divider component={'h1'}/>
      <Footer/>
    </div>
  )
}
