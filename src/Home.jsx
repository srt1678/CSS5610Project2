import Navbar from "./Navbar";
function Home() {
    return (
        <>
            <Navbar />
            <div className="remainingHomePageContainer">
                <div className="gameIntroContainer">
                    <p className="gameIntroParagraph">
                        <strong>Conway’s Game of Life</strong> is a game that is
                        “played” based on a grid system. Every individual
                        location on the grid can be understood as a cell. The
                        game, or simulation, occurs over iterations, or
                        generations. After a generation, a cell may change from
                        living or dead based on how many living or dead
                        neighbors it had in a previous iteration. A neighbor is
                        any immediately adjacent spot on the grid (horizontal,
                        vertical or diagonal).
                    </p>
                    <div className='gameInfoSection'>
                        <h2>Life has 4 rules:</h2>
                        <ol>
                        <li className="gameInfoList">
                                A living cell with less than two living
                                neighbours dies.
                            </li>
                            <li className="gameInfoList">
                                A living cell with two or three live neighbours
                                lives.
                            </li>
                            <li className="gameInfoList">
                                A living cell with more than three live
                                neighbours dies.
                            </li>
                            <li className="gameInfoList">
                                A dead cell with exactly three live neighbours
                                becomes a live cell, as if by reproduction.
                            </li>
                        </ol>
                    </div>
                    <div className='gameInfoSection'>
                        <h2>Additional Information of the game:</h2>
                        <ol>
                            <li className="gameInfoList">
                                You may change the size of the grid by entering
                                the grid's width and height (The range is 3 -
                                40).
                            </li>
                            <li className="gameInfoList">
                                Alive cells are in black. Dead cells are in
                                white.
                            </li>
                            <li className="gameInfoList">
                                When a new grid is created, a random set of
                                cells would be created as well. Each cell have a
                                5% chance of being alive
                            </li>
                            <li className="gameInfoList">
                                You may click on any cell and reverse its state.
                            </li>
                            <li className="gameInfoList">
                                Click 'Heatmap' to indicate how recently a grid
                                was alive.
                            </li>
                            <li className="gameInfoList">
                                Click 'Reset' to reset the grid back to 20-20
                                and randomize the cells.
                            </li>
                            <li className="gameInfoList">Click 'Next' to see the next iteration.</li>
                            <li className="gameInfoList">
                                Click 'Start Auto Play' to automatically
                                progress the simulation (During autoplay, all
                                the buttons except 'Heatmap' would be disabled).
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Home;
