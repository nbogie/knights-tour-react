import { useState } from "react";
import {
    Position,
    createAllPositions,
    createInitialGameState,
    isLegalMove,
    makeMove,
    posToStr,
} from "../core/gameState";
import "./App.css";
import { SquareView } from "./SquareView";

function App() {
    const [gameState, setGameState] = useState(createInitialGameState(8));

    const allPositions = createAllPositions(gameState);

    const visitedSquares: Position[] = gameState.visitedSquares;

    function handleSquareClicked(pos: Position) {
        if (isLegalMove(gameState, pos)) {
            const newGameState = makeMove(gameState, pos);
            setGameState(newGameState);
        }
    }

    return (
        <div className="App">
            {/* TODO: set css var for board size */}
            <div className="boardGrid">
                {allPositions.map((pos) => (
                    <SquareView
                        pos={pos}
                        key={posToStr(pos)}
                        handleClick={handleSquareClicked}
                        gameState={gameState}
                    />
                ))}
            </div>

            {visitedSquares.map(posToStr).join(", ")}
        </div>
    );
}

export default App;
