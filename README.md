### Tic Tac Toe - React Project

### Overview
This is a Tic Tac Toe game built with React. The game features an interactive board, dynamic updates, and state management using React hooks. It allows two players to compete, keeps track of turns, and declares the winner.

### Features
Interactive Gameplay: Play Tic Tac Toe on a 3x3 grid.
Player Names: Customizable player names.
Dynamic Updates: The game dynamically updates the board and the current player.
Winner Detection: Determines the winner based on classic Tic Tac Toe rules.
Clean UI: Responsive design with simple and intuitive user interactions.
Technologies Used
React: For building the user interface and managing state.
JavaScript (ES6): Core programming language.
CSS: Styling the components.

### Project Structure

```
src/ ├── components/ 
        │ 
        ├── GameBoard.jsx // The main board for Tic Tac Toe 
        │ 
        ├── Player.jsx // Player info and status 
        │ 
        ├── Log.jsx // Displays game logs/turn history 
    ├── App.jsx // Main application logic 
    ├── WINNING_COMBINATIONS.js // Predefined winning combinations 
    ├── index.css // Styles for the app 
    ├── index.js // Entry point of the React application
```

### Installation and Setup

Clone the Repository:

`git clone https://github.com/your-username/tic-tac-toe-react.git`
`cd tic-tac-toe-react`

Install Dependencies:

`npm install`

Run the Development Server:

`npm start`
The app will open at http://localhost:3000 in your default browser.

### How to Play

- Start the game by clicking on any square on the grid.
  - Player X always begins the game.
  - Players take turns to click an empty square to place their mark (X or O).
- The game ends when:
  - A player has three marks in a row, column, or diagonal (declared as the winner).
  - All squares are filled without a winner (declared as a draw).
- Customization
  - Update Player Names: Use the provided input fields to set custom player names.
  - Modify Styles: Edit the index.css file to customize the appearance of the board and UI.
  - Known Issues / Improvements
  - Add AI for single-player mode.
  - Support for larger grids (e.g., 4x4 or 5x5).
  - Save game progress locally or via a backend.
  - Enhance animations for winning lines and transitions.

### License
This project is not licensed.

### Contributing
Contributions are welcome! Feel free to submit a pull request or file an issue for any bugs or enhancements.

### Acknowledgements
Inspired by the classic Tic Tac Toe game and built as a fun learning project using React.

Enjoy the game! 🎉Tic Tac Toe - React Project
