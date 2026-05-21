import Footer from "../components/footer/footer";
import Navbar from "../components/navbar/navbar";
import { Outlet } from "react-router-dom";

function MainLayout({ children }) {
  return (
    <>
   <Navbar/>
   <div className="main-content">
   <Outlet/>
   </div>
   <Footer/>
   </>
  );
}

export default MainLayout;