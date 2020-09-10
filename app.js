const statusDisplay = document.querySelector('.game--status');
const board = document.querySelector('.board');
const form = document.getElementById('form');
const alert = document.querySelector('.alert');



function Player(name, symbol) {
  
  return { name, symbol }
}





const Board =  (() => {
  let gameState = new Array(9).fill('');

  return {gameState}
})();





const Game = (() => {
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
  let gameActive = true;
  let playerOne = Player('', 'X');
  let playerTwo = Player('', 'O');
  let currentPlayer;
  let currentMove = playerOne.symbol;

  const handleCellClick = (clickedCellEvent) => {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(
      clickedCell.getAttribute('data-cell-index'), 10,
    );
    if (Board.gameState[clickedCellIndex] !== '' || !gameActive) {
      return;
    }
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
  }
  
  
  
  
  const btnStart = document.querySelector('.game--start');
  btnStart.addEventListener('click', (e) => {
    e.preventDefault();
  
    const playerOneName = document.querySelector('#fplayer').value;
    const playerTwoName = document.querySelector('#splayer').value;
  
    if (playerOneName === '' || playerTwoName === '') {
      alert.classList.remove('d-none');
    } else {
      alert.classList.add('d-none');
      form.classList.add('d-hidden');
      board.classList.remove('d-hidden');
      Game.playerOne.name = playerOneName;
      Game.playerTwo.name = playerTwoName;
  
      statusDisplay.innerHTML = domContent.currentPlayerTurn(Game.playerOne.name);
  
      document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
    }
  });
  
  
  
  
  
  
  function handleCellPlayed(clickedCell, clickedCellIndex) {
    Board.gameState[clickedCellIndex] = Game.currentMove;
    clickedCell.innerHTML = Game.currentMove;
  }
  function handlePlayerChange() {
    Game.currentPlayer = Game.currentPlayer === Game.playerTwo.name ? Game.playerOne.name : Game.playerTwo.name;
    Game.currentMove = Game.currentMove === Game.playerOne.symbol ? Game.playerTwo.symbol : Game.playerOne.symbol;
    statusDisplay.innerHTML = domContent.currentPlayerTurn(Game.currentPlayer);
  }
  
  
  function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i += 1) {
      const winCondition = Game.winningConditions[i];
      const a = Board.gameState[winCondition[0]];
      const b = Board.gameState[winCondition[1]];
      const c = Board.gameState[winCondition[2]];
      if (a === '' || b === '' || c === '') {
        continue;  // eslint-disable-line
      }
      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }
    if (roundWon) {
      statusDisplay.innerHTML = domContent.winningMessage();
      gameActive = false;
      return;
    }
    const roundDraw = !Board.gameState.includes('');
    if (roundDraw) {
      statusDisplay.innerHTML = domContent.drawMessage();
      gameActive = false;
      return;
    }
    handlePlayerChange();
  }
  
  function handleRestartGame() {
    gameActive = true;
    Game.currentPlayer = Game.playerOne.name;
    Board.gameState = new Array(9).fill('');
    statusDisplay.innerHTML = domContent.currentPlayerTurn();
    /* eslint-disable no-return-assign */
    document.querySelectorAll('.cell')
      .forEach(cell => cell.innerHTML = '');
    /* eslint-enable no-return-assign */
    form.classList.remove('d-hidden');
    board.classList.add('d-hidden');
  
    document.querySelector('#fplayer').value = '';
    document.querySelector('#splayer').value = '';
  
  
  }
  return {playerOne, playerTwo, currentPlayer, currentMove, winningConditions, handleRestartGame}
})();






const domContent = (() => {

  const currentPlayerTurn = (cp) => `It's ${cp}'s turn`;
  const winningMessage = () => `Player ${Game.currentPlayer} has won!`;
  const drawMessage = () => 'Game ended in a draw!';

  return { currentPlayerTurn, winningMessage, drawMessage }

})();







/* eslint no-use-before-define: ["error", { "functions": false }] */


document.querySelector('.game--restart').addEventListener('click', Game.handleRestartGame);