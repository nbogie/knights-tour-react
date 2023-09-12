import {
    GameState,
    Position,
    areSamePosition,
    hasBeenVisited,
    isCurrentPosition,
    isLegalMove,
} from "../core/gameState";

interface SquareViewProps {
    pos: Position;
    gameState: GameState;
    handleClick: (pos: Position) => void;
}

export function SquareView({
    pos,
    gameState,
    handleClick,
}: SquareViewProps): JSX.Element {
    const stepNumber = gameState.visitedSquares.findIndex((p) =>
        areSamePosition(p, pos)
    );

    /** return a string of css classes suitable for this square */
    function classesForSquare(givenPos: Position): string {
        const classes = ["square"];

        if (hasBeenVisited(givenPos, gameState)) {
            classes.push("visited");
        }

        if (isCurrentPosition(givenPos, gameState)) {
            classes.push("current");
        }

        if (isLegalMove(gameState, givenPos)) {
            classes.push("legal");
        }

        return classes.join(" ");
    }
    return (
        <button
            className={classesForSquare(pos)}
            onClick={() => handleClick(pos)}
        >
            {stepNumber > -1 ? stepNumber + 1 : ""}
        </button>
    );
}
