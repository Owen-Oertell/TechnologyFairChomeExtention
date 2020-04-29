window.onload = function () {
    chrome.storage.sync.get(["master"], function (result) {
        var res = result["master"];
        var TotalString = "<tr><th>Recipe Title</th><th>Liked Recipe?</th><th>URL</th><th>Delete?</th><th>Comment</th><th>Save?</th></tr>";
        if (res != undefined) {
            var resArry = res.split("&&");
            // Array split into parts
            var inte=0;
            resArry.forEach(element => {
                inte++;
                var el = element.substring(1, element.length - 1)
                el = el.split(",")
                if (el[1].includes("good")) {
                    el[1] = "You though this recipe was good"
                }
                else {
                    el[1] = "You thought this recipe was bad"
                }
                TotalString += ("<tr><td>" + el[2].substring(1, el[2].length - 1) + "</td><td>" + el[1] + "</td><td>" + el[0].substring(1, el[0].length - 1) + "</td><td><div class='remove' id=\"" + el[0] + "\">X</div></td><td><textarea id=\"" + inte + "itwillbedone\" rows='4' cols='50'>" + el[3].substring(3, el[3].length - 3) + "</textarea></td> <td><div class='save' id=\"" + el[0] + "\">Save!</div></td></tr>")
            });
        }
        document.getElementById("managementTable").innerHTML = TotalString;
    });
};

$(document).ready(function () {
    $(function () {
        $('div').click(function (e) {
            console.log(e.target.id)
            if (e.target.id != undefined && e.target.id != "" && !e.target.id.includes("itwillbedone")) {
                if ($(this).attr('id').includes("http://") || $(this).attr('id').includes("https://")) {
                    if ($(this).hasClass("save")) {
                        var URL = $(this).attr('id');
                        chrome.storage.sync.get(["master"], function (result) {
                            var res = result["master"];
                            var resArry = res.split("&&");
                            var returnArray = "";
                            var intz=0;
                            resArry.forEach(element => {
                                intz++;
                                if (!element.includes(URL)) {
                                    returnArray += (element + "&&");
                                } else {
                                    let myVal = element.split("#!@");
                                    returnArray += (myVal[0] + "#!@" + $(`#${intz}itwillbedone`).val() + "#!@" + myVal[2] + "&&");
                                }
                            });
                            returnArray = returnArray.substring(0, returnArray.length - 2);
                            if (returnArray == "") {
                                chrome.storage.sync.remove(["master"]);
                            } else {
                                var dataObj = {};
                                dataObj["master"] = returnArray;
                                chrome.storage.sync.set(dataObj, function () { });
                            }
                            location.reload();
                        })
                    }
                    else {
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
                            if (returnArray == "") {
                                chrome.storage.sync.remove(["master"]);
                            } else {
                                var dataObj = {};
                                dataObj["master"] = returnArray;
                                chrome.storage.sync.set(dataObj, function () { });
                            }
                            location.reload();
                        })
                    }
                }
            };
        });
    });
});
