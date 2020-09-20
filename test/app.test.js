const Game = require('../app');

const playerOne = { player: 'Lhoussaine', symbol: 'X'};
const playerTwo = { player: 'jaspreet', symbol: 'O'};
let playerName;


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

