import {
    GameState,
    Position,
    hasBeenVisited,
    isCurrentPosition,
    isLegalMove,
    posToStr,
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
    /** return a string of css classes suitable for this square */
    function classesForSquare(givenPos: Position): string {
        const classes = ["square"];

        if (hasBeenVisited(givenPos, gameState)) {
            classes.push("visited");
        }

        if (isCurrentPosition(givenPos, gameState)) {
            classes.push("current");
        }
        if (
            !hasBeenVisited(givenPos, gameState) &&
            isLegalMove(gameState, givenPos)
        ) {
            classes.push("legal");
        }

        return classes.join(" ");
    }
    return (
        <button
            className={classesForSquare(pos)}
            onClick={() => handleClick(pos)}
        >
            {posToStr(pos)}
        </button>
    );
}
