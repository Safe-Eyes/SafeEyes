import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Layout from "../pages/Layout";
import Home from "../pages/MainPage";
import AboutUs from "../pages/About";
import HowItWorks from "../pages/HowItWorks";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: (
                    <Home />
                ),
            },
            {
                path: "team",
                element: (
                    <AboutUs />
                ),
            }, 
            {
                path: "functionality",
                element: (
                    <HowItWorks />
                ),
            }
        ]
    }
])