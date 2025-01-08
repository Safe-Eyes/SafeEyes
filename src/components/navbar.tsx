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
        <header className="flex items-center p-4">
            <Link to="/">
                <h1 className="black font-bold ml-5 text-3xl">SafeEyes</h1>
            </Link>
            <nav className="ml-auto mr-10">
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