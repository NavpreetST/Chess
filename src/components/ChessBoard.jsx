import React, { useEffect } from 'react'
import '../pages/Board.css'





    

const Square = ({color}) => {
    const squareDimension = "77px"
    return (

    <div className='square' style={color ? { backgroundColor: "black", height: squareDimension, width: squareDimension} : { backgroundColor: "white", height: squareDimension, width: squareDimension}}>
        


    </div>)
}

const Chess = ({chessBoard}) => {
    
    console.log(chessBoard)
    const boardVisual = []; 



    for (let file = 0; file < 8; file++) {
        

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
            //   piece={chessBoard[squareIndex]}
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