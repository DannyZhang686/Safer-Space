function checker(inputStr) {
  // Use a jQuery request to run the word through the Python script and get the response
  var jqXHR = $.ajax({
    // Do the jQuery request to the localhost server
    type: "POST",
    url: "http://localhost:5000/",
    async: true,
    data: { inputString: inputStr },
  })
  .done(function(data, textStatus, jqXHR) {
    // Query success
    console.log('Success; status is ' + textStatus);
    console.log('Got back ' + jqXHR.responseText);
    // Just check if the JSON string includes 'true'
    // Since the Python script will always return something like
    // {"response": <bool>}, this is equivalent to finding the element.
    if (jqXHR.responseText.includes("true")) {
      console.log('Returning true');
      return true;
    }
    console.log('Returning false');
    return false;
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    console.log(textStatus);
    console.log('Server request failed :(');
    return false; // On failure, better to censor nothing than everything
  });
}

function refresh() {
  chrome.storage.sync.get(['raceOn', 'raceColour', 'raceSensitivity', 'genderOn', 'genderColour', 'genderSensitivity'], function (data) {

    // Get HTML elements of the page 
    let text = document.querySelectorAll('h1, h2, h3, h4, h5, p, li, td, caption, span, a, em, code');
    var element, raceOriginalTextColor, genderOriginalTextColor, bodyOriginalTextColor;

    // Race / Ethnicity 
    var raceOn = data["raceOn"];
    var raceColour = data["raceColour"];
    var raceSensitivity = data["raceSensitivity"];
    // Gender Identity 
    var genderOn = data["genderOn"];
    var genderColour = data["genderColour"];
    var genderSensitivity = data["genderSensitivity"];
    // Body Type
    var bodyOn = data["bodyOn"];
    var bodyColour = data["bodyColour"];
    var bodySensitivity = data["bodySensitivity"];

    // Category keywords (for demo)   
    var raceKeyWord = "company";
    var genderKeyWord = "costs";
    var bodyKeyWord = "eyewear";

    // Log variables
    console.log("Content.js\nrace " +  raceOn + "\ncolour " +  raceColour+ "\nsensitivity " +  raceSensitivity); 
    console.log("Content.js\ngender " +  genderOn + "\ncolour " +  genderColour+ "\nsensitivity " +  genderSensitivity); 
    console.log("Content.js\nbody " +  bodyOn + "\ncolour " +  bodyColour+ "\nsensitivity " +  bodySensitivity); 
    
    ///////////////////////////////////
    //  Check for Race / Ethnicity   //
    ///////////////////////////////////

    if (raceOn) {

      // Iterate through the HTML page's elements 
      for (element of text) {

        // Check if discrimination is there 
        if (element.innerHTML.length > 5) {
  
          if (element.innerHTML.toLowerCase().includes(raceKeyWord)) {
          // if (checker(String(element.innerHTML.toLowerCase()))) {
            
            raceOriginalTextColor = element.style.color;
            if (raceOriginalTextColor == "" || raceOriginalTextColor == "transparent") raceOriginalTextColor = "black";

            // Blur text 
            element.style['color'] = "transparent";
            element.style['text-shadow'] =  "0 0 8px" + raceColour;
          
            // Unblur text on hover  
            element.addEventListener("mouseover", function(event) {
              event.target.style['color'] = raceOriginalTextColor; 
              event.target.style['text-shadow'] = "none";
            }, false);
            
            // Blur text when no longer hovering  
            element.addEventListener("mouseout", function(event) {
              event.target.style['color'] = "transparent";
              event.target.style['text-shadow'] = "0 0 8px" + raceColour;
            }, false);

          }
        }
      } 
    } else {

      // Iterate through the HTML page's elements 
      for (element of text) {

        // Check if discrimination is there 
        if (element.innerHTML.toLowerCase().includes(raceKeyWord)) {
          
          raceOriginalTextColor = element.style.color;
          if (raceOriginalTextColor == "" || raceOriginalTextColor == "transparent") raceOriginalTextColor = "black";

          // Unblur text 
          element.style['color'] = raceOriginalTextColor; 
          element.style['text-shadow'] = "none";

        }
      }
    }

    //////////////////////////////////
    //  Check for Gender Identity   //
    //////////////////////////////////

    if (genderOn) {

      // Iterate through the HTML page's elements 
      for (element of text) {

        // Check if discrimination is there 
        if (element.innerHTML.length > 5) {
  
          if (element.innerHTML.toLowerCase().includes(genderKeyWord)) {
          // if (checker(String(element.innerHTML.toLowerCase()))) {
            
            genderOriginalTextColor = element.style.color;
            if (genderOriginalTextColor == "" || genderOriginalTextColor == "transparent") genderOriginalTextColor = "black";

            // Blur text 
            element.style['color'] = "transparent";
            element.style['text-shadow'] =  "0 0 8px" + genderColour;
          
            // Unblur text on hover  
            element.addEventListener("mouseover", function(event) {
              event.target.style['color'] = genderOriginalTextColor; 
              event.target.style['text-shadow'] = "none";
            }, false);
            
            // Blur text when no longer hovering  
            element.addEventListener("mouseout", function(event) {
              event.target.style['color'] = "transparent";
              event.target.style['text-shadow'] = "0 0 8px" + genderColour;
            }, false);

          }
        }
      } 
    } else {

      // Iterate through the HTML page's elements 
      for (element of text) {

        // Check if discrimination is there 
        if (element.innerHTML.toLowerCase().includes(genderKeyWord)) {
          
          genderOriginalTextColor = element.style.color;
          if (genderOriginalTextColor == "" || genderOriginalTextColor == "transparent") genderOriginalTextColor = "black";

          // Unblur text 
          element.style['color'] = genderOriginalTextColor; 
          element.style['text-shadow'] = "none";

        }
      }
    }

    ////////////////////////////
    //  Check for Body Type   //
    ////////////////////////////

    if (bodyOn) {

      // Iterate through the HTML page's elements 
      for (element of text) {

        // Check if discrimination is there 
        if (element.innerHTML.length > 5) {
  
          if (element.innerHTML.toLowerCase().includes(bodyKeyWord)) {
          // if (checker(String(element.innerHTML.toLowerCase()))) {
            
            bodyOriginalTextColor = element.style.color;
            if (bodyOriginalTextColor == "" || bodyOriginalTextColor == "transparent") bodyOriginalTextColor = "black";

            // Blur text 
            element.style['color'] = "transparent";
            element.style['text-shadow'] =  "0 0 8px" + bodyColour;
          
            // Unblur text on hover  
            element.addEventListener("mouseover", function(event) {
              event.target.style['color'] = bodyOriginalTextColor; 
              event.target.style['text-shadow'] = "none";
            }, false);
            
            // Blur text when no longer hovering  
            element.addEventListener("mouseout", function(event) {
              event.target.style['color'] = "transparent";
              event.target.style['text-shadow'] = "0 0 8px" + bodyColour;
            }, false);

          }
        }
      } 
    } else {

      // Iterate through the HTML page's elements 
      for (element of text) {

        // Check if discrimination is there 
        if (element.innerHTML.toLowerCase().includes(bodyKeyWord)) {
          
          bodyOriginalTextColor = element.style.color;
          if (bodyOriginalTextColor == "" || bodyOriginalTextColor == "transparent") bodyOriginalTextColor = "black";

          // Unblur text 
          element.style['color'] = bodyOriginalTextColor; 
          element.style['text-shadow'] = "none";

        }
      }
    }
  });
}

function refreshLoop() {
  console.log("here we go again");
  refresh();
  setTimeout(refreshLoop, 1000);
}

// Initiates refresh loop 
refreshLoop();