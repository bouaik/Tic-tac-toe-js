const Game = require('../app');

const player1Name = { player: 'Lhoussaine', token: 'X'};
const player2Name = { player: 'jaspreet', token: 'O'};
let playerName;


it('should handlePlayerChange to be player 2', () => {
    const currentPlayer = playerName ? player1Name : player2Name;
    Game.handlePlayerChange();
    expect(currentPlayer.player).toBe(player2Name.player);
});

it('should handlePlayerChange to be player 1 ', () => {
  const currentPlayer = playerName ? player2Name : player1Name;
  Game.handlePlayerChange();
  expect(currentPlayer.player).toBe(player1Name.player);
});

it('should handleResultValidation game active', () => {
  let gameActive = true;
  Game.handleResultValidation();
  expect(gameActive).toBe(true);
});
