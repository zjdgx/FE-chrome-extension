/*
 * @Author: zjdgx
 * @Date:   2018-07-08 10:38:38
 * @Last Modified by:   zjdgx
 * @Last Modified time: 2018-07-08 19:41:24
 */

'use strict';

// storage获取设置的颜色
chrome.storage.sync.get('color', function(data) {
  let body = document.querySelector('body');
  if (data.color == '#fff') {
    body.style.backgroundColor = data.color;
    body.style.color = "#000";
  } else {
    body.style.backgroundColor = data.color;
    body.style.color = "#fff";
  }
});

chrome.browserAction.setBadgeBackgroundColor({color: '#0000FF'});
chrome.browserAction.setBadgeText({text: 'demo'});

// 显示URL二维码
chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  $('#qrcode').qrcode({
    text: tabs[0].url,
    width: "250",
    height: "250"
  });
  chrome.tabs.sendMessage(tabs[0].id, {
    	msg: "getResource"
    }, function (response) {
      console.log(`test`);
    }
  );
  chrome.tabs.sendMessage(tabs[0].id, {
		msg: "TABS_SENDMEESAGE"
	}, function (response) {
    console.log(`TAB_SENDMESSAGE CALLBACK called in popup.js`);
  });
  // 下载资源
  // chrome.tabs.sendMessage(tabs[0].id, {
	// 	msg: "getResource"
	// }, function (response) {
  //   console.log(`chrome.tabs.sendMessage called in popup.js...`);
	// 	var data = response.urls;
	// 	if (typeof data == "undefined") {
	// 		document.getElementById("default_msg").style.display = "";
	// 		document.getElementById("mainContainer").style.display = "none";
	// 	} else {
	// 		document.getElementById("default_msg").style.display = "none";
	// 		document.getElementById("mainContainer").style.display = "";
	// 	}
	// 	var dir = response.dir;
	// 	var domain = dir.replace(/(^http:\/\/[^\/]+)(\/.+)/g, '$1');
	// 	for (var key in data) {
	// 		if (typeof key == "string") {
	// 			var arr = data[key]["data"];
	// 			var str = "";

	// 			arr = arrayUnique(arr.sort());

	// 			for (var i = 0; i < arr.length; i++) {
	// 				var link = arr[i].trim();
	// 				var link_type = "link";
	// 				if (/^\/\//.test(link)) {
	// 					arr[i] = "http:" + arr[i];
	// 				} else if (/^\//.test(link)) {
	// 					arr[i] = domain + arr[i];
	// 				} else if (/^data:image\/[^;]*;base64,/.test(link)) { //data:image/jpeg;base64,/9j/4A
	// 					arr[i] = arr[i];
	// 					link_type = "data";
	// 				} else if (!/^http/.test(link)) {
	// 					arr[i] = dir + "/" + arr[i];
	// 				}

	// 				if (key == "img") {
	// 					str += "<li><label><input type='checkbox' data-type='" + key + "' data-id='" + key + i + "' data-src='" + arr[i] + "' data-link='" + link_type + "' /><img src='" + arr[i] + "' /></label></li>";
	// 				} else {
	// 					str += "<li><label><input type='checkbox' data-type='" + key + "' data-id='" + key + i + "' data-src='" + arr[i] + "' data-link='" + link_type + "' />" + arr[i] + "<a href='" + arr[i] + "' target='blank'></a></label></li>";
	// 				}
	// 			};
	// 			document.getElementById(key + "box").innerHTML = str;
	// 		}
	// 	}
	// });
});

function httpRequest(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      callback(xhr.responseText);
    }
  }
  xhr.send();
}

function showWeather(result) {
  result = JSON.parse(result);
  console.log(result);
  var list = result.list;
  var table = '<table><tr><th>日期</th><th>天气</th><th>最低温度</th><th>最高温度</th></tr>';
  for (var i in list) {
    var d = new Date(list[i].dt * 1000);
    table += '<tr>';
    table += '<td>' + d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + '</td>';
    table += '<td>' + list[i].weather[0].description + '</td>';
    table += '<td>' + Math.round(list[i].temp.min - 273.15) + ' °C</td>';
    table += '<td>' + Math.round(list[i].temp.max - 273.15) + ' °C</td>';
    table += '</tr>';
  }
  table += '</table>';
  document.getElementById('weather').innerHTML = table;
}

