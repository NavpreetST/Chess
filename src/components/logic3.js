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
    
    
// const fen = "4n2K/3r4/2bB4/3P4/1bk1B1P1/2P1pN2/1p2p3/3n4"
let chessBoard = Array(64).fill(null)

let rank = 7
const rows = fen.split('/')
console.log(rows)
const rows2 = fen.split('')
console.log(rows2)
let pieceIndex = 0


    console.log("this is inside the loop for each time")
for (const rowString of rows) {
    console.log(rowString )
     let file = 0
      
    for (const char of rowString ){
    console.log(`Processing char: '${char}' --- Rank: ${rank}, File: ${file}`);
        
    // let file = 0
  // Your code inside the loop goes here.
  // 'piece' is a variable that will hold each item from 'rows'.
  
  if(char == ' '){
      return
  }else{
      if(isNaN(char)){
          pieceIndex = 0
          
          let kleinPiece = char.toLowerCase()
          const type = pieceTypeFromSymbol[kleinPiece]
          const color = char === kleinPiece ? Piece.Black : Piece.White
          const finalPieceCode = type | color
        //   console.log(pieceColor)
          chessBoard[rank * 8 + file ] = finalPieceCode;
          file++
      }else{
          
          file+= Number(char)
          
      }
      
      
  }
    }
    rank--
};
return chessBoard;

}

// console.log(rows)
// console.log(pieceTypeFromSymbol['p'])
// console.log(Piece.King | Piece.White)
// console.log(chessBoard)
// console.log(chessBoard[28])