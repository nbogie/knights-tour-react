import { posToStr } from "../core/gameState";
import { useKnightsTourTracker } from "../hooks/useKnightsTourTracker";
import "./App.css";
import { SquareView } from "./SquareView";

function App() {
    const { gameState, allPositions, handleSquareClicked } =
        useKnightsTourTracker(5);

    return (
        <div className="App">
            <div className="titledGrid">
                <h1>Knight's Tour - React</h1>
                <div
                    className="boardGrid"
                    style={
                        { "--boardSize": gameState.size } as React.CSSProperties
                    }
                >
                    {allPositions.map((pos) => (
                        <SquareView
                            pos={pos}
                            key={posToStr(pos)}
                            handleClick={handleSquareClicked}
                            gameState={gameState}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
