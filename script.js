// create object literal
function player(name, icon){
    this.name = name;
    this.score = 0;
    this.mark = icon;
}

let players = [];
players.push(new player('Player','x'));
players.push(new player('Computer','o'));
// chosing play mode MODULE FUNCTION
const chooseMode = (function(){
    const playerButton = document.getElementById('player');
    const compuerButton = document.getElementById('computer');
    const container = document.querySelector('.display-info-submit');

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
            addClicked(playerButton);
            removeClicked(compuerButton);
            playerInfoSubmitControl('player');
        }
    });

    compuerButton.addEventListener('click', function(){
        if (!checkClicked(compuerButton)){
            addClicked(compuerButton);
            removeClicked(playerButton);
            playerInfoSubmitControl('computer');
        }
    });

})();
// reset function
function resetGame(){

};
// mode


