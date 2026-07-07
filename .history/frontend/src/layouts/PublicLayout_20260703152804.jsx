import { Outlet } from "react-router-dom";

import Navigation from "./Navbar";
import Footer from "./Footer";

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