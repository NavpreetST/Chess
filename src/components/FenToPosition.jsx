import React from 'react'

const FenToPosition = () => {
    const startingFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"
      
      let Position = null
      useEffect(() => {
        Position = LoadPositionFromFen(startingFen)
        setChessBoard(Position)
      console.log(chessBoard)
      console.log(Position)
    
    
    },[Position])

  return (
    <div>
        

    </div>
  )
}

export default FenToPosition