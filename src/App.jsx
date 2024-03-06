import "./App.css";
import Grid from "./Grid";
import Navbar from "./Navbar";
import { createContext, useState } from "react";

export const GridContext = createContext();
function App() {
    const [cellsCount, setCellsCount] = useState(0);
    const [boxCount, setBoxCount] = useState(0);
    const [isHeatmapMode, setIsHeatmapMode] = useState(false);
    const [finalGrid, setFinalGrid] = useState(() => {
        const tempGrid = [];
        let index = 0;
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 20; j++) {
                const location = `${i},${j}`;
                const randomNum = Math.floor(Math.random() * 100 + 1);
                let initBoxClass;
                if (randomNum <= 5) {
                    initBoxClass = "boxDefault boxAlive";
                    setCellsCount((cellsCount) => cellsCount + 1);
                } else {
                    initBoxClass = "boxDefault";
                }
                tempGrid.push({
                    keyName: index,
                    boxLocation: location,
                    boxIndex: index,
                    initBoxClass: initBoxClass,
                    heatmapMode: isHeatmapMode,
                    heatmapLevel: 0,
                });
                index++;
            }
        }
        setBoxCount(index + 1);
        return tempGrid;
    });

    return (
        <>
            <Navbar />
            <GridContext.Provider
                value={[
                    cellsCount,
                    setCellsCount,
                    finalGrid,
                    setFinalGrid,
                    boxCount,
                    setBoxCount,
                    isHeatmapMode,
                    setIsHeatmapMode,
                ]}
            >
                <Grid />
            </GridContext.Provider>
        </>
    );
}

export default App;
