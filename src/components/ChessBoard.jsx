import React, { useEffect } from 'react'
import '../pages/Board.css'
import whitePawn from '../assets/Chess_plt45.png'
import whiteRook from '../assets/Chess_rlt45.png'
import whiteKnight from '../assets/Chess_nlt45.png'
import whiteBishop from '../assets/Chess_blt45.png'
import whiteQueen from '../assets/Chess_qlt45.png'
import whiteKing from '../assets/Chess_klt45.png'
import blackPawn from '../assets/Chess_pdt45.png'
import blackRook from '../assets/Chess_rdt45.png'
import blackKnight from '../assets/Chess_ndt45.png'
import blackBishop from '../assets/Chess_bdt45.png'
import blackQueen from '../assets/Chess_qdt45.png'
import blackKing from '../assets/Chess_kdt45.png'
    
    






    
const numberToImage = (index)=>{
switch (index) {
    case 9:
        return whiteKing
    case 10:       
        return whitePawn
    case 11:
        return whiteKnight
    case 12:
        return whiteBishop
    case 13:
        return whiteRook
    case 14:
        return whiteQueen
    case 17:
        return blackKing
    case 18:
        return blackPawn
    case 19:
        return blackKnight
    case 20:
        return blackBishop
    case 21:
        return blackRook
    case 22:
        return blackQueen
    default:
        return null;
}
}

const Square = ({color, piece}) => {
    const squareDimension = "77px"
    const imageSrc = numberToImage(piece)
    
    return (

    <div className='square' style={color ? { backgroundColor: "purple", height: squareDimension, width: squareDimension} : { color: "black", backgroundColor: "white", height: squareDimension, width: squareDimension}}>
        <h1 style={{color: "orange"}}>
        {imageSrc && <img src = {imageSrc} width = "70%" height = "100%" alt = "chess piece"  />}

        </h1>


    </div>)

    }
const Chess = ({chessBoard}) => {
    
    console.log(chessBoard)
    const boardVisual = []; 



    for (let file = 7; file >= 0; file--) {
        

        const squaresInRow = []
        for(let rank = 0; rank < 8; rank++){
            // console.log(chessBoard[2])
            // console.log(`File: ${file}, Rank: ${rank}`)
            // console.log(boardVisual)
            const squareIndex = file * 8 + rank;
            const data = chessBoard[squareIndex];
        //   console.log(data);

          const isLightSquare = (file + rank) % 2 !== 0;

          squaresInRow.push(
            <Square
              key={squareIndex} // <-- Add the unique and stable key!
              color={isLightSquare}
              // Later, you will get the piece from your `chessBoard` prop:
              piece={chessBoard[squareIndex]}
            />
          );
        }
            boardVisual.push(<div key={file} className="board-row">{squaresInRow}</div>);
        }
            return (
    <div className="chessboard">
      {boardVisual}
    </div>
  );

            





    return (
        <div>
            
            <Square color={color}/>

        </div>
    )
    


  
  
}

export default Chess