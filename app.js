const statusDisplay = document.querySelector('.game--status');
const board = document.querySelector('.board');
const form = document.getElementById('form');
const alert = document.querySelector('.alert');
let gameActive = true;

function Player(name, symbol) {
  this.name = name;
  this.symbol = symbol;
}

const playerOne = new Player('', 'X');
const playerTwo = new Player('', 'O');


const currentPlayerTurn = (cp) => `It's ${cp}'s turn`;

let gameState = ['', '', '', '', '', '', '', '', ''];

/* eslint no-use-before-define: ["error", { "functions": false }] */

function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(
    clickedCell.getAttribute('data-cell-index'), 10,
  );
  if (gameState[clickedCellIndex] !== '' || !gameActive) {
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
    playerOne.name = playerOneName;
    playerTwo.name = playerTwoName;

    statusDisplay.innerHTML = currentPlayerTurn(playerOne.name);

    document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
  }
});


let currentPlayer;
let currentMove = playerOne.symbol;

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => 'Game ended in a draw!';

function handleCellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentMove;
  clickedCell.innerHTML = currentMove;
}
function handlePlayerChange() {
  currentPlayer = currentPlayer === playerTwo.name ? playerOne.name : playerTwo.name;
  currentMove = currentMove === playerOne.symbol ? playerTwo.symbol : playerOne.symbol;
  statusDisplay.innerHTML = currentPlayerTurn(currentPlayer);
}
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

function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i <= 7; i += 1) {
    const winCondition = winningConditions[i];
    const a = gameState[winCondition[0]];
    const b = gameState[winCondition[1]];
    const c = gameState[winCondition[2]];
    if (a === '' || b === '' || c === '') {
      continue;  // eslint-disable-line
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    statusDisplay.innerHTML = winningMessage();
    gameActive = false;
    return;
  }
  const roundDraw = !gameState.includes('');
  if (roundDraw) {
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    return;
  }
  handlePlayerChange();
}

function handleRestartGame() {
  gameActive = true;
  currentPlayer = playerOne.name;
  gameState = ['', '', '', '', '', '', '', '', ''];
  statusDisplay.innerHTML = currentPlayerTurn();
  /* eslint-disable no-return-assign */
  document.querySelectorAll('.cell')
    .forEach(cell => cell.innerHTML = '');
  /* eslint-enable no-return-assign */
  form.classList.remove('d-hidden');
  board.classList.add('d-hidden');

  document.querySelector('#fplayer').value = '';
  document.querySelector('#splayer').value = '';
}
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);