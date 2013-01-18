// Ship the data for the current website off to the classification engine
chrome.extension.sendMessage({"op":"classify","data":document.documentElement.innerHTML}, function(response) {
    // no action.
});
