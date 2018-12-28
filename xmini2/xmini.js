import Core from './core';
import { Emitter } from '../utils/index';

const emitter = new Emitter();

class XMini extends Core {
  constructor(config = {}) {
    super(config);
  }
  init(config = {}) {
    const { plugins = [], me, App, Page, ...rest } = config;
    rest.plugin = {};
    rest.fn = {
      me,
      App,
      Page,
    };
    super(rest, true);
    if (!(me && App && Page)) {
      console.error('必须传入小程序的基础方法');
    }
    this.me = me;
    this.App = App;
    this.Page = Page;
    this.plugin = rest.plugin;
    this.addPlugin(plugins);
  }
  // 插件装载 vue 形式
  use(plugin, ...rest) {
    const installedPlugins =
      this._installedPlugins || (this._installedPlugins = []);

    if (installedPlugins.indexOf(plugin) > -1) return this;

    rest.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, rest);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, rest);
    }
    installedPlugins.push(plugin);
    return this;
  }

  addPlugin(plugin) {
    if (Array.isArray(plugin)) {
      plugin.forEach(p => {
        this.addPlugin(p);
      });
    } else {
      const { events = {} } = plugin;
      Object.keys(events).forEach(event => {
        const cbName = events[event];
        const fn = plugin[cbName];
        emitter.on(event, fn.bind(plugin));
      });
      // this.installPlugin(plugin);
      this.plugin[plugin.name] = plugin;
      // plugin.$x = this;
      console.log(`:::add plugin::: ${plugin.name}`);
    }
  }

  create(options = {}, config = {}) {
    const { type, hooks, hooksFn } = config;
    const cb = this[type];
    // 如果 options 没实现的方法，这里补上
    const newOpts = { ...hooksFn, ...options };
    // 只添加生命周期的 还是全加
    // Object.keys(newOpts).forEach((key, index) => {
    hooks.forEach((key, index) => {
      const oldFn = newOpts[key] || noop;
      newOpts[key] = function(opts) {
        // 这里应该使用 this 而不是 newOpts
        emitter.emit(`pre${type}${upperFirst(key)}`, this);
        const result = oldFn.call(this, opts);
        emitter.emit(`post${type}${upperFirst(key)}`, this);
        return result;
      };
    });

    cb(newOpts);
    return this;
  }

  // 事件机制(全局)
  on(...rest) {
    emitter.on(...rest);
  }
  once(...rest) {
    emitter.once(...rest);
  }
  off(...rest) {
    emitter.off(...rest);
  }
  emit(...rest) {
    emitter.emit(...rest);
  }

  create() {}

  // 所有方法调用，都通过调度中心处理
  send() {}
  registerHandler() {}
  callHandler() {}
  addMethods() {}
  addEvents() {}
}

// 默认配置
export default new XMini({
  appId: '',
  appName: '',
  plugin: {},
  fn: {},
});
