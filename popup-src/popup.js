window.onload = function(){ 
    document.getElementById("badRecipie").onclick = function() {
        var popup = document.getElementById("badPopup");
        popup.classList.toggle("show");
        chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
            // Get the name of the url
            url = tabs[0].url;
            title = tabs[0].title;

            chrome.storage.sync.get(["master"], function(result) {
                var res = result["master"];
                // Parser
                if (res != undefined) {
                    if (res.includes(url)) {// Remove instance of url data then reconstruct array
                        var resArry = res.split("&&");
                        newRes = "";
                        resArry.forEach(element => {
                            if (!element.includes(url)) {
                                newRes += ( element + "&&" );
                            }
                        });
                        res = newRes.substring(0, newRes.length - 2);
                    }
                }
            

                //#!@ escape seqence
                if (res != undefined && res != "") {
                    var dataObj = {};
                    dataObj["master"] = (res + "&&{'" + url + "','bad','" + title + "',#!@#!@}");
                    chrome.storage.sync.set(dataObj, function(){});
                }
                else {
                    var dataObj = {};
                    dataObj["master"] = ("{'" + url + "','bad','" + title + "',#!@#!@}");
                    chrome.storage.sync.set(dataObj, function(){});
                }
            });
        });
        
    };
    
    document.getElementById("goodRecipie").onclick = function() {
        var popup = document.getElementById("goodPopup");
        popup.classList.toggle("show");
        chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
            // Get the name of the url
            url = tabs[0].url;
            title = tabs[0].title;

            chrome.storage.sync.get(["master"], function(result) {
                var res = result["master"];
                
                if (res != undefined) {
                    if (res.includes(url)) {// Remove instance of url data then reconstruct array
                        var resArry = res.split("&&");
                        newRes = "";
                        resArry.forEach(element => {
                            if (!element.includes(url)) {
                                newRes += ( element + "&&" );
                            }
                        });
                        res = newRes.substring(0, newRes.length - 2);
                    }
                }

                if (res != undefined && res != "") {
                    var dataObj = {};
                    dataObj["master"] = (res + "&&{'" + url + "','good','" + title + "',#!@#!@}");
                    chrome.storage.sync.set(dataObj, function(){});
                }
                else {
                    var dataObj = {};
                    dataObj["master"] = ("{'" + url + "','good','" + title + "',#!@#!@}");
                    chrome.storage.sync.set(dataObj, function(){});
                }
            });
        }); 
    };
    
    document.getElementById("manager").onclick = function() {
        chrome.tabs.create({ url: "manage.html" });
    }

};

