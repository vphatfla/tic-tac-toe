// function to create object player
const createPlayer = (function(mode, name1, name2){
    const player = function(name, mark){
        this.name = name;
        this.score = 0;
        this.mark = mark;
        if (mark=='x') this.src = "images/xIcon.png";
        else this.src = "images/oIcon.png";
        
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
            resetDisplay();
            addClicked(playerButton);
            removeClicked(compuerButton);
            playerInfoSubmitControl('player');
            // change play() to player mode player list
            const submitButton = container.querySelector('button');
            container.querySelector('.player2').addEventListener('keypress', function(e){
                if (e.key == 'Enter'){
                    const name1 = container.querySelector('.player1');
                    const name2 = container.querySelector('.player2');
                    play(createPlayer('player', name1.value, name2.value).players);
                }
            })
            submitButton.addEventListener('click', function(){
                const name1 = container.querySelector('.player1');
                const name2 = container.querySelector('.player2');
                play(createPlayer('player', name1.value, name2.value).players);
                
            })
        }
    });

    compuerButton.addEventListener('click', function(){
        if (!checkClicked(compuerButton)){
            resetDisplay();
            addClicked(compuerButton);
            removeClicked(playerButton);
            playerInfoSubmitControl('computer');
            play(createPlayer('computer').players);
        }
    });

    if (checkClicked(compuerButton)){
        play(createPlayer('computer').players);
    }
})();
// resetdisplay button
const resetDisplay = (function(){
    const scoreContent = document.querySelector('.score-content');
    scoreContent.innerHTML = '';
    const footButton = document.querySelector('.foot-button');
    try{
        const keepPlaying = footButton.querySelector('.keepPlaying');
        if (footButton.contains(keepPlaying)) keepPlaying.remove();
    } catch{

    }
    clearGame();
    
});
// clear function
function clearGame(){
    const container = document.querySelector('.container');
    const boxs = container.querySelectorAll('div');
    boxArray = Array.prototype.slice.call(boxs);
    for (i in boxArray){
        boxArray[i].textContent = '';
        boxArray[i].removeAttribute('mark');
        boxArray[i].classList.remove('clicked');
        boxArray[i].style.pointerEvents = 'auto';
    }
};
// play
function play(players){
    const container = document.querySelector('.container');
    const boxs = container.querySelectorAll('div');
    
    // display score board function
    const displayScore = (function(players, check, name){
        const container = document.querySelector('.score-board');
        container.innerHTML ='';
        for (j in players){
            
            const playerDiv = document.createElement('div');
            playerDiv.classList.add('playerDiv');
            let textContent = document.createElement('p');
            let score = document.createElement('p');
            textContent.innerHTML = `${players[j].name} mark ${players[j].mark}`;
            score.innerHTML = players[j].score;
            playerDiv.appendChild(textContent);
            playerDiv.appendChild(score);
            container.appendChild(playerDiv);
        }

        const scoreContent = document.querySelector('.score-content');
        scoreContent.innerHTML ='';
        const resultContent = document.createElement('p');
        if (check == 'win') resultContent.innerHTML = `${name} win`;
        else if (check == 'tie') resultContent.innerHTML = `tie`;
        scoreContent.appendChild(resultContent);
       
    });
    displayScore(players);
    // check whether the box was clicked or not
    const checkBoxClicked = function(box){
        if (box.classList.contains('clicked')) return true;
        else return false;
    }
    const checkResult = (function(){
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
            return 'win';
        }
        else if (fullCheck()){
            return 'tie';
        }
        else {
            return false;
        }
    })
    // function disable div when win/fullfill and create "keep playing" button
    const disableClicking = (function(){
        let boxArray = Array.prototype.slice.call(boxs);
        for (j in boxArray){
            boxArray[j].style.pointerEvents = 'none';
        }
        const container = document.querySelector('.foot-button');
        
        
        const keepPlaying = document.createElement('button');
        keepPlaying.classList.add('keepPlaying');
        keepPlaying.textContent = 'Keep Playing';
        container.appendChild(keepPlaying);
        keepPlaying.addEventListener('click', function(){
            clearGame();
            i=0;    
            for (j in boxArray){
                boxArray[j].style.pointerEvents = 'auto';
            }
            keepPlaying.remove();
        });


    })
    // fill box function
    const fillBox = (function(player, box){
        let img = document.createElement('img');
        img.src = player.src;
        img.classList.add('imgInBox');
        box.appendChild(img);
        box.setAttribute('mark', player.mark);
        box.classList.add('clicked');
    })
    // computer random play
    const randomPlay = (function(player){
        let boxArray = Array.prototype.slice.call(boxs);
        let availableBoxs = [];
        for (j in boxArray){
            if (!checkBoxClicked(boxArray[j])) availableBoxs.push(j);
        }
        let randomIndex = Math.floor(Math.random() * (availableBoxs.length -1 ));
        fillBox(player, boxArray[availableBoxs[randomIndex]]);
    });
    // function for box.for each
    i=0;
    playerB = players;
    boxs.forEach(box => box.addEventListener('click', function(){
        if (!checkBoxClicked(box)) {
                // for people playing
                fillBox(playerB[i], box);
                if (checkResult() != false) {
                    if (checkResult() == 'win') playerB[i].score++;
                    
                    displayScore(playerB, checkResult(), playerB[i].name);
                    
                    disableClicking();
                }
                i++;
                if (i==2) i =0;

                // computer random play
                if (playerB[i].name == 'Computer' && checkResult() == false){
                    fillBox(playerB[i], minimaxPlay(boxs));
                    if (checkResult() != false) {
                        if (checkResult() == 'win') playerB[i].score++;
                        
                        displayScore(playerB, checkResult(), playerB[i].name);
                        
                        disableClicking();
                    }
                    i++;
                    if (i==2) i =0;
                }
                
            }
    }))
    
    const minimaxPlay = (function(boxs){
        // convert grib box to array 2-d
        let boxsArray = Array.prototype.slice.call(boxs);
        let board = [ [ '_', '_', '_' ],
                      [ '_', '_', '_' ],
                      [ '_', '_', '_' ] ];
        let index = 0;
        for (let i =0; i<3; i++)
            for (let j = 0; j<3; j++){
                if (boxsArray[index].getAttribute('mark') != null) board[i][j] = boxsArray[index].getAttribute('mark');
                index++;
            }
        //
        
        class Move{
            constructor(){
                let row,col;
            }
        }
        let player = 'x', computer = 'o';

        function isMovesLeft(b){
            for (let i = 0; i<3; i++)
                for (let j = 0; j<3; j++)
                if (b[i][j] == '_') return true;
            return false;
        }

        function evaluate(b){
            // check row
            for (let i = 0; i<3; i++)
            {
                if (b[i][0] == b[i][1] && b[i][0] == b[i][2])
                {
                    if (b[i][0] == player) return +10;
                    if (b[i][0] == computer) return -10;
                }
            }
            // check col
            for (let j = 0; j<3; j++)
            {
                if (b[0][j] == b[1][j] && b[0][j] == b[2][j])
                {
                    if (b[0][j] == player) return +10;
                    if (b[0][j] == computer) return -10;
                }
            }

            // check diagonal
            if (b[0][0] == b[1][1] && b[0][0] == b[2][2])
            {
                if (b[0][0] == player) return +10;
                if (b[0][0] == computer) return -10;
            }

            if (b[0][2] == b[1][1] && b[0][2] == b[2][0])
            {
                if (b[0][2] == player) return +10;
                if (b[0][2] == computer) return -10;
            }
            // no win or lose 
            return 0;
        }
        // minimax function
        function minimax(b, depth, isMax)
        {
            
            let score = evaluate(b);
            // return if either computer or player win the game
            if (score == 10 || score == -10) return score;
            // if no one has won and there is no moveleft -> tie, return 0
            if (isMovesLeft(b) == false) return 0;
            // if it is maximizer (player) move
            if (isMax)
            {
                let best  = -1000;
                for (let i = 0; i<3; i++)
                    for (let j = 0; j<3; j++)
                        if (b[i][j] == '_')
                        {
                            // make move for player
                            b[i][j] = player;
                            
                            // calculate minimax for the move
                            best = Math.max(best, minimax(b, depth +1, !isMax));
                            // undo the move
                            b[i][j] = '_';
                        }
                return best;
            }
            // if it is minimizer (computer) move
            else{
                let best  = 1000;
                for (let i = 0; i<3; i++)
                    for (let j = 0; j<3; j++)
                        if (b[i][j] == '_')
                        {
                            // make move for player
                            b[i][j] = computer;
                            // calculate minimax for the move
                            best = Math.min(best, minimax(b, depth +1, !isMax));
                            // undo the move
                            
                            b[i][j] = '_';
                        }
                return best;
                
            }
        }
        // find the best move
        function findTheBestMove(b)
        {
            let bestVal = 1000;
            let bestMove = new Move();
            bestMove.row = -1;
            bestMove.col = -1;

            for (let i = 0; i<3; i++)
                for (let j = 0; j<3; j++)
                    if (b[i][j] == '_')
                    {
                        // make the move for computer
                        b[i][j] = computer;
                        
                        // isMax = true, next move is player
                        let moveVal = minimax(b, 0, true);
                        // undo the move
                        b[i][j] = '_';
                        
                        if (moveVal < bestVal){
                            bestVal = moveVal;
                            bestMove.row = i;
                            bestMove.col = j;
                        }
                        
                    }
            return bestMove;
        }
        // get bestMove
        let bestMove = findTheBestMove(board);
        // get the box with x and y
        
        for (let i = 0; i<boxsArray.length; i++)
        {
            let x = parseInt(boxsArray[i].getAttribute('x'));
            let y = parseInt(boxsArray[i].getAttribute('y'));
            if (x == bestMove.row && y == bestMove.col) return boxsArray[i];
        }

                
    });

    // reset button
    const ctn = document.querySelector('.foot-button');
    const resetButton = ctn.querySelector('.reset');
    resetButton.addEventListener('click', function(){
       location.reload();
    });
}


