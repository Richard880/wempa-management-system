import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "../components/layout/Footer";

function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default PublicLayout;
