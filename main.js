// Se inicializan variables que invocan las etiquetas HTML
const wordContainer = document.getElementById('wordContainer');
const startButton = document.getElementById('startButton');
const usedLettersElements = document.getElementById('usedLetters')

// Se crea el canvas donde se realizará el dibujito del ahorcado
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');  
ctx.canvas.width = 0;
ctx.canvas.height = 0;

const bodyParts = [
    [4,2,1,1],
    [4,3,1,2],
    [3,5,1,1],
    [5,5,1,1],
    [3,3,1,1],
    [5,3,1,1]
]

// Variable para almacenar la palara seleccionada
let selectedWord;

// Variable para almacenar las letras usadas
let usedLetters;

//Variable para almacenar errores
let mistakes;

// Variable para almacenar los aciertos
let hits;

function addLetter(letter) {
    const letterElement = document.createElement('span');
    letterElement.innerHTML = letter.toUpperCase();
    usedLettersElements.appendChild(letterElement);
}

const addBodyParts = bodyPart => { 
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(...bodyPart)
}

function endGame() {
    document.removeEventListener('keydown', letterEvent);
    startButton.style.display = 'block';
}

function wrongLetters() {
    addBodyParts(bodyParts[mistakes]);
    mistakes++
    if (mistakes === bodyParts.length) endGame();
}

function correctLetter(letter) {
    const {children} = wordContainer;
    for (let i = 0; i < children.length; i++) {
        if (children[i].innerHTML === letter){
            children[i].classList.toggle('hidden');
            hits++;
        }
    }
    if (hits === selectedWord.length) endGame();
}

function letterInput (letter) // Funcion que evalua si la letra que se pasa como argumento está dentro de la palabra
{
    if (selectedWord.includes(letter)){
        correctLetter(letter);}
        else{
            wrongLetters()
        }
        addLetter(letter)
        usedLetters.push(letter)
    }

const letterEvent = event => {
    let newLetter = event.key.toUpperCase();
    if (newLetter.match(/^[a-zñ]$/i) && !usedLetters.includes(newLetter)) //  Si la palabra ingresada es una letra y no esta dentro del array de letras ya seleccionadas
    {
        letterInput(newLetter); // Le pasamos ese valor a la funcion letterInput
    }
}

function pintarLetra(){
    selectedWord.forEach(letter => { // Recorre todas las letras de la palabra seleccionada
        const letterElement = document.createElement('span'); // Almacena en una etiqueta "span" a cada una de las letras
        letterElement.innerHTML = letter.toUpperCase(); // Pone cada una de las letras en mayúsculas
        letterElement.classList.add('letter'); // Le agrega los atributos del css de la clase letter
        letterElement.classList.add('hidden'); // Igual que el anterior pero en la clase hidden
        wordContainer.appendChild(letterElement); // Guarda todas estas letras dentro del tag "wordContainer"
    });
};

function palabraRandom(){
    let word = words[Math.floor((Math.random() *  words.length))].toUpperCase(); // Selecciona una palabra entre un array de palabras 
    selectedWord = word.split('');
}

// Funcion que pinta al muñeco que será ahorcado al arrancar el juego
function printMuñeco(){
    ctx.canvas.width = 120; // El ancho del muñeco
    ctx.canvas.height = 160; // El alto del muñeco
    ctx.scale(20, 20); // El tamaño de cada pixel
    ctx.clearRect(0,0, canvas.width,canvas.height) // Funcion que borra lo que haya estado pintado
    ctx.fillStyle = "#d95d39" // El color que tendrá el palo del muñeco
    ctx.fillRect(0,7,4,1); // x= 0, y= 7, width= 4, height= 1
    ctx.fillRect(1,0,1,8); // x= 1, y= 0, width= 1, height= 8
    ctx.fillRect(2,0,3,1); // x= 2, y= 0, width= 3, height= 1
    ctx.fillRect(4,1,1,1); // x= 4, y= 1, width= 1, height= 1
}

// Funcion que permite el arranque o reinicio del juego, deja las variables en 0 y redibuja al ahorcado
function startGame(){
    usedLetters = [];
    mistakes = 0;
    hits = 0;
    wordContainer.innerHTML = "";
    usedLettersElements.innerHTML ="";
    startButton.style.display  = 'none';
    printMuñeco();
    palabraRandom();
    pintarLetra();
    document.addEventListener('keydown', letterEvent)
}

// Al clickear el boton "START" invoca la funcion startGame()
startButton.addEventListener('click', startGame);