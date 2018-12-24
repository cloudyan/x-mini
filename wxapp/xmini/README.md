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

关于数据配置

- 每个插件要能拿到全局 xminiConfig
- 插件的 pluginConfig 要挂载到 xminiConfig 上
  - 是否支持全局共享，部分插件有需要，如 channel
- 插件内的方法，要和页面的 options 打通，数据能共享，相当于执行的作用域在页面上

```js
import XMini from '@xmini/xmini';
import PluginCore from '@xmini/plugin-core';

// 插件
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
