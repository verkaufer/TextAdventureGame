var score = 0; //initialize player score variable

var vistedLocs = []; //create array to record where player has visited. Updated via addVisited()

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


/*
Following 4 functions are called when the user presses buttons representing north, south, east, or west. Text is then input into textarea. 
*/
function btn_goNorth(){
    var setMsg ="You enter a room lined with books and a small fireplace sits inside the opposite wall. A fine Persian carpet fills the floor and the air is musky. It seems like no one has been in this room for a while.";
    if(hasVisited("north") === false){
        updateScore();
        addVisited("north");
       var txtBox = document.getElementById("storyText"); //set txtBox to contents of textbox
        txtBox.value = setMsg + "\n\n" + txtBox.value; //append new message to textbox
    }
    else{
        var txtBox = document.getElementById("storyText");
        txtBox.value = setMsg + "\n\n" + txtBox.value; //append new message to textbox
    }
}

function btn_goSouth(){
    var setMsg ="There is a double door at the end of the hallway. Several abstract paintings line the hallway. Some of these paintings are crooked.";
    if(hasVisited("south") === false){
        updateScore();
        addVisited("south");
       var txtBox = document.getElementById("storyText"); //set txtBox to contents of textbox
        txtBox.value = setMsg + "\n\n" + txtBox.value; //append new message to textbox
    }
    else{
        var txtBox = document.getElementById("storyText");
        txtBox.value = setMsg + "\n\n" + txtBox.value; //append new message to textbox
    }
}

function btn_goEast(){
    var setMsg ="You face a small window with cast iron bars welded to the outside. There is a piece of paper taped to the window.";
    if(hasVisited("east") === false){
        updateScore();
        addVisited("east");
       var txtBox = document.getElementById("storyText"); //set txtBox to contents of textbox
       txtBox.value = setMsg + "\n\n" + txtBox.value; //append new message to textbox
    }
    else{
        var txtBox = document.getElementById("storyText");
        txtBox.value = setMsg + "\n\n" + txtBox.value; //append new message to textbox
    }
}

function btn_goWest(){
        var setMsg ="You enter an immaculate kitchen with white walls and a linoleum floor. There is a small cellar door next to the counter.";
    if(hasVisited("west") === false){
        updateScore();
        addVisited("west");
       var txtBox = document.getElementById("storyText"); //set txtBox to contents of textbox
        txtBox.value = setMsg + "\n\n" + txtBox.value; //append new message to textbox
    }
    else{
        var txtBox = document.getElementById("storyText");
        txtBox.value = setMsg + "\n\n" + txtBox.value; //append new message to textbox
    }
}   