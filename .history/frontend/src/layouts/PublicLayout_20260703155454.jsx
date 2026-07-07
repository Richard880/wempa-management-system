import { Outlet } from "react-router-dom";

import Navigation from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function PublicLayout() {
  return (
    <>
      <Navigation />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default PublicLayout;
