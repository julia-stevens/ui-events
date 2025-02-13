// Voorbeeld ========================================================================

// Stap 1: selecteer het 12e linkje, en sla deze op in een variabele
let interaction = document.querySelector(".interaction")

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

// #3 Zoom in/out
// Bron: https://developer.mozilla.org/en-US/docs/Web/API/Element/wheel_event
let scale = 1; 
let linkZoom = document.querySelector("a:nth-of-type(3)");

linkZoom.addEventListener("wheel", zoomLink, {passive: false});

function zoomLink(event) {
  event.preventDefault();
  scale += event.deltaY * -0.01; 
  scale = Math.min(Math.max(0.125, scale), 4);
  linkZoom.style.transform = `scale(${scale})`;
}

// #4 Double click
const orbit = document.querySelector(".orbit");
const sun = document.querySelector(".sun");
const developmentLink = document.querySelector(".development");

developmentLink.addEventListener("dblclick", orbitAnimation);

function orbitAnimation() {
  developmentLink.classList.toggle("showDevelopment");
  orbit.classList.toggle("showOrbit");
  sun.classList.toggle("showSun");
}

developmentLink.addEventListener("animationend", orbitAnimation);

// #5 Drag and drop
// https://javascript.info/mouse-drag-and-drop

let linkDrag = document.querySelector("a:nth-of-type(4)");

linkDrag.addEventListener("mousedown", drag);

function drag(event) {
  let shiftX = event.clientX - linkDrag.getBoundingClientRect().left;
  let shiftY = event.clientY - linkDrag.getBoundingClientRect().top;

  linkDrag.style.position = 'absolute';
  linkDrag.style.zIndex = 1000;
  document.body.append(linkDrag);

  moveAt(event.pageX, event.pageY);

  // moves the linkDrag at (pageX, pageY) coordinates
  // taking initial shifts into account
  function moveAt(pageX, pageY) {
    linkDrag.style.left = pageX - shiftX + 'px';
    linkDrag.style.top = pageY - shiftY + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // move the linkDrag on mousemove
  document.addEventListener('mousemove', onMouseMove);

  // drop the linkDrag, remove unneeded handlers
  linkDrag.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    linkDrag.onmouseup = null;
  };

};

linkDrag.ondragstart = function() {
  return false;
};

// #6 Motion path animation 
let motionPathWrapper = document.querySelector(".motion-path-wrapper");
let motionLink = document.querySelector(".motion-link");

motionLink.addEventListener("mouseover", motionPath);

function motionPath() {
  motionPathWrapper.classList.toggle("showMotionPathWrapper");
  motionLink.classList.toggle("showMotionLink");
}

motionLink.addEventListener("animationend", motionPath);

// #7 Key sequence & audio
const audio = new Audio("./assests/rickrolled.mp3");
let audioLink = document.querySelector(".audio-link");

let pressedKeys = [];

audioLink.addEventListener("keydown", keysPressed);
audioLink.addEventListener("blur", stopAudio);

function keysPressed(event) {
  pressedKeys.push(event.key);
  console.log(pressedKeys);
  sequenceCheck();
}

function sequenceCheck() {
  if (pressedKeys.includes("5") && pressedKeys.includes("6") && pressedKeys.includes("7") && pressedKeys.includes("8")) {
    audio.play();
    refreshPressedKeys();
  } 
}

function stopAudio() {
  audio.pause();
}

function refreshPressedKeys() {
  pressedKeys = [];  
}

// #8 
let resizeLink = document.querySelector(".resize-event");

window.addEventListener("resize", invertResize);

function invertResize() {
  if (window.innerWidth <= 800) {
    resizeLink.classList.add("resized");
  } else {
    resizeLink.classList.remove("resized");
  }
}

// #9
let pageLoadLink = document.querySelector(".page-load-link");

window.addEventListener("load", onLoadFunc);

function onLoadFunc() {
  pageLoadLink.classList.add("pageLoaded");
}

// 10 - on click rotate
let clickLink = document.querySelector(".click-rotate");

clickLink.addEventListener("click", rotateLink);

function rotateLink() {
  clickLink.classList.toggle("clicked");
}

// 11 - long press voor koop
let longpressLink = document.querySelector(".longpress");
let displayTimeElapsed = document.querySelector(".time-elapsed");

let start = 0;
let timerInterval = null;

longpressLink.addEventListener("mousedown", getTime);
longpressLink.addEventListener("mousedown", timer);
longpressLink.addEventListener("mouseup", stopTimer);
longpressLink.addEventListener("mouseleave", stopTimer);

function getTime() {
  start = Date.now();
}

function timer() {
  timerInterval = setInterval(calculateElapsedTime, 100); // update 
}

function calculateElapsedTime() {
  let elapsed = ((Date.now() - start) / 1000).toFixed(1); // bereken verschil tussen start en nu
  updateDisplay(elapsed);
}

function updateDisplay(elapsed) {
  displayTimeElapsed.textContent = `${elapsed} s`;
}

function stopTimer() {
  clearInterval(timerInterval);
}



// function startTimer() {
//   start = Date.now();
//   console.log("start: " + start);
// }

// function endTimer() {
//   end = Date.now();
//   console.log("end: " + end);
//   elapsed = end - start; 
//   console.log(elapsed/1000);

//   displayTimeElapsed.innerHTML = elapsed + " s";
// }



