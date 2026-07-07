import { Outlet } from "react-router-dom";

src / components / layout / PublicLayout.jsx;

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
