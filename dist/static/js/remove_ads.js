window.onload = () => {
  let doc = document;

  if (location.host == 'www.xiaopian.com') {
    // 删除小片网广告
    doc.querySelector('body > a').remove();
    doc.querySelector('#ad_rightBottom').remove();
  } else if (location.host.indexOf('.sina.') != -1) {
    // 删除新浪网广告
    removeAds(doc.querySelectorAll('.sinaads'));
    removeAds(doc.querySelectorAll('.sinaads-float')); 
    removeAds(doc.querySelectorAll('.sinaad-toolkit-box'));
  } else if (location.host.indexOf('www.qdfuns.com') != -1) {
    // 删除前端网广告
    removeAds([doc.querySelector('.adsbygoogle').parentNode]);
  } else if (location.host.indexOf('blog.csdn.net') != -1) {
    removeAds(doc.querySelectorAll('iframe, .pulllog-box, .recommend-ad-box'));
  }
}

// 删除广告元素
function removeAds (elements) {
  elements.forEach(element => {
    element.remove();
  });
}

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		console.log(`chrome.extension.onMessage in demo-downloader content.js 1111...`);
		if (request.msg == "getResource") {
			console.log(`chrome.extension.onMessage in demo-downloader content.js 0000...`);
			var arr;
			if (!RC.initFlag) {
				RC.init();
			}
			arr = RC.data;
			var dir = location.href.substring(0, location.href.lastIndexOf('/'));
			sendResponse({
				urls: arr,
				dir: dir
			});
		} else if (request.msg == 'active') {
			console.log('chrome.extension.onMessage active get in...');
		} else if (request.msg == 'TABS_SENDMEESAGE') {
			console.log(`runtime.onMessage called in remove_ads.js....`);
		}
	}
);