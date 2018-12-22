# xmini

配置及使用

```js
import xmini from '@xmini/core';

xmini({
  appId: '',
  appName: '',
  plugins: [
    new PluginDemo1({}),
    new PluginDemo2({}),
  ],
})('config');

xmini({
  onLaunch() {},
  onShow() {},
})('App');

xmini({
  onLoad() {},
  onShow() {},
})('Page');
```

插件

```js
import xmini from '@xmini/core';
import PluginCore from '@xmini/plugin-core';

export default class PluginDemo1 extends PluginCore {
  name = 'plugin-demo1';
  events = {
    preOnShow: 'preOnShow',
    postOnShow: 'postOnShow',
  };

  constructor(config) {
    super(config);

    this.config = config;
  }

  preOnShow(e, ctx) {
    // 自定义各种事件
  }

  postOnShow(e, ctx) {}
}
```
