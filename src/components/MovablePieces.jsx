import React, { useState } from 'react';
import Chess from './ChessBoard';
import { getLegalMoves } from './moveLogic';

const MovablePieces = ({ chessBoard, setChessBoard }) => {
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [legalMoves, setLegalMoves] = useState([]);

  const handleSquareClick = (index) => {
    if (selectedPiece === null) {
      if (chessBoard[index] !== null) {
        setSelectedPiece(index);
        setLegalMoves(getLegalMoves(chessBoard, index));
      }
    } else {
      if (index === selectedPiece) {
        setSelectedPiece(null);
        setLegalMoves([]);
      } else {
        if (legalMoves.includes(index)) {
          const newChessBoard = [...chessBoard];
          newChessBoard[index] = newChessBoard[selectedPiece];
          newChessBoard[selectedPiece] = null;
          setChessBoard(newChessBoard);
          setSelectedPiece(null);
          setLegalMoves([]);
        } else {
          setSelectedPiece(null);
          setLegalMoves([]);
        }
      }
    }
  };

  return (
    <div>
      <Chess
        chessBoard={chessBoard}
        onSquareClick={handleSquareClick}
        selectedPiece={selectedPiece}
        legalMoves={legalMoves}
      />
    </div>
  );
};

export default MovablePieces;
