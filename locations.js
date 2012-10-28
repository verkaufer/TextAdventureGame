/*begin location functions
// these functions are assigned to one location each
*/

function libraryMain(){
        var setMsg ="You enter a room lined with books and a small fireplace sits inside the opposite wall. A fine Persian carpet fills the floor and the air is musky. It seems like no one has been in this room for a while.";
        addVisited("library");
        updateDisplay(setMsg);
        updateLocation("library");
}

function northEndLibrary(){
    var setMsg = "You walk towards a bookcase opposite the door. Most of these books seem fairly old and have accumulated years of dust. However, one book seems to have been recently added to this library. It is titled 'Escaping' by Randy Butternubs.";
        updateDisplay(setMsg);
        updateLocation("northendLibrary");
        addVisited("northendLibrary");
}

function artHall(){
    var setMsg ="There is a double door at the end of the hallway. Several abstract paintings line the hallway. Some of these paintings are crooked.";
    addVisited("artHall");
    updateDisplay(setMsg);
    updateLocation("artHall");
}

function windowWall(){

    if(hasItem('map')){
        var setMsg ="You face a small window with cast iron bars welded to the outside. There is tape residue from the map you took.";
    }
    else{
        var setMsg ="You face a small window with cast iron bars welded to the outside. There is a piece of paper taped to the window.";
    }
    
    addVisited("windowWall");
    updateDisplay(setMsg);
    updateLocation("windowWall");
}

function kitchen(){
    var setMsg ="You enter an immaculate kitchen with white walls and a linoleum floor. There is a small cellar door next to the counter. \n\n **HINT: The next step requires textbox input!**";
    addVisited("kitchen");
    updateDisplay(setMsg);
    updateLocation("kitchen");

}

function viewPainting(){
    var setMsg = "You turn and look at the crooked painting. It's a family portrait, but none of these people have faces. The exposed wall where the painting is tilted away from seems a lot cleaner than the rest of the wall...";
    updateDisplay(setMsg);
    addVisited("painting");
    updateLocation("painting");
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