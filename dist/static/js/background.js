/**
 * 页面间通信
 * http://www.ituring.com.cn/book/miniarticle/60272
 */
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
  if(message == 'Hello'){
    sendResponse('Hello from background.');
  }
});

// chrome.tabs.query({
//   active : true,
//   currentWindow : true
// }, function(tabs) {
//   chrome.tabs.sendMessage(tabs[0].id, {ready : "ready"}, function(response) {
//     if (response.download === "download") {
//     }
//   });
// });
