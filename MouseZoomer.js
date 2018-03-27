const MAX_ZOOM = 5;
const MIN_ZOOM = 0.3;

function getCurrentWindowTab() {
    return browser.tabs.query({active: true, currentWindow: true});
}

function setZoom(zoom) {
    return Math.max(Math.min(zoom, MAX_ZOOM), MIN_ZOOM);
}

function doZoomIn(currentZoom, steps) {
    return Math.min(currentZoom + steps, MAX_ZOOM);
}

function doZoomOut(currentZoom, steps) {
    return Math.max(currentZoom - steps, MIN_ZOOM);
}

function callOnActiveTab(action) {
    getCurrentWindowTab().then((tab) => {
        browser.tabs.getZoom(tab.id).then((currentZoom) => {
            if (action.resetTo) {
                browser.tabs.setZoom(tab.id, setZoom(action.resetTo/100));
            } else if (action.doZoom == "In") {
                browser.tabs.setZoom(tab.id, doZoomIn(currentZoom, action.steps/100));
            } else if (action.doZoom == "Out") {
                browser.tabs.setZoom(tab.id, doZoomOut(currentZoom, action.steps/100));
            }
        });
    });
}

browser.runtime.onMessage.addListener(callOnActiveTab);
