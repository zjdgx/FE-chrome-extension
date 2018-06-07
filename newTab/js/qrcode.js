/*
 * @Author: jianminlu
 * @Date:   2016-05-16 10:38:38
 * @Last Modified by:   jianminlu
 * @Last Modified time: 2017-04-20 19:41:24
 */

'use strict';

chrome.tabs.getSelected(null, function(tab) {
    console.log(tab)
    $('#qrcode').qrcode({
        text: tab.url,
        width: "250",
        height: "250"
    });

    $('#url').val(tab.url);
    $('#title').val(tab.title);
});