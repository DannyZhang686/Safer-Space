// Race / Ethnicity 

function refresh() {
  chrome.storage.sync.get(['raceOn', 'raceColour', 'raceSensitivity'], function (data) {
    console.log("data.raceOn in content.js " +  data["raceOn"] + "\ntype data.raceOn " +  typeof(data["raceOn"])); 
    console.log("data.raceColour in content.js " +  data["raceColour"] + "\ntype data.raceColour " +  typeof(data["raceColour"])); 
    console.log("data.raceSensitivity in content.js " +  data["raceSensitivity"] + "\ntype data.raceSensitivity " +  typeof(data["raceSensitivity"])); 

  });
}

var regexNeedsUpdate = true;

function refreshOriginal() {

  let text = document.querySelectorAll('h1, h2, h3, h4, h5, p, li, td, caption, span, a, em, code');
  var raceOn;
  var element, originalTextColor;

  // Iterate through the HTML page's elements 
  for (element of text) {

    // Check for Race / Ethnicity 
    raceOn = "on";
    if (raceOn == "on") {
      if (element.innerHTML.toLowerCase().includes("text")) {
        console.log("elem", element);
        
        originalTextColor = element.style.color;
        if (originalTextColor == "" || originalTextColor == "transparent") originalTextColor = "black";

        // Blur text 
        element.style['color'] = "transparent";
        element.style['text-shadow'] =  "0 0 8px rgba(255, 0, 0, 0.5)";

        element.addEventListener("mouseover", function(event) {
          // Unblur text 
          console.log("originalTextColor", originalTextColor);
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
  }
}

// Search page for occurences of words on the blacklist and blurs out certain elements that contain them.
// Sets up hover handlers so that elements are unblurred on mouseover.
// Loops once a second to account for with DOM changes initiated by the website.
function refreshLoop() {
  console.log("doing this again");
  refresh();
  setTimeout(refreshLoop, 5000);
}

refreshOriginal();
// alert("started");
// Initiates refresh loop 
refreshLoop();