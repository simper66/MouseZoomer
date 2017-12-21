function save(e) {
    e.preventDefault();
    browser.storage.local.set({
        mouseZoomerButton: document.querySelector('input[name="mouseZoomerButton"]:checked').value
    });
    browser.storage.local.set({
        mouseZoomerReset: document.querySelector('input[name="mouseZoomerReset"]').checked
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
    function restoreMouseZoomerReset(option) {
        document.querySelector('input[name="mouseZoomerReset"]').checked = option.mouseZoomerReset;
    }
    function restoreMouseZoomerInvert(option) {
        document.querySelector('input[name="mouseZoomerInvert"]').checked = option.mouseZoomerInvert;
    }
    function restoreMouseZoomerSteps(option) {
        document.querySelector('input[name="mouseZoomerSteps"]').value = option.mouseZoomerSteps ? option.mouseZoomerSteps : 20;
    }
    function onError(error) {
    }
    browser.storage.local.get({ mouseZoomerButton: 0}).then(restoreMouseZoomerButton, onError);
    browser.storage.local.get({ mouseZoomerReset: 0}).then(restoreMouseZoomerReset, onError);
    browser.storage.local.get({ mouseZoomerInvert: 0}).then(restoreMouseZoomerInvert, onError);
    browser.storage.local.get({ mouseZoomerSteps: 0}).then(restoreMouseZoomerSteps, onError);
}

document.addEventListener("DOMContentLoaded", restore);
document.querySelector("form").addEventListener("submit", save);
