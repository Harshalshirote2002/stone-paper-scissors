const cards = Array.from(document.querySelectorAll('.hand'));
bottomBar = document.querySelector('.bottom-bar');
humanScore = document.querySelector('.human');
cpuScore = document.querySelector('.cpu');
button = document.querySelector('button');


cards.forEach(card => card.addEventListener('mouseover', (e) => e.target.classList.add('highlighted-icon')));
cards.forEach(card => card.addEventListener('mouseleave', (e) => e.target.classList.remove('highlighted-icon')));

function getComputerChoice() {
    let decider = Math.floor(Math.random() * 10);
    if (decider < 3.5) {
        return "stone";
    } else if (decider >= 3.5 && decider < 7) {
        return "paper";
    } else {
        return "scissors";
    }
}

function gameRound(playerSelection, computerSelection) {
    //return 1 if the player wins, -1 if he loses, 0 if it's a draw 
    if (playerSelection == computerSelection) {
        return 0;
    }
    if (playerSelection == "stone" && computerSelection == "scissors") {
        return 1;
    } else if (playerSelection == "paper" && computerSelection == "stone") {
        return 1;
    } else if (playerSelection == "scissors" && computerSelection == "paper") {
        return 1;
    } else if (playerSelection == "stone" && computerSelection == "paper") {
        return -1;
    } else if (playerSelection == "paper" && computerSelection == "scissors") {
        return -1;
    } else if (playerSelection == "scissors" && computerSelection == "stone") {
        return -1;
    }
}

const resetGame = function () {
    score1 = 0;
    score2 = 0;
    roundNumber = 0;
    computerSelectionOld = null;
    cards.forEach(card => { if ((Array.from(card.classList)).includes('highlighted-icon')) card.classList.remove('highlighted-icon') });
    scoreUpdate();
}

const scoreUpdate = function(){
    humanScore.textContent = `Score: ${score1}`;
    cpuScore.textContent = `Score: ${score2}`;
}

const bottomBarUpdate = function () {
    if (score1 > score2) {
        bottomBar.textContent = `Player leads the game with ${score1 - score2} points!`
    } else if (score1 < score2) {
        bottomBar.textContent = `computer leads game with ${score2 - score1} points!`
    } else {
        bottomBar.textContent = "It's currently a tie!";
    }
}

function playGame(e) {
    roundNumber += 1;
    playerSelection = e.target.id;
    computerSelection = getComputerChoice();

    if (computerSelectionOld == null) {
        cpuHand = document.querySelector(`.cpu-${computerSelection}`);
        cpuHand.classList.add('highlighted-icon');
        computerSelectionOld = computerSelection;
    } else {
        cpuHand = document.querySelector(`.cpu-${computerSelectionOld}`);
        cpuHand.classList.remove('highlighted-icon');
        cpuHand = document.querySelector(`.cpu-${computerSelection}`);
        cpuHand.classList.add('highlighted-icon');
        computerSelectionOld = computerSelection;
    }


    if (gameRound(playerSelection, computerSelection) == 0) {
    } else if (gameRound(playerSelection, computerSelection) == 1) {
        
        score1 += 1;
    } else {
        
        score2 += 1
    }

    scoreUpdate();

    bottomBarUpdate();

    if (roundNumber == 5) {
        if (score1 > score2) {
            bottomBar.textContent = `The player beats computer by ${score1 - score2} points thus winning the game!.`;
            
        } else if (score1 < score2) {
            bottomBar.textContent = `The computer beats player by ${score2 - score1} points thus winning the game!.`;
            
        } else {
            bottomBar.textContent = "it's a draw!"
            
        }
        resetGame();
    }
}

let score1 = 0;
let score2 = 0;
let roundNumber = 0;
computerSelectionOld = null;

cards.forEach(card => card.addEventListener('click', playGame));

button.addEventListener('click', resetGame);


