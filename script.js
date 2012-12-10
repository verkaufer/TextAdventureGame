//jquery effects code
  $(document).ready(function(){
    
    $("#expand").click(function () {
      $("#invBox").slideToggle("fast");
    });

    //following is necessary to remove disable attribute when loading the page
     $('#northButton').removeAttr('disabled');
     $('#southButton').removeAttr('disabled');
     $('#eastButton').removeAttr('disabled');
     $('#westButton').removeAttr('disabled');
  });

//end jQuery effects code

var score = 0; //initialize player score variable

var vistedLocs = []; //create array to record where player has visited. Updated via addVisited()

var inventory = []; //initialize the inventory for the user

var currentLocation = "home"; //current location of the user. Initialized as home.


//the init() function is called from the body when it loads. It will set the initial text inside the output textarea
function init(){
    var txtBox = document.getElementById("storyText");
    txtBox.value = "You wake up on plush carpet in a sparsely decorated room. You don't recognize where you are and feel uneased by how quiet it is. Looking around, you see 4 different ways out of this room. Perhaps someone else is here...";
}

function updateScore(setPoints){
                
    var addPoints; // value of points to be added to player's score
                
    if(setPoints === null){ //if the passed parameter is null, set default addPoints to 5
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
    
    if(vistedLocs.indexOf(location) !== -1){ //find if user has visted the passed location var already
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

/**********************************************************************************
/ Inventory functions
***********************************************************************************/

function itemObj(_id, _name, _description){

    this.id = _id;
    this.name = _name;
    this.description = _description;

    this.toString = function(){
        var returnVariable = "";

        returnVariable = this.description + "\n You earned " + this.points +" points.";
        return returnVariable;
    };
}

//updateInventory will take the item name and either add it to the inventory array if action = add or delete if action = delete
function updateInventory(item, action){

    switch(action){

        case "add":
            inventory.push(item);
            break;

        case "delete":

            //taken and modified from StackOverflow.com 
            //this loop search through the array inventory looking for the value of "item". When found, it deletes the item.
            for(var i in inventory){ 
                if(inventory[i] === item){
                array.splice(i,1);
                break;
                }
            }    
            break;

        default:
            setMsg = "Error encountered. Please try again.";
            updateDisplay(setMsg);
            break;
    }

}

//updates #invBox div with new item 
function updateInventoryDisplay(newItem, action){

    if(action === "add" && newItem === "map"){
        $("#invBox").append("<span id='"+newItem+"' class='item' onClick='popupMap()'>"+newItem+"</span>");
    }
    else if(action === "add"){
         $("#invBox").append("<span id='"+newItem+"' class='item'>"+newItem+"</span>");
    }
    else{ //delete the item
        $("#"+newItem+"").remove();
    }


}

//checks if user has the item passed to the function
function hasItem(item){
  
    if(inventory.indexOf(item) != -1){ //find if user has item passed to function
        return true;
    }
    else{
        return false;
    }

}

/**********************************************************************************
/ End Inventory functions
***********************************************************************************/

//called to enable all the directions
function enableAllDirections(){
    
     $('#northButton').removeAttr('disabled');
     $('#southButton').removeAttr('disabled');
     $('#eastButton').removeAttr('disabled');
     $('#westButton').removeAttr('disabled');

}

//disables a direction one at a time via jQuery
function disableDirection(dir){

    switch(dir){

        case "north":
            $('#northButton').attr('disabled', 'disabled');
            break;
        case "south":
            $('#southButton').attr('disabled', 'disabled');
            break;

        case "east":
            $('#eastButton').attr('disabled', 'disabled');
            break;

        case "west":
            $('#westButton').attr('disabled', 'disabled');
            break;

        default:
            $("#northButton");
            break;
    }


}

//enables individual directions. This is necessary for a couple of the specific item usage commands
function enableDirection(dir){
        switch(dir){

        case "north":
            $('#northButton').removeAttr('disabled');
            break;
        case "south":
            $('#southButton').removeAttr('disabled');
            break;

        case "east":
            $('#eastButton').removeAttr('disabled');
            break;

        case "west":
            $('#westButton').removeAttr('disabled');
            break;

        default:
            $("#northButton");
            break;
    }
}

/*
Following 4 functions are called when the user presses buttons representing north, south, east, or west. Text is then input into textarea. 
*/
function btn_goNorth(){

    var direction = "north";

    if(locationMatrix[currentLocation][direction] !== -1){ //if the direction they want to go is valid (based on current location and direction)
        updateDisplay(locationMatrix[currentLocation][direction]); //update the display with the js closure data

        if(!hasVisited(locationMatrix[currentLocation][direction].name)){ //have they visited this place before?
            updateScore(locationMatrix[currentLocation][direction].points); //if not, give them the points from the prototype
        }
        addVisited(locationMatrix[currentLocation][direction].name); //add the location to visited array
        currentLocation = locationMatrix[currentLocation][direction].name; //this successfully changes the current location to what "name" is set as in the playerLocation prototype.
        checkNavButtons(currentLocation); //then run through the nav buttons to see which directions are valid
    } 
    
}

function btn_goSouth(){
    

    var direction = "south";

    if(locationMatrix[currentLocation][direction] !== -1){
        updateDisplay(locationMatrix[currentLocation][direction]);

        if(!hasVisited(locationMatrix[currentLocation][direction].name)){ //have they visited this place before?
            updateScore(locationMatrix[currentLocation][direction].points); //if not, give them the points from the prototype
        }
        addVisited(locationMatrix[currentLocation][direction].name); //add the location to visited array
        currentLocation = locationMatrix[currentLocation][direction].name; //this successfully changes the current location to what "name" is set as in the playerLocation prototype.
        checkNavButtons(currentLocation);
    } 

}

function btn_goEast(){
        
    var direction = "east";

    if(locationMatrix[currentLocation][direction] !== -1){
        updateDisplay(locationMatrix[currentLocation][direction]);

        if(!hasVisited(locationMatrix[currentLocation][direction].name)){ //have they visited this place before?
            updateScore(locationMatrix[currentLocation][direction].points); //if not, give them the points from the prototype
        }
        addVisited(locationMatrix[currentLocation][direction].name); //add the location to visited array
        currentLocation = locationMatrix[currentLocation][direction].name; //this successfully changes the current location to what "name" is set as in the playerLocation prototype.
        checkNavButtons(currentLocation);
    }  

}
function btn_goWest(){

    var direction = "west";

    if(locationMatrix[currentLocation][direction] !== -1){
        updateDisplay(locationMatrix[currentLocation][direction]);

        if(!hasVisited(locationMatrix[currentLocation][direction].name)){ //have they visited this place before?
            updateScore(locationMatrix[currentLocation][direction].points); //if not, give them the points from the prototype
        }
        addVisited(locationMatrix[currentLocation][direction].name); //add the location to visited array
        currentLocation = locationMatrix[currentLocation][direction].name; //this successfully changes the current location to what "name" is set as in the playerLocation prototype.
        checkNavButtons(currentLocation);
    } 


}   


//prints out the inventory for user in the textbox if they want to. This is also displayed in the dropdown below the textbox.
function listInventory(){
    for(i=0; i<inventory.length;i++){
        updateDisplay("-"+inventory[i]);
    }
    updateDisplay("Inventory:");
}

//called when the player wants to take the paper from the window
function takePaper(){

    if(currentLocation === "windowWall" && !hasItem("map")){
        var setMsg = "You take the paper and read it. It seems to be a crudely drawn map of some location. Maybe it's for this house?";
        updateDisplay(setMsg);

        //add map to inventory
        var item = "map";
        var action = "add";
        updateInventory(item, action);
        updateInventoryDisplay(item, action);
    }
    else{
        var setMsg = "You can't do that here!";
        updateDisplay(setMsg);
    }



}


//called when they want to take the painting off the wall
function takePainting(){

    if(currentLocation === "painting" && !hasItem("painting")){ //only if they are standing by the painting and don't have the painting item
        var setMsg = "You take the crooked painting off the wall. There was a tunnel behind it!";
        updateScore(15);
        updateDisplay(setMsg);

        currentLocation = "holeInWall";
        enableDirection("east");


        //add painting to inventory
        var item = "painting";
        var action = "add";
        updateInventory(item, action);
        updateInventoryDisplay(item, action);
    }
    else{
        setMsg = "You can't do that here!";
        updateDisplay(setMsg);
    }

  
}

function takeKey(){
    if(currentLocation === "tunnel" && !hasItem("key")){ //only if they are in the tunnel and don't have the key
        var setMsg = "You take the skeleton key. It has the word 'escape' engraved on the handle and looks quite old. You should probably take this now. It doesn't seem like you'll be able to get back in here!";
        updateScore(20);
        updateDisplay(setMsg);

        var item = "key";
        var action = "add";
        updateInventory(item, action);
        updateInventoryDisplay(item, action);
    }
    else{
        setMsg = "You can't do that here! There aren't any keys to pick up, doofus!";
        updateDisplay(setMsg);
    }
}

function useKey(){
    if(currentLocation === "southArtHallway" && hasItem("key")){ //only if they are in the south hallway and have the key
        var setMsg = "You put the key into the door and unlock it. The door slowly swings open and nothing else happens. Whelp. Guess you have to go forward.";
        updateScore(25);
        updateDisplay(setMsg);

        currentLocation = "unlockedDoor";
        enableDirection("south");

    }
    else{
        setMsg = "You can't do that here, doofus!";
        updateDisplay(setMsg);
    }
}

function hangPainting(){
    if(currentLocation === "emptyPainting" && hasItem("painting")){ //only if they have the painting and they're standing in front of the empty painting spot
        var setMsg = "You hang the painting and watch it slowly sink down the wall. The hook must have been connected to some kind of lever. You hear a door unlock at the end of the hall.";
        updateScore(35);
        updateDisplay(setMsg);

        currentLocation = "hungPainting";
        enableDirection("south");

    }
    else {
        setMsg = "Can't do that here. What are you even thinking trying to pull that kind of stunt?";
        updateDisplay(setMsg);
    }
}

//I know this is ugly, but I wanted something simple.
//Pops up a window that displays the map image if the user has the map
function popupMap(){
    window.open( "game_map.png", "myWindow", 
    "status = 1, height = 300, width = 300, resizable = 0" );
}

//lists out a manual for commands for the user. Called via a command in the text input. The data is displayed in the textbox. 
function listCommands(){
    var setMsg = "Here are some valid commands: \n\n Directions can be written as the full word, North, or as the first letter, N. Action commands to go to certain areas follow the syntax 'enter ____'. \nTaking items requires using take ____ syntax. \nView inventory by typing inventory or clicking the plus icon. ";
    updateDisplay(setMsg);
}

//this is for the command box for users who want to enter commands via text instead of the directional buttons
function enterCommand(){
    var validCommands = ["north","south","east","west","n","s","e","w","enter cellar","commands", "take paper", "view painting", "exit cellar", "take painting", "take key", "inventory", "use key", "hang painting"];
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

            case "take paper":
                takePaper();
                break;

            case "view painting":
                viewPainting();
                break;

            case "exit cellar":
                exitCellar();
                break;

            case "take painting":
                takePainting();
                break;

            case "take key":
                takeKey();
                break;

            case "inventory":
                listInventory();
                break;

            case "use key":
                useKey();
                break;

            case "hang painting":
                hangPainting();
                break;

            default:
                setMsg="Invalid command. If you need help, enter 'commands' without quotes in the input box.";
                updateDisplay(setMsg);
                break;
        }

    }
    else{ //invalid command
        var setMsg = "This is not a valid command. For help with commands, please type 'commands' without quotations into the input box.";
        updateDisplay(setMsg);
    }

    //now let's clear out the command box 
    document.getElementById("commandBox").value = "";
}

