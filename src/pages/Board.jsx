import {React, useEffect, useState} from 'react'
import './Board.css'
import Chess from '../components/ChessBoard'
import { LoadPositionFromFen } from '../components/logic3'
import { getLegalMoves } from '../components/legalMoves'

const Board = () => {
  const [chessBoard, setChessBoard] = useState(Array(64).fill(null))
  const startingFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"

  const [activeFen, setActiveFen]= useState(startingFen)
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [legalMoves, setLegalMoves] = useState([]);

  const handleSquareClick = (squareIndex) => {
    if (selectedSquare === null) {
      const moves = getLegalMoves(squareIndex, chessBoard);
      if (moves.length > 0) {
        setSelectedSquare(squareIndex);
        setLegalMoves(moves);
      }
    } else {
      if (legalMoves.includes(squareIndex)) {
        const newChessBoard = [...chessBoard];
        newChessBoard[squareIndex] = newChessBoard[selectedSquare];
        newChessBoard[selectedSquare] = null;
        setChessBoard(newChessBoard);
      }
      setSelectedSquare(null);
      setLegalMoves([]);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const fenStr = activeFen
    setChessBoard(LoadPositionFromFen(fenStr))
  }


  useEffect(() => {
    setChessBoard(LoadPositionFromFen(activeFen))
    
    
    
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