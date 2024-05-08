import React, { useState } from "react";
import "./TicTacToe.css";

// constants
const initalBoard = new Array(9).fill(null);
const winningCases = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const Cell = ({ mark, disabled, onClick }) => {
  return (
    <button class="cell" disabled={disabled} onClick={onClick}>
      {mark}
    </button>
  );
};

const TicTacToe = () => {
  // current user
  const [currentUser, setCurrentUser] = useState("X");

  // board
  const [board, setBoard] = useState(initalBoard);

  const handleClick = (index) => {
    // update board
    const newBoard = [...board];
    newBoard[index] = currentUser;
    setBoard(newBoard);

    // update current user
    setCurrentUser(currentUser === "X" ? "O" : "X");
  };

  const handleReset = () => {
    setBoard(initalBoard);
  };

  const checkWinner = () => {
    for (const [a, b, c] of winningCases) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    if (board.every((cell) => cell !== null)) {
      return "draw";
    }

    return null;
  };

  const getStatus = () => {
    const winner = checkWinner();
    if (winner) {
      return winner === "draw" ? "It's a draw!" : `${winner} wins!`;
    }
    return `Next player: ${currentUser}`;
  };

  const winner = checkWinner();

  return (
    <div class="tic-tac-toe">
      <h1>Tic Tac Toe</h1>
      <h4>{getStatus()}</h4>
      <div class="board">
        {board.map((cell, index) => (
          <Cell
            mark={board[index]}
            disabled={board[index] || winner}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default TicTacToe;
