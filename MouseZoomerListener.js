var mouseZoomerButton = 0;

var isMouseButtonDown = [false, false, false, false, false, false, false, false, false];

document.body.onmousedown = function(event) {
    isMouseButtonDown[event.button] = true;
};

document.body.onmouseup = function(event) {
    isMouseButtonDown[event.button] = false;
}

function doZoom(wheelEvent){
    if (isMouseButtonDown[mouseZoomerButton] && wheelEvent.detail != 0) {
        wheelEvent.preventDefault();
        if (wheelEvent.detail>0) {
            browser.runtime.sendMessage({"doZoom": "Out"});
        } else {
            browser.runtime.sendMessage({"doZoom": "In"});
        }
    }
}

function optionsChanged(changes, area){
    if (changes.mouseZoomerButton) {
        mouseZoomerButton = changes.mouseZoomerButton.newValue;
    }
}

function initMouseZoomerButton(savedMouseZoomerButton){
    mouseZoomerButton = savedMouseZoomerButton.mouseZoomerButton;
}

function onError(error) {
}

browser.storage.local.get({ mouseZoomerButton: 0}).then(initMouseZoomerButton, onError);

document.addEventListener("DOMMouseScroll", doZoom, false);

browser.storage.onChanged.addListener(optionsChanged)