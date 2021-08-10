var value = "foo";

// chrome.storage.sync.clear();

chrome.storage.sync.set({key: value}, function() {
  console.log('Value is set to ' + value);
});

chrome.storage.sync.get(['key'], function(result) {
  console.log('Value currently is ' + result.key);
});

/////////////////
//  Variables  //
/////////////////

// Activation button
var button = document.getElementById("onButton");

// Race / Ethnicity 
var raceOn = document.getElementById("raceOn");
var raceColour = document.getElementById("raceColour");
var raceSensitivity = document.getElementById("raceSensitivity");

// Gender Identity 
var genderOn = document.getElementById("genderOn");
var genderColour = document.getElementById("genderColour");
var genderSensitivity = document.getElementById("genderSensitivity");

// Body Type 
var bodyOn = document.getElementById("bodyOn");
var bodyColour = document.getElementById("bodyColour");
var bodySensitivity = document.getElementById("bodySensitivity");

function newLoad() {
  chrome.storage.sync.get(["raceOn", "raceColour", "raceSensitivity", "genderOn", "genderColour", "genderSensitivity", "bodyOn", "bodyColour", "bodySensitivity"], function(items) {

    // Race
    // Define if undefined 
    if (items["raceOn"] === undefined) items["raceOn"] = true;
    if (items["raceColour"] === undefined)  items["raceColour"] = "#17B081";
    if (items["raceSensitivity"] === undefined) items["raceSensitivity"] = "0";
    // Update storage 
    chrome.storage.sync.set({"raceOn" : items["raceOn"]});
    chrome.storage.sync.set({"raceColour" : items["raceColour"]});
    chrome.storage.sync.set({"raceSensitivity" : items["raceSensitivity"]});
    // Update popup appearance 
    raceOn.checked = items["raceOn"];
    raceColour.value = items["raceColour"];
    raceSensitivity.value = items["raceSensitivity"];
    
    // Gender
    // Define if undefined 
    if (items["genderOn"] === undefined) items["genderOn"] = true;
    if (items["genderColour"] === undefined)  items["genderColour"] = "#E94F37";
    if (items["genderSensitivity"] === undefined) items["genderSensitivity"] = "0";
    // Update storage 
    chrome.storage.sync.set({"genderOn" : items["genderOn"]});
    chrome.storage.sync.set({"genderColour" : items["genderColour"]});
    chrome.storage.sync.set({"genderSensitivity" : items["genderensitivity"]});
    // Update popup appearance 
    genderOn.checked = items["genderOn"];
    genderColour.value = items["genderColour"];
    genderSensitivity.value = items["genderSensitivity"];
    
    // Body
    // Define if undefined 
    if (items["bodyOn"] === undefined) items["bodyOn"] = true;
    if (items["bodyColour"] === undefined)  items["bodyColour"] = "#3F88C5";
    if (items["bodySensitivity"] === undefined) items["bodySensitivity"] = "0";
    // Update storage 
    chrome.storage.sync.set({"bodyOn" : items["bodyOn"]});
    chrome.storage.sync.set({"bodyColour" : items["bodyColour"]});
    chrome.storage.sync.set({"bodySensitivity" : items["bodySensitivity"]});
    // Update popup appearance 
    bodyOn.checked = items["bodyOn"];
    bodyColour.value = items["bodyColour"];
    bodySensitivity.value = items["bodySensitivity"];

    // Update button text
    updateButtonText();
    
  })
}

function toggleOptions() {
  chrome.storage.sync.get(["raceOn", "genderOn", "bodyOn"], function(items) {

    var toTurn = true;
    if (items["raceOn"] || items["genderOn"] || items["bodyOn"]) {
      toTurn = false;
    } 

    // Update storage 
    chrome.storage.sync.set({"raceOn" : toTurn});
    chrome.storage.sync.set({"genderOn" : toTurn});
    chrome.storage.sync.set({"bodyOn" : toTurn});

    // Update popup appearance 
    raceOn.checked = toTurn;
    genderOn.checked = toTurn;
    bodyOn.checked = toTurn;
    updateButtonText();
    
  })
}

function updateButtonText() {
  chrome.storage.sync.get(["raceOn", "genderOn", "bodyOn"], function(items) {
    if (items["raceOn"] || items["genderOn"] || items["bodyOn"]) {
      button.innerHTML = "Turn everything off!";
    } else {
      button.innerHTML = "Turn everything on!";
    }
  })
}

///////////////////////
//  Event Listeners  //
///////////////////////

// Activation button 

button.addEventListener("click", toggleOptions);

// Race / Ethnicity 

raceForm.raceOn.addEventListener('change', (event) => {
  chrome.storage.sync.get("raceOn", function(items) {
    chrome.storage.sync.set({"raceOn" : raceOn.checked});
    updateButtonText();
  })
});

raceForm.raceColour.addEventListener('change', (event) => {
  chrome.storage.sync.get("raceColour", function(items) {
    chrome.storage.sync.set({"raceColour" : raceColour.value});
  })
});

raceForm.raceSensitivity.addEventListener('change', (event) => {
  chrome.storage.sync.get("raceSensitivity", function(items) {
    chrome.storage.sync.set({"raceSensitivity" : raceSensitivity.value});
  })
});

// Gender Identity 

genderForm.genderOn.addEventListener('change', (event) => {
  chrome.storage.sync.get("genderOn", function(items) {
    chrome.storage.sync.set({"genderOn" : genderOn.checked});
    updateButtonText();
  })
});

genderForm.genderColour.addEventListener('change', (event) => {
  chrome.storage.sync.get("genderColour", function(items) {
    chrome.storage.sync.set({"genderColour" : genderColour.value});
  })
});

genderForm.genderSensitivity.addEventListener('change', (event) => {
  chrome.storage.sync.get("genderSensitivity", function(items) {
    chrome.storage.sync.set({"genderSensitivity" : genderSensitivity.value});
  })
});

// Body Type

bodyForm.bodyOn.addEventListener('change', (event) => {
  chrome.storage.sync.get("bodyOn", function(items) {
    chrome.storage.sync.set({"bodyOn" : bodyOn.checked});
    updateButtonText();
  })
});

bodyForm.bodyColour.addEventListener('change', (event) => {
  chrome.storage.sync.get("bodyColour", function(items) {
    chrome.storage.sync.set({"bodyColour" : bodyColour.value});
  })
});

bodyForm.bodySensitivity.addEventListener('change', (event) => {
  chrome.storage.sync.get("bodySensitivity", function(items) {
    chrome.storage.sync.set({"bodySensitivity" : bodySensitivity.value});
  })
});

console.log("Starting new load")

// Update variables in chrome storage and make 
// sure that the extension reflects the data 
newLoad();