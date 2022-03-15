import React, { useState } from "react";
import './styles/Board.css';
import Square from "./Square";
import { isLabelWithInternallyDisabledControl } from "@testing-library/user-event/dist/utils";

function Board() {

    var status = "Next player: X";
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setNext] = useState(true);

    function testWinner(squares) {
      const posn = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ]

      for (let i = 0; i < posn.length; i++) {
        const [x, y, z] = posn[i];
        if (squares[x] && squares[x] === squares[y] && squares[x] === squares[z]) {
          return squares[x];
        }
      }

      return null;
    }

    function handleClick(i) {
      const curr_squares = squares.slice();
      if (testWinner(curr_squares) || curr_squares[i]) {
        return;
      }
      
      curr_squares[i] = xIsNext ? 'X': 'O';
      setSquares(curr_squares);
      xIsNext = setNext(!xIsNext);
    }

    function renderSquare(i) {
      return (
        <Square 
          value = {squares[i]}
          onClick = {() => handleClick(i)}
      />);
    }

    
    const winner = testWinner(squares);
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (xIsNext ? 'X': 'O');
    }
    

    return ( 
        <div>
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
          <div className="status">{status}</div>
        </div>
    )
}

export default Board;