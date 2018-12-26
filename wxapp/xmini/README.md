# xmini

配置及使用

- const xmini = new Core();
  - 使用单例 xmini
  - 实现管理插件，生命周期，配置，通信；
  - 暴露添加插件，暴露全局配置；
  - 提供给插件调用注册公开方法
    - 提供一个公共方法来调用这些注册的方法（是唯一的） 例如 xxx.call('getChannelInfo', callback);
    - 注册的方法不唯一时，提供映射关系绑定
- class Plugin extends PluginBase;
  - 实现调用 core 注册方法，注册自己的公开方法
  - 实现自己的生命周期，配置
  - 实现具体功能

core.init({
  appId: '',
  plugins: [
    xxx,
  ],
})

core.getConfig()

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
