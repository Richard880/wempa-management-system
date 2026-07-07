import { Outlet } from "react-router-dom";

import Navigation from "./navbar";
import Footer from "../compo/Footer";

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
