export type Position = { x: number; y: number };
export function posToStr({ x, y }: Position): string {
    return x + "," + y;
}

export type BoardSize = 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface GameState {
    visitedSquares: Position[];
    size: BoardSize;
}

export function createInitialGameState(boardSize: BoardSize): GameState {
    return {
        visitedSquares: [],
        size: boardSize,
    };
}

export function isLegalMove(gameState: GameState, proposedPos: Position) {
    const currentPos = getCurrentPosition(gameState);
    if (!currentPos) {
        return true;
    } else {
        return (
            !hasBeenVisited(proposedPos, gameState) &&
            knightCanGetFromTo(currentPos, proposedPos)
        );
    }
}
/** Returns true if this is a knight's l-shaped move */
function knightCanGetFromTo(currentPos: Position, proposedPos: Position) {
    const deltaX = Math.abs(currentPos.x - proposedPos.x);
    const deltaY = Math.abs(currentPos.y - proposedPos.y);
    return (deltaX === 2 && deltaY === 1) || (deltaX === 1 && deltaY === 2);
}

export function makeMove(
    gameState: GameState,
    proposedPos: Position
): GameState {
    if (!isLegalMove(gameState, proposedPos)) {
        return gameState;
    }
    return {
        ...gameState,
        visitedSquares: [...gameState.visitedSquares, { ...proposedPos }],
    };
}

export function createAllPositions({ size }: GameState): Position[] {
    const positions: Position[] = [];
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            positions.push({ x, y });
        }
    }
    return positions;
}

export function areSamePosition(a: Position, b: Position): boolean {
    return a.x === b.x && a.y === b.y;
}

export function getCurrentPosition({
    visitedSquares,
}: GameState): Position | undefined {
    return visitedSquares.at(-1);
}

export function isCurrentPosition(
    givenPos: Position,
    gameState: GameState
): boolean {
    const currentPos = getCurrentPosition(gameState);
    return currentPos !== undefined && areSamePosition(givenPos, currentPos);
}

export function hasBeenVisited(
    givenPos: Position,
    gameState: GameState
): boolean {
    return gameState.visitedSquares.some((vPos) =>
        areSamePosition(givenPos, vPos)
    );
}
