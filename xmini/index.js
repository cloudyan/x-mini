import xmini from './xmini';
import PluginDemo1 from './plugin-demo1';
import PluginDemo2 from './plugin-demo2';

xmini({
  appId: 123,
  appName: 'test',
  plugins: [
    new PluginDemo1({ siteId: 2 }),
    new PluginDemo2({ url: 'www.baidu.com' }),
  ],
})('config');

xmini({
  onShow() {
    console.log('page: onShow');
  },
})('Page');
