#!/usr/bin/env node

// Define global variables for the current player and the selected piece
let CURRENT_PLAYER = 'white'; // Set the initial player
let SELECTEDPIECES = null; // Store the selected piece
let PIECE_COLORS = ['black', 'white'];

class gameController {
  static initializeChessboard() {
    console.log('loaded')
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
  
        if ((row + col) % 2 === 0) {
          square.classList.add('light')
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
          piece.textContent = gameController.getPieceUnicode(pieceSymbol);
          square.appendChild(piece);
        }
  
        // Add event listeners for square clicks (to make moves)
        square.addEventListener('click', gameController.handleSquareClick);
  
        chessboard.appendChild(square);
      }
    }
  }

   // Function to get the piece at a specific row and column on the chessboard
  static getPieceAt(row, col) {
    const chessboard = document.getElementById('chessboard');
    const square = chessboard.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    const pieceElement = square.querySelector('.piece');

    if (pieceElement) {
      return gameController.getPieceSymbol(pieceElement.textContent);
    }

    return null; // No piece found
  }

  //Define a function to handle square clicks (making moves)
  static handleSquareClick(event) {
    const clickedSquare = event.target;
    const row = parseInt(clickedSquare.dataset.row);
    const col = parseInt(clickedSquare.dataset.col);

    gameController.selectSquare(clickedSquare);
    // Check if the clicked square contains a piece of the current player
    const piece = gameController.getPieceAt(row, col);
    console.log(piece)

    if (SELECTEDPIECES) {
      
    } else {
      if (piece && piece.split('.')[0] === CURRENT_PLAYER) {
        // Select the piece
        SELECTEDPIECES = gameController.getPieceUnicode(piece)

        gameController.movePiece(SELECTEDPIECES, row, col)
      } else {
        console.log('Invalid')
      }
    }
  }

  static selectSquare(square) {
    // Deselect any other active square
    const activeSquare = chessboard.querySelector('.selected');

    if (activeSquare !== null) {
      activeSquare.classList.remove('selected');
    }
    square.classList.add('selected');
  }

  // Function to check if a piece has already been moved
  static isPieceMoved(square) {
    const piece = square.querySelector('.piece');
    return piece && piece.dataset.moved === 'true';
  };


  static getPieceUnicode(letter) {
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
  }

  static getPieceSymbol(uniCode) {
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
  }

  // Define a function to check if a move is valid for the selected piece
  static isValidMove(piece, row, col) {
    // Get the piece type (e.g., '♙' for white pawn)
    const pieceType = piece.textContent;
    // console.log(pieceType)

    switch (pieceType) {
      case '♙':
      case '♟':
        return gameController.isValidPawnMove(piece, row, col);
      case '♖':
      case '♜':
        return gameController.isValidRookMove(piece, row, col);
      case '♘':
      case '♞':
        return gameController.isValidKnightMove(piece, row, col);
      case '♗':
      case '♝':
        return gameController.isValidBishopMove(piece, row, col);
      case '♕':
      case '♛':
        return gameController.isValidQueenMove(piece, row, col)
      case '♔':
      case '♚':
        return gameController.isValidKingMove(piece, row, col)
      default:
        // Invalid move for other piece types (e.g., king, queen)
        return false;
    }
  }

  // Define a function to check if a move is valid for a pawn
  static isValidPawnMove(piece, row, col) {
    const selectedRow = parseInt(piece.dataset.row);
    const selectedCol = parseInt(piece.dataset.col);
    const rowDiff = row - selectedRow;
    const colDiff = col - selectedCol;

    console.log(rowDiff, colDiff)
    console.log(gameController.canCapturePiece(piece, row, col))

    if (piece.textContent === '♙') { // Move validations for the white pawn
      if (gameController.canCapturePiece(piece, row, col)) {
        if (rowDiff === -1 && Math.abs(colDiff) === 1) {
          return true
        }
      } else {
        if (rowDiff === -1 && colDiff === 0) {
          // Valid move: Move one square forward.
          return true
        } else if (selectedRow === 6 && row === 4 && colDiff === 0) {
          // Valid move for white pawn: Move two squares forward from starting position
          return true;
        } else {
          // Invalid move
          return false
        }
      }
    } else if (piece.textContent === '♟') { // Move validations for the black pawn
      if (rowDiff === 1 && colDiff === 0) {
        // Valid move: Move one square forward.
        return true
      } else if (selectedRow === 1 && row === 3 && colDiff === 0) {
        // Valid move for black pawn: Move two squares forward from starting position
        return true;
      } else {
        // Invalid move
        return false
      }
    } else {
      // Invalid move
      return false
    }
  }

  // Define a function to check if a move is valid for a rook
  static isValidRookMove(piece, row, col) {
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
  static isValidKnightMove(piece, row, col) {
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
  static isValidBishopMove(piece, row, col) {
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


  // Define a function to check if a move is valid for a king
  static isValidKingMove(piece, row, col) {
    const selectedRow = parseInt(piece.dataset.row);
    const selectedCol = parseInt(piece.dataset.col);
    const rowDiff = Math.abs(row - selectedRow);
    const colDiff = Math.abs(col - selectedCol);

    if ((Math.abs(rowDiff) === 1) || Math.abs(colDiff) === 1) 
      return true
    return false
  }

  // Define a function to check if a move is valid for a queen.
  static isValidQueenMove(piece, row, col) {
    const selectedRow = parseInt(piece.dataset.row);
    const selectedCol = parseInt(piece.dataset.col);
    const rowDiff = Math.abs(row - selectedRow);
    const colDiff = Math.abs(col - selectedCol);

    if (row === selectedRow || col === selectedCol || rowDiff === colDiff) {
      // Valid move: Horizontal, vertical, or diagonal movement
      return true;
    } else {
      // Invalid move
      return false;
    }
  }

  // Define a function to move a piece to a specific row and column
  static movePiece(piece, newRow, newCol) {
    // Get the destination square
    const destinationSquare = document.querySelector(`[data-row="${newRow}"][data-col="${newCol}"]`)
    const newDestination = document.createElement('span')
    newDestination.classList.add('piece')

    // move the piece to the new square
    newDestination.textContent = SELECTEDPIECES.textContent 
    destinationSquare.appendChild(newDestination)

    // Clear the content of the moved piece.
    SELECTEDPIECES.textContent = '';
    SELECTEDPIECES.classList.remove('selected')
    SELECTEDPIECES = null;

    // Update the current player (switch between white and black)
    CURRENT_PLAYER = CURRENT_PLAYER === 'white' ? 'black' : 'white'
  };

  static canCapturePiece(piece, row, col) {
    const targetPiece = piece
    // console.log(piece, SELECTEDPIECES)

    // console.log(targetPiece)

    if (targetPiece) {
      const targetColor = gameController.getPieceSymbol(targetPiece.textContent).split('.')[0]
      const pieceColor = gameController.getPieceSymbol(SELECTEDPIECES.textContent).split('.')[0];

      // console.log(targetColor, pieceColor)
      // A piece can capture another piece if they have different colors (opponents)
      return targetColor !== pieceColor;
    }

    return false; // No piece to capture
  }
}

// export default gameController;



// if (piece) {
//   // Check if the clicked piece belongs to the current player
//   const pieceColor = piece.split('.')[0];
//   if (PIECE_COLORS.includes(pieceColor)) {
//     if (pieceColor === CURRENT_PLAYER) {
//       // Check if the piece has already been moved (previously marked as moved)
//       if (!gameController.isPieceMoved(clickedSquare)) {
//         // Highlight the selected piece
//         if (SELECTEDPIECES) {
//           SELECTEDPIECES.classList.remove('selected');
//         }
//         SELECTEDPIECES = clickedSquare;
//         SELECTEDPIECES.classList.add('selected');
//       } else {
//         console.log('This piece has already been moved');
//       }
//     } else {
//       // Check for a valid Capture.
//       if (SELECTEDPIECES !== null) {
//         console.log('Check for posible capture');
//         console.log(SELECTEDPIECES)
//         console.log(piece)
//         console.log('can capture', gameController.canCapturePiece(piece, row, col));
//         console.log('can move',gameController.isValidMove(SELECTEDPIECES, row, col))

//         // if (gameController.canCapturePiece(piece, row, col) && gameController.isValidMove(SELECTEDPIECES, row, col)) {
//         //   // clear the targetsquare.
//         //   const chessboard = document.getElementById('chessboard');
//         //   const targetsquare = chessboard.querySelector(`[data-row="${row}"][data-col="${col}"]`);
//         //   targetsquare.textContent = '';
          
//         //   // console.log(piece)
//         //   gameController.movePiece(piece, row, col);
//         //   // SELECTEDPIECES = null;

//         // } else {
//         //   console.log('Invalid Move')
//         // }
//       } else {
//         console.log('Select One of your Piece')
//       }
//     }
//   } else {
//     console.log('Here')
//     // if (SELECTEDPIECES) {
//     //   if (gameController.isValidMove(SELECTEDPIECES, row, col)) {
//     //     gameController.movePiece(SELECTEDPIECES, row, col);
//     //   } else {
//     //     // Handle invalid move
//     //     console.log('Invalid move');
//     //   }
//     // }
//   }
// } else {
//   console.log('Check here')
//   if (!SELECTEDPIECES) return

//   if (gameController.isValidMove(SELECTEDPIECES, row, col)) {
//     gameController.movePiece(SELECTEDPIECES, row, col)     
//   }
// }