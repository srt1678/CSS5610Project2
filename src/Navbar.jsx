import "./Navbar.css";
import { NavLink } from "react-router-dom";

export default function Navbar() {
	return (
		<div className="navBarContainer">
			<h1 className="titleText">CONWAY'S GAME OF LIFE</h1>
			<div className="navBarLinkContainer">
				<h5 className="linkText currentPage">
					<NavLink to="/" className="linkText">HOME</NavLink>
				</h5>
				<h5 className="linkText">
					<NavLink to="/Grid" className="linkText">GAME PAGE</NavLink>
				</h5>
				<h5 className="linkText">
					<NavLink to="/Credits" className="linkText">CREDITS</NavLink>
				</h5>
			</div>
		</div>
	);
}
