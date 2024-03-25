const symbols = ['❤️', '☘️', '❤️', '☘️', '☁️', '❄️', '☁️', '❄️', '⭐', '☀️', '⭐', '☀️', '☂️', '⚡', '☂️', '⚡'];
          
// Funzione per selezionare un simbolo casuale dall'array
function getRandomSymbol() {
  const randomIndex = Math.floor(Math.random() * symbols.length);
  return randomIndex;
}

function generateRandomArray() {
    const array = Array.from({ length: 16 }, (_, index) => index); // Crea un array con numeri da 0 a 15
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Genera un indice casuale
        [array[i], array[j]] = [array[j], array[i]]; // Scambia gli elementi nell'array
    }
    return array;
}

// Seleziona tutte le celle della griglia
const gridItems = document.querySelectorAll('.grid-item');
const reset = document.getElementById("reset");
var count_moves = document.getElementById("moves");
var array_of_index = generateRandomArray();
let counter = 0;
let count_cell_done = 0;
var symbol_history = [];
var id_history = []
var moves = 0


function resetAll() {
    counter = 0;
    symbol_history = [];
    id_history = [];
    array_of_index = generateRandomArray();
    gridItems.forEach(gridItem => {
        gridItem.textContent = '';
    })
    moves = 0;
    count_moves.textContent = 0;
    count_cell_done = 0;
} 

reset.addEventListener('click', () => {
       resetAll();
})

// Aggiungi un evento di click a ciascuna cella
gridItems.forEach(gridItem => {
  gridItem.addEventListener('click', () => {
    // Ottieni un simbolo casuale
    if (counter < 2) {
    moves++;
    count_moves.textContent = moves;
    symbol_history[counter] = symbols[array_of_index[parseInt(gridItem.id)]];
    console.log("counter: " + counter)
    // Imposta il simbolo nella cella cliccata
    id_history[counter] = parseInt(gridItem.id)
    console.log(symbols[array_of_index[parseInt(gridItem.id)]])
    gridItem.textContent = symbols[array_of_index[parseInt(gridItem.id)]];
    counter++;
    }

    if((symbol_history[0] != symbol_history[1]) && counter == 2) {
        let id1 = document.getElementById(id_history[0])
        let id2 = document.getElementById(id_history[1])
        id1.textContent = ''
        id2.textContent = ''
        counter = 0;
    } else if((symbol_history[0] == symbol_history[1]) && counter == 2) {
        count_cell_done += 2;
    }
    
    if (counter == 2) {
        counter = 0;
    }

    if (count_cell_done == 16) {
        resetAll();
    }

  });
});