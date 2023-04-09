"use strict";

// brings in the assert module for unit testing
const assert = require("assert");
// brings in the readline module to access the command line
const readline = require("readline");
// use the readline module to print out to the command line
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// creates and empty "board" for the user to see where marks can be placed.
// using let because the variable is expected to change with more 'X's and 'O's to add
let board = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "],
];

// assigns the first mark as 'X'
// using let because the variable is expected to change from 'X' to 'O' and back
let playerTurn = "X";

// is a function that print the current status of the board using the variable - board
const printBoard = () => {
  console.log(" ");
  console.log("   0  1  2");
  console.log("0 " + board[0].join(" | "));
  console.log("  ---------");
  console.log("1 " + board[1].join(" | "));
  console.log("  ---------");
  console.log("2 " + board[2].join(" | "));
  console.log(" ");
};

const horizontalWin = () => {
  // Your code here to check for horizontal wins
  if (
    (board[0][0] == "X" && board[0][1] == "X" && board[0][2] == "X") ||
    (board[0][0] == "O" && board[0][1] == "O" && board[0][2] == "O")
  ) {
    return true;
  } else if (
    (board[1][0] == "X" && board[1][1] == "X" && board[1][2] == "X") ||
    (board[1][0] == "O" && board[1][1] == "O" && board[1][2] == "O")
  ) {
    return true;
  } else if (
    (board[2][0] == "X" && board[2][1] == "X" && board[2][2] == "X") ||
    (board[2][0] == "O" && board[2][1] == "O" && board[2][2] == "O")
  ) {
    return true;
  }
};

const verticalWin = () => {
  // Your code here to check for vertical wins
  if (
    (board[0][0] == "X" && board[1][0] == "X" && board[2][0] == "X") ||
    (board[0][0] == "O" && board[1][0] == "O" && board[2][0] == "O")
  ) {
    return true;
  } else if (
    (board[0][1] == "X" && board[1][1] == "X" && board[2][1] == "X") ||
    (board[0][1] == "O" && board[1][1] == "O" && board[2][1] == "O")
  ) {
    return true;
  } else if (
    (board[0][2] == "X" && board[1][2] == "X" && board[2][2] == "X") ||
    (board[0][2] == "O" && board[1][2] == "O" && board[2][2] == "O")
  ) {
    return true;
  }
};

const diagonalWin = () => {
  // Your code here to check for diagonal wins
  if (
    (board[0][0] == "X" && board[1][1] == "X" && board[2][2] == "X") ||
    (board[0][0] == "O" && board[1][1] == "O" && board[2][2] == "O")
  ) {
    return true;
  } else if (
    (board[2][2] == "X" && board[1][1] == "X" && board[0][0] == "X") ||
    (board[2][2] == "O" && board[1][1] == "O" && board[0][0] == "O")
  ) {
    return true;
  }
};
const catWin = () => {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] === " ") {
        return false; // There's still an empty cell, so it's not a cat win
      }
    }
  }
  return true;
};
const checkForWin = () => {
  // Your code here call each of the check for types of wins
  if (horizontalWin() || verticalWin() || diagonalWin()) {
    if (playerTurn == "O") {
      playerTurn = "X";
    } else {
      playerTurn = "O";
    }
    console.log("Player " + playerTurn + " has won the game!");

    return true;
  } else if (catWin()) {
    console.log("It's a Tie!");
    return true;
  } else {
    return false;
  }
};

const ticTacToe = (row, column) => {
  // Your code here to place a marker on the board
  // then check for a win

  let boardData = board[row][column];

  if (board[row][column] == " ") {
    if (playerTurn == "X") {
      board[row][column] = playerTurn;
      console.log(
        "Placing an " +
          playerTurn +
          " at location: " +
          row +
          ", " +
          column +
          "."
      );
      printBoard();
      playerTurn = "O";
    } else {
      board[row][column] = playerTurn;
      console.log(
        "Placing an " +
          playerTurn +
          " at location: " +
          row +
          ", " +
          column +
          "."
      );
      printBoard();
      playerTurn = "X";
    }
  } else {
    console.log(
      "The location: " +
        row +
        ", " +
        column +
        " is already filled with an " +
        boardData +
        ". \nPlease choose another location."
    );
    printBoard();
  }
};

const getPrompt = () => {
  let rowStr = "";
  let columnStr = "";
  if (checkForWin()) {
    //Getting previous player turn for win condition.

    resetGame();
  } else {
    console.log("It's Player " + playerTurn + "'s turn.");
    getRowValue((row) => {
      rowStr = row;
      getColumnValue((column) => {
        columnStr = column;
        ticTacToe(rowStr, columnStr);
        getPrompt();
      });
    });
  }
};

const getRowValue = (callback) => {
  rl.question("row: ", (row) => {
    if (/^[0-2]$/.test(row)) {
      callback(row);
    } else {
      console.log("Not a valid entry. Input can only be 0, 1, or 2.");
      getRowValue(callback);
    }
  });
};

const getColumnValue = (callback) => {
  rl.question("column: ", (column) => {
    if (/^[0-2]$/.test(column)) {
      callback(column);
    } else {
      console.log("Not a valid entry. Input can only be 0, 1, or 2.");
      getColumnValue(callback);
    }
  });
};

const resetGame = () => {
  console.log("\nTicTacToe has been reset. Here is your new game!");
  board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ];

  playerTurn = "X";
  printBoard();
  getPrompt();

};

// Unit Tests
// You use them run the command: npm test main.js
// to close them ctrl + C
if (typeof describe === "function") {
  describe("#ticTacToe()", () => {
    it("should place mark on the board", () => {
      ticTacToe(1, 1);
      assert.deepEqual(board, [
        [" ", " ", " "],
        [" ", "X", " "],
        [" ", " ", " "],
      ]);
    });
    it("should alternate between players", () => {
      ticTacToe(0, 0);
      assert.deepEqual(board, [
        ["O", " ", " "],
        [" ", "X", " "],
        [" ", " ", " "],
      ]);
    });
    it("should check for vertical wins", () => {
      board = [
        [" ", "X", " "],
        [" ", "X", " "],
        [" ", "X", " "],
      ];
      assert.equal(verticalWin(), true);
    });
    it("should check for horizontal wins", () => {
      board = [
        ["X", "X", "X"],
        [" ", " ", " "],
        [" ", " ", " "],
      ];
      assert.equal(horizontalWin(), true);
    });
    it("should check for diagonal wins", () => {
      board = [
        ["X", " ", " "],
        [" ", "X", " "],
        [" ", " ", "X"],
      ];
      assert.equal(diagonalWin(), true);
    });
    it("should detect a win", () => {
      ticTacToe(0, 0);
      ticTacToe(0, 1);
      ticTacToe(1, 1);
      ticTacToe(0, 2);
      ticTacToe(2, 2);
      assert.equal(checkForWin(), true);
    });
  });
} else {
  printBoard();
  getPrompt();
}
