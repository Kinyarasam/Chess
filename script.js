// Import any necessary libraries or modules here

// Define global variables for the current player and the selected piece
let currentPlayer = 'white'; // Set the initial player
let selectedPiece = null; // Store the selected piece

// Define a function to initialize the chessboard
function initializeChessboard() {
  // Create the chessboard grid dynamically
  const chessboard = document.getElementById('chessboard');

  // Define the starting position of pieces using letters (R = Rook, N = Knight, B = Bishop, Q = Queen, K = King, P = Pawn)
  const startingPosition = [
    '♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖',
    '♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟',
    '♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜',
  ];

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement('div');
      square.className = 'square'
      if ((row + col) % 2 == 0) {
        square.classList.add('light');
      } else {
        square.classList.add('dark');
      }

      square.dataset.row = row;
      square.dataset.col = col;

      /// Initialize and display chess pieces
      const pieceSymbol = startingPosition[row * 8 + col];
      if (pieceSymbol) {
        const piece = document.createElement('span');

        piece.className = 'piece';
        piece.textContent = pieceSymbol;
        square.appendChild(piece);
      }

      // Add event listeners for square clicks (to make moves)
      square.addEventListener('click', handleSquareClick);

      chessboard.appendChild(square);
    }
  }
}

// Define a function to handle square clicks (making moves)
function handleSquareClick(event) {
  const clickedSquare = event.target;
  const row = parseInt(clickedSquare.dataset.row);
  const col = parseInt(clickedSquare.dataset.col);

  // Check if the clicked square contains a piece of the current player
  const piece = getPieceAt(row, col); // Implement a function to get the piece at the given coordinates

  if (piece) {
    // if (selectedPiece) piece.classList.remove('selected');

    selectedPiece = selectPiece(clickedSquare, piece)
    movePiece(selectedPiece, row, col)
  } else {
    console.log('Select A piece')
  }
  // Implement move validation and logic here
  // Check if the move is valid, update the board, check for checkmate, etc.
}

// Function to get the piece at a specific row and column on the chessboard
const getPieceAt = (row, col) => {
  const chessboard = document.getElementById('chessboard');
  const square = chessboard.querySelector(`[data-row="${row}"][data-col="${col}"]`);
  const pieceElement = square.querySelector('.piece');

  if (pieceElement) {
    return pieceElement.textContent;
  }

  return null; // No piece found
}

// Define a function to move a piece to a specific row and column
const movePiece = (piece, newRow, newCol)  => {};

const isValidPiece = (piece, ) => {};

// Define a function to select a chess piece and highlight its square
const selectPiece = (square, piece) => {
  // Remove the 'selected' class from the previously selected piece, if any
  if (selectedPiece) {
    selectedPiece.classList.remove('selected');
  }

  // Add the 'selected' class to the square containing the piece
  square.classList.add('selected');

  // Update the selectedPiece variable to the newly selected piece
  selectedPiece = square;
  return selectedPiece
}


// Initialize the chessboard when the page loads
document.addEventListener('DOMContentLoaded', () => {
  initializeChessboard();
});
