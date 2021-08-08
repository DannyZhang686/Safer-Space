console.log("working");

// if (!disabled) doSomething();

// chrome.runtime.sendMessage({msg: "getDisabled"}, function(response) {
//   if (!response.disabled) doSomething();
// });

// let paragraphs = document.getElementsByTagName('p'); 

//import { getColour } from 'popup.js'

//var colourPick = getColour();
//console.log("now " + colourPick);

// ** start here 
// function check(inputStr) {
//   // This function checks whether the given string should be censored
//   if (classification(inputStr) == 1) {
//     return true;
//   }
//   return false;
// }


chrome.storage.sync.get('raceOn', function (data) {
  chrome.storage.sync.set({ 'raceOn': data.raceOn });
  alert("raceOn" +  data.raceOn + "endraceOn"); 
});

// chrome.storage.sync.get('raceColour', function (data) {
//   chrome.storage.sync.set({ 'raceColour': data.getColour });
//   alert("raceColour" +  data.raceColour + "endcolour"); 
// });

let text = document.querySelectorAll('h1, h2, h3, h4, h5, p, li, td, caption, span, a, em, code');

var element, originalTextColor;

// raceForm.raceOn.addEventListener('change', (event) => {
//   if (target.event.checked == true) {
//     options.raceOn = event.target.unchecked;
//   } else {
//     options.raceOn = event.target.checked;
//   }
//   chrome.storage.sync.set({options});
//   refresh();
// });

for (element of text) {

  // Check for Race / Ethnicity 

  if (element.innerHTML.toLowerCase().includes("They")) {
    console.log("elem", element);

    // colourPick = getColour();
    
    originalTextColor = element.style.color;
    if (originalTextColor == "") originalTextColor = "black";

    // Blur text 
    element.style['color'] = "transparent";
    element.style['text-shadow'] =  "0 0 8px rgba(255, 0, 0, 0.5)";

    element.addEventListener("mouseover", function(event) {
      // Unblur text 
      event.target.style['color'] = originalTextColor; //event.target.style['color'] = "black";
      event.target.style['text-shadow'] = "none";
    }, false);

    element.addEventListener("mouseout", function(event) {
      // Blur text 
      event.target.style['color'] = "transparent";
      event.target.style['text-shadow'] = "0 0 8px rgba(255, 0, 0, 0.5)";
    }, false);

  }
}