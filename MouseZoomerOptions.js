function save(e) {
    e.preventDefault();
    browser.storage.local.set({
        mouseZoomerButton: document.querySelector('input[name="mouseZoomerButton"]:checked').value
    });
}

function restore() {
    function selectSavedMouseZoomerButton(savedMouseZoomerButton) {
        document.querySelector('#\\3'+savedMouseZoomerButton.mouseZoomerButton+' ').checked = true;
    }
    function onError(error) {
    }
    browser.storage.local.get({ mouseZoomerButton: 0}).then(selectSavedMouseZoomerButton, onError);
}

document.addEventListener("DOMContentLoaded", restore);
document.querySelector("form").addEventListener("submit", save);
