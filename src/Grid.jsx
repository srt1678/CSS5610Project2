import { useState, useEffect, useContext } from "react";
import SingleBox from "./SingleBox";
import "./Grid.css";
import { CellsCount } from "./App";

function Grid() {
    const [cellsCount, setCellsCount, finalGrid, setFinalGrid] = useContext(CellsCount);
    const [row, setRow] = useState(20);
    const [column, setColumn] = useState(20);
    const [updateGridCount, setUpdateGridCount] = useState(0);
    
    const [gridStyle, setGridStyle] = useState({
        gridTemplateColumns: `repeat(20, 1fr)`,
        height: `${20 * 100}px`,
        width: `${20 * 100}px`,
    });
    const [shouldChangeGrid, setShouldChangeGrid] = useState(false);
    const defaultRow = 20;
    const defaultColumn = 20;

    const handleNewRow = (event) => {
        setRow(parseInt(event.target.value));
    };
    const handleNewColumn = (event) => {
        setColumn(parseInt(event.target.value));
    };
    const handleNewGrid = () => {
        setShouldChangeGrid(true);
        setUpdateGridCount(updateGridCount + 1);
    };

    const resetGrid = () => {
        setRow(defaultRow);
        setColumn(defaultColumn);
        setShouldChangeGrid(true);
        setUpdateGridCount(updateGridCount + 1);
    };
    const nextIterationGrid = () => {
        const currentGrid = [];
        setUpdateGridCount(updateGridCount + 1);
        console.log(finalGrid);
        let indexCount = 0;
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < column; j++) {
                const key = `${i},${j},${updateGridCount}`;
                let nearbyCellsAlive = 0;
                if (i != 0) {
                    nearbyCellsAlive += checkCellStatus(indexCount - column);
                    if (j != 0) {
                        nearbyCellsAlive += checkCellStatus(
                            indexCount - column - 1
                        );
                    }
                    if (j != column - 1) {
                        nearbyCellsAlive += checkCellStatus(
                            indexCount - column + 1
                        );
                    }
                }
                console.log(`${key}, ${nearbyCellsAlive}`);
                if (i != row - 1) {
                    nearbyCellsAlive += checkCellStatus(indexCount + column);
                    if (j != 0) {
                        nearbyCellsAlive += checkCellStatus(
                            indexCount + column - 1
                        );
                        nearbyCellsAlive += checkCellStatus(
                            indexCount + column + 1
                        );
                    }
                }
                console.log(`${key}, ${nearbyCellsAlive}`);
                if (j != 0) {
                    nearbyCellsAlive += checkCellStatus(indexCount - 1);
                }
                console.log(`${key}, ${nearbyCellsAlive}`);
                if (j != column - 1) {
                    nearbyCellsAlive += checkCellStatus(indexCount + 1);
                }
                console.log(`${key}, ${nearbyCellsAlive}`);
                if (
                    finalGrid[indexCount].initBoxClass === "boxDefault boxAlive"
                ) {
                    if (nearbyCellsAlive < 2 || nearbyCellsAlive > 3) {
                        console.log(`${key}: dead`)
                        currentGrid.push({
                            keyName: key,
                            boxId: key,
                            boxIndex: indexCount,
                            initBoxClass: "boxDefault",
                        });
                    } else {
                        console.log(`${key}: alive`)
                        currentGrid.push({
                            keyName: key,
                            boxId: key,
                            boxIndex: indexCount,
                            initBoxClass: "boxDefault boxAlive",
                        });
                    }
                } else {
                    if(nearbyCellsAlive == 3){
                        console.log(`${key}: alive`)
                        currentGrid.push({
                            keyName: key,
                            boxId: key,
                            boxIndex: indexCount,
                            initBoxClass: "boxDefault boxAlive",
                        });
                    }else{
                        console.log(`${key}: dead`)
                        currentGrid.push({
                            keyName: key,
                            boxId: key,
                            boxIndex: indexCount,
                            initBoxClass: "boxDefault",
                        });
                    }
                }
                indexCount++;
            }
        }
        setFinalGrid(currentGrid);
    };
    const checkCellStatus = (index) => {
        if (finalGrid[index] === "boxDefault boxAlive") {
            return 1;
        } else {
            return 0;
        }
    };

    useEffect(() => {
        if (shouldChangeGrid) {
            setShouldChangeGrid(false);
            setCellsCount(0);
            const newGridStyle = {
                gridTemplateColumns: `repeat(${column}, 1fr)`,
                height: `${row * 100}px`,
                width: `${column * 100}px`,
            };
            setGridStyle(newGridStyle);
            const updateGrid = [];
            let index = 0;
            for (let i = 0; i < row; i++) {
                for (let j = 0; j < column; j++) {
                    const key = `${i},${j},${updateGridCount}`;
                    const randomNum = Math.floor(Math.random() * 100 + 1);
                    let initBoxClass;
                    if (randomNum <= 5) {
                        initBoxClass = "boxDefault boxAlive";
                        setCellsCount((cellsCount) => cellsCount + 1);
                    } else {
                        initBoxClass = "boxDefault";
                    }
                    updateGrid.push({
                        keyName: key,
                        boxId: key,
                        boxIndex: index,
                        initBoxClass: initBoxClass,
                    });
                    index++;
                }
            }
            setFinalGrid(updateGrid);
        }
    }, [shouldChangeGrid]);

    return (
        <>
            <div className="headerContainer">
                <div className="inputTitle cellsCount">Cells: {cellsCount}</div>
                <div className="inputContainer">
                    <div className="inputTitle">Row:</div>
                    <input
                        className="inputBoxes"
                        placeholder="20"
                        onChange={handleNewRow}
                    ></input>
                </div>

                <div className="inputContainer">
                    <div className="inputTitle">Column:</div>
                    <input
                        className="inputBoxes"
                        placeholder="20"
                        onChange={handleNewColumn}
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
                    {finalGrid.map((box, index) => {
                        return (
                            <SingleBox
                                key={box.keyName}
                                boxId = {box.keyName}
                                boxIndex = {index}
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
