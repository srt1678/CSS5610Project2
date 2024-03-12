import Navbar from "./Navbar";
import "./Credits.css";

export default function Credits() {
	return (
		<>
			<Navbar />
			<div className="creditsContainer">
				<h1>Credits: Steve Chen</h1>
				<h1>Course: CS5610</h1>
				<h1>Instructor: Hunter Jorgensen</h1>
				<h1>
					<a href="https://github.com/srt1678?tab=repositories">
						GitHub Repo
					</a>
				</h1>
			</div>
		</>
	);
}
