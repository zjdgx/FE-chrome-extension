/*
 * @Author: jianminlu
 * @Date:   2016-05-16 10:38:38
 * @Last Modified by:   jianminlu
 * @Last Modified time: 2017-04-20 19:41:24
 */

'use strict';

// 显示URL二维码
chrome.tabs.getSelected(null, function (tab) {
	$('#qrcode').qrcode({
		text: tab.url,
		width: "250",
		height: "250"
	});

	$('#url').val(tab.url);
	$('#title').val(tab.title);
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
		}
	}
})