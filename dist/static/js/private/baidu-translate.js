$(() => {
    // 百度翻译
  $('#translate').on('click', () => {
    var api = 'http://api.fanyi.baidu.com/api/trans/vip/translate?';
    // var query = $('').val(); // 待翻译文字
    // var from = $('').val() || 'zh'; // 待翻译文字语言
    // var to = $('').val() || 'en'; // 翻译后语言
    var appid = "20190104000254466";
    var salt = Date.now();
    var sign = md5(appid + "中文" + salt + "iasoZA6RMoFzehght2h");
    console.log(sign);
    console.log(api + "q=" + encodeURI("中文") + "&from=zh&to=en&appid=" + appid + "&salt=" + salt + "&sign=" + sign);
    // $.ajax({
    //   type: 'GET',
    //   url: api + "q=" + encodeURI("中文") + "&from=zh&to=en&appid=" + appid + "&salt=" + salt + "&sign=" + sign,
    //   dataType: "JSON",
    //   success: function (res) {
    //     $('.translate-result').html(res['trans_result'].dst);
    //   }
    // })
  });
});