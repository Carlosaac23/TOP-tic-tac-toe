(() => {
  const players = {
    player1: 'X',
    player2: 'O',
  };

  let currentPlayer = players.player1;

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const squares = document.getElementsByClassName('square');

  const restartBtn = document.getElementById('restart-btn');
  restartBtn.addEventListener('click', restartGame);

  const messageContainer = document.getElementById('message-container');
  const message = document.createElement('p');
  message.classList.add('message');
  messageContainer.appendChild(message);

  for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', () => handleMove(i));

    setMessage("X's turn!");
  }

  function handleMove(i) {
    if (squares[i].textContent !== '') return;

    squares[i].textContent = currentPlayer;

    if (checkWin(currentPlayer)) {
      return setMessage(`Game over! ${currentPlayer} wins!`);
    }

    if (checkTie()) {
      return setMessage('Game is tied!');
    }

    switchTurn();
  }

  function switchTurn() {
    currentPlayer =
      currentPlayer === players.player1 ? players.player2 : players.player1;

    setMessage(`${currentPlayer}'s turn!`);
  }

  function checkWin(currentPlayer) {
    return winningCombinations.some(([a, b, c]) => {
      return (
        squares[a].textContent === currentPlayer &&
        squares[b].textContent === currentPlayer &&
        squares[c].textContent === currentPlayer
      );
    });
  }

  function checkTie() {
    return [...squares].every(square => square.textContent !== '');
  }

  function setMessage(msg) {
    message.textContent = msg;
  }

  function restartGame() {
    for (let square of squares) {
      square.textContent = '';
    }

    setMessage('');
    currentPlayer = players.player1;
  }
})();
