// This file comsists of a listener for a message that is sent from content.js mentioning if the user has previously said that they like or do not like this.

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    // See if this website was marked good or bad
    if (request.greeting == "good") {
      // Send the chrome notificaion that this recipie was good.
      var goodNotif = {
        type: "basic",
        title: "Good Recipe",
        message: "You have previously saved this as a good recipe",
        iconUrl: "check.png"
      }
      chrome.notifications.create(goodNotif);
    } else if(request.greeting == "bad"){
      // Send the chrome notification that this recipie was bad.
      var badNotif = {
        type: "basic",
        title: "Bad Recipe",
        message: "You have previously saved this as a bad recipe",
        iconUrl: "x.png"
      }
      chrome.notifications.create(badNotif);
    }else{
      var undecidedNotif = {
        type: "basic",
        title: "Undecided Recipe",
        message: "You previously saved this recipe but made no judgement",
      }
      chrome.notifications.create(undecidedNotif);
    }
    // Returvn true saying that no errors have occured.
    return true;
  });