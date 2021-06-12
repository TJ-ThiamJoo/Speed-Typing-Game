// Referencing id from input.html
const RAMDOM_QUOTE_API_URL = 'http://api.quotable.io/random';
const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const timerElement = document.getElementById('timer');

// Quote Input
quoteInputElement.addEventListener('input', () => {
    const arrayQuote = quoteDisplayElement.querySelectorAll('span');
    const arrayValue = quoteInputElement.value.split('');

    let correct = true;
    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index];

        if (character == null) {
            characterSpan.classList.remove('correct');
            characterSpan.classList.remove('incorrect');
            correct = false;
        }

        else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('incorrect');
        }

        else {
            characterSpan.classList.add('incorrect');
            characterSpan.classList.remove('correct');
            correct = false; 
        }
    })

    if (correct) renderNewQuote();
})

// Get random quote from API URL
function getRandomQuote(){
    return fetch(RAMDOM_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.content);
}

async function renderNewQuote(){
    const quote = await getRandomQuote();
    quoteDisplayElement.innerHTML = '';

    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span');

        characterSpan.innerText = character;
        quoteDisplayElement.appendChild(characterSpan);
    })

    quoteInputElement.value = null;
    startTimer();
}

// Timer
let startTime;
function startTimer(){
    timerElement.innerText = 0;
    startTime = new Date();

    setInterval(() => {
        timerElement.innerText = getTimerTime()
    }, 1000);

}

function getTimerTime(){
    return Math.floor((new (Date) - startTime) / 1000);
}


renderNewQuote()