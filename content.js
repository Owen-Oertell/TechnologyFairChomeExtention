/*This checks the URL to be selected good or bad which then sends that message to background.js
which then actually notifies the user of their selection with a Chrome Rich Notification*/
window.onload = function() {
    url = window.location.href;
    title = document.title;
    
    /* The Chrome storage takes the URL that is being accessed to notify the user*/
    chrome.storage.sync.get(["master"], function(result) {
        /*The correct master URL is put to a variable*/
        var res = result["master"];

        // First figure out if a judgmenet has been passed already
        //If it's not undefined then that means there is a master cookie for URL storage for use
        if (res != undefined) {
            var resArry = res.split("&&");
            resArry.forEach(element => {
                //This checks that element contains the URL
                if (element.includes(url)) {
                    //This if/else checks if the URL has been previously selected as good
                    //and then actually sends the message to background.js for use
                    if (element.includes("good")) {
                        // element good
                        chrome.extension.sendMessage({greeting: "good"}, function(response) {});
                    }
                    else if(element.includes("bad")) {
                        // element bad
                        chrome.extension.sendMessage({greeting: "bad"}, function(response) {});
                    }
                }
            });
        }
    });
}

