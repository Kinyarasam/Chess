// Import any necessary libraries or modules here

// Define global variables for the current player and the selected piece
let CURRENT_PLAYER = 'white'; // Set the initial player
let SELECTEDPIECES = null; // Store the selected piece
var PIECE_COLORS = ['black', 'white'];

// Define a function to initialize the chessboard
const initializeChessboard = () => {
  // Create the chessboard grid dynamically
  const chessboard = document.getElementById('chessboard');

  // Define the starting position of pieces using letters (R = Rook, N = Knight, B = Bishop, Q = Queen, K = King, P = Pawn)
  const startingPosition = [
    'black.r', 'black.n', 'black.b', 'black.q', 'black.k', 'black.b', 'black.n', 'black.r', // Black back row
    'black.p', 'black.p', 'black.p', 'black.p', 'black.p', 'black.p', 'black.p', 'black.p', // Black pawns
    '', '', '', '', '', '', '', '', // Empty rows
    '', '', '', '', '', '', '', '', // Empty rows
    '', '', '', '', '', '', '', '', // Empty rows
    '', '', '', '', '', '', '', '', // Empty rows
    'white.P', 'white.P', 'white.P', 'white.P', 'white.P', 'white.P', 'white.P', 'white.P', // White pawns
    'white.R', 'white.N', 'white.B', 'white.Q', 'white.K', 'white.B', 'white.N', 'white.R', // White back row
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
      const piece = document.createElement('span');

      square.dataset.row = row;
      square.dataset.col = col;

      /// Initialize and display chess pieces
      const pieceSymbol = startingPosition[row * 8 + col];
      if (pieceSymbol) {
        piece.className = 'piece';
        piece.textContent = getPieceUnicode(pieceSymbol);
        square.appendChild(piece);
      }

      // Add event listeners for square clicks (to make moves)
      square.addEventListener('click', handleSquareClick);

      chessboard.appendChild(square);
    }
  }
};

const getPieceUnicode = (letter) => {
  switch (letter) {
    case 'black.r': return '♜'; // Black Rook
    case 'black.n': return '♞'; // Black Knight
    case 'black.b': return '♝'; // Black Bishop
    case 'black.q': return '♛'; // Black Queen
    case 'black.k': return '♚'; // Black King
    case 'black.p': return '♟'; // Black Pawn
    case 'white.R': return '♖'; // White Rook
    case 'white.N': return '♘'; // White Knight
    case 'white.B': return '♗'; // White Bishop
    case 'white.Q': return '♕'; // White Queen
    case 'white.K': return '♔'; // White King
    case 'white.P': return '♙'; // White Pawn
    default: return '';
  }
};

const getPieceSymbol = (uniCode) => {
  switch (uniCode) {
    case  '♜': return 'black.r'; // Black Rook
    case  '♞': return 'black.n'; // Black Knight
    case  '♝': return 'black.b'; // Black Bishop
    case  '♛': return 'black.q'; // Black Queen
    case  '♚': return 'black.k'; // Black King
    case  '♟': return 'black.p'; // Black Pawn
    case  '♖': return 'white.R'; // White Rook
    case  '♘': return 'white.N'; // White Knight
    case  '♗': return 'white.B'; // White Bishop
    case  '♕': return 'white.Q'; // White Queen
    case  '♔': return 'white.K'; // White King
    case  '♙': return 'white.P'; // White Pawn
    default: return '';
  }
};

// Function to get the piece at a specific row and column on the chessboard
const getPieceAt = (row, col) => {
  const chessboard = document.getElementById('chessboard');
  const square = chessboard.querySelector(`[data-row="${row}"][data-col="${col}"]`);
  const pieceElement = square.querySelector('.piece');

  if (pieceElement) {
    return getPieceSymbol(pieceElement.textContent);
  }

  return null; // No piece found
};

// Define a function to handle square clicks (making moves)
const handleSquareClick = (event) => {
  const clickedSquare = event.target;
  const row = parseInt(clickedSquare.dataset.row);
  const col = parseInt(clickedSquare.dataset.col);

  // Check if the clicked square contains a piece of the current player
  const piece = getPieceAt(row, col);

  if (piece) {
    // Check if the clicked piece belongs to the current player
    const pieceColor = piece.split('.')[0];
    if (PIECE_COLORS.includes(pieceColor)) {
      if (pieceColor === CURRENT_PLAYER) {
        // Check if the piece has already been moved (previously marked as moved)
        if (!isPieceMoved(clickedSquare)) {
          // Highlight the selected piece
          if (SELECTEDPIECES) {
            SELECTEDPIECES.classList.remove('selected');
          }
          SELECTEDPIECES = clickedSquare;
          SELECTEDPIECES.classList.add('selected');
        } else {
          console.log('This piece has already been moved');
        }
      } else {
        console.log('Select one of your pieces');
      }
    } else {
      if (SELECTEDPIECES) {
        if (isValidMove(SELECTEDPIECES, row, col)) {
          movePiece(SELECTEDPIECES, row, col);
        } else {
          // Handle invalid move
          console.log('Invalid move');
        }
      }
    }
  } else {
    if (!SELECTEDPIECES) return
    console.log('hit')
  
    if (isValidMove(SELECTEDPIECES, row, col)) {
      movePiece(SELECTEDPIECES, row, col)
    }
  }
};

