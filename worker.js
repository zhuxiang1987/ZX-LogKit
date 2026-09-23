/**
 * ZX-LogKit — 静态资源 Worker 入口
 * 作用：Workers 环境下没有内置静态托管，需要显式把请求交给 ASSETS 绑定处理
 */
export default {
  async fetch(request, env) {
    try {
      let url = new URL(request.url);

      // 目录路径补 index.html
      if (url.pathname === '/' || url.pathname.endsWith('/')) {
        url.pathname = url.pathname + 'index.html';
        return env.ASSETS.fetch(new Request(url, request));
      }

      return env.ASSETS.fetch(request);
    } catch (e) {
      return new Response('Worker error: ' + e.message, { status: 500 });
    }
  }
};
