chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        var icons = {"p":"icons/greenrobot.png","n":"icons/redrobot.png"};
        if (request.op === "classify") {
            var classification = CE.classify(CE.featurize(request.data),classifier);
            chrome.pageAction.setIcon({tabId:sender.tab.id, path:icons[classification]});
            chrome.pageAction.show(sender.tab.id);
        }
        sendResponse({resolution: "Done."});
    });