export default function knightMoves(start, end) {
    // Initialize data structures and variables
    let queue = []; // Queue for BFS traversal
    let visited = []; // 2D array to keep track of visited positions
    let path = []; // 2D array to store the path
    let result = []; // Array to store the final path

    // Create the chessboard and mark all cells as unvisited
    for (let i = 0; i < 8; i++) {
        visited[i] = [];
        path[i] = []; // Initialize the path array
        for (let j = 0; j < 8; j++) {
            visited[i][j] = false;
        }
    }

    const moves = [ // All possible moves for a knight
        [1, 2],
        [-1, 2],
        [1, -2],
        [-1, -2],
        [2, 1],
        [-2, 1],
        [2, -1],
        [-2, -1]
    ];

    function isValid(x, y) {
        if (x < 0 || x > 7 || y < 0 || y > 7 || visited[x][y] === true) {
            return false;
        } else {
            return true;
        }
    }

    // Start the BFS process
    // Add start position to queue
    queue.push([start[0], start[1]]);
    visited[start[0]][start[1]] = true;

    while (queue.length > 0) {
        let current = queue.shift();
        let x = current[0];
        let y = current[1];

        // Check if the target position is reached
        if (x === end[0] && y === end[1]) {
            // Reconstruct the path
            let currentX = x;
            let currentY = y;
            while (currentX !== start[0] || currentY !== start[1]) {
                result.unshift([currentX, currentY]); // Add to the beginning of the result to maintain the correct order
                const [prevX, prevY] = path[currentX][currentY];
                currentX = prevX;
                currentY = prevY;
            }
            result.unshift([start[0], start[1]]);
            break;
        } else {
            // Explore all possible knight moves
            for (let i = 0; i < moves.length; i++) {
                let newX = x + moves[i][0];
                let newY = y + moves[i][1];
                if (isValid(newX, newY)) {
                    queue.push([newX, newY]);
                    visited[newX][newY] = true;
                    path[newX][newY] = [x, y]; // Store the previous position
                }
            }
        }
    }

    // Format the console output
    const formattedResult = result.map(([x, y]) => `[${x}, ${y}]`).join(' -> ');
    console.log(`Path from [${start}] to [${end}]: ${formattedResult}`);
    return result;
}
