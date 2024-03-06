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
        isHeatmapMode,
        setIsHeatmapMode,
    ] = useContext(GridContext);

    let boxStyle;
    if (isHeatmapMode) {
        switch (props.heatmapLevel) {
            case 0:
                boxStyle = "rgb(255, 255, 255)";
                break;
            case 1:
                boxStyle = "rgb(255, 204, 204)";
                break;
            case 2:
                boxStyle = "rgb(255, 153, 153)";
                break;
            case 3:
                boxStyle = "rgb(255, 102, 102)";
                break;
            case 4:
                boxStyle = "rgb(255, 51, 51)";
                break;
            case 5:
                boxStyle = "rgb(255, 0, 0)";
                break;
            case 6:
                boxStyle = "rgb(204, 0, 0)";
                break;
            case 7:
                boxStyle = "rgb(153, 0, 0)";
                break;
            case 8:
                boxStyle = "rgb(102, 0, 0)";
                break;
            case 9:
                boxStyle = "rgb(51, 0, 0)";
                break;
            case 10:
                boxStyle = "rgb(0, 0, 0)";
                break;
            default:
                boxStyle = "rgb(255, 250, 250)";
        }
    }

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
                    heatmapLevel: 10,
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
                    heatmapLevel: 0,
                };
                return updatedGrid;
            });
        }
    };
    return (
        <div
            className={props.initBoxClass}
            style={{ backgroundColor: boxStyle }}
            onClick={() => selectBox()}
        ></div>
    );
}
