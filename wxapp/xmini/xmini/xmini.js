import Core from './core';
import { Emitter } from '../utils/index';

const emitter = new Emitter();

class XMini extends Core {
  constructor(config = {}) {
    super(config);
  }
  init(config) {
    this.setConfig(config);
  }
  // 插件装载
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

  // 所有方法调用，都通过调度中心处理
  send() {}
  registerHandler() {}
  callHandler() {}
  addMethods() {}
  addEvents() {}
}

export default config => {
  return new XMini(config);
};
