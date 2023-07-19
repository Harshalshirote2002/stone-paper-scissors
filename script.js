function getComputerChoice(){
    let decider = Math.floor(Math.random()*10);
    if(decider<3.5){
        return "stone";
    }else if(decider>=3.5 && decider<7){
        return "paper";
    }else{
        return "scissor";
    }
}

function getPlayerChoice(){
    const choice=prompt("Make your choice here:").toLowerCase();
    console.log(`player has selected ${choice}`);                              
    return choice;
}

function gameRound(playerSelection, computerSelection){
    //return 1 if the player wins, -1 if he loses, 0 if it's a draw 
    if(playerSelection==computerSelection){
        return 0;
    }
    if(playerSelection=="stone" && computerSelection=="scissor"){
        return 1;
    }else if(playerSelection=="paper" && computerSelection=="stone"){
        return 1;
    }else if(playerSelection=="scissor" && computerSelection=="paper"){
        return 1;
    }else if(playerSelection=="stone" && computerSelection=="paper"){
        return -1;
    }else if(playerSelection=="paper" && computerSelection=="scissor"){
        return -1;
    }else if(playerSelection=="scissor" && computerSelection=="stone"){
        return -1;
    }
}

function game(){
    let result=0;

    for(let i=0;i<5;i++){
        playerSelection = getPlayerChoice();
        computerSelection = getComputerChoice();
        console.log(`computer has selected ${computerSelection}`);
        if(gameRound(playerSelection, computerSelection)==0){
            console.log("draw!");
        }else if(gameRound(playerSelection, computerSelection)==1){
            console.log("player beats computer");
        }else{
            console.log("computer beats player");
        }
        result+=gameRound(playerSelection, computerSelection);
    }
    if(result>0){
        console.log(`The player beats computer by ${Math.abs(result)} points thus winning the game!.`);
    }else if(result<0){
        console.log(`The computer beats player by ${Math.abs(result)} points thus winning the game!.`);
    }else{
        console.log("it's a draw!");
    }
}

// game();