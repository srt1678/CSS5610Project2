import { useState, useContext } from "react";
import "./SingleBox.css";
import { CellsCount } from "./App";

export default function SingleBox(props) {
    const [cellsCount, setCellsCount, finalGrid, setFinalGrid] =
        useContext(CellsCount);
    const [selectBoxClassName, setSelectBoxClassName] = useState(
        props.initBoxClass
    );

    const selectBox = () => {
        if (selectBoxClassName === "boxDefault") {
            setCellsCount(cellsCount + 1);
            setSelectBoxClassName("boxDefault boxAlive");
            let currentGrid = [...finalGrid];
            currentGrid[props.boxIndex] = {
                //keyName: combineKey,
                boxLocation: props.boxLocation,
                boxIndex: props.boxIndex,
                initBoxClass: selectBoxClassName,
            };
            setFinalGrid(currentGrid);
        } else {
            setCellsCount(cellsCount - 1);
            setSelectBoxClassName("boxDefault");
        }
    };
    return (
        //<div className={selectBoxClassName} onClick={() => selectBox()}></div>
        <div className={selectBoxClassName}></div>
    );
}
