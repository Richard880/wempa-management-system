import { Outlet } from "react-router-dom";

import Navigation from "...//navbar";
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
