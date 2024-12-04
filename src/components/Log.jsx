export default function Log({ turnLogs }) {
    return (

        <ol id="log">
            {/* always use key while mapping */}
            {/* use string literals to use multiple variables together */}
            {turnLogs.map(turn =>
                <li key={`${turn.square.row}${turn.square.col}`}>
                    {turn.player} selected {turn.square.row}, {turn.square.col}
                </li>)}
        </ol>

    );
}