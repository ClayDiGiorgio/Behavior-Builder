
// ======================
//
// Global Vars
//
// ======================

var states = [];
var currentLoadedStateIndex = 0;


var sdTranslation = [0, 0];

var sdCanvas   = document.getElementById("FSMDisplayCanvas");
var sdcContext = canvas.  getContext("2d");

var drawConstants = {
    stateWidth:100, 
    stateHeight:75,
    stateNameFont:"30px Arial"
};

var transitionContainer = document.getElementById("transitions-container");
var transitionEntryHTML = '<div class="single-transition-container" id="transition-0">   \
                               <span class="inline-vertical-list">                       \
                                   <button>^</button>                                    \
                                   <button>v</button>                                    \
                               </span>                                                   \
                               <input type="text" name="transitionCondition0" class="transitionConditionTextEntry"> <input type="text" name="transitionDestination0" class="gotoTextEntry"> <input class="waitCheckbox" type="checkbox" name="waitForPreviousFinish0">  \
                           </div>                                                        \
                                                                                         \
                           <center><div class="horizontal-line"></div></center>';

var stateScriptInput = document.getElementById("behavior-code");
var stateNameInput   = document.getElementById("state-name-entry");

// ======================
//
// Setup Code
//
// ======================

addNewState();
updateStateDiagram();
addNewTransition();
console.log("BehaviorBuilderCore active");


// ======================
//
// UTIL
//
// ======================

function rand(min, max) {
    return Math.floor(Math.random() * (max-min)) + min;
}

// returns a hex string for a random color, followed by a hex string for a contrasting color (b or w)
function randColor() {
    var r = rand(0,255);
    var g = rand(0,255); 
    var b = rand(0,255);
    
    var brightness = r/3.0 + g/3.0 + b/3.0;
    var contrast = "";
    if(brightness > 128)
        contrast = "#101010";
    else
        contrast = "#FFFFFF";
        
    return ["#"+r.toString(16)+g.toString(16)+b.toString(16), contrast];
}
// ======================
//
// Logic
//
// ======================

// internal use
function newEmptyState() {
    var color = randColor();
    
    return {
        name: "NewState", 
        transitions:[], 
        scriptText:"", 
        drawData: {
            x:rand(0,100), 
            y:rand(0,100), 
            rgb:color[0],
            contrastColor:color[1]
        }
    };
}
function newTransition() {
    return {
        to: "",
        condition: "",
        activateImmediately:false
    };
}

function addNewState() {
    states.push(newEmptyState());
    console.log("added new state: " + states);
    updateStateDiagram();
}

function addNewTransition() {
    transitionContainer.insertAdjacentHTML( 'beforeend', transitionEntryHTML);
    states[currentLoadedStateIndex].transitions.push(newTransition());
}

function onCanvasClick(e) {
    
}

function saveEditedState() {
    var state = states[currentLoadedStateIndex];
    state.name       = stateNameInput.  value;
    state.scriptText = stateScriptInput.value; 
}

function loadStateToEditor(stateIndex) {
    saveEditedState();
    
    currentLoadedStateIndex = stateIndex;
    state = states[stateIndex];
    stateNameInput.  value = state.name;
    stateScriptInput.value = state.scriptText;
}

function exportJSON(e) {
    saveEditedState();
    
    var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(states));
    
    e.setAttribute("href", "data:"+data);
    e.setAttribute("download", "behavior.json");
}

function importJSON(e) {
    // read JSON from file
    var input = document.createElement('input');
    input.type = 'file';

    input.onchange = e => { 
        // getting a hold of the file reference
        var file = e.target.files[0]; 

        // setting up the reader
        var reader = new FileReader();
        reader.readAsText(file,'UTF-8');

        // here we tell the reader what to do when it's done reading...
        reader.onload = readerEvent => {
            var content = readerEvent.target.result; // this is the content!
            console.log( content );
            
            states = JSON.parse();
    
            loadStateToEditor(0);       
        }

    }

    input.click();
}


// ======================
//
// Drawing
//
// ======================
    
function updateStateDiagram() {
    sdcContext.fillSyle = "#000000";
    sdcContext.fill();
    
    for(var i in states) {
        var state = states[i];
        sdcContext.fillStyle = state.drawData.rgb;
        sdcContext.fillRect(state.drawData.x + sdTranslation[0], 
                            state.drawData.y + sdTranslation[1], 
                            drawConstants.stateWidth, 
                            drawConstants.stateHeight);
        
        sdcContext.fillStyle = "white";//state.drawData.contrastColor;
        sdcContext.font = drawConstants.stateNameFont;
        var textSize = sdcContext.measureText('M');
        var nameWidth = textSize.width * state.name.length*2/3;
        var nameHeight = textSize.height;
        sdcContext.fillText(state.name, 
                            state.drawData.x+drawConstants.stateWidth/2-nameWidth/2 + sdTranslation[0], 
                            state.drawData.y+drawConstants.stateHeight/2 + sdTranslation[1]); 
        
        sdcContext.fillStyle = "black";
        sdcContext.strokeText(state.name, 
                            state.drawData.x+drawConstants.stateWidth/2-nameWidth/2 + sdTranslation[0], 
                            state.drawData.y+drawConstants.stateHeight/2 + sdTranslation[1]); 
        
    }
}

