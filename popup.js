var value = "lelele";

chrome.storage.sync.set({key: value}, function() {
  console.log('Value is set to ' + value);
});

chrome.storage.sync.get(['key'], function(result) {
  console.log('Value currently is ' + result.key);
});

// const input = document.querySelector('input');
// const log = document.getElementById('raceColourPick');

// input.addEventListener('input', updateValue);

// function updateValue(e) {
//   log.textContent = e.target.value;
// }

// In-page cache of the user's options
const options = {};

// Initialize the form with the user's option settings
chrome.storage.sync.get('options', (data) => {
  Object.assign(options, data.options);
  raceForm.raceOn.checked = Boolean(options.raceOn);
});

// Immediately persist options changes
raceForm.raceOn.addEventListener('change', (event) => {
  if (target.event.checked == true) {
    options.raceOn = event.target.checked;
  } else {
    options.raceOn = event.target.unchecked;
  }
  alert("changed toggle");
  chrome.storage.sync.set({options});
});


// var colour = document.getElementById("raceColourPick").value;
// // chrome.storage.sync.set({ 'raceOn': raceOn });
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
        // console.log("response", response);
        // console.log("reponse type", typeof(response));
        
        // var e = document.getElementById("discrimination");
        // e.classList.add("blur");

        // var toBlur = document.getElementById('discrimination-section container-fluid vertical-center').innerHTML;
        // toBlur = element.classList.add("blur");
        
        // const text = document.body;
        // // console.log("document.body.innerText", document.body.innerText);
        // // console.log("document.body.innerText", typeof(document.body.innerText));
        // console.log("document.body.outerText", text);
        // console.log("document.body.outerText", typeof(text));
        
        // chrome.extension.getBackgroundPage()
        // const text = document.querySelectorAll('h1, h2, h3, h4, h5, p, li, td, caption, span, a');

        //const text = chrome.extension.getBackgroundPage().querySelectorAll('h1, h2, h3, h4, h5, p, li, td, caption, span, a');

        // var raceOn = document.getElementById("raceOn").value;
        var colour = document.getElementById("raceColourPick").value;

        // chrome.storage.sync.set({ 'raceOn': raceOn });
        chrome.storage.sync.set({ 'getColour': colour });
        alert("asjkfdhjsaldfk" + colour);

        //chrome.storage.sync.set({ 'getColour': colour });

        //export function getColour() {
        //  return colour;
        //}
        
        const text = document.querySelectorAll('h1, h2, h3, h4, h5, p, li, td, caption, span, a');
        // console.log("document.body.outerText", text);
        // console.log("document.body.outerText", typeof(text));
        for (let i = 0; i < text.length; i++) {
          console.log("text " + text[i].innerHTML); 
          console.log("type " + typeof(text[i].innerHTML)); 

          if (text[i].innerHTML.includes("use")) {
            console.log("we here");
            text[i].setAttribute('class', 'blur');
            // text[i].innerHTML = text[i].replace(text[i].innerHTML, "<div class = 'blur'>" + text[i].innerHTML + "</div>");
          }
        }
          
        // for (let i = 0; i < text.length; i++) {
        //   console.log("text " + text[i])
        //   if (text[i].innerHTML.includes("Ottawa")) {
        //     console.log("we here")
        //     text[i].innerHTML = text[i].replace(text[i].innerHTML, "<div class = 'blur'>" + text[i].innerHTML + "</div>");
        //   }
        // }
      }
    });
  });
}