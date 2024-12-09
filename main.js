// Voorbeeld ========================================================================

// Stap 1: selecteer het 12e linkje, en sla deze op in een variabele
let interaction = document.querySelector('a:nth-of-type(12)')

// Stap 2: voeg de (click) event listener toe aan de link, met een callback functie
// In dit geval wordt de jumpHandler functie aangeroepen, zodra je op het linkje klikt
interaction.addEventListener('click', jumpHandler)

// Deze jumpHandler functie staat klaar voor als we 'm aanroepen; deze wordt dus
// _niet_ meteen bij het laden van de pagina aangeroepen
function jumpHandler() {

  // Stap 3: toggle een class op het element (zodra er dus op een link wordt geklikt)
  interaction.classList.toggle('jump')
}

// Extraatje, waardoor de class weer weggehaald wordt zodra de animatie afgelopen is
interaction.addEventListener('animationend', jumpHandler)


// ================================================================================= 

// #1 Flip f-key

let flipF = document.querySelector("a:nth-of-type(1)");

flipF.addEventListener("keydown", flipFkey); 

function flipFkey() {
  flipF.classList.toggle("flip-f");
}

flipF.addEventListener("animationend", flipFkey);

// #2 Log key

let logLink = document.querySelector("a:nth-of-type(2)");
let log = document.querySelector(".log");

logLink.addEventListener("focus", showLog);
logLink.addEventListener("blur", hideLog);
logLink.addEventListener("keydown", logKey); 

function showLog() {
  log.classList.add("show");
}

function hideLog() {
  log.classList.remove("show");
}

function logKey(event) {
  log.textContent += ` ${event.code}`;
}
