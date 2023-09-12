import { useState } from "react";
import {
    BoardSize,
    Position,
    createAllPositions,
    createInitialGameState,
    isLegalMove,
    makeMove,
} from "../core/gameState";

export function useKnightsTourTracker(size: BoardSize) {
    //TODO: Consider what to do when size changes.  Create new board, resetting game?
    const [gameState, setGameState] = useState(createInitialGameState(size));

    //This could be cached with useMemo
    const allPositions = createAllPositions(gameState);

    function handleSquareClicked(pos: Position) {
        if (isLegalMove(gameState, pos)) {
            const newGameState = makeMove(gameState, pos);
            setGameState(newGameState);
        }
    }

    return { gameState, handleSquareClicked, allPositions };
}
