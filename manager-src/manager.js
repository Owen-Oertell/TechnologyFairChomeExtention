window.onload = function () {
    chrome.storage.sync.get(["master"], function (result) {
        var res = result["master"];
        var TotalString = "<tr><th>Recipe Title</th><th>Liked Recipe?</th><th>URL</th><th>Delete?</th></tr>";
        if (res != undefined) {
            var resArry = res.split("&&");
            // Array split into parts
            resArry.forEach(element => {
                var el = element.substring(1, element.length - 1)
                el = el.split(",")
                if (el[1].includes("good")) {
                    el[1] = "You though this recipe was good"
                }
                else {
                    el[1] = "You thought this recipe was bad"
                }
                TotalString += ("<tr><td>" + el[2].substring(1, el[2].length - 1) + "</td><td>" + el[1] + "</td><td>" + el[0].substring(1, el[0].length - 1) + "</td><td><div class='remove' id=\"" + el[0] + "\")>X</div></td></tr>")
            });
        }
        document.getElementById("managementTable").innerHTML = TotalString;
    });
};

$(document).ready(function () {
    $(function () {
        $('div').click(function () {
            if ($(this).attr('id') != undefined) {
                if ($(this).attr('id').includes("http://") || $(this).attr('id').includes("https://")) {
                    var URL = $(this).attr('id');
                    chrome.storage.sync.get(["master"], function (result) {
                        var res = result["master"];
                        var resArry = res.split("&&");
                        var returnArray = "";
                        resArry.forEach(element => {
                            if (!element.includes(URL)) {
                                returnArray += (element + "&&");
                            }
                        });
                        returnArray = returnArray.substring(0, returnArray.length - 2);
                        if(returnArray=="") {
                            chrome.storage.sync.remove(["master"]);
                        } else {
                        var dataObj = {};
                        dataObj["master"] = returnArray;
                        chrome.storage.sync.set(dataObj, function () { });
                        }
                        location.reload();


                    })
                }
            };
        });
    });
});
