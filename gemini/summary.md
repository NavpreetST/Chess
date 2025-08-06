# Project Summary

This is a React-based chess application. The goal is to create an interactive chessboard where users can play chess. The project is built with Vite and uses React for the frontend.

## Current State

- The application renders a chessboard using React components.
- The initial board position is loaded from a FEN (Forsyth-Edwards Notation) string, now including castling rights and en passant target square.
- There is a form to input a FEN string and update the board.
- **UI Interactivity**:
    - Highlighting of selected pieces.
    - Highlighting of legal moves for the selected piece.
- **Piece Movement Logic**:
    - Basic piece movement for all pieces (pawn, knight, rook, bishop, queen, king).
    - Castling logic (including moving the rook).
    - En passant logic (including removing the captured pawn).

## Future Goals

- Implement legal move validation (beyond basic piece movement rules).
- Add a database to store games and user data.
- Implement online multiplayer functionality.
- Create user accounts and profiles.