// function to create object player
const createPlayer = (function(mode, name1, name2){
    const player = function(name, mark){
        this.name = name;
        this.score = 0;
        this.mark = mark;
    }
    let playerList = [];

    if (mode == 'player'){
        playerList.push(new player(name1, 'x'));
        playerList.push(new player(name2,'o'));
    }
    else {
        playerList.push(new player('Player', 'x'));
        playerList.push(new player('Computer','o'));
    }

    return {
        players : playerList,
    }

});
// chosing play mode MODULE FUNCTION
const chooseMode = (function(){
    const playerButton = document.getElementById('player');
    const compuerButton = document.getElementById('computer');
    const container = document.querySelector('.display-info-submit');
    // default is computer mode
    play(createPlayer('computer').players);

    const checkClicked = function(elementName){
        return elementName.classList.contains('button-Clicked');
    };
    const addClicked = function(elementName){
        return elementName.classList.add('button-Clicked');
    }
    const removeClicked = function(elementName){
        return elementName.classList.remove('button-Clicked');
    }

    const playerInfoSubmitControl = function(mode){
        if (mode == 'player') container.classList.remove('hidden-div');
        else container.classList.add('hidden-div');
    }

    playerButton.addEventListener('click', function(){
        if (!checkClicked(playerButton)){
            resetGame();
            addClicked(playerButton);
            removeClicked(compuerButton);
            playerInfoSubmitControl('player');
            // change play() to player mode player list
            const submitButton = container.querySelector('button');
            submitButton.addEventListener('click', function(){
                const name1 = container.querySelector('.player1');
                const name2 = container.querySelector('.player2');
                play(createPlayer('player', name1.value, name2.value).players);
                
            })
        }
    });

    compuerButton.addEventListener('click', function(){
        if (!checkClicked(compuerButton)){
            resetGame();
            addClicked(compuerButton);
            removeClicked(playerButton);
            playerInfoSubmitControl('computer');
//            play(createPlayer('computer').players);
        }
    });

    if (checkClicked(compuerButton)){
        play(createPlayer('computer').players);
    }
})();
// reset function
function resetGame(){
    const container = document.querySelector('.container');
    const boxs = container.querySelectorAll('div');
    boxArray = Array.prototype.slice.call(boxs);
    for (i in boxArray){
        boxArray[i].textContent = '';
        boxArray[i].removeAttribute('mark');
        boxArray[i].classList.remove('clicked');
    }
};
// play
function play(players){
    const container = document.querySelector('.container');
    const boxs = container.querySelectorAll('div');
    
    // click to play
    const checkBoxClicked = function(box){
        if (box.classList.contains('clicked')) return true;
        else return false;
    }
    const checkResult = (function(player){
        let boxArray = Array.prototype.slice.call(boxs);
        // check fullfillness of board game
        const fullCheck = function(){
            check = true;
            for (j in boxArray){
                box = boxArray[j];
                if (!box.classList.contains('clicked')) check =false;
            }
            return check;
        }
        // check row win
        const checkRow = function(){
            check = false;
            if (boxArray[0].getAttribute('mark') == boxArray[1].getAttribute('mark') 
            && boxArray[0].getAttribute('mark') == boxArray[2].getAttribute('mark') 
            && boxArray[0].getAttribute('mark') != null) check =true;

            if (boxArray[3].getAttribute('mark') == boxArray[4].getAttribute('mark') 
            && boxArray[3].getAttribute('mark') == boxArray[5].getAttribute('mark') 
            && boxArray[3].getAttribute('mark') != null) check =true;

            if (boxArray[6].getAttribute('mark') == boxArray[7].getAttribute('mark') 
            && boxArray[6].getAttribute('mark') == boxArray[8].getAttribute('mark') 
            && boxArray[6].getAttribute('mark') != null) check =true;

            return check;
        }
        // check col win
        const checkCol = function(){
            check = false;
            if (boxArray[0].getAttribute('mark') == boxArray[3].getAttribute('mark') 
            && boxArray[0].getAttribute('mark') == boxArray[6].getAttribute('mark') 
            && boxArray[0].getAttribute('mark') != null) check =true;

            if (boxArray[1].getAttribute('mark') == boxArray[4].getAttribute('mark') 
            && boxArray[1].getAttribute('mark') == boxArray[7].getAttribute('mark') 
            && boxArray[1].getAttribute('mark') != null) check =true;

            if (boxArray[2].getAttribute('mark') == boxArray[5].getAttribute('mark') 
            && boxArray[2].getAttribute('mark') == boxArray[8].getAttribute('mark') 
            && boxArray[2].getAttribute('mark') != null) check =true;

            return check;
        }
        
        // check ross win
        const checkCross = function(){
            let check = false;
            if (boxArray[0].getAttribute('mark') == boxArray[4].getAttribute('mark') 
            && boxArray[0].getAttribute('mark') == boxArray[8].getAttribute('mark') 
            && boxArray[0].getAttribute('mark') != null) check =true;
            if (check) return check;

            if (boxArray[2].getAttribute('mark') == boxArray[4].getAttribute('mark') 
            && boxArray[2].getAttribute('mark') == boxArray[6].getAttribute('mark') 
            && boxArray[2].getAttribute('mark') != null) check =true;
            return check;
        }
        
        if (checkRow() || checkCol() || checkCross()){
            player.score++;
            let content = `${player.name} win with score = ${player.score}`;
            
            console.log(content);
            return true;
        }
        else if (fullCheck()){
            let content = `tie`;
            console.log(content);
            return true;
        }
        else {
            return false;
        }
    })
    
    // function for box.for each
    i=0;
    playerB = players;
    boxs.forEach(box => box.addEventListener('click', function(){
        if (!checkBoxClicked(box) && checkResult(playerB[i]) == false) {
            box.textContent = playerB[i].mark;
            box.setAttribute('mark', playerB[i].mark);
            box.classList.add('clicked');
            checkResult(playerB[i]);
            i++;
            if (i==2) i =0;
        }
    })) 
}


