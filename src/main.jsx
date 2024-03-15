import React from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./Navbar.jsx";
import App from "./App.jsx";
import Home from "./Home.jsx";
import Credits from "./Credits.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

const router = createBrowserRouter([
	{ path: "/", element: <Home /> },
	{ path: "/Grid", element: <App /> },
	{ path: "/Credits", element: <Credits /> },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router}></RouterProvider>
	</React.StrictMode>
);
