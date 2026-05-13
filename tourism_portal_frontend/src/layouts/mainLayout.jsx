import Footer from "../components/footer/footer";
import Navbar from "../components/navbar/navbar";
import { Outlet } from "react-router-dom";

function MainLayout({ children }) {
  return (
    <>
   <Navbar/>
   <Outlet/>
   <Footer/>
   </>
  );
}

export default MainLayout;