export const Piece = {
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

export const getLegalMoves = (squareIndex, chessBoard, castlingRights, enPassantTarget) => {
  const legalMoves = [];
  const piece = chessBoard[squareIndex];
  const pieceType = piece & 7;
  const pieceColor = piece & 24;

  if (pieceType === Piece.Pawn) {
    const direction = pieceColor === Piece.White ? 1 : -1;
    const startRank = pieceColor === Piece.White ? 1 : 6;
    const currentRank = Math.floor(squareIndex / 8);
    const currentFile = squareIndex % 8;

    // One square forward
    const oneSquareForward = squareIndex + 8 * direction;
    if (oneSquareForward >= 0 && oneSquareForward < 64 && chessBoard[oneSquareForward] === null) {
      legalMoves.push(oneSquareForward);

      // Two squares forward (only if one square forward is empty)
      if (currentRank === startRank) {
        const twoSquaresForward = squareIndex + 16 * direction;
        if (twoSquaresForward >= 0 && twoSquaresForward < 64 && chessBoard[twoSquaresForward] === null) {
          legalMoves.push(twoSquaresForward);
        }
      }
    }

    // Diagonal captures
    const captureOffsets = [7 * direction, 9 * direction];
    for (let i = 0; i < captureOffsets.length; i++) {
      const captureSquare = squareIndex + captureOffsets[i];
      const captureRank = Math.floor(captureSquare / 8);
      const captureFile = captureSquare % 8;
      
      // Check bounds and ensure we don't wrap around the board
      if (captureSquare >= 0 && captureSquare < 64 && 
          Math.abs(currentRank - captureRank) === 1 && 
          Math.abs(currentFile - captureFile) === 1) {
        
        const targetPiece = chessBoard[captureSquare];
        if (targetPiece !== null && (targetPiece & 24) !== pieceColor) {
          legalMoves.push(captureSquare);
        }
      }
    }

    // En Passant
    if (enPassantTarget !== null && enPassantTarget >= 0 && enPassantTarget < 64) {
      const epRank = Math.floor(enPassantTarget / 8);
      const epFile = enPassantTarget % 8;
      
      // Check if en passant target is diagonally adjacent
      if (Math.abs(currentRank - epRank) === 1 && Math.abs(currentFile - epFile) === 1) {
        legalMoves.push(enPassantTarget);
      }
    }

  } else if (pieceType === Piece.Knight) {
    const knightMoves = [-17, -15, -10, -6, 6, 10, 15, 17];

    const currentRank = Math.floor(squareIndex / 8);
    const currentFile = squareIndex % 8;

    for (const move of knightMoves) {
      const newIndex = squareIndex + move;
      const newRank = Math.floor(newIndex / 8);
      const newFile = newIndex % 8;

      // Check if the move is within the board boundaries and does not wrap around
      if (newIndex >= 0 && newIndex < 64 &&
          (Math.abs(currentRank - newRank) === 1 && Math.abs(currentFile - newFile) === 2 ||
           Math.abs(currentRank - newRank) === 2 && Math.abs(currentFile - newFile) === 1)) {

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
  } else if (pieceType === Piece.Queen) {
    const queenDirections = [-9, -8, -7, -1, 1, 7, 8, 9];

    for (const direction of queenDirections) {
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
  } else if (pieceType === Piece.King) {
    const kingMoves = [-9, -8, -7, -1, 1, 7, 8, 9];

    for (const move of kingMoves) {
      const newIndex = squareIndex + move;
      if (newIndex >= 0 && newIndex < 64) {
        const targetPiece = chessBoard[newIndex];
        if (targetPiece === null || (targetPiece & 24) !== pieceColor) {
          legalMoves.push(newIndex);
        }
      }
    }

    // Castling
    if (pieceColor === Piece.White) {
      if (castlingRights.includes('K') && chessBoard[61] === null && chessBoard[62] === null) {
        legalMoves.push(62);
      }
      if (castlingRights.includes('Q') && chessBoard[57] === null && chessBoard[58] === null && chessBoard[59] === null) {
        legalMoves.push(58);
      }
    } else {
      if (castlingRights.includes('k') && chessBoard[5] === null && chessBoard[6] === null) {
        legalMoves.push(6);
      }
      if (castlingRights.includes('q') && chessBoard[1] === null && chessBoard[2] === null && chessBoard[3] === null) {
        legalMoves.push(2);
      }
    }
  }

  return legalMoves;
};