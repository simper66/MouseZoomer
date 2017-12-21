var mouseZoomerButton = 0;
var mouseZoomerReset = false;
var mouseZoomerInvert = false;
var mouseZoomerSteps = 20;

var isMouseButtonDown = [false, false, false, false, false, false, false, false, false];

document.body.onmousedown = function(buttonEvent) {
    isMouseButtonDown[buttonEvent.button] = true;
    tryReset(buttonEvent);
};

document.body.onmouseup = function(buttonEvent) {
    isMouseButtonDown[buttonEvent.button] = false;
    tryReset(buttonEvent);
}

function tryReset(buttonEvent){
    if (mouseZoomerReset && isMouseButtonDown[0] && isMouseButtonDown[2]) {
        browser.runtime.sendMessage({"doReset": true});
    }
}

function doZoom(wheelEvent){
    if (isMouseButtonDown[mouseZoomerButton] && wheelEvent.detail != 0) {
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
    if (changes.mouseZoomerReset) {
        mouseZoomerButton = changes.mouseZoomerReset.newValue;
    }
    if (changes.mouseZoomerInvert) {
        mouseZoomerButton = changes.mouseZoomerInvert.newValue;
    }
}

function initMouseZoomerButton(savedMouseZoomerButton){
    mouseZoomerButton = savedMouseZoomerButton.mouseZoomerButton;
}

function initMouseZoomerReset(savedMouseZoomerReset){
    mouseZoomerReset = savedMouseZoomerReset.mouseZoomerReset;
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
browser.storage.local.get({ mouseZoomerReset: false}).then(initMouseZoomerReset, onError);
browser.storage.local.get({ mouseZoomerInvert: false}).then(initMouseZoomerInvert, onError);
browser.storage.local.get({ mouseZoomerSteps: 20}).then(initMouseZoomerSteps, onError);

document.addEventListener("DOMMouseScroll", doZoom, false);

browser.storage.onChanged.addListener(optionsChanged);