// Function to check if a piece has already been moved
const isPieceMoved = (square) => {
  const piece = square.querySelector('.piece');
  return piece && piece.dataset.moved === 'true';
};


// Define a function to check if a move is valid for a pawn
const isValidPawnMove = (piece, row, col) => {
  
    const selectedRow = parseInt(piece.dataset.row);
    const selectedCol = parseInt(piece.dataset.col);
    const rowDiff = row - selectedRow; // Calculate the row difference without taking absolute value
    const colDiff = Math.abs(col - selectedCol);

    // Determine the valid move conditions based on the piece's color (white or black)
    if (piece.textContent === '♙') { // White pawn
      if (rowDiff === -1 && colDiff === 0) {
        // Valid move: Move one square forward
        return true;
      } else if (selectedRow === 1 && rowDiff === -2 && colDiff === 0) {
        // Valid move for white pawn: Move two squares forward from starting position
        return true;
      } else {
        // Invalid move
        return false;
      }
    } else if (piece.textContent === '♟') { // Black pawn
      if (rowDiff === 1 && colDiff === 0) {
        // Valid move: Move one square backward
        return true;
      } else if (selectedRow === 6 && rowDiff === 2 && colDiff === 0) {
        // Valid move for black pawn: Move two squares backward from starting position
        return true;
      } else {
        // Invalid move
        return false;
      }
    }
  // If the piece is not recognized as either a white or black pawn, it's an invalid move
  return false;
}

// Define a function to check if a move is valid for a rook
function isValidRookMove(piece, row, col) {
  const selectedRow = parseInt(piece.dataset.row);
  const selectedCol = parseInt(piece.dataset.col);

  if (row === selectedRow || col === selectedCol) {
    // Valid move: Horizontal or vertical movement
    return true;
  } else {
    // Invalid move
    return false;
  }
}

// Define a function to check if a move is valid for a knight
function isValidKnightMove(piece, row, col) {
  const selectedRow = parseInt(piece.dataset.row);
  const selectedCol = parseInt(piece.dataset.col);
  const rowDiff = Math.abs(row - selectedRow);
  const colDiff = Math.abs(col - selectedCol);

  if ((rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2)) {
    // Valid move: L-shaped movement
    return true;
  } else {
    // Invalid move
    return false;
  }
}

// Define a function to check if a move is valid for a bishop
function isValidBishopMove(piece, row, col) {
  const selectedRow = parseInt(piece.dataset.row);
  const selectedCol = parseInt(piece.dataset.col);
  const rowDiff = Math.abs(row - selectedRow);
  const colDiff = Math.abs(col - selectedCol);

  if (rowDiff === colDiff) {
    // Valid move: Diagonal movement
    return true;
  } else {
    // Invalid move
    return false;
  }
}

// Define a function to check if a move is valid for the selected piece
function isValidMove(piece, row, col) {
  // Get the piece type (e.g., '♙' for white pawn)
  const pieceType = piece.textContent;
  console.log(pieceType)

  switch (pieceType) {
    case '♙':
    case '♟':
      return isValidPawnMove(piece, row, col);
    case '♖':
    case '♜':
      return isValidRookMove(piece, row, col);
    case '♘':
    case '♞':
      return isValidKnightMove(piece, row, col);
    case '♗':
    case '♝':
      return isValidBishopMove(piece, row, col);
    default:
      // Invalid move for other piece types (e.g., king, queen)
      return false;
  }
}

// Define a function to move a piece to a specific row and column
const movePiece = (piece, newRow, newCol) => {
  // Get the current row and column of the selected piece
  const currentRow = parseInt(piece.dataset.row);
  const currentCol = parseInt(piece.dataset.col);

  // Update the data attributes of the piece to its new position
  piece.dataset.row = newRow;
  piece.dataset.col = newCol;

  // Move the piece to the new square
  const targetSquare = document.querySelector(`[data-row="${newRow}"][data-col="${newCol}"]`);
  // if (targetSquare.childNodes.length === 0) {
  const chessboard = document.getElementById('chessboard');
  const newPiece = document.createElement('span')
  newPiece.className = 'piece'
  newPiece.textContent = piece.textContent; // Set the content of the new piece
  targetSquare.appendChild(newPiece);
  // }

  const targetSquare1 = document.querySelector(`[data-row="${newRow}"][data-col="${newCol}"]`);
  console.log(targetSquare)
  // targetSquare.querySelector('.piece').textContent = piece.textContent;
  // console.log('Position updated');
  
  // // Clear the content of the moved piece from its original position
  const originalSquare = document.querySelector(`[data-row="${currentRow}"][data-col="${currentCol}"]`);
  // const movedPiece = originalSquare.querySelector('span'); // Get the specific span element
  // if (movedPiece) {
  //   originalSquare.removeChild(movedPiece); // Remove the specific span element
  // }
  piece.textContent = '';
  // piece.remove(piece.querySelector('piece'))
  console.log(piece)
  // originalSquare.querySelector('.piece').textContent = ' ';
  // originalSquare.querySelector('.piece').dataset.moved = 'true'; // Mark the original square as moved

  // // Clear the content of the moved piece.
  // piece.textContent = ' ';
  // SELECTEDPIECES = null;

  // // Update the current player (switch between white and black)
  CURRENT_PLAYER = CURRENT_PLAYER === 'white' ? 'black' : 'white';
};

// Initialize the chessboard when the page loads
document.addEventListener('DOMContentLoaded', () => {
  initializeChessboard();
});
