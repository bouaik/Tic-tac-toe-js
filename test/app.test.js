import Game from '../app'

const player1Name = { player: 'frank', token: 'X', imgLink: '#' };
const player2Name = { player: 'jaspreet', token: 'O', imgLink: '#' };
let playerName;


it('should handlePlayerChange', () => {
    const currentPlayer = playerName ? player1Name : player2Name;
    Game.handlePlayerChange();
    expect(currentPlayer.player).toBe(player2Name.player);
  });