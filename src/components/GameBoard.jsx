
export default function GameBoard({onSelectSquare, board}) {
    // Commented as we need to lift this state up to manage logs/ game turns
    // const [gameBoard, setGameBoard] = useState(initialGameBoard);

    // function handleSelect(rowIndex, colIndex) {
    //     setGameBoard((previousGameBoard) => {
    //         // Arrays are just reference values in JS
    //         // So we should not mutate directly but create a copy first
    //         // Below is not best practice as React might not detect the change. 
    //         // This is because React relies on immutability to compare the previous state with the next state for re-rendering.
    //         // previousGameBoard[rowIndex][colIndex] = 'X';
    //         const updatedBoard = [...previousGameBoard.map(innerArray => [...innerArray])];
    //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updatedBoard;
    //     })

    //     onSelectSquare();
    // }

    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => <li key={rowIndex}>
                <ol>
                    {/* col is same as playerSymbol */}
                    {/* {row.map((playerSymbol, colIndex) => <li key={colIndex}><button onClick={() => handleSelect(rowIndex, colIndex)} >{playerSymbol}</button></li>)} */}
                    {row.map((playerSymbol, colIndex) => <li key={colIndex}>
                        <button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol !== null} >{playerSymbol}</button>
                        </li>)}
                </ol>
            </li>)}
        </ol>
    );
}