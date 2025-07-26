import {React, useEffect, useState} from 'react'
import './Board.css'
import Chess from '../components/ChessBoard'
import { LoadPositionFromFen } from '../components/logic2'

const Board = () => {
  const [chessBoard, setChessBoard] = useState(Array(64).fill(null))
  const startingFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"
  let Position = null
  useEffect(() => {
    Position = LoadPositionFromFen(startingFen)
    setChessBoard(Position)
    
    
    
  },[Position])
  


return (
  <div className='main-board'>
      
      {/* {kdt} */}
      <Chess chessBoard={chessBoard} />
      
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