document.addEventListener('DOMContentLoaded', function() {
  const gameBoard = document.getElementById('game-board');
  const pieces = ['&#9823;', '&#9823;', '&#9823;', '&#9823;', '&#9823;', '&#9823;', '&#9823;', '&#9823;', '&#9823;', '&#9823;']; // Array representing player 1's pieces
  const pieces2 = ['&#9817;', '&#9817;', '&#9817;', '&#9817;', '&#9817;', '&#9817;', '&#9817;', '&#9817;', '&#9817;', '&#9817;']; // Array representing player 2's pieces

  let currentPlayer = 'player1';
  let selectedPiece = null;

  
  for (let i = 0; i < 10; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement('td');
      cell.className = (i + j) % 2 ? 'empty-cell' : 'piece-cell';
      row.appendChild(cell);

      if (cell.className === 'piece-cell') {
        
        if (i < 3) {
          cell.innerHTML = pieces[j];
          cell.dataset.player = 'player1';
        }
        
        else if (i > 6) {
          cell.innerHTML = pieces2[j];
          cell.dataset.player = 'player2';
        }

       
        cell.addEventListener('click', function(event) {
          selectPiece(event.target);
        });
      }
    }
    gameBoard.appendChild(row);
  }


  const letters = 'ABCDEFGHIJ';
  const coordinatesRow = document.createElement('tr');
  coordinatesRow.classList.add('coordinates-row');
  for (let i = 0; i <= 10; i++) {
    const cell = document.createElement('td');
    cell.className = 'coordinate-cell';
    if (i !== 0) {
      cell.textContent = letters[i - 1];
    }
    coordinatesRow.appendChild(cell);
  }
  gameBoard.insertBefore(coordinatesRow, gameBoard.firstChild);
  for (let i = 0; i < 10; i++) {
    const cell = document.createElement('td');
    cell.className = 'coordinate-cell';
    cell.textContent = i + 1;
    gameBoard.rows[i + 1].insertBefore(cell, gameBoard.rows[i + 1].firstChild);
  }

 
  const message = document.createElement('div');
  message.id = 'message';
  message.textContent = 'Jogador 1 Começa';
  message.classList.add("StartMessage");
  document.body.appendChild(message);

function selectPiece(cell) {
  if (selectedPiece) {

    if (canMovePiece(selectedPiece, cell)) {
      movePiece(selectedPiece, cell);
      togglePlayer();
      clearHighlightedCells();
    }
    selectedPiece.classList.remove('selected');
    selectedPiece = null;
  } else {
    if (cell.dataset.player === currentPlayer) {
     
      selectedPiece = cell;
      cell.classList.add('selected');
      highlightValidMoveCells(cell);
    }
  }
}


function movePiece(piece, cell) {
  const targetRow = cell.parentNode.rowIndex;
  const targetCol = cell.cellIndex;

  if (
    (currentPlayer === 'player1' && targetRow === 10) ||
    (currentPlayer === 'player2' && targetRow === 1)
  ) {

    piece.innerHTML = currentPlayer === 'player1' ? '&#9822;' : '&#9816;';
    piece.classList.add('special-piece'); 
  }

  cell.innerHTML = piece.innerHTML;
  cell.dataset.player = piece.dataset.player;
  piece.innerHTML = '';
  piece.dataset.player = '';
}




function canMovePiece(piece, cell) {
  const currentRow = piece.parentNode.rowIndex;
  const currentCol = piece.cellIndex;
  const targetRow = cell.parentNode.rowIndex;
  const targetCol = cell.cellIndex;

  const direction = currentPlayer === 'player1' ? 1 : -1;
  const rowDifference = targetRow - currentRow;

  if (cell.dataset.player && cell.dataset.player === currentPlayer) {
    return false; 
  }

  if (currentPlayer === 'player1' && currentRow < 6 && targetRow < currentRow) {
    return false; 
  }

  if (currentPlayer === 'player2' && currentRow > 5 && targetRow > currentRow) {
    return false; 
  }

  if (!piece.classList.contains('special-piece')) {
    if (
      (rowDifference === direction && Math.abs(targetCol - currentCol) === 1) ||
      (rowDifference === -direction && Math.abs(targetCol - currentCol) === 1)
    ) {
      return true;
    }
  }
  
  else {
    if (
      (rowDifference === direction && Math.abs(targetCol - currentCol) === 1) ||
      (rowDifference === -direction && Math.abs(targetCol - currentCol) === 1)
    ) {
      return true;
    }
  }

  return false;
}



  function togglePlayer() {
    currentPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
    message.textContent = currentPlayer === 'player1' ? 'Turno do Jogador 1.' : 'Turno do Jogador 2.';
  }

  function highlightValidMoveCells(piece) {
    clearHighlightedCells();
    const currentRow = piece.parentNode.rowIndex;
    const currentCol = piece.cellIndex;
    const targetCells = getValidMoveCells(currentRow, currentCol);
    for (const targetCell of targetCells) {
      gameBoard.rows[targetCell.row].cells[targetCell.col].classList.add('highlighted-cell');
    }
  }

  function getValidMoveCells(row, col) {
    const direction = currentPlayer === 'player1' ? 1 : -1;
    const targetCells = [];
    if (isValidCell(row + direction, col - 1)) {
      targetCells.push({ row: row + direction, col: col - 1 });
    }
    if (isValidCell(row + direction, col + 1)) {
      targetCells.push({ row: row + direction, col: col + 1 });
    }
    return targetCells;
  }

  function isValidCell(row, col) {
    return row >= -1 && row < 11 && col >= -1 && col < 11;
  }

  function clearHighlightedCells() {
    const highlightedCells = gameBoard.getElementsByClassName('highlighted-cell');
    while (highlightedCells.length) {
      highlightedCells[0].classList.remove('highlighted-cell');
    }
  }
});