var mouseZoomerButton = 0;
//var mouseZoomerReset = false;
var mouseZoomerLeftRightEnabled = false;
var mouseZoomerLeftRight = 150;
var mouseZoomerRightLeftEnabled = false;
var mouseZoomerRightLeft = 100;
var mouseZoomerInvert = false;
var mouseZoomerSteps = 20;

var isMouseButtonDown = [false, false, false, false, false, false, false, false, false];

var zoomMade = false;
var resetMade = false;
var blockContextMenu = false;

document.body.onmousedown = function(buttonEvent) {
    isMouseButtonDown[buttonEvent.button] = true;
    if (mouseZoomerRightLeftEnabled && buttonEvent.button==0 && isMouseButtonDown[2]) {
        reset(mouseZoomerRightLeft);
    } else if (mouseZoomerLeftRightEnabled && buttonEvent.button==2 && isMouseButtonDown[0]) {
        reset(mouseZoomerLeftRight);
    }
};

document.body.onmouseup = function(buttonEvent) {
    if ( (buttonEvent.button==2) && (resetMade || (zoomMade && (buttonEvent.button==mouseZoomerButton))) ){
        zoomMade = false;
        resetMade = false;
        blockContextMenu = true;
    }
    isMouseButtonDown[buttonEvent.button] = false;
}

function reset(resetTo){
    resetMade = true;
    browser.runtime.sendMessage({"resetTo": resetTo});
}

function disableContextMenu(contextMenuEvent) {
    if (blockContextMenu) {
        contextMenuEvent.stopPropagation();
        //contextMenuEvent.preventDefault();
        blockContextMenu = false;
        return false;
    }
    return true;
}

function doZoom(wheelEvent){
    if (isMouseButtonDown[mouseZoomerButton] && wheelEvent.detail != 0) {
        zoomMade = true;
        wheelEvent.preventDefault();
        if (wheelEvent.detail>0) {
            browser.runtime.sendMessage({"doZoom": (mouseZoomerInvert?"In":"Out"), "steps": mouseZoomerSteps});
        } else {
            browser.runtime.sendMessage({"doZoom": (mouseZoomerInvert?"Out":"In"), "steps": mouseZoomerSteps});
        }
    }
}

function optionsChanged(changes, area){
    if (changes.mouseZoomerButton) {
        mouseZoomerButton = changes.mouseZoomerButton.newValue;
    }
    //if (changes.mouseZoomerReset) {
    //    mouseZoomerReset = changes.mouseZoomerReset.newValue;
    //}
    if (changes.mouseZoomerLeftRight) {
        mouseZoomerLeftRight = changes.mouseZoomerLeftRight.newValue;
    }
    if (changes.mouseZoomerRightLeft) {
        mouseZoomerRightLeft = changes.mouseZoomerRightLeft.newValue;
    }
    if (changes.mouseZoomerInvert) {
        mouseZoomerInvert = changes.mouseZoomerInvert.newValue;
    }
    if (changes.mouseZoomerSteps) {
        mouseZoomerSteps = changes.mouseZoomerSteps.newValue;
    }
}

function initMouseZoomerButton(savedMouseZoomerButton){
    mouseZoomerButton = savedMouseZoomerButton.mouseZoomerButton;
}

//function initMouseZoomerReset(savedMouseZoomerReset){
//    mouseZoomerReset = savedMouseZoomerReset.mouseZoomerReset;
//}

function initMouseZoomerLeftRightEnabled(savedInitMouseZoomerLeftRightEnabled){
    mouseZoomerLeftRightEnabled = savedInitMouseZoomerLeftRightEnabled.mouseZoomerLeftRightEnabled;
}

function initMouseZoomerLeftRight(savedMouseZoomerLeftRight){
    mouseZoomerLeftRight = savedMouseZoomerLeftRight.mouseZoomerLeftRight;
}

function initMouseZoomerRightLeftEnabled(savedInitMouseZoomerRightLeftEnabled){
    mouseZoomerRightLeftEnabled = savedInitMouseZoomerRightLeftEnabled.mouseZoomerRightLeftEnabled;
}

function initMouseZoomerRightLeft(savedMouseZoomerRightLeft){
    mouseZoomerRightLeft = savedMouseZoomerRightLeft.mouseZoomerRightLeft;
}

function initMouseZoomerInvert(savedMouseZoomerInvert){
    mouseZoomerInvert = savedMouseZoomerInvert.mouseZoomerInvert;
}

function initMouseZoomerSteps(savedMouseZoomerSteps){
    mouseZoomerSteps = savedMouseZoomerSteps.mouseZoomerSteps;
}

function onError(error) {
}

browser.storage.local.get({ mouseZoomerButton: 0}).then(initMouseZoomerButton, onError);
//browser.storage.local.get({ mouseZoomerReset: false}).then(initMouseZoomerReset, onError);
browser.storage.local.get({ mouseZoomerLeftRightEnabled: false}).then(initMouseZoomerLeftRightEnabled, onError);
browser.storage.local.get({ mouseZoomerLeftRight: 100}).then(initMouseZoomerLeftRight, onError);
browser.storage.local.get({ mouseZoomerRightLeftEnabled: false}).then(initMouseZoomerRightLeftEnabled, onError);
browser.storage.local.get({ mouseZoomerRightLeft: 100}).then(initMouseZoomerRightLeft, onError);
browser.storage.local.get({ mouseZoomerInvert: false}).then(initMouseZoomerInvert, onError);
browser.storage.local.get({ mouseZoomerSteps: 20}).then(initMouseZoomerSteps, onError);

document.addEventListener("DOMMouseScroll", doZoom, false);
//document.addEventListener("contextmenu", disableContextMenu, false);
document.oncontextmenu = disableContextMenu;

browser.storage.onChanged.addListener(optionsChanged);
