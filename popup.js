var value = "lelele";

chrome.storage.sync.set({key: value}, function() {
  console.log('Value is set to ' + value);
});

chrome.storage.sync.get(['key'], function(result) {
  console.log('Value currently is ' + result.key);
});

// In-page cache of the user's options
const options = {};

var raceOn = document.getElementById("raceOn").value;
console.log("raceOn "+ raceOn);
// chrome.storage.sync.set({ 'raceOn': raceOn });

// Initialize the form with the user's option settings
chrome.storage.sync.get('options', (data) => {
  Object.assign(options, data.options);
  raceForm.raceOn.checked = Boolean(options.raceOn);
});

// Immediately persist options changes
raceForm.raceOn.addEventListener('change', (event) => {
  options.raceOn = event.target.checked;
  alert("changed toggle " + raceOn + "\noptions.raceOn " + options.raceOn + "\noptions " + options);
  chrome.storage.local.set({ 'raceOn': options.raceOn });
  console.log("here " + options.raceOn)
  // chrome.storage.sync.set({options});
});

// var colour = document.getElementById("raceColourPick").value;
// chrome.storage.sync.set({ 'raceOn': raceOn });
// chrome.storage.sync.set({ 'getColour': colour });
// alert("asjkfdhjsaldfk" + colour);

// Immediately persist options changes
// raceForm.raceColourPick.addEventListener('change', (event) => {
//   if (target.event.checked == true) {
//     options.raceColourPick = event.target.unchecked;
//   } else {
//     options.raceColourPick = event.target.checked;
//   }
//   alert("changed toggle");
//   chrome.storage.sync.set({options});
// });

function blur() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {type:"getText"}, function(response) {
      if (typeof response == "undefined") {
        document.getElementById('output1').innerHTML = "Please try another page!";
      } else {

        // var raceOn = document.getElementById("raceOn").value;
        var colour = document.getElementById("raceColourPick").value;

        // chrome.storage.sync.set({ 'raceOn': raceOn });
        chrome.storage.sync.set({ 'getColour': colour });
        alert("asjkfdhjsaldfk" + colour);

        //chrome.storage.sync.set({ 'getColour': colour });

        const text = document.querySelectorAll('h1, h2, h3, h4, h5, p, li, td, caption, span, a');
        
        for (let i = 0; i < text.length; i++) {
          console.log("text " + text[i].innerHTML); 
          console.log("type " + typeof(text[i].innerHTML)); 

          if (text[i].innerHTML.includes("use")) {
            console.log("we here");
            text[i].setAttribute('class', 'blur');
          }
        }

      }
    });
  });
}