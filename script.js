var score = 0; //initialize player score variable

var vistedLocs = []; //create array to record where player has visited. Updated via addVisited()

var currentLocation = "home"; //current location of the user. Initialized as home.

//the init() function is called from the body when it loads. It will set the initial text inside the output textarea
function init(){
    var txtBox = document.getElementById("storyText");
    txtBox.value = "You wake up on plush carpet in a sparsely decorated room. You don't recognize where you are and feel uneased by how quiet it is. Looking around, you see 4 different ways out of this room. Perhaps someone else is here...";
}

function updateScore(setPoints){
                
    var addPoints; // value of points to be added to player's score
                
    if(setPoints == null){ //if the passed parameter is null, set default addPoints to 5
        addPoints = 5;
    }
    else{
        addPoints = setPoints;
    }
                
    score = score + addPoints; //add the defined number of points to player's score
                
    document.getElementById("score").innerHTML = score; //write this to the document div
                
}

function addVisited(location){ //add location user just visited to the visitedLocations array
    vistedLocs.push(location);
}

// the below code was sourced from Extreme Web Designs.com
function hasVisited(location){  //checks to see if user has already visited this location
    
    if(vistedLocs.indexOf(location) != -1){ //find if user has visted the passed location var already
        return true;
    }
    else{
        return false;
    }

}

//this function is just a cleaner way for me to remember to update the location of the user when they go to any location
function updateLocation(location){ 
    currentLocation = location;
}

function updateDisplay(message){ //fuction to add new text to textbox
    var msg = message;
    var txtBox = document.getElementById("storyText"); //set txtBox to contents of textbox
    txtBox.value = msg + "\n\n" + txtBox.value; //append new message to textbox
}



/*
Following 4 functions are called when the user presses buttons representing north, south, east, or west. Text is then input into textarea. 
*/
function btn_goNorth(){
    
    if(hasVisited("library") === false && currentLocation === "home"){
        libraryMain();
        updateScore();
    }
    else if(currentLocation === "library" && hasVisited("northendLibrary") === false){
         northEndLibrary();
         updateScore();
    }
    else if(currentLocation === "library" && hasVisited("northendLibrary") === true){
         northEndLibrary();
    }
    else{
         libraryMain();
    }
}

function btn_goSouth(){
    
    if(currentLocation === "northendLibrary"){
         libraryMain();
    }
    else if(hasVisited("artHall") === false && currentLocation === "home"){
        artHall();
        updateScore();
    }
    else{
        artHall();
    }
}

function btn_goEast(){
    
    if(hasVisited("windowWall") === false){
        updateScore();
        windowWall();

    }
    else{
        windowWall();
    }
}

function btn_goWest(){
    if(hasVisited("kitchen") === false){ //have they visited the kitchen? If not, add to their score. If they have visited, do not add points to their score. 
        updateScore();
        kitchen();

    }
    else{
        kitchen();
    }
}   



function listCommands(){
    var setMsg = "Here are some valid commands: \n\n Directions can be written as the full word, North, or as the first letter, N. Action commands to go to certain areas follow the syntax 'enter ____' ";
    updateDisplay(setMsg);
}

function enterCommand(){
    var validCommands = ["north","south","east","west","n","s","e","w","enter cellar","commands"];
    var inputCmd = document.getElementById("commandBox").value; //set command to the value that was entered in commandBox

    if(validCommands.indexOf(inputCmd.toLowerCase()) != -1){ //convert string to lowercase, then determine if command is valid by searching validCommands array
        switch(inputCmd){

            case "n": //north
                btn_goNorth();
                break;

            case "north":
                btn_goNorth();
                break;

            case "s": //south
                btn_goSouth();
                break;

            case "south":
                btn_goSouth();
                break;

            case "e": //east
                btn_goEast();
                break;

            case "east":
                btn_goEast();
                break;

            case "w": //west
                btn_goWest();
                break;

            case "west":
                btn_goWest();
                break;

            case "enter cellar": //enter ___ command for cellar. Calls enterCellar() 
                enterCellar();
                break;

            case "commands":
                listCommands();
                break;

            default:
                setMsg="Please select a direction. If you need help, enter 'commands' without quotes in the input box.";
                updateDisplay(setMsg);
        }

    }
    else{ //invalid command
        var setMsg = "This is not a valid command. For help with commands, please type 'commands' without quotations into the input box.";
        updateDisplay(setMsg);
    }

    //now let's clear out the command box 
    document.getElementById("commandBox").value = "";
}

