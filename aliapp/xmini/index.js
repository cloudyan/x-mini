import XMini from './core/xmini';
// import { App, Page } from './utils/mockMini';
import PluginDemo1 from './plugin-demo1';
import PluginDemo2 from './plugin-demo2';
import PluginErrorReport from './plugin-error-report';

const xmini = new XMini({
  appId: 123,
  appName: 'test',
  me: {},
  plugins: [
    new PluginDemo1({ siteId: 2 }),
    new PluginDemo2({ url: 'www.baidu.com' }),
    new PluginErrorReport({ reportURI: 'https://tongji.doweidu.com/log.php' }),
  ],
});

console.log(xmini.getGlobalConfig());

export default xmini;

export const xApp = xmini.xApp;
export const xPage = xmini.xPage;

// const { xApp, xPage } = xmini;
// console.log(xmini.prototype);
// console.log(xmini.test());

// xApp({
//   onShow() {
//     console.log('page: onShow');
//   },
// });

// xPage({
//   onShow() {
//     console.log('page: onShow');
//   },
// });
