import React from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
const Layout = ({ children }) => {
    return (
      <div>
        <NavBar />
        <main>{children}</main> {/* This is where the page-specific content goes */}
        <Footer />
      </div>
    );
  };
  
  export default Layout;