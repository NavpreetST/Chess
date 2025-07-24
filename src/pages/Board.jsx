import {React, useState} from 'react'
import './Board.css'
import Chess from '../components/ChessBoard'


const Board = () => {
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
  const [chessBoard, setChessBoard] = useState(Array(64).fill(null))

  const handlePiece =  () =>{
    setChessBoard(chessBoard.map((piece, index) =>{

    }
    ))
  }
    
  return (
    <div className='main-board'>
      <Chess chessBoard={chessBoard} />
    </div>
  )
}

export default Board