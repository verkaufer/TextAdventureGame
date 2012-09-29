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

function updateDisplay(message){ //fuction to add new text to textbox
    var msg = message;
    var txtBox = document.getElementById("storyText"); //set txtBox to contents of textbox
    txtBox.value = msg + "\n\n" + txtBox.value; //append new message to textbox
}

function updateLocation(location){
    currentLocation = location;
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
    else if(currentLocation === "library" && hasVisited("northendLibrary" === false)){
        var currentLocation = "northendLibrary";
        updateScore();
        addVisited("northendLibrary");
        var setMsg = "You walk towards a bookcase opposite the door. Most of these books seem fairly old and have accumulated years of dust. However, one book seems to have been recently added to this library. It is titled 'Escaping' by J.K. Yowling.";
        updateDisplay(setMsg);
    }
    else if(currentLocation === "library" && hasVisited("northendLibrary" === true)){
        var currentLocation = "northendLibrary";
        var setMsg = "You walk towards a bookcase opposite the door. Most of these books seem fairly old and have accumulated years of dust. However, one book seems to have been recently added to this library. It is titled 'Escaping' by J.K. Yowling.";
        updateDisplay(setMsg);
    }
    else{
        var setMsg ="You enter a room lined with books and a small fireplace sits inside the opposite wall. A fine Persian carpet fills the floor and the air is musky. It seems like no one has been in this room for a while.";
        updateDisplay(setMsg);
    }
}

function btn_goSouth(){
    var setMsg ="There is a double door at the end of the hallway. Several abstract paintings line the hallway. Some of these paintings are crooked.";
    if(hasVisited("artHall") === false){
        updateScore();
        addVisited("artHall");
        updateDisplay(setMsg);
    }
    else{
        updateDisplay(setMsg);
    }
}

function btn_goEast(){
    var setMsg ="You face a small window with cast iron bars welded to the outside. There is a piece of paper taped to the window.";
    if(hasVisited("windowWall") === false){
        updateScore();
        addVisited("windowWall");
        updateDisplay(setMsg);
    }
    else{
        updateDisplay(setMsg);
    }
}

function btn_goWest(){
        var setMsg ="You enter an immaculate kitchen with white walls and a linoleum floor. There is a small cellar door next to the counter.";
    if(hasVisited("kitchen") === false){
        updateScore();
        addVisited("kitchen");
        updateDisplay(setMsg);
    }
    else{
         updateDisplay(setMsg);
    }
}   

function enterCommand(){
    var validCommands = ["north","south","east","west","n","s","e","w"];
    var inputCmd = document.getElementById("commandBox").value; //set command to the value that was entered in commandBox
    //var command = inputCmd.value;

    if(validCommands.indexOf(inputCmd.toLowerCase()) != -1){ //convert string to lowercase, then determine if command is valid by searching validCommands array
        switch(inputCmd){

            case "n":
                btn_goNorth();
                break;

            case "north":
                btn_goNorth();
                break;

            case "s":
                btn_goSouth();
                break;

            case "south":
                btn_goSouth();
                break;

            case "e":
                btn_goEast();
                break;

            case "east":
                btn_goEast();
                break;

            case "w":
                btn_goWest();
                break;

            case "west":
                btn_goWest();
                break;

            default:
                setMsg="Please select a direction.";
                updateDisplay(setMsg);
        }

    }
    else{
        var setMsg = "This is not a valid command.";
        updateDisplay(setMsg);
    }
}