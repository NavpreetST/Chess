const Piece = {
    None : 0, 
    King : 1,
    Pawn : 2,
    Knight : 3,
    Bishop : 4,
    Rook : 5,
    Queen : 6,

    White : 8, 
    Black : 16
  }

export const getLegalMoves = (squareIndex, chessBoard) => {
  const legalMoves = [];
  const piece = chessBoard[squareIndex];
  const pieceType = piece & 7;
  const pieceColor = piece & 24;

  if (pieceType === Piece.Pawn) {
    const direction = pieceColor === Piece.White ? -1 : 1;
    const startRank = pieceColor === Piece.White ? 6 : 1;

    // One square forward
    const oneSquareForward = squareIndex + 8 * direction;
    if (chessBoard[oneSquareForward] === null) {
      legalMoves.push(oneSquareForward);
    }

    // Two squares forward
    if (Math.floor(squareIndex / 8) === startRank) {
      const twoSquaresForward = squareIndex + 16 * direction;
      if (chessBoard[oneSquareForward] === null && chessBoard[twoSquaresForward] === null) {
        legalMoves.push(twoSquaresForward);
      }
    }

    // Captures
    const captureMoves = [squareIndex + 7 * direction, squareIndex + 9 * direction];
    for (const move of captureMoves) {
      if (chessBoard[move] !== null && (chessBoard[move] & 24) !== pieceColor) {
        legalMoves.push(move);
      }
    }
  } else if (pieceType === Piece.Knight) {
    const knightMoves = [-17, -15, -10, -6, 6, 10, 15, 17];

    for (const move of knightMoves) {
      const newIndex = squareIndex + move;
      if (newIndex >= 0 && newIndex < 64) {
        const targetPiece = chessBoard[newIndex];
        if (targetPiece === null || (targetPiece & 24) !== pieceColor) {
          legalMoves.push(newIndex);
        }
      }
    }
  } else if (pieceType === Piece.Rook) {
    const rookDirections = [-8, -1, 1, 8];

    for (const direction of rookDirections) {
      for (let i = 1; i < 8; i++) {
        const newIndex = squareIndex + direction * i;
        if (newIndex < 0 || newIndex >= 64) break;

        const targetPiece = chessBoard[newIndex];
        if (targetPiece === null) {
          legalMoves.push(newIndex);
        } else {
          if ((targetPiece & 24) !== pieceColor) {
            legalMoves.push(newIndex);
          }
          break;
        }
      }
    }
  } else if (pieceType === Piece.Bishop) {
    const bishopDirections = [-9, -7, 7, 9];

    for (const direction of bishopDirections) {
      for (let i = 1; i < 8; i++) {
        const newIndex = squareIndex + direction * i;
        if (newIndex < 0 || newIndex >= 64) break;

        const targetPiece = chessBoard[newIndex];
        if (targetPiece === null) {
          legalMoves.push(newIndex);
        } else {
          if ((targetPiece & 24) !== pieceColor) {
            legalMoves.push(newIndex);
          }
          break;
        }
      }
    }
  }

  return legalMoves;
};