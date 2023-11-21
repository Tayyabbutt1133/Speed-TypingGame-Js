const RANDOM_QUOTE_API_URL = "https://api.quotable.io/random";
const quoteDisplayElement = document.getElementById("quoteDisplay");
const quoteInputElement = document.getElementById("quoteInput");
let correct=true;

const timerElement = document.getElementById("timer");

quoteInputElement.addEventListener("input", () => {
  const arrayQuote = quoteDisplayElement.querySelectorAll('span');
  const arrayvalue = quoteInputElement.value.split('');
  arrayQuote.forEach((ElementSpan, index) => {
    const character=arrayvalue[index]
    if(character==null)
    {
        ElementSpan.classList.remove('correct')
        ElementSpan.classList.remove('incorrect')
        correct=false;
    }
    else if(character===ElementSpan.innerText)
    {
   ElementSpan.classList.add('correct')
   ElementSpan.classList.remove('incorrect')
    }
    else{
        ElementSpan.classList.remove('correct')
        ElementSpan.classList.add('incorrect')
        correct=false;
    }
  });
  if (correct) renderNewQuote()
});
function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then((response) => response.json())
    .then((data) => data.content);
}

async function renderNewQuote() {
  const quote = await getRandomQuote();
  quoteDisplayElement.innerHTML = "";
  quote.split("").forEach((element) => {
    const ElementSpan = document.createElement("span");
    // ElementSpan.classList.add('incorrect')
    ElementSpan.innerText = element;
    quoteDisplayElement.appendChild(ElementSpan);
  });
  quoteInputElement.value = null;
  startTimer()
}

let StartTime;
function startTimer()
{
    timerElement.innerText=0;
    StartTime=new Date()
    setInterval(() => {
    timer.innerText=getTimerTime()  
    }, 1000)
}

function getTimerTime()
{
     return Math.floor((new Date()-StartTime)/1000)
}




//Function calling
renderNewQuote();
