import { useState } from "react";

export default function Player({ initialName, symbol, isActive, onPlayerNameChange }) {
    // Best part is state component is isolated
    // If we click on player 1 edit, player 2 won't get afftected

    // No when you want to use playerName in GameOver component,
    // You may think that lifiting playerName up is the right call
    // However, if we do that, entire app and gameboard is re-evaluated/re-rendered
    // on every key stroke. Hence not the correct approach
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    function handleClick() {
        // Invert value by adding exclamation
        // If isEditing is true, !isEditing will make it false
        // Above is suboptimal and should not be done (memorize) 
        // React is scheduling the state (1 or 2 ms)
        // So if we call setIsEditing(!isEditing); twice immediately,
        // It will show same behavior because of the delay, both times the value will be false
        // setIsEditing(!isEditing);

        // Pass a function instead
        // Will already pass the isEditing param to the function
        // if you are updating state based on previous state value
        setIsEditing(editing => !editing);

        // call player name change function to display in game over component
        if (isEditing) {
            onPlayerNameChange(symbol, playerName);
        }
    }

    function handleNameChange(event) {
        setPlayerName(event.target.value);
    }

    return (
        <li className={isActive ? "active" : undefined}>
            <span className="player">
                {/* default value is a built-in prop */}
                {/* getting a value out from onChange and feeding it back to input value is called two-way binding */}
                {isEditing ? <input type="text" required value={playerName} onChange={handleNameChange}></input>
                    : <span className="player-name">{playerName}</span>
                }
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleClick}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    );
}