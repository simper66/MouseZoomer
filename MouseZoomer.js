const ZOOM_INCREMENT = 0.2;
const MAX_ZOOM = 5;
const MIN_ZOOM = 0.3;

function getCurrentWindowTab() {
    return browser.tabs.query({active: true, currentWindow: true});
}

function doZoomIn(currentZoom) {
    return Math.min(currentZoom + ZOOM_INCREMENT, MAX_ZOOM);
}

function doZoomOut(currentZoom) {
    console.log("doZoomOut");
    return Math.max(currentZoom - ZOOM_INCREMENT, MIN_ZOOM);
}

function callOnActiveTab(action) {
    getCurrentWindowTab().then((tab) => {
        browser.tabs.getZoom(tab.id).then((currentZoom) => {
            if (action.doZoom == "In") {
                browser.tabs.setZoom(tab.id, doZoomIn(currentZoom));
            } else if (action.doZoom == "Out") {
                browser.tabs.setZoom(tab.id, doZoomOut(currentZoom));
            }
        });
    });
}

browser.runtime.onMessage.addListener(callOnActiveTab);
