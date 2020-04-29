// On the load of the webpage, the the 'master' cookie.
window.onload = function () {
    chrome.storage.sync.get(["master"], function (result) {
        var res = result["master"];
        // Declare return string. The first row is the beginning portion that is the table discription of the website.
        var TotalString = "<tr><th>Recipe Title</th><th>Liked Recipe?</th><th>URL</th><th>Delete?</th><th>Comment</th><th>Save?</th></tr>";
        if (res != undefined) {
            // Array split into parts. THe && sign sets apart the objects from one another in the master string.
            var resArry = res.split("&&");

            // Create an iterator to start give each of the elements unique ids.
            var inte = 0;
            resArry.forEach(element => {
                inte++;
                // Strip the { and } off of the object.
                var el = element.substring(1, element.length - 1)
                // Separate the object into its components.
                el = el.split(",")
                // Convert languagte from object keywords to complete sentances.
                if (el[1].includes("good")) {
                    el[1] = "You thought this recipe was good"
                }
                else {
                    el[1] = "You thought this recipe was bad"
                }
                // Add this entry to the table. It contains:
                // - Name of the Recipie
                // - If you liked this recipie
                // - URL of the reicipe
                // - A delete button {Has the id of the url of the recipie}
                // - A comment section {Has the id of the index of the object and the text "itwillbedone"}
                // - A save button {Has the id url}
                TotalString += ("<tr><td>" + el[2].substring(1, el[2].length - 1) + "</td><td>" + el[1] + "</td><td>" + el[0].substring(1, el[0].length - 1) + "</td><td><div class='remove' id=\"" + el[0] + "\">X</div></td><td><textarea id=\"" + inte + "itwillbedone\" rows='4' cols='50'>" + el[3].substring(3, el[3].length - 3) + "</textarea></td> <td><div class='save' id=\"" + el[0] + "\">Save!</div></td></tr>")
            });
        }
        // Set the table as this value. Dynamically.
        document.getElementById("managementTable").innerHTML = TotalString;
    });
};

$(document).ready(function () {
    $(function () {
        $('div').click(function (e) {
            // Make sure that the DIV is something that we want. In particular it should be the url of a website. Either to be saved or deleted.
            if (e.target != undefined && e.target.id != undefined && e.target.id != "" && !e.target.id.includes("itwillbedone")) {
                // If this was supposed to be a save, then rewrite the master cookie with the updated comment.
                if ($(e.target).hasClass("save")) {
                    var URL = $(e.target).attr('id');

                    chrome.storage.sync.get(["master"], function (result) {
                        // Get the cookie and parse 
                        var res = result["master"];
                        var resArry = res.split("&&");
                        var returnArray = "";
                        var intz = 0;
                        // Loop through the elements and only alter the selected element, replacing the text previiously saved with the new values.
                        resArry.forEach(element => {
                            intz++;
                            if (!element.includes(URL)) {
                                returnArray += (element + "&&");
                            } else {
                                let myVal = element.split("#!@");
                                returnArray += (myVal[0] + "#!@" + $(`#${intz}itwillbedone`).val() + "#!@" + myVal[2] + "&&");
                            }
                        });
                        // Remove the extranous && from the string
                        returnArray = returnArray.substring(0, returnArray.length - 2);
                        // Save the new cookie and overwrite the master cookie.
                        var dataObj = {};
                        dataObj["master"] = returnArray;
                        chrome.storage.sync.set(dataObj, function () { });

                        // Reload the page so changes can take affect.
                        location.reload();
                    })
                }
                else {
                    // Get the url of the selected item.
                    var URL = $(e.target).attr('id');
                    chrome.storage.sync.get(["master"], function (result) {
                        // Get the master storage.
                        var res = result["master"];
                        // Split delimiters
                        var resArry = res.split("&&");
                        // Initalize a new return string.
                        var returnArray = "";
                        // Filter out the current url and remove that object
                        resArry.forEach(element => {
                            if (!element.includes(URL)) {
                                returnArray += (element + "&&");
                            }
                        });
                        // Remove extranous && symbols.
                        returnArray = returnArray.substring(0, returnArray.length - 2);
                        // Set this as the new master value. In the case that the return string is empyt (ie there is no longer any information) then remove it.
                        if (returnArray == "") {
                            chrome.storage.sync.remove(["master"]);
                        } else {
                            var dataObj = {};
                            dataObj["master"] = returnArray;
                            chrome.storage.sync.set(dataObj, function () { });
                        }

                        // Reload the page so changes can take effect.
                        location.reload();
                    })
                }
            };
        });
    });
});
