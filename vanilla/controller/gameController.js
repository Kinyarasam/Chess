#!/usr/bin/env
let CURRENT_PLAYER = 'white';
let PIECE_COLORS = ['white', 'black']
let SELECTED_SQUARE = null;

class GameController {
  static initializeChessboard() {
    const board = document.getElementById('chessboard');

    const startPos = [
      'black.r', 'black.n', 'black.b', 'black.q', 'black.k', 'black.b', 'black.n', 'black.r', // Black back row
      'black.p', 'black.p', 'black.p', 'black.p', 'black.p', 'black.p', 'black.p', 'black.p', // Black pawns
      null, null, null, null, null, null, null, null, // Empty rows
      null, null, null, null, null, null, null, null, // Empty rows
      null, null, null, null, null, null, null, null, // Empty rows
      null, null, null, null, null, null, null, null, // Empty rows
      'white.P', 'white.P', 'white.P', 'white.P', 'white.P', 'white.P', 'white.P', 'white.P', // White pawns
      'white.R', 'white.N', 'white.B', 'white.Q', 'white.K', 'white.B', 'white.N', 'white.R', // White back row
    ]

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const square = document.createElement('div');
        square.className = 'square';

        ((row + col) % 2 === 0) ? square.classList.add('light') : square.classList.add('dark')

        const piece = document.createElement('span')
        piece.className = 'piece';

        square.dataset.row = row;
        square.dataset.col = col;

        // Initialize and display the chess pieces
        const pieceText = startPos[row * 8 + col]

        if (pieceText) {
          piece.textContent = GameController.getPieceUnicode(pieceText);
        }
        square.appendChild(piece)

        square.addEventListener('click', GameController.handleSquareClick);

        board.appendChild(square)
      }
    }
  }

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
      default:
        return null;
    }
  }

  static getPieceText(uniCode) {
    switch (uniCode) {
      case '♜': return 'black.r'; // Black Rook
      case '♞': return 'black.n'; // Black Knight
      case '♝': return 'black.b'; // Black Bishop
      case '♛': return 'black.q'; // Black Queen
      case '♚': return 'black.k'; // Black King
      case '♟': return 'black.p'; // Black Pawn
      case '♖': return 'white.R'; // White Rook
      case '♘': return 'white.N'; // White Knight
      case '♗': return 'white.B'; // White Bishop
      case '♕': return 'white.Q'; // White Queen
      case '♔': return 'white.K'; // White King
      case '♙': return 'white.P'; // White Pawn
      default:
        return null;
    }
  }

  static handleSquareClick() {
    const clickedSquare = event.target;

    const row = parseInt(clickedSquare.dataset.row)
    const col = parseInt(clickedSquare.dataset.col)

    if (Number.isNaN(row) || Number.isNaN(col)) {
      alert('click again');
      return
    }

    // Highlight the clicked square
    GameController.highlightSquare(clickedSquare);

    const piece = GameController.getPieceAt(clickedSquare, row, col);

    if (piece && piece.split('.')[0] === CURRENT_PLAYER) {
      GameController.selectSquare(clickedSquare, row, col);
    } else {
      if (!SELECTED_SQUARE) {
        console.log('Select your piece color')
      } else {
        // Validate piece move

        GameController.movePiece(clickedSquare, row, col)
      }
    }
  }

  static selectSquare(square) {
    if (SELECTED_SQUARE) { SELECTED_SQUARE.classList.remove('sel') }
    SELECTED_SQUARE = square

    SELECTED_SQUARE.classList.add('sel')
  }

  static getPieceAt(square) {
    return GameController.getPieceText(square.textContent);
  }

  static highlightSquare(square) {
    const board = document.getElementById('chessboard');
    const activeSquare = board.querySelector('.selected');

    if (activeSquare) {
      activeSquare.classList.remove('selected');
    }
    square.classList.add('selected')
  }

  static movePiece(square) {
    const newLocation = square.querySelector('.square');
    if (SELECTED_SQUARE === null) return;

    const new_span = square.querySelector('span')
    const update_span = SELECTED_SQUARE.querySelector('span')
    const playerPiece = update_span.textContent
    const enemy = new_span.textContent
    console.log('enemy', enemy)

    if (GameController.isValidMove(playerPiece)) {
      GameController.move(update_span, new_span, playerPiece);

      SELECTED_SQUARE.classList.remove('sel')
      SELECTED_SQUARE = null
    }
  }

  static move(initialPos, finalPos, piece) {
    finalPos.textContent = piece
    initialPos.textContent = null
    CURRENT_PLAYER = CURRENT_PLAYER === 'white' ? 'black' : 'white'

  }

  static isValidMove(piece) {
    switch (piece) {
      case '♙':
      case '♟':
        return GameController.isValidPawnMove(piece);
      case '♖':
      case '♜':
        return GameController.isValidRookMove(piece);
      case '♘':
      case '♞':
        return GameController.isValidKnightMove(piece);
      case '♗':
      case '♝':
        return GameController.isValidBishopMove(piece);
      case '♕':
      case '♛':
        return GameController.isValidQueenMove(piece)
      case '♔':
      case '♚':
        return GameController.isValidKingMove(piece)
      default:
        // Invalid move for other piece types (e.g., king, queen)
        return false;
    }
  }

  static isValidPawnMove(piece) {
    const player_pos_row = parseInt(SELECTED_SQUARE.dataset.row);
    const player_pos_col = parseInt(SELECTED_SQUARE.dataset.col);

    const [next_pos_row, next_pos_col] = GameController.getCurrentClickedSquare();

    console.log(piece)

    return false
  }

  static isValidRookMove(piece) {
    return false
  }

  static isValidKnightMove(piece) {
    return false
  }
  static isValidBishopMove(piece) {
    return false
  }
  static isValidQueenMove(piece) { return false }
  static isValidKingMove(piece) { return false }

  static getCurrentClickedSquare() {
    const board = document.getElementById('chessboard')
    const square = board.querySelector('.selected')

    return [parseInt(square.dataset.row), parseInt(square.dataset.col)]
  }
}