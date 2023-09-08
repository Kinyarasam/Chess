#!/usr/bin/env node

// Define a function to initialize an empty chessBoard
const initializeBoard = () => {
  const board = [];

  // Create a 8x8 chessboard as a 2D array
  for (let i = 0; i < 8; i++) {
    board[i] = new Array(8).fill(null);
  }


  // Set up the stating position of pieces (For a standard chess setup).
  // R = Rook, N = Knight, B = Bishop, Q = Queen, K = King, P = Pawn
  const initialPosition = [
    'R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R',
    'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P',
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p',
    'r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'
  ];

  // place the pieces on the board
  let pieceIndex = 0;
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      board[row][col] = initialPosition[pieceIndex++];
    }
  }

  return board;
}


const displayBoard = (board) => {
  for (let row = 0; row < 8; row++) {
    let rowString = '';
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col] || ' ';
      rowString += piece + ' ';
    }
    console.log(rowString)
  }
}

const movePiece = (board, fromRow, fromCol, toRow, toCol) => {
  const piece = board[fromRow][fromCol];
  if (!piece) {
    console.log('No piece at the specified position.');
    return;
  }

  // Basic move validation (you can extend this for each piece's movement rules)
  if (board[toRow][toCol] !== null) {
    console.log('Invalid move. Destination is occupied.');
    return;
  }

  // Move the piece to the new position
  board[toRow][toCol] = piece;
  board[fromRow][fromCol] = null;
}

// Initialize the chessBoard.
const chessBoard = initializeBoard();

// Display the initial chessBoard.
console.log('Initial ChessBoard')
displayBoard(chessBoard);

// Move a piece (example: move the e2 pawn to e4)
movePiece(chessBoard, 6, 4, 4, 4);

// Display the updated chessboard
console.log('Updated Chessboard:');
displayBoard(chessBoard);