import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./WINNING_COMBINATIONS";
import { useState } from "react"


// HOW TO SPREAD? Immutability causes unexpected behaviors

// For Arrays:
// const originalArray = [1, 2, 3];
// const newArray = [...originalArray, 4]; // [1, 2, 3, 4]

// For Nested Arrays (like your gameBoard)
// const originalBoard = [
//   [null, null],
//   [null, null],
// ];
// const newBoard = [...originalBoard.map(row => [...row])];

// For Objects:
// const originalObject = { a: 1, b: 2 };
// const newObject = { ...originalObject, b: 3 }; // { a: 1, b: 3 }

// For Nested Objects:
// const originalObject = { a: { x: 1, y: 2 }, b: 3 };
// const newObject = {
//   ...originalObject,
//   a: { ...originalObject.a, x: 99 }, // Copy inner object and modify
// };

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2',
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];


// helper function (does not need access to state and needs not be re-rendered every time)
function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

// helper function to derive game board
function deriveGameBoard(gameTurns) {
  // this is called derived state as we a assigning gameboard values
  // from the turns state
  // !!! Hard bug to catch (immutability matters. always)
  // When we mutate INITIAL_GAME_BOARD here, the rematch button wont work
  // as the INITIAL_GAME_BOARD is updated every time we update gameBoard
  // and that interferes with resetting setGameTurns to empty array (who knew)
  // React uses shallow comparison to check whether a component’s state or props have changed. 
  // If you directly mutate an object or array (e.g., by assigning new values to the same memory reference), 
  // React won't detect the change because the reference remains the same.

  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;

}

// helper function to get Winner
function deriveWinner(gameBoard, players) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function App() {
  // Check player for more comments why this new state
  // Player name should be set not on every key stroke
  // but only when they Save after edit
  const [players, setPlayers] = useState(PLAYERS);

  //  This method of adding a state at parent level to access these
  // states in child level like Player and Gameboard components
  // is called lifting state up!
  const [gameTurns, setGameTurns] = useState([]);

  // always look for unnesessary states and try replacing them
  // to derived one. for eg: below state is unnecessary as we have
  // active player in gameTurns
  // const [activePlayer, setActivePlayer] = useState('X');
  const activePlayer = deriveActivePlayer(gameTurns);

  // function to change new player name but keeping the other player name unchanged
  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        // spread for immutability
        ...prevPlayers,
        // here [] is used to dynamically set a property
        // without [], the code would look for 'symbol' in players object and not 'X' or 'O'
        [symbol]: newName
      };
    });
  }

  const gameBoard = deriveGameBoard(gameTurns);

  const winner = deriveWinner(gameBoard, players);

  let hasDraw = gameTurns.length === 9 && !winner;

  // Set gameTurns to empty arrays when clicked on rematch button
  function handleRematch() {
    setGameTurns([]);
  }

  function handleSelectSquare(rowIndex, colIndex) {
    // updting active player was replaced to derived state
    // setActivePlayer((curActivePlayer) => curActivePlayer === "X" ? "O" : "X");
    setGameTurns(prevTurns => {
      // below activePlayer is not ideal as we're merging two different states
      // though gameTurns is updated, activePlayer state is not guaranteed
      // const updatedTurns = [{square: {row: rowIndex, col: colIndex}, player: activePlayer}, ...prevTurns]})
      // so add that state through a variable

      let currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns]

      return updatedTurns;
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer === "X"} onPlayerNameChange={handlePlayerNameChange} />
          <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer === "O"} onPlayerNameChange={handlePlayerNameChange} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRematch={handleRematch} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turnLogs={gameTurns} />
    </main>
  )
}

export default App
