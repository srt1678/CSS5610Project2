import { useState, useContext } from "react";
import SingleBox from "./SingleBox";
import "./Grid.css";
import { GridContext } from "./App";

function Grid() {
    const [
        cellsCount,
        setCellsCount,
        finalGrid,
        setFinalGrid,
        boxCount,
        setBoxCount,
    ] = useContext(GridContext);
    const [row, setRow] = useState(20);
    const [column, setColumn] = useState(20);

    const [gridStyle, setGridStyle] = useState({
        gridTemplateColumns: `repeat(20, 1fr)`,
        height: `${20 * 100}px`,
        width: `${20 * 100}px`,
    });

    const handleNewGrid = () => {
        const updateGrid = [];
        let index = 0;
        let cellsCount = 0;
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < column; j++) {
                const location = `${i},${j}`;
                const randomNum = Math.floor(Math.random() * 100 + 1);
                let initBoxClass;
                if (randomNum <= 5) {
                    initBoxClass = "boxDefault boxAlive";
                    cellsCount++;
                } else {
                    initBoxClass = "boxDefault";
                }
                updateGrid.push({
                    keyName: boxCount + index,
                    boxLocation: location,
                    boxIndex: index,
                    initBoxClass: initBoxClass,
                });
                index++;
            }
        }
        setBoxCount(boxCount + index);
        setFinalGrid(updateGrid);
        const newGridStyle = {
            gridTemplateColumns: `repeat(${column}, 1fr)`,
            height: `${row * 100}px`,
            width: `${column * 100}px`,
        };
        setGridStyle(newGridStyle);
        setCellsCount(cellsCount);
    };

    const resetGrid = () => {
        const updateGrid = [];
        let index = 0;
        let cellsCount = 0;
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 20; j++) {
                const location = `${i},${j}`;
                const randomNum = Math.floor(Math.random() * 100 + 1);
                let initBoxClass;
                if (randomNum <= 5) {
                    initBoxClass = "boxDefault boxAlive";
                    cellsCount++;
                } else {
                    initBoxClass = "boxDefault";
                }
                updateGrid.push({
                    keyName: boxCount + index,
                    boxLocation: location,
                    boxIndex: index,
                    initBoxClass: initBoxClass,
                });
                index++;
            }
        }
        setBoxCount(boxCount + index);
        setFinalGrid(updateGrid);
        const newGridStyle = {
            gridTemplateColumns: `repeat(${20}, 1fr)`,
            height: `${20 * 100}px`,
            width: `${20 * 100}px`,
        };
        setGridStyle(newGridStyle);
        setCellsCount(cellsCount);
        setRow(20);
        setColumn(20);
    };
    const nextIterationGrid = () => {
        const currentGrid = [];
        let indexCount = 0;
        const rowInt = parseInt(row);
        const columnInt = parseInt(column);
        let newCellsCount = 0;
        
        for (let i = 0; i < rowInt; i++) {
            for (let j = 0; j < columnInt; j++) {
                const location = `${i},${j}`;
                let nearbyCellsAlive = 0;
                if (i != 0) {
                    //Top
                    nearbyCellsAlive += checkCellStatus(indexCount - columnInt);
                    if (j != 0) {
                        //Upper left
                        nearbyCellsAlive += checkCellStatus(
                            indexCount - columnInt - 1
                        );
                    }
                    if (j != columnInt - 1) {
                        //Upper right
                        nearbyCellsAlive += checkCellStatus(
                            indexCount - columnInt + 1
                        );
                    }
                }
                if (i != rowInt - 1) {
                    //Bot
                    nearbyCellsAlive += checkCellStatus(indexCount + columnInt);
                    if (j != 0) {
                        //Bot left
                        nearbyCellsAlive += checkCellStatus(
                            indexCount + columnInt - 1
                        );
                        //Bot right
                    }if(j != columnInt - 1){
                        nearbyCellsAlive += checkCellStatus(
                            indexCount + columnInt + 1
                        );
                    }
                }
                if (j != 0) {
                    //Left
                    nearbyCellsAlive += checkCellStatus(indexCount - 1);
                }
                if (j != columnInt - 1) {
                    //Right
                    nearbyCellsAlive += checkCellStatus(indexCount + 1);
                }
                if (
                    finalGrid[indexCount].initBoxClass === "boxDefault boxAlive"
                ) {
                    if (nearbyCellsAlive < 2 || nearbyCellsAlive > 3) {
                        currentGrid.push({
                            keyName: boxCount + indexCount,
                            boxLocation: location,
                            boxIndex: indexCount,
                            initBoxClass: "boxDefault",
                        });
                    } else {
                        currentGrid.push({
                            keyName: boxCount + indexCount,
                            boxLocation: location,
                            boxIndex: indexCount,
                            initBoxClass: "boxDefault boxAlive",
                        });
                        newCellsCount++;
                    }
                } else {
                    if (nearbyCellsAlive == 3) {
                        currentGrid.push({
                            keyName: boxCount + indexCount,
                            boxLocation: location,
                            boxIndex: indexCount,
                            initBoxClass: "boxDefault boxAlive",
                        });
                        newCellsCount++;
                    } else {
                        currentGrid.push({
                            keyName: boxCount + indexCount,
                            boxLocation: location,
                            boxIndex: indexCount,
                            initBoxClass: "boxDefault",
                        });
                    }
                }
                indexCount++;
            }
        }
        setCellsCount(newCellsCount);
        setBoxCount(boxCount + indexCount);
        setFinalGrid(currentGrid);
    };
    const checkCellStatus = (index) => {
        if (finalGrid[index].initBoxClass === "boxDefault boxAlive") {
            return 1;
        } else {
            return 0;
        }
    };
    console.log(finalGrid);
    return (
        <>
            <div className="headerContainer">
                <div className="inputTitle cellsCount">Cells: {cellsCount}</div>
                <div className="inputContainer">
                    <div className="inputTitle">Row:</div>
                    <input
                        className="inputBoxes"
                        placeholder="20"
                        onChange={(e) => setRow(e.target.value)}
                        value={row}
                    ></input>
                </div>

                <div className="inputContainer">
                    <div className="inputTitle">Column:</div>
                    <input
                        className="inputBoxes"
                        placeholder="20"
                        onChange={(e) => setColumn(e.target.value)}
                        value={column}
                    ></input>
                </div>
                <button
                    className="changeGridButton"
                    onClick={() => handleNewGrid()}
                >
                    Change Grid
                </button>
            </div>
            <div className="overallPageContainer">
                <div className="container" style={gridStyle}>
                    {finalGrid.map((box) => {
                        return (
                            <SingleBox
                                key={box.keyName}
                                boxLocation={box.boxLocation}
                                boxIndex={box.boxIndex}
                                initBoxClass={box.initBoxClass}
                            />
                        );
                    })}
                </div>
            </div>
            <div className="footerContainer">
                <button className="resetGridButton" onClick={() => resetGrid()}>
                    Reset
                </button>
                <button
                    className="nextIterationButton"
                    onClick={() => nextIterationGrid()}
                >
                    Next
                </button>
            </div>
        </>
    );
}

export default Grid;
