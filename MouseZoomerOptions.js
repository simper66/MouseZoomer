function save(e) {
    e.preventDefault();
    browser.storage.local.set({
        mouseZoomerButton: document.querySelector('input[name="mouseZoomerButton"]:checked').value
    });
    //browser.storage.local.set({
    //    mouseZoomerReset: document.querySelector('input[name="mouseZoomerReset"]').checked
    //});
    browser.storage.local.set({
        mouseZoomerLeftRightEnabled: document.querySelector('input[name="mouseZoomerLeftRightEnabled"]').checked
    });
    browser.storage.local.set({
        mouseZoomerLeftRight: document.querySelector('input[name="mouseZoomerLeftRight"]').value
    });
    browser.storage.local.set({
        mouseZoomerRightLeftEnabled: document.querySelector('input[name="mouseZoomerRightLeftEnabled"]').checked
    });
    browser.storage.local.set({
        mouseZoomerRightLeft: document.querySelector('input[name="mouseZoomerRightLeft"]').value
    });
    browser.storage.local.set({
        mouseZoomerInvert: document.querySelector('input[name="mouseZoomerInvert"]').checked
    });
    browser.storage.local.set({
        mouseZoomerSteps: document.querySelector('input[name="mouseZoomerSteps"]').value
    });
}

function restore() {
    function restoreMouseZoomerButton(option) {
        document.querySelector('#\\3'+option.mouseZoomerButton+' ').checked = true;
    }
    //function restoreMouseZoomerReset(option) {
    //    document.querySelector('input[name="mouseZoomerReset"]').checked = option.mouseZoomerReset;
    //}
    function restoreMouseZoomerLeftRightEnabled(option) {
        document.querySelector('input[name="mouseZoomerLeftRightEnabled"]').checked = option.mouseZoomerLeftRightEnabled;
    }
    function restoreMouseZoomerLeftRight(option) {
        document.querySelector('input[name="mouseZoomerLeftRight"]').value = option.mouseZoomerLeftRight;
    }
    function restoreMouseZoomerRightLeftEnabled(option) {
        document.querySelector('input[name="mouseZoomerRightLeftEnabled"]').checked = option.mouseZoomerRightLeftEnabled;
    }
    function restoreMouseZoomerRightLeft(option) {
        document.querySelector('input[name="mouseZoomerRightLeft"]').value = option.mouseZoomerRightLeft;
    }
    function restoreMouseZoomerInvert(option) {
        document.querySelector('input[name="mouseZoomerInvert"]').checked = option.mouseZoomerInvert;
    }
    function restoreMouseZoomerSteps(option) {
        document.querySelector('input[name="mouseZoomerSteps"]').value = option.mouseZoomerSteps;
    }
    function onError(error) {
    }
    browser.storage.local.get({ mouseZoomerButton: 0}).then(restoreMouseZoomerButton, onError);
    //browser.storage.local.get({ mouseZoomerReset: 0}).then(restoreMouseZoomerReset, onError);
    browser.storage.local.get({ mouseZoomerLeftRightEnabled: false}).then(restoreMouseZoomerLeftRightEnabled, onError);
    browser.storage.local.get({ mouseZoomerLeftRight: 150}).then(restoreMouseZoomerLeftRight, onError);
    browser.storage.local.get({ mouseZoomerRightLeftEnabled: false}).then(restoreMouseZoomerRightLeftEnabled, onError);
    browser.storage.local.get({ mouseZoomerRightLeft: 100}).then(restoreMouseZoomerRightLeft, onError);
    browser.storage.local.get({ mouseZoomerInvert: false}).then(restoreMouseZoomerInvert, onError);
    browser.storage.local.get({ mouseZoomerSteps: 20}).then(restoreMouseZoomerSteps, onError);
}

document.addEventListener("DOMContentLoaded", restore);
document.querySelector("form").addEventListener("submit", save);
