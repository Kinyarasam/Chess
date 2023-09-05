#!/usr/bin/env node

class gameController {

  static initializeBoard() {
    const board = [];

    // Create an 8x8 chessboard as a 2D array.
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
        board[row][col] = initialPosition[pieceIndex++]
      }
    }

    console.log(board)
    return board
  }

  /**
   * 
   * @param {*} req 
   * @param {*} res 
   * @returns 
   */
  static displayBoard(req, res) {
    const board = gameController.initializeBoard();

    for (let row = 0; row < 8; row++) {
      var rowString = '';
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col] || ' ';
        rowString += piece + ' ';
      }

      console.log(rowString)
    }
    return res.status(200).json({ msg: this })
  }
}

export default gameController;
