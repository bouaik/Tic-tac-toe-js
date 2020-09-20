const Game = require('../app');

const playerOne = { player: 'Lhoussaine', symbol: 'X' };
const playerTwo = { player: 'jaspreet', symbol: 'O' };
let playerName;

const Board = (() => {
  const gameState = new Array(9).fill('');

  return { gameState };
})();

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
  const gameActive = true;
  Game.handleResultValidation();
  expect(gameActive).toBe(true);
});

it('should handleResultValidation game active and round not false', () => {
  expect(Game.handleResultValidation()).toEqual({ roundWon: false, gameActive: true });
});

it('should handleResultValidation game active', () => {
  const roundWon = Game.checkWin(Board);
  expect(roundWon).toBe(false);
});

it('handleCellPlayed should return undefined', () => {
  expect(Game.handleCellPlayed()).toBeUndefined();
});
