/* OneCargoKit Clone — 统一导航 + 页脚 + 语言参数处理
   对标 onecargokit.com 的 js/ock-nav.js（注入式统一导航）
   用法：各页面只留 <div id="nav-mount"></div> 和 <div id="footer-mount"></div>，其余由此脚本注入 */

(function () {
  'use strict';

  var SITE_NAME = 'LogiKit'; // TODO: 待定正式站名
  var ROOT = location.pathname.replace(/\/(tools\/[^/]+)?$/, '') || '..';

  // 语言参数透传：?lang=zh/en（骨架先支持中英，后续扩展同款语言包模式）
  var params = new URLSearchParams(location.search);
  var lang = params.get('lang') === 'en' ? 'en' : 'zh';

  var T = {
    zh: { nav: ['工具中心', '关于'], foot: '免费开放 · 无需注册 · 数据来源均标注', src: '数据来源' },
    en: { nav: ['Tools', 'About'], foot: 'Free & open · No registration · Sources attributed', src: 'Data source' }
  }[lang];

  // ---- 导航 ----
  var navMount = document.getElementById('nav-mount');
  if (navMount) {
    var links = [
      { href: ROOT + '/index.html', key: 0 },
      { href: ROOT + '/about.html', key: 1 }
    ];
    navMount.innerHTML =
      '<nav class="ock-nav">' +
      '<a class="logo" href="' + ROOT + '/index.html">' + SITE_NAME + '</a>' +
      '<div class="nav-links">' +
      links.map(function (l) { return '<a href="' + l.href + '?lang=' + lang + '">' + T.nav[l.key] + '</a>'; }).join('') +
      '</div></nav>';
  }

  // ---- 页脚 ----
  var footerMount = document.getElementById('footer-mount');
  if (footerMount) {
    footerMount.innerHTML =
      '<footer class="ock-footer">' +
      '<div>&copy; ' + new Date().getFullYear() + ' ' + SITE_NAME + ' · ' + T.foot + '</div>' +
      '</footer>';
  }

  // ---- 数据来源标注自动注入（合规约定：所有数据型工具必须标注来源） ----
  window.ockSetSource = function (text) {
    var note = document.querySelector('.data-source-note');
    if (note) note.textContent = T.src + '：' + text;
  };
})();
