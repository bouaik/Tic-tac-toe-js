const domContent = (() => { // eslint-disable-line
  const currentPlayerTurn = (cp) => `It's ${cp}'s turn`;
  const winningMessage = (currentPlayer) => `Player ${currentPlayer} has won!`;
  const drawMessage = () => 'Game ended in a draw!';
  const statusDisplay = document.querySelector('.game--status');
  const board = document.querySelector('.board');
  const form = document.getElementById('form');
  const alert = document.querySelector('.alert');

  const showBoard = () => {
    alert.classList.add('d-none');
    form.classList.add('d-hidden');
    board.classList.remove('d-hidden');
  };

  const removeBoard = () => {
    form.classList.remove('d-hidden');
    board.classList.add('d-hidden');
  };

  const showAlert = () => alert.classList.remove('d-none');

  const clearFields = () => {
    document.querySelector('#fplayer').value = '';
    document.querySelector('#splayer').value = '';
  };

  const checkchinking = (cb) => {
    document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', cb));
  }
  


  return {
    currentPlayerTurn,
    winningMessage,
    drawMessage,
    showBoard,
    statusDisplay,
    showAlert,
    removeBoard,
    clearFields,
    checkchinking
  };
})();
