var value = "lelele";

// 

// 

// function init() {
  chrome.storage.sync.clear();
  // console.log("init()");
// }

// alert("page restarted")
chrome.storage.sync.set({key: value}, function() {
  console.log('Value is set to ' + value);
});

chrome.storage.sync.get(['key'], function(result) {
  console.log('Value currently is ' + result.key);
});

var raceOn = document.getElementById("raceOn");
var raceColour = document.getElementById("raceColour");
var raceSensitivity = document.getElementById("raceSensitivity");

function newLoad() {
  chrome.storage.sync.get(["raceOn", "raceColour", "raceSensitivity"], function(items) {
    // console.log("1doon resetting the value to " + items["raceOn"]);
    // console.log("2done resetting the value to " + items["raceColour"]);
    // console.log("3done resetting the value to " + items["raceSensitivity"]);
    // Define if undefined 
    if (items["raceOn"] === undefined) items["raceOn"] = true;
    if (items["raceColour"] === undefined)  items["raceColour"] = "#E66465";
    if (items["raceSensitivity"] === undefined) items["raceSensitivity"] = "1";
    // Update storage 
    chrome.storage.sync.set({"raceOn" : items["raceOn"]});
    chrome.storage.sync.set({"raceColour" : items["raceColour"]});
    chrome.storage.sync.set({"raceSensitivity" : items["raceSensitivity"]});
    // Update appearance 
    raceOn.checked = items["raceOn"];
    raceColour.value = items["raceColour"];
    raceSensitivity.value = items["raceSensitivity"];
    // console.log("5doon resetting the value to " + items["raceOn"]);
    // console.log("6done resetting the value to " + items["raceColour"]);
    // console.log("7done resetting the value to " + items["raceSensitivity"]);
  })
}

// Immediately persist options changes
raceForm.raceOn.addEventListener('change', (event) => {
  chrome.storage.sync.get("raceOn", function(items) {
    
    // var raceOnItem = items["raceOn"];
    // if (items["raceOn"] === undefined) {
    //   raceOnItem = raceOn.value;
    //   console.log("raceOn set " + raceOnItem)
    // }
    var race = raceOn.checked;
    chrome.storage.sync.set({"raceOn" : race});
    console.log("bruhhhH");
  })
});

// Immediately persist options changes
raceForm.raceColour.addEventListener('change', (event) => {
  chrome.storage.sync.get("raceColour", function(items) {
    chrome.storage.sync.set({"raceColour" : raceColour.value});
  })
});

// Immediately persist options changes
raceForm.raceSensitivity.addEventListener('change', (event) => {
  chrome.storage.sync.get("raceSensitivity", function(items) {
    chrome.storage.sync.set({"raceSensitivity" : raceSensitivity.value});
  })
});

console.log("starting new load")
newLoad();