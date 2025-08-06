import {React, useEffect, useState} from 'react'
import './Board.css'
import Chess from '../components/ChessBoard'
import { LoadPositionFromFen } from '../components/logic3'
import { getLegalMoves, Piece } from '../components/legalMoves'

const Board = () => {
  const [chessBoard, setChessBoard] = useState(Array(64).fill(null))
  const startingFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

  const [activeFen, setActiveFen]= useState(startingFen)
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [legalMoves, setLegalMoves] = useState([]);
  const [castlingRights, setCastlingRights] = useState("");
  const [enPassantTarget, setEnPassantTarget] = useState(null);

  const handleSquareClick = (squareIndex) => {
    if (selectedSquare === null) {
      const moves = getLegalMoves(squareIndex, chessBoard, castlingRights, enPassantTarget);
      if (moves.length > 0) {
        setSelectedSquare(squareIndex);
        setLegalMoves(moves);
      }
    } else {
      if (legalMoves.includes(squareIndex)) {
        const newChessBoard = [...chessBoard];
        // En Passant
        if ((newChessBoard[selectedSquare] & 7) === 2 && squareIndex === enPassantTarget) {
          const capturedPawnIndex = enPassantTarget + ( (newChessBoard[selectedSquare] & 8) === 8 ? 8 : -8);
          newChessBoard[capturedPawnIndex] = null;
        }

        // Castling logic
        if (newChessBoard[selectedSquare] === 9 && Math.abs(selectedSquare - squareIndex) === 2) {
          if (squareIndex === 62) {
            newChessBoard[61] = newChessBoard[63];
            newChessBoard[63] = null;
          } else if (squareIndex === 58) {
            newChessBoard[59] = newChessBoard[56];
            newChessBoard[56] = null;
          }
        } else if (newChessBoard[selectedSquare] === 17 && Math.abs(selectedSquare - squareIndex) === 2) {
          if (squareIndex === 6) {
            newChessBoard[5] = newChessBoard[7];
            newChessBoard[7] = null;
          } else if (squareIndex === 2) {
            newChessBoard[3] = newChessBoard[0];
            newChessBoard[0] = null;
          }
        }

        const movedPiece = newChessBoard[selectedSquare];
        const isPawn = (movedPiece & 7) === Piece.Pawn;
        const isWhite = (movedPiece & 24) === Piece.White;

        // Handle en passant target
        if (isPawn && Math.abs(selectedSquare - squareIndex) === 16) {
          setEnPassantTarget(selectedSquare + (isWhite ? -8 : 8));
        } else {
          setEnPassantTarget(null);
        }

        // Handle pawn promotion
        if (isPawn && ((isWhite && Math.floor(squareIndex / 8) === 0) || (!isWhite && Math.floor(squareIndex / 8) === 7))) {
          newChessBoard[squareIndex] = isWhite ? (Piece.Queen | Piece.White) : (Piece.Queen | Piece.Black);
        } else {
          newChessBoard[squareIndex] = movedPiece;
        }
        newChessBoard[selectedSquare] = null;
        setChessBoard(newChessBoard);
      }
      setSelectedSquare(null);
      setLegalMoves([]);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const { chessBoard: newBoard, castlingRights: newCastlingRights, enPassantTarget: newEnPassantTarget } = LoadPositionFromFen(activeFen);
    setChessBoard(newBoard);
    setCastlingRights(newCastlingRights);
    setEnPassantTarget(newEnPassantTarget);
  }


  useEffect(() => {
    const { chessBoard: newBoard, castlingRights: newCastlingRights, enPassantTarget: newEnPassantTarget } = LoadPositionFromFen(activeFen);
    setChessBoard(newBoard);
    setCastlingRights(newCastlingRights);
    setEnPassantTarget(newEnPassantTarget);
    
    
    
  },[])
  


return (
  <div>

  <div className='main-board'>
      
      {/* {kdt} */}
      <Chess 
        chessBoard={chessBoard} 
        onSquareClick={handleSquareClick}
        selectedSquare={selectedSquare}
        legalMoves={legalMoves}
      />

      
    </div>
      <form onSubmit={handleSubmit}>
        <input type='text' name='fen' value = {activeFen} onChange={(e) => setActiveFen(e.target.value)}/>
        <input type='submit' value='Submit'/>
      </form>
  </div>
  )
}

export default Board
// const Piece = {
  //   None : 0, 
  //   King : 1,
  //   Pawn : 2,
  //   Knight : 3,
  //   Bishop : 4,
  //   Rook : 5,
  //   Queen : 6,
  
  //   White : 8, 
  //   Black : 16
  // }
  // const updateBoard = () =>{
    //   const newChessBoard = [...chessBoard];
    //   newChessBoard[19] = Piece.Queen | Piece.White;
    //   setChessBoard(newChessBoard);
    //   console.log(newChessBoard)
    // }
    // setChessBoard(prevChessBoard => {
      //   const newChessBoard = [...prevChessBoard];
      //   newChessBoard[19] = Piece.Queen | Piece.White;
      //   return newChessBoard;
      // });