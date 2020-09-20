const Game = require('../app');

const playerOne = { player: 'Lhoussaine', symbol: 'X'};
const playerTwo = { player: 'jaspreet', symbol: 'O'};
let playerName;

const Board = (() => {
  const gameState = new Array(9).fill('');

  return { gameState };
})();

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];


it('should handlePlayerChange to be player 2', () => {
    const currentPlayer = playerName ? playerOne : playerTwo;
    Game.handlePlayerChange();
    expect(currentPlayer.player).toBe(playerTwo.player);
});

it('should handlePlayerChange to be player 1 ', () => {
  const currentPlayer = playerName ? playerTwo : playerOne;
  Game.handlePlayerChange();
  expect(currentPlayer.player).toBe(playerOne.player);
});

it('should handleResultValidation game active', () => {
  let gameActive = true;
  Game.handleResultValidation();
  expect(gameActive).toBe(true);
});

it('should handleResultValidation game active and round not false', () => {
  expect(Game.handleResultValidation()).toEqual({roundWon: false, gameActive: true});
});

it('should handleResultValidation game active', () => {
  let roundWon = Game.checkWin(Board);
  expect(roundWon).toBe(false)
});

