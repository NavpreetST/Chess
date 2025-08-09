export const getLegalMoves = (chessBoard, selectedPiece) => {
  const legalMoves = [];
  const piece = chessBoard[selectedPiece];

  if (piece === null) {
    return legalMoves;
  }

  const isWhite = piece < 16; // Assuming white pieces have codes < 16

  // Pawn moves
  if ((piece & 7) === 2) { // Pawn
    const direction = isWhite ? -1 : 1;
    const startRow = isWhite ? 6 : 1;
    const oneStep = selectedPiece + 8 * direction;
    const twoSteps = selectedPiece + 16 * direction;

    // One step forward
    if (chessBoard[oneStep] === null) {
      legalMoves.push(oneStep);
    }

    // Two steps forward from starting position
    if (
      (isWhite && Math.floor(selectedPiece / 8) === startRow) ||
      (!isWhite && Math.floor(selectedPiece / 8) === startRow)
    ) {
      if (chessBoard[oneStep] === null && chessBoard[twoSteps] === null) {
        legalMoves.push(twoSteps);
      }
    }
  }

  return legalMoves;
};
