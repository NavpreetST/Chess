

export const LoadPositionFromFen = (fen) =>{
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

const pieceTypeFromSymbol = {

        'k': Piece.King,
        'q': Piece.Queen,
        'r': Piece.Rook,
        'b': Piece.Bishop,
        'n': Piece.Knight,
        'p': Piece.Pawn
    }
    
    

let chessBoard = Array(64).fill(null)

let file = 0
let rank = 7
const fenBoard = fen.split('')
let pieceIndex = 0

fenBoard.forEach(peace => {
  // Your code inside the loop goes here.
  // 'piece' is a variable that will hold each item from 'fenBoard'.
  
  if(peace == '/'){
      file = 0
      rank--
  }else{
      if(isNaN(peace)){
          pieceIndex = 0
          let kleinPiece = peace.toLowerCase()
          const type = pieceTypeFromSymbol[kleinPiece]
          const color = peace === kleinPiece ? Piece.Black : Piece.White
          const finalPieceCode = type | color
        //   console.log(pieceColor)
          chessBoard[rank * 8 + file] = finalPieceCode;
          file++
      }else{
          
          file+= Number(peace)
          
      }
      
    }
});
// console.log(chessBoard)
return {chessBoard};
}