// {
//   "matches": ["https://www.baidu.com/*"],
//   "js": ["static/js/cannot_touch.js"],
//   "run_at": "document_end"
// },

chrome.storage.sync.get('color', function (data) {
  let body = document.querySelector('body');
  if (data.color == '#fff') {
    body.style.backgroundColor = data.color;
    body.style.color = "#000";
  } else {
    body.style.backgroundColor = data.color;
    body.style.color = "#fff";
  }
});

function btn_move(el, mouseLeft, mouseTop) {
  var leftRnd = (Math.random() - 0.5) * 20;
  var topRnd = (Math.random() - 0.5) * 20;
  var btnLeft = mouseLeft + (leftRnd > 0 ? 100 : -100) + leftRnd;
  var btnTop = mouseTop + (topRnd > 0 ? 30 : -30) + topRnd;
  btnLeft = btnLeft < 100 ? (btnLeft + window.innerWidth - 200) : (btnLeft > window.innerWidth - 100 ? btnLeft - window.innerWidth + 200 : btnLeft);
  btnTop = btnTop < 100 ? (btnTop + window.innerHeight - 200) : (btnTop > window.innerHeight - 100 ? btnTop - window.innerHeight + 200 : btnTop);
  el.style.position = 'fixed';
  el.style.left = btnLeft + 'px';
  el.style.top = btnTop + 'px';
}

function over_btn(e) {
  if (!e) {
    e = window.event;
  }
  btn_move(this, e.clientX, e.clientY);
}

document.querySelector('#su').onmouseover = over_btn;

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.msg == 'getResource') {
      console.log(`chrome.extensions.onMessage.addListener: getResource called in cannot_touch.js`);
    } else if (request.zjdgx == 'messgeText') {
      console.log(`chrome.extensions.onMessage.addListener: messgeText called in cannot_touch.js`);
    }
  }
)