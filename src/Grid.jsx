import { useState, useContext } from "react";
import SingleBox from "./SingleBox";
import "./Grid.css";
import { GridContext } from "./App";
import ErrorMessage from "./ErrorMessage";

function Grid() {
    const [
        cellsCount,
        setCellsCount,
        finalGrid,
        setFinalGrid,
        boxCount,
        setBoxCount,
        isHeatmapMode,
        setIsHeatmapMode,
    ] = useContext(GridContext);
    const [row, setRow] = useState(20);
    const [column, setColumn] = useState(20);
    const [gridStyle, setGridStyle] = useState({
        gridTemplateColumns: `repeat(20, 1fr)`,
        height: `${20 * 100}px`,
        width: `${20 * 100}px`,
    });
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const handleNewGrid = () => {
        setShowErrorMessage(false);
        const updateGrid = [];
        let index = 0;
        let cellsCount = 0;
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < column; j++) {
                const location = `${i},${j}`;
                const randomNum = Math.floor(Math.random() * 100 + 1);
                let initBoxClass;
                let heatmapLevel = 0;
                if (randomNum <= 5) {
                    initBoxClass = "boxDefault boxAlive";
                    cellsCount++;
                    heatmapLevel = 10;
                } else {
                    initBoxClass = "boxDefault";
                }
                updateGrid.push({
                    keyName: boxCount + index,
                    boxLocation: location,
                    boxIndex: index,
                    initBoxClass: initBoxClass,
                    heatmapMode: isHeatmapMode,
                    heatmapLevel: heatmapLevel,
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
        setShowErrorMessage(false);
        const updateGrid = [];
        let index = 0;
        let cellsCount = 0;
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 20; j++) {
                const location = `${i},${j}`;
                const randomNum = Math.floor(Math.random() * 100 + 1);
                let initBoxClass;
                let heatmapLevel = 0;
                if (randomNum <= 5) {
                    initBoxClass = "boxDefault boxAlive";
                    cellsCount++;
                    heatmapLevel = 10;
                } else {
                    initBoxClass = "boxDefault";
                }
                updateGrid.push({
                    keyName: boxCount + index,
                    boxLocation: location,
                    boxIndex: index,
                    initBoxClass: initBoxClass,
                    heatmapMode: isHeatmapMode,
                    heatmapLevel: heatmapLevel,
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
        setShowErrorMessage(false);
        const currentGrid = [];
        let indexCount = 0;
        const rowInt = parseInt(row);
        const columnInt = parseInt(column);
        let newCellsCount = 0;

        for (let i = 0; i < rowInt; i++) {
            for (let j = 0; j < columnInt; j++) {
                const location = `${i},${j}`;
                let nearbyCellsAlive = 0;
                let currentHeapMapLevel = finalGrid[indexCount].heatmapLevel;
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
                    }
                    if (j != columnInt - 1) {
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
                            heatmapMode: isHeatmapMode,
                            heatmapLevel: currentHeapMapLevel - 1,
                        });
                    } else {
                        currentGrid.push({
                            keyName: boxCount + indexCount,
                            boxLocation: location,
                            boxIndex: indexCount,
                            initBoxClass: "boxDefault boxAlive",
                            heatmapMode: isHeatmapMode,
                            heatmapLevel: currentHeapMapLevel,
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
                            heatmapMode: isHeatmapMode,
                            heatmapLevel: 10,
                        });
                        newCellsCount++;
                    } else {
                        currentGrid.push({
                            keyName: boxCount + indexCount,
                            boxLocation: location,
                            boxIndex: indexCount,
                            initBoxClass: "boxDefault",
                            heatmapMode: isHeatmapMode,
                            heatmapLevel: currentHeapMapLevel - 1,
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

    const updateGridHeatmapMode = () => {
        const updateGrid = [];
        let index = 0;
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < column; j++) {
                const location = `${i},${j}`;
                let heatmapLevel = 0;
                if (finalGrid[index].initBoxClass === "boxDefault boxAlive") {
                    heatmapLevel = 10;
                }
                updateGrid.push({
                    keyName: boxCount + index,
                    boxLocation: location,
                    boxIndex: index,
                    initBoxClass: finalGrid[index].initBoxClass,
                    heatmapMode: !isHeatmapMode,
                    heatmapLevel: heatmapLevel,
                });
                index++;
            }
        }
        setIsHeatmapMode(!isHeatmapMode);
        setFinalGrid(updateGrid);
        setBoxCount(boxCount + index);
    };

    return (
        <>
            <div className="headerContainer">
                <div className="inputTitle cellsCount">Cells: {cellsCount}</div>
                <div className="inputContainer">
                    <div className="inputTitle">Row:</div>
                    <input
                        className="inputBoxes"
                        placeholder="20"
                        onChange={(e) => {
                            setShowErrorMessage(false);
                            if (e.target.value < 3 || e.target.value > 40) {
                                setShowErrorMessage(true);
                            } else {
                                setRow(e.target.value);
                            }
                        }}
                        value={row}
                    ></input>
                </div>

                <div className="inputContainer">
                    <div className="inputTitle">Column:</div>
                    <input
                        className="inputBoxes"
                        placeholder="20"
                        onChange={(e) => {
                            setShowErrorMessage(false);
                            if (e.target.value < 3 || e.target.value > 40) {
                                setShowErrorMessage(true);
                            } else {
                                setColumn(e.target.value);
                            }
                        }}
                        value={column}
                    ></input>
                </div>
                <button
                    className="changeGridButton"
                    onClick={() => handleNewGrid()}
                >
                    Change Grid
                </button>
                <button
                    className={
                        isHeatmapMode ? "heatMapButtonOn" : "heatMapButtonOff"
                    }
                    onClick={() => {
                        updateGridHeatmapMode();
                    }}
                >
                    Heatmap
                </button>
            </div>
            {showErrorMessage ? <ErrorMessage /> : <></>}
            <div className="overallPageContainer">
                <div className="container" style={gridStyle}>
                    {finalGrid.map((box) => {
                        return (
                            <SingleBox
                                key={box.keyName}
                                boxLocation={box.boxLocation}
                                boxIndex={box.boxIndex}
                                initBoxClass={box.initBoxClass}
                                heatmapMode={box.heatmapMode}
                                heatmapLevel={box.heatmapLevel}
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