// tool tab切换事件
$('.tool-tab-item').on('click', (e) => {
  let $t = $(e.target);

  if (!$t.hasClass('tool-tab-item-active')) {
    $t.addClass('tool-tab-item-active').siblings().removeClass('tool-tab-item-active');
    if ($t.hasClass('weather')) {// 天气预报
      $('#weather').addClass('tool-item-active').siblings().removeClass('tool-item-active');

      let city = localStorage.city;

      city = city ? city : 'beijing';
      var url = 'http://api.accuweather.com/airquality/v1/observations/106774.json?apikey=7f8c4da3ce9849ffb2134f075201c45a&language=zh-CN';
      httpRequest(url, showWeather);
    } else if ($t.hasClass('qrcode')) {// 二维码
      $('.mod').addClass('tool-item-active').siblings().removeClass('tool-item-active');
    } else if ($t.hasClass('color')) {// 颜色转换
      $('#color').addClass('tool-item-active').siblings().removeClass('tool-item-active');
    } else if ($t.hasClass('deviceinfos')) {// 显示设备信息
      $('#deviceinfos').addClass('tool-item-active').siblings().removeClass('tool-item-active');
      // populateDevices();
    } else if ($t.hasClass('screen-shot')) {
      startShot();
    } else if ($t.hasClass('download-files')) {
      // 下载资源
      initPopEvents();

      var downloadButton = document.getElementById("download");
      downloadButton.addEventListener("click", function (event) {
        var cEvent = event;
        zip.createWriter(new zip.BlobWriter(), function (zipWriter) {
          global_zipWriter = zipWriter;
          nextFile(downloadButton, cEvent);
        }, onerror);
      }, false);
    }
  }
});

// 颜色转换按钮点击事件
$('#transform-color').on('click', () => {
  let color = $('#color-src').val(),
        reg = /^[0-9a-fA-f]{3}$|^[0-9a-fA-f]{6}$/;;
    
  if (color.trim().length) {
    if (reg.test(color)) {
      $('#color-result').html(color.colorRgb(reg));
    } else {
      $('#color-result').html(color.colorHex());
    }
  }
});

// 去掉首尾空格
String.prototype.trim = function() {
  var str = this,
  str = str.replace(/^\s\s*/, ''),
  ws = /\s/,
  i = str.length;
  while (ws.test(str.charAt(--i)));
  return str.slice(0, i + 1);
}

// RGB颜色转换为16进制
String.prototype.colorHex = function () {
  var that = this.trim();
  if (/\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*$/.test(that)) {
    var aColor = that.replace(/\s/g, "").split(",");
    var strHex = "";
    for (var i = 0; i < aColor.length; i++) {
      var hex = Number(aColor[i]).toString(16);
      if (hex === "0") {
        hex += hex;
      }
      strHex += hex;
    }

    if (strHex.length !== 6) {
      strHex = that;
    }

    return strHex;
  }
};

// 16进制颜色转为RGB格式
String.prototype.colorRgb = function (reg) {
  var sColor = this.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 3) {
      var sColorNew = "";
      for (var i = 0; i < 4; i++) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }

      sColor = sColorNew;
    }
    //处理六位的颜色值
    var sColorChange = [];
    for (var i = 0; i < 6; i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
    }
    return sColorChange.join(", ");
  } else {
    return sColor;
  }
};

/**
 * 显示设备信息
 * https://developer.chrome.com/extensions/examples/api/deviceInfo/basic.zip
 */
// function showDevices() {
//   chrome.signedInDevices.get(false, (devices) => {
//     $('#deviceinfos').empty();
//     $('#deviceinfos').append((devices) => {
//       var table = $('<table border="1">');
//       table.append($("<tr>" +
//                      "<th>" + "Name" + "</th>" +
//                      "<th>" + "OS" + "</th>" +
//                      "<th>" + "Id" + "</th>" +
//                      "<th>" + "Type" + "</th>" +
//                      "<th>" + "Chrome Version" + "</th>" +
//                      "</tr>"));
//       for (i = 0; i < devices.length; i++) {
//           table.append($("<tr>" +
//                          "<td>" + devices[i].name + "</td>" +
//                          "<td>" + devices[i].os + "</td>" +
//                          "<td>" + devices[i].id + "</td>" +
//                          "<td>" + devices[i].type + "</td>" +
//                          "<td>" + devices[i].chromeVersion + "</td>" +
//                          "</tr>"));
//       }
//       return table;
//     })
//   });
// }

// function dumpDevices(devices) {
//     $('#deviceinfos').empty();
//     $('#deviceinfos').append(outputDevicesToList(devices));
// }

// function outputDevicesToList(devices) {
//     var table = $('<table border="1">');
//     table.append($("<tr>" +
//                    "<th>" + "Name" + "</th>" +
//                    "<th>" + "OS" + "</th>" +
//                    "<th>" + "Id" + "</th>" +
//                    "<th>" + "Type" + "</th>" +
//                    "<th>" + "Chrome Version" + "</th>" +
//                    "</tr>"));
//     for (i = 0; i < devices.length; i++) {
//         table.append($("<tr>" +
//                        "<td>" + devices[i].name + "</td>" +
//                        "<td>" + devices[i].os + "</td>" +
//                        "<td>" + devices[i].id + "</td>" +
//                        "<td>" + devices[i].type + "</td>" +
//                        "<td>" + devices[i].chromeVersion + "</td>" +
//                        "</tr>"));
//     }
//     return table;
// }

// // Add an event listener to listen for changes to device info. The
// // callback would redisplay the list of devices.
// chrome.signedInDevices.onDeviceInfoChange.addListener(dumpDevices);

// function populateDevices() {
//   // Get the list of devices and display it.
//   chrome.signedInDevices.get(false, dumpDevices);
// }
