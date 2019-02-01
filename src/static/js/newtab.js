let doc = document;
let sort = {column: '', type: 'desc'}; // 2019/01/07: interview javascript sort
let sourceData = [// 2019/01/07: interview javascript sort
  {a: '测试', b: 1, c: '001'},
  {a: '百度', b: 9, c: '008'},
  {a: '京东', b: 2, c: '009'}
];
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var nowDate = new Date();
var second = nowDate.getSeconds();
var minute = nowDate.getMinutes();
var hour = nowDate.getHours();

function draw(ctx, size) {
  setInterval(function () {
    var nowDate = new Date(),
      year = nowDate.getFullYear(),
      month = nowDate.getMonth() + 1,
      date = nowDate.getDate();

    var second = nowDate.getSeconds();
    var minute = nowDate.getMinutes();
    var hour = nowDate.getHours();

    ctx.clearRect(0, 0, size, size);

    // var img = new Image();
    // img.src = './logo.jpg';
    // ctx.drawImage(img, 20, 20, size, size);
    ctx.fillStyle = "#fff"; //数字颜色
    ctx.beginPath();

    ctx.arc(size / 2, size / 2, 260 / 600 * size, 0, 360 * (Math.PI / 180));
    ctx.save();
    ctx.closePath();
    ctx.fill();
    // 只有弧度
    ctx.strokeStyle = '#000';
    ctx.stroke();
    ctx.fillStyle = "#000"; //数字颜色
    ctx.beginPath();
    ctx.lineCap = "round";
    for (var i = 0; i < 60; i++) {
      if ((i + 5) % 5 === 0) {
        continue;
      }
      ctx.moveTo(Math.cos((i * 6) / 180 * Math.PI) * 250 / 600 * size + 300 / 600 * size, Math.sin((i * 6) / 180 * Math.PI) * 250 / 600 * size + 300 / 600 * size);
      ctx.lineTo(Math.cos((i * 6) / 180 * Math.PI) * 235 / 600 * size + 300 / 600 * size, Math.sin((i * 6) / 180 * Math.PI) * 235 / 600 * size + 300 / 600 * size);
    }
    ctx.save();
    ctx.closePath();
    // ctx.shadowOffsetX=-5;
    // ctx.shadowOffsetY=2;
    // ctx.shadowBlur = 20;
    // ctx.shadowColor = "#000";
    ctx.lineWidth = 7 / 600 * size;
    ctx.strokeStyle = '#000';
    ctx.stroke();

    ctx.beginPath();
    ctx.lineCap = "round";
    for (var i = 1; i < 13; i++) {
      ctx.moveTo(Math.cos((i * 30) / 180 * Math.PI) * 250 / 600 * size + 300 / 600 * size, -Math.sin((i * 30) / 180 * Math.PI) * 250 / 600 * size + 300 / 600 * size);
      ctx.lineTo(Math.cos((i * 30) / 180 * Math.PI) * 220 / 600 * size + 300 / 600 * size, -Math.sin((i * 30) / 180 * Math.PI) * 220 / 600 * size + 300 / 600 * size);
      ctx.font = 50 / 600 * size + "px Arial";
      if (i > 9) {
        ctx.fillText(i, Math.cos((i * 30 - 90) / 180 * Math.PI) * 180 / 600 * size + 300 / 600 * size - 25 / 600 * size, Math.sin((i * 30 - 90) / 180 * Math.PI) * 180 / 600 * size + 300 / 600 * size + 25 / 600 * size);
      } else {
        ctx.fillText(i, Math.cos((i * 30 - 90) / 180 * Math.PI) * 180 / 600 * size + 288 / 600 * size, Math.sin((i * 30 - 90) / 180 * Math.PI) * 180 / 600 * size + 300 / 600 * size + 20 / 600 * size);
      }
    }
    ctx.lineWidth = 11 / 600 * size;
    ctx.strokeStyle = '#000';
    ctx.stroke();
    ctx.closePath();
    ctx.restore();

    ctx.beginPath();
    ctx.font = 28 / 600 * size + "px Arial";
    ctx.fillText('ZJDGX LOVE', 223 / 600 * size, 380 / 600 * size);
    ctx.font = 20 / 600 * size + "px Arial";
    ctx.fillText(year + '年' + month + '月' + date + '日', 238 / 600 * size, 405 / 600 * size);
    ctx.font = 16 / 600 * size + "px Arial";
    ctx.fillText(['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][new Date().getDay()], 275 / 600 * size, 427 / 600 * size);

    ctx.closePath();

    // 时针
    ctx.beginPath();
    ctx.moveTo(Math.cos((hour * 30 + minute / 2 - 90) / 180 * Math.PI) * 120 / 600 * size + size / 2, Math.sin((hour * 30 + minute / 2 - 90) / 180 * Math.PI) * 120 / 600 * size + size / 2);
    ctx.lineTo(size / 2, size / 2);
    ctx.save();
    ctx.lineCap = "round";
    ctx.closePath();
    ctx.shadowOffsetX = -size / 120;
    ctx.shadowBlur = size / 60;
    ctx.shadowColor = "#000";
    ctx.lineWidth = size / 60;
    ctx.strokeStyle = '#222';
    ctx.stroke();
    ctx.restore();

    // 分针
    ctx.beginPath();
    ctx.moveTo(Math.cos((minute * 6 + second * 0.1 - 90) / 180 * Math.PI) * 200 / 600 * size + size / 2, Math.sin((minute * 6 + second * 0.1 - 90) / 180 * Math.PI) * 200 / 600 * size + size / 2);
    ctx.lineTo(size / 2, size / 2);
    ctx.save();
    ctx.closePath();
    ctx.shadowOffsetX = -size / 120;
    ctx.shadowBlur = size / 60;
    ctx.shadowColor = "#000";
    ctx.lineWidth = size / 75;
    ctx.strokeStyle = '#222';
    ctx.stroke();
    ctx.restore();

    // 秒针
    ctx.beginPath();
    ctx.moveTo(Math.cos((second * 6 - 90) / 180 * Math.PI) * 245 / 600 * size + 300 / 600 * size, Math.sin((second * 6 - 90) / 180 * Math.PI) * 245 / 600 * size + 300 / 600 * size);
    ctx.lineTo(size / 2, size / 2);
    ctx.save();
    ctx.closePath();
    ctx.shadowOffsetX = -size / 120;
    ctx.shadowBlur = size / 60;
    ctx.shadowColor = "#000";
    ctx.lineWidth = size / 120;
    ctx.strokeStyle = 'rgb(213, 153, 0)';
    ctx.stroke();
    ctx.restore();
    ctx.closePath();

    ctx.save();
    ctx.arc(size / 2, size / 2, size / 30, 0, Math.PI * 2);
    ctx.shadowOffsetX = -size / 120;
    ctx.shadowBlur = size / 60;
    ctx.shadowColor = "#000";
    ctx.fillStyle = 'rgb(213, 153, 0)';
    ctx.fill();

    ctx.restore();
  }, 1000);
}

// 2019/01/07: interview javascript sort
function showTable () {
  let html = ['<li class="head"><span class="a">A</span><span class="b">B</span><span class="c">C</span></li>'];
  const table = doc.querySelector('#interview-js .table');

  for (var i in sourceData) {
    html.push('<li class="item"><span>' + sourceData[i].a + '</span><span>' + sourceData[i].b + '</span><span>' + sourceData[i].c + '</span></li>')
  }

  table.innerHTML = html.join("");
}

$(() => {
  new Swiper('.swiper-container', {
    autoplay: {
      delay: 5000,
      stopOnLastSlide: false,
      disableOnInteraction: true,
    },//可选选项，自动滑动
    paginationType: 'fraction',
    pagination: '.swiper-pagination',
    autoplayDisableOnInteraction: false
  });
  draw(ctx, 300);
  hljs.initHighlightingOnLoad();
  // $('pre code').each(function(i, block) {
  //   hljs.highlightBlock(block);
  // });
  // header tab点击事件
  $('.header').on('click', 'span', e => {
    let $t = $(e.target), $cat = $('.category.active');

    if (!$t.hasClass('active')) {
      $t.addClass('active').siblings().removeClass('active');
      $cat.animate({
        left: '-1000px'
      }, 'fast');
      $($t.data('target')).addClass('active').animate({left: 0}, 'fast', e => {
        $cat.removeClass('active').css('left', '1000px');
      });
    }
  });

  // 工具点击事件
  $('.tab-item').on('click', e => {
    let $t = $(e.target), 
        $cat = $($t.data('target')),
        $cur = $cat.siblings('.active');

    if (!$t.hasClass('active')) {
      $t.addClass('active').siblings().removeClass('active');
      $cur.animate({
        height: 0
      }, 'fast', e => {
        $cur.removeClass('active').css('height', '100%');
        $cat.addClass('active');
      });
      if ($t.attr('data-target') === '#interview-js') {
        // 如果是interview-js，显示原始数据
        showTable();
      }
    }
  });

  // 二维码
  $('#qrcode').on('click', function () {
    var url = $.trim($('#qrcode-url').val());

    if (url.length) {
      $('.qrcode').html('').qrcode({
        text: url,
        width: "250",
        height: "250"
      })
    }
  });

  // 颜色转换
  var reg = /^[0-9a-fA-f]{3}$|^[0-9a-fA-f]{6}$/;
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
  String.prototype.colorRgb = function () {
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

  // 颜色转换
  $('#transform-color').on('click', () => {
    let color = $('#tool-color-value').val();
    
    if (color.trim().length) {
      if (reg.test(color)) {
        $('.result').html(color.colorRgb());
      } else {
        $('.result').html(color.colorHex());
      }
    }
  });

  // JSON格式化
  $('#format-json').on('click', () => {
    $('.json-result').val(formatJson($('#json-src').val()));
  });

  // 2019/01/07: interview javascript sort
  doc.getElementById('interview-js').addEventListener('click', function (e) {
    const $t = e.target;
    const $p = $t.parentNode;
    if ($t.nodeName === 'SPAN' && $p.nodeName === 'LI' && $p.className === 'head') {
      const column = $t.className;

      if (sort.column === column) {
        sort.type = sort.type == 'desc' ? 'asc' : 'desc';
      } else {
        sort = {
          column,
          type: 'desc'
        };
      }

      sourceData.sort(function compare(a, b) {
        if (sort.type == 'desc') {
          if (a[column] < b[column])
            return -1;
          if (a[column] > b[column])
            return 1;
          return 0;
        } else {
          if (a[column] > b[column])
            return -1;
          if (a[column] < b[column])
            return 1;
          return 0;
        }
      });
      showTable();
    } else if ($t.id === 'interview-js') {
      showTable();
    }
  }, false);
});
