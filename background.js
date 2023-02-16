// chrome.browserAction.onClicked.addListener(function (tab) {
//   chrome.tabs.create({
//     url: chrome.extension.getURL("index.html"),
//     selected: true,
//   });
// });
// chrome.app.runtime.onLaunched.addListener(function () {
//   chrome.app.window.create("index.html", {
//     outerBounds: {
//       width: 400,
//       height: 500,
//     },
//   });
// });

// chrome.commands.onCommand.addListener((command) => {
//   console.log(`Command: ${command}`);
// });

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.message === "popup") {
//     chrome.tabs.create({ url: "www.google.com" });
//   }
// });

chrome.commands.onCommand.addListener((command) => {
  if (command === "opentab") {
    chrome.tabs.create({ url: "index.html" });
  }
});
