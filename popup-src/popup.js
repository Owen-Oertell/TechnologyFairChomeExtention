window.onload = function(){ 
    // This function is run when the user clicks on the "This recipie is bad" button.
    document.getElementById("badRecipie").onclick = function() {
        // Create the popup that shows their comment has been submitted.
        var popup = document.getElementById("badPopup");
        popup.classList.toggle("show");

        // Get the url and name of the tab that the user is on.
        chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
            // Get the name of the url
            url = tabs[0].url;
            title = tabs[0].title;

            // Get the master cookie,
            chrome.storage.sync.get(["master"], function(result) {
                var res = result["master"];
                // Parser
                // Make sure that it already exists.
                if (res != undefined) {
                    // Check if it is already is in the cookie
                    if (res.includes(url)) {
                        var resArry = res.split("&&");
                        newRes = "";
                        // Remove any previous existance of website. This allows for people to change their responses.
                        resArry.forEach(element => {
                            if (!element.includes(url)) {
                                newRes += ( element + "&&" );
                            }
                        });
                        // Remove the extranous && from the retun string.
                        res = newRes.substring(0, newRes.length - 2);
                    }
                }
            

                // Create the new object added on to the old things. Using the prarameters found above.
                if (res != undefined && res != "") {
                    var dataObj = {};
                    dataObj["master"] = (res + "&&{'" + url + "','bad','" + title + "',#!@#!@}");
                    chrome.storage.sync.set(dataObj, function(){});
                }
                // If it already does not exist, then just make it the master.
                else {
                    var dataObj = {};
                    dataObj["master"] = ("{'" + url + "','bad','" + title + "',#!@#!@}");
                    chrome.storage.sync.set(dataObj, function(){});
                }
            });
        });
        
    };
    
    // This function is run when the user clicks on the "This recipie is good" button.
    document.getElementById("goodRecipie").onclick = function() {
        // Create the popup that shows their comment has been submitted.
        var popup = document.getElementById("goodPopup");
        popup.classList.toggle("show");
        // Get the url and name of the tab that the last user was on
        chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
            // Get the name of the url
            url = tabs[0].url;
            title = tabs[0].title;

            // Get the master cookie
            chrome.storage.sync.get(["master"], function(result) {
                var res = result["master"];
                
                // Make sure that it already exists.
                if (res != undefined) {
                    if (res.includes(url)) {// Remove instance of url data then reconstruct array
                        var resArry = res.split("&&");
                        newRes = "";
                        // Remove any previous existance of website. This allows for people to change their responses.
                        resArry.forEach(element => {
                            if (!element.includes(url)) {
                                newRes += ( element + "&&" );
                            }
                        });
                        // Remove the extranous && from the return string.
                        res = newRes.substring(0, newRes.length - 2);
                    }
                }
                // Create the new object added on to the old things. Using the prarameters found above.
                if (res != undefined && res != "") {
                    var dataObj = {};
                    dataObj["master"] = (res + "&&{'" + url + "','good','" + title + "',#!@#!@}");
                    chrome.storage.sync.set(dataObj, function(){});
                }
                // If it already does not exist, then just make it the master.
                else {
                    var dataObj = {};
                    dataObj["master"] = ("{'" + url + "','good','" + title + "',#!@#!@}");
                    chrome.storage.sync.set(dataObj, function(){});
                }
            });
        }); 
    };

    document.getElementById("addAndDecide").onclick = function() {
        // Create the popup that shows their comment has been submitted.
        var popup = document.getElementById("undecidedPopup");
        popup.classList.toggle("show");
        // Get the url and name of the tab that the last user was on
        chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
            // Get the name of the url
            url = tabs[0].url;
            title = tabs[0].title;

            // Get the master cookie
            chrome.storage.sync.get(["master"], function(result) {
                var res = result["master"];
                
                // Make sure that it already exists.
                if (res != undefined) {
                    if (res.includes(url)) {// Remove instance of url data then reconstruct array
                        var resArry = res.split("&&");
                        newRes = "";
                        // Remove any previous existance of website. This allows for people to change their responses.
                        resArry.forEach(element => {
                            if (!element.includes(url)) {
                                newRes += ( element + "&&" );
                            }
                        });
                        // Remove the extranous && from the return string.
                        res = newRes.substring(0, newRes.length - 2);
                    }
                }
                // Create the new object added on to the old things. Using the prarameters found above.
                if (res != undefined && res != "") {
                    var dataObj = {};
                    dataObj["master"] = (res + "&&{'" + url + "','undif','" + title + "',#!@#!@}");
                    chrome.storage.sync.set(dataObj, function(){});
                }
                // If it already does not exist, then just make it the master.
                else {
                    var dataObj = {};
                    dataObj["master"] = ("{'" + url + "','undif','" + title + "',#!@#!@}");
                    chrome.storage.sync.set(dataObj, function(){});
                }
            });
        }); 
    };
    
    // IF the user clicks on the manager button. Then open up the manager page.
    document.getElementById("manager").onclick = function() {
        chrome.tabs.create({ url: "manage.html" });
    }

};