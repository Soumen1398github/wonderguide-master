import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import ImageSlider from "../component/ImageSlider";
import Searchbar from "../component/Searchbar";
import ResponsiveCard from "../component/Card";
import NavbarUser from "../component/NavbarUser";
import NavbarTourGuide from "../component/NavbarTourGuide";

const Home = () => {
  const [role,setRole] = useState("user")
  useEffect(() => {
    setRole(localStorage.getItem("role"))
  },[])
  return (
    <div>

      { role === "user" ? <NavbarUser/> : role === "guide" ? <NavbarTourGuide/> :  <NavbarUser/> }
      {/* <NavbarUser/> */}
      {/* <NavbarTourGuide/> */}
      <ImageSlider />
      <Searchbar/>
      <ResponsiveCard/>
      <Footer/>
    </div>
  );
};

export default Home;
