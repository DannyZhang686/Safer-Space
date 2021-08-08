var value = "lelele";

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
  chrome.storage.sync.get(["raceOn", "raceColour"], function(items){
    if (items["raceOn"] === undefined) items["raceOn"] = true;
    if (items["raceColour"] === undefined)  items["raceColour"] = "#E66465";
    if (items["raceOn"] == undefined) items["raceOn"] = true;
    if (items["raceSensitivity"] == undefined) items["raceSensitivity"] = "1";
    raceOn.checked = items["raceOn"];
    raceColour.value = items["raceColour"];
    raceSensitivity.value = items["raceSensitivity"];
    console.log("5done resetting the value to " + items["raceOn"]);
    console.log("6done resetting the value to " + items["raceColour"]);
    console.log("7done resetting the value to " + items["raceSensitivity"]);
  })
}

// Immediately persist options changes
raceForm.raceOn.addEventListener('change', (event) => {
  chrome.storage.sync.get("raceOn", function(items){
    // var raceOnItem = items["raceOn"];
    // if (items["raceOn"] === undefined) {
    //   raceOnItem = raceOn.value;
    //   console.log("raceOn set " + raceOnItem)
    // }
    // console.log("bruh "+ raceOnItem);
    chrome.storage.sync.set({"raceOn" : !raceOnItem});
  })
});

// Immediately persist options changes
raceForm.raceColour.addEventListener('change', (event) => {
  chrome.storage.sync.get("raceColour", function(items){
    // var raceColourItem = items["raceColour"];
    // if (items["raceColour"] === undefined) {
    //   // var raceColourItem = ;
    //   console.log("raceColour set " + raceColour.value);
    // }
    // raceOnItem = !raceOnItem;
    // console.log("bruh "+ raceColourItem);
    chrome.storage.sync.set({"raceColour" : raceColour.value});
  })
});

// Immediately persist options changes
raceForm.raceSensitivity.addEventListener('change', (event) => {
  chrome.storage.sync.get("raceSensitivity", function(items){
    // if (items["raceSensitivity"] === undefined) {
    //   // var raceColourItem = ;
    //   console.log("raceSensitivity set " + raceSensitivity.value);
    // }
    // raceOnItem = !raceOnItem;
    // console.log("bruh "+ raceColourItem);
    chrome.storage.sync.set({"raceColour" : raceSensitivity.value});
  })
});

// function blur() {
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     chrome.tabs.sendMessage(tabs[0].id, {type:"getText"}, function(response) {
//       if (typeof response == "undefined") {
//         document.getElementById('output1').innerHTML = "Please try another page!";
//       } else {

//         // // var raceOn = document.getElementById("raceOn").value;
//         // var colour = document.getElementById("raceColourPick").value;

//         // // chrome.storage.sync.set({ 'raceOn': raceOn });
//         // chrome.storage.sync.set({ 'getColour': colour });
//         // alert("asjkfdhjsaldfk" + colour);

//         // //chrome.storage.sync.set({ 'getColour': colour });

//         // const text = document.querySelectorAll('h1, h2, h3, h4, h5, p, li, td, caption, span, a');
        
//         // for (let i = 0; i < text.length; i++) {
//         //   console.log("text " + text[i].innerHTML); 
//         //   console.log("type " + typeof(text[i].innerHTML)); 

//         //   if (text[i].innerHTML.includes("use")) {
//         //     console.log("we here");
//         //     text[i].setAttribute('class', 'blur');
//         //   }
//         // }

//       }
//     });
//   });
// }

console.log("starting new load")
newLoad();