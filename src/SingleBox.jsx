import { useContext } from "react";
import "./SingleBox.css";
import { GridContext } from "./App";

export default function SingleBox(props) {
    const [
        cellsCount,
        setCellsCount,
        finalGrid,
        setFinalGrid,
        boxCount,
        setBoxCount,
    ] = useContext(GridContext);

    const selectBox = () => {
        setBoxCount(boxCount + 1);
        if (props.initBoxClass === "boxDefault") {
            setCellsCount(cellsCount + 1);
            setFinalGrid((prevGrid) => {
                const updatedGrid = [...prevGrid];
                updatedGrid[props.boxIndex] = {
                    ...updatedGrid[props.boxIndex],
                    keyName: boxCount,
                    initBoxClass: "boxDefault boxAlive",
                };
                return updatedGrid;
            });
        } else {
            setCellsCount(cellsCount - 1);
            setFinalGrid((prevGrid) => {
                const updatedGrid = [...prevGrid];
                updatedGrid[props.boxIndex] = {
                    ...updatedGrid[props.boxIndex],
                    keyName: boxCount,
                    initBoxClass: "boxDefault",
                };
                return updatedGrid;
            });
        }
    };
    return (
        <div className={props.initBoxClass} onClick={() => selectBox()}></div>
    );
}
