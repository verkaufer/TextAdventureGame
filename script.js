var score = 0; //initialize player score variable

var vistedLocs = []; //create array to record where player has visited. Updated via addVisited()

var currentLocation = "home"; //current location of the user. Initialized as home.

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
        var setMsg ="You enter a room lined with books and a small fireplace sits inside the opposite wall. A fine Persian carpet fills the floor and the air is musky. It seems like no one has been in this room for a while.";
        updateScore();
        addVisited("library");
        updateDisplay(setMsg);
        updateLocation("library");
    }
    else if(currentLocation === "library" && hasVisited("northendLibrary") === false){
        updateLocation("northendLibrary");
        updateScore();
        addVisited("northendLibrary");
        var setMsg = "You walk towards a bookcase opposite the door. Most of these books seem fairly old and have accumulated years of dust. However, one book seems to have been recently added to this library. It is titled 'Escaping' by Randy Butternuts.";
        updateDisplay(setMsg);
    }
    else if(currentLocation === "library" && hasVisited("northendLibrary") === true){
        updateLocation("northendLibrary");
        var setMsg = "You walk towards a bookcase opposite the door. Most of these books seem fairly old and have accumulated years of dust. However, one book seems to have been recently added to this library. It is titled 'Escaping' by Randy Butternut.";
        updateDisplay(setMsg);
    }
    else{
        var setMsg ="You enter a room lined with books and a small fireplace sits inside the opposite wall. A fine Persian carpet fills the floor and the air is musky. It seems like no one has been in this room for a while.";
        updateDisplay(setMsg);
        updateLocation("library");
    }
}

function btn_goSouth(){
    var setMsg ="There is a double door at the end of the hallway. Several abstract paintings line the hallway. Some of these paintings are crooked.";
    if(hasVisited("artHall") === false && currentLocation === "home"){
        updateScore();
        addVisited("artHall");
        updateDisplay(setMsg);
        updateLocation("artHall");
    }
    else if(currentLocation === "northendLibrary"){
        var setMsg ="You enter a room lined with books and a small fireplace sits inside the opposite wall. A fine Persian carpet fills the floor and the air is musky. It seems like no one has been in this room for a while.";
        updateDisplay(setMsg);
        updateLocation("library");
    }
    else{
        updateDisplay(setMsg);
        updateLocation("artHall");
    }
}

function btn_goEast(){
    var setMsg ="You face a small window with cast iron bars welded to the outside. There is a piece of paper taped to the window.";
    if(hasVisited("windowWall") === false){
        updateScore();
        addVisited("windowWall");
        updateDisplay(setMsg);
        updateLocation("windowWall");
    }
    else{
        updateDisplay(setMsg);
        updateLocation("windowWall");
    }
}

function btn_goWest(){
        var setMsg ="You enter an immaculate kitchen with white walls and a linoleum floor. There is a small cellar door next to the counter. \n\n **HINT: The next step requires textbox input!**";
    if(hasVisited("kitchen") === false){ //have they visited the kitchen? If not, add to their score. If they have visited, do not add points to their score. 
        updateScore();
        addVisited("kitchen");
        updateDisplay(setMsg);
        updateLocation("kitchen");
    }
    else{
         updateDisplay(setMsg);
         updateLocation("kitchen");
    }
}   

//enter cellar if and ONLY IF they are in the kitchen. If they are not coming from the kitchen, throw invalid command error
function enterCellar(){ 
     var setMsg = "You open the door and descend the stairs to the cellar. The cellar has a dirt floor and rotten wooden posts supporting the ceiling. Suddenly, a growling dog approaches you. He doesn't seem friendly!";
    if(hasVisited("cellar") === false && currentLocation === "kitchen"){
        updateScore(10);
        addVisited("cellar");
        updateDisplay(setMsg);
        updateLocation("cellar");
    }
    else if(currentLocation === "kitchen" && hasVisited("cellar") === true){
        currentLocation = "cellar";
        updateDisplay(setMsg);
    }
    else if (currentLocation != "kitchen"){
        setMsg = "Invalid command. Please try another command.";
        updateDisplay(setMsg);
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