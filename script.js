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

//updateInvetory will take the item name and either add it to the inventory array if action = add or delete if action = delete
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

            // var invIndex = inventory.indexOf(item);
            //    if (invIndex !=-1){
            //        inventory.splice(invIndex)
            //    }

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
    else if(currentLocation === "southArtHallway"){
        artHall();
    }
    else if(currentLocation === "artHall" || currentLocation === "painting"){
        startingLocation();
    }
    else{
         libraryMain();
    }
}

function btn_goSouth(){
    
    if(currentLocation === "northendLibrary"){
         libraryMain();
    }
    else if(currentLocation === "library"){
        startingLocation();
    }
    else if(hasVisited("artHall") === false && currentLocation === "home"){
        artHall();
        updateScore();
    }
    else if(currentLocation === "artHall" || currentLocation === "painting"){
        southArtHallway();
    }
    else{
        artHall();
    }
}

function btn_goEast(){
        
    if(currentLocation === "kitchen"){
        startingLocation();
    }
    else if(currentLocation === "artHall" && hasVisited("painting") === false){
        viewPainting();
        updateScore(15);
    }
    else if(currentLocation === "artHall"){

        viewPainting();
    }
    else if (currentLocation === "painting"){
        tunnel();
    }
    else if(currentLocation === "home" && hasVisited("windowWall") === false){
        updateScore();
        windowWall();
    }
    else{
        windowWall();

    }
}

function btn_goWest(){
    if(currentLocation === "windowWall"){
        startingLocation();
    }
    else if(currentLocation === "tunnel"){
        viewPainting();
    }
    else if(currentLocation === "home" && hasVisited("kitchen") === false){ //have they visited the kitchen? If not, add to their score. If they have visited, do not add points to their score. 
        updateScore();
        kitchen();
    }
    else{
        kitchen();
    }
}   

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

function takePainting(){

    if(currentLocation === "painting" && !hasItem("painting")){
        var setMsg = "You take the crooked painting off the wall. There was a tunnel behind it!";
        updateScore(15);
        updateDisplay(setMsg);

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
    if(currentLocation === "tunnel" && !hasItem("key")){
        var setMsg = "You take the skeleton key. It has the word 'escape' engraved on the handle and looks quite old.";
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

function listCommands(){
    var setMsg = "Here are some valid commands: \n\n Directions can be written as the full word, North, or as the first letter, N. Action commands to go to certain areas follow the syntax 'enter ____' ";
    updateDisplay(setMsg);
}

function enterCommand(){
    var validCommands = ["north","south","east","west","n","s","e","w","enter cellar","commands", "take paper", "view painting", "exit cellar", "take painting", "take key"];
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

function popupMap(){
    window.open( "game_map.png", "myWindow", 
    "status = 1, height = 300, width = 300, resizable = 0" );
}