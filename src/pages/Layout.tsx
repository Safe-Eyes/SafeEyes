import { FC } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/navbar";
import Footer from "../components/footer";

const Layout: FC = () => {
    return <>
      <div className="flex flex-col">
        <NavBar />
        <Outlet />
        <Footer />
      </div>
    </>
}

export default Layout;