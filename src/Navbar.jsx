import "./Navbar.css";

export default function Navbar() {
    return (
        <div className="navBarContainer">
            <h1 className="titleText">CONWAY'S GAME OF LIFE</h1>
            <div className="navBarLinkContainer">
                <h5 className="linkText currentPage">HOME</h5>
                <h5 className="linkText">GAME PAGE</h5>
                <h5 className="linkText">CREDITS</h5>
            </div>
        </div>
    );
}
