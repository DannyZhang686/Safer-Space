alert("running");

//chrome.tabs.onActivated.addListener(tab => {
//    chrome.tabs.get(tab.tabId, current_tab_info => {
//        if (/^https:\/\/www\.google/.test(current_tab_info.url)) {
//            chrome.tabs.insertCSS(null, { file: './button.css' });
//            chrome.tabs.executeScript(null, { file: './foreground.js' }, () => console.log('works'));
//        }
//    });
//});

chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    console.log(
      `Storage key "${key}" in namespace "${namespace}" changed.`,
      `Old value was "${oldValue}", new value is "${newValue}".`
    );
  }
});

// Watch for changes to the user's options & apply them
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.options?.newValue) {
    const debugMode = Boolean(changes.options.newValue.raceOn);
    console.log('enable debug mode?', debugMode);
    setDebugMode(debugMode);
  }
});

// function disableExtension(disabled)
// {
//     chrome.windows.getAll({populate : true}, function (window_list)
//     {
//         for (var i = 0; i < window_list.length; ++i)
//         {
//             var window = window_list[i];
//             for (var j = 0; j < window.tabs.length; ++j)
//             {
//                 var tab = window.tabs[j];
//                 if (checkContentScriptExists(tab))
//                 {
//                     chrome.tabs.executeScript(tab.id, {code : "disabled = " + disabled + ";"}) 
//                 }
//             }
//         }
//         // No matching url found. Open it in the new tab
//         chrome.tabs.create({ url : url, selected: true });
//     });
// }

// function disableExtension(disabled)
// {
//     global.disabled = disabled;
// }
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     if (request.msg == "getDisabled") {
//         sendResponse({disabled: global.disabled});
//         return true;
//     }
// });