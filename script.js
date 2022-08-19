var startPage = document.getElementById('startPage');
var input_nb_players = document.getElementById('input_nb_players');
var input_nb_spies = document.getElementById('input_nb_spies');
var error_msg = document.getElementById('error_msg');
var game=document.getElementById('game');
var player_nb = document.getElementById('player_nb');
var flip_card_back = document.getElementById('flip-card-back');
var flip_card_inner = document.getElementById("flip-card-inner");
var categories = document.getElementById('categories')
var cur_player;
var nb_of_players;
var nb_of_spies;
var word;
var dictionary=[];
var spies;
var word_revealed = false;
new_game();

function submit_start(e){
    e.preventDefault();
    if(input_nb_players.value==undefined || input_nb_players.value<2 || input_nb_players.value>100){
        error_msg.innerHTML="Illegal value for number of players";
        return false;
    }
    if (input_nb_spies.value==undefined||input_nb_spies.value>=input_nb_players.value){
        error_msg.innerHTML="Illegal value for number of spies";
        return false;
    }
    var options = categories.options.selectedIndex;
    if(options==-1){
        error_msg.innerHTML="Please select categorie(s)";
        return false;
    }
    error_msg.innerHTML="";
    nb_of_players = parseInt(input_nb_players.value);
    nb_of_spies = parseInt(input_nb_spies.value);
    dictionary = [];
    for (var option of categories.options) {
            if (option.selected) {
                dictionary = dictionary.concat(data[parseInt(option.value)]);
            }
        }
        
    var wordindex = generateRandom(0, dictionary.length-1);
    word=dictionary[wordindex];
    start_game()
}
function selectDictionary(e){
    const selected = document.querySelectorAll('#categories option:checked');
    if (selected.length==0){
        e.options[0].selected=true;
    }
}
function start_game(){
    startPage.style.display="none";
    game.style.display="flex";
    player_nb.innerHTML=cur_player;
    spies = [];
    while(nb_of_spies>0){
        var randomindex = generateRandom(1, nb_of_players);
        if(!spies.includes(randomindex)){
            spies.push(randomindex)
            nb_of_spies--;
        }
    }
}
function new_game(){
    cur_player=1;
    startPage.style.display="flex";
    game.style.display="none";
}
function generateRandom(min, max) {

    // find diff
    max+=1;
    let difference = max - min;

    // generate random number 
    let rand = Math.random();

    // multiply with difference 
    rand = Math.floor( rand * difference);

    // add with min value 
    rand = rand + min;

    return rand;
}
function flip_card(){
    flip_card_inner.style.transform="rotateX(0deg)";
    if(word_revealed){
        word_revealed=false;
        cur_player++;
        player_nb.innerHTML=cur_player;
        if (cur_player>nb_of_players){
            new_game();
        }
    }else{
     flip_card_inner.style.transform="rotateX(180deg)";
        word_revealed=true;
        if (spies.includes(cur_player)){
            flip_card_back.innerHTML="You dirty lil. spy..";
        }else{
            flip_card_back.innerHTML=word;
        }
    }
}