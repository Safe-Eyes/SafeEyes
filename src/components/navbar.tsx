import { FC, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { setToLocalStorage, getFromLocalStorage } from "../helpers/localstorage.helper";

const NavBar: FC = () => {
    const [active, setActive] = useState<string | null>("Home");

    useEffect(() => {
        const storedActive = getFromLocalStorage();
        setActive(storedActive || "Home"); 
    }, []);

    const handleNavClick = (route: string) => {
        setToLocalStorage(route); 
        setActive(route);
    };

    return (
        <header className="flex flex-col lg:flex-row items-center p-4 mt-3 mx-5">
            <Link to="/">
                <div className="flex flex-col ml-5 justify-center items-center">
                    <img src="/SafeEyes/assets/logo.png" alt="" width={50} height={50}/>
                    <h1 className="black text-3xl mt-2">SafeEyes</h1>
                </div>
            </Link>
            <nav className="lg:ml-auto lg:mr-10 mt-10 lg:mt-0">
                <ul className="flex items-center gap-5">
                    <li>
                        <NavLink
                            to="/"
                            onClick={() => handleNavClick("Home")}
                            className={active === "Home" ? "text-blue-400" : "black"}
                        >
                            Главная
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/team"
                            onClick={() => handleNavClick("AboutUs")}
                            className={active === "AboutUs" ? "text-blue-400" : "black"}
                        >
                            Про нас
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default NavBar;