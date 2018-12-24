import { APP_HOOKS, PAGE_HOOKS, upperFirst, emitter } from '../utils/index';
import Core from './core';
import { App, Page } from './miniapp';

const noop = () => {};

const appFns = APP_HOOKS.reduce((obj, key) => {
  // console.log(obj, key);
  obj[key] = noop;
  return obj;
}, {});
const pageFns = PAGE_HOOKS.reduce((obj, key) => {
  obj[key] = noop;
  return obj;
}, {});

// Core 加入必备插件，如 wxapp aliapp config支持 addPlugin 等
// XMini 在此基础上扩展
export default class XMini extends Core {
  constructor(config = {}) {
    const { plugins = [], ...rest } = config;
    super(rest);
    this.plugin = {};
    this.addPlugin(plugins);
    rest.plugin = this.plugin;
  }

  addPlugin(plugin) {
    if (Array.isArray(plugin)) {
      plugin.forEach(p => {
        this.addPlugin(p);
      });
    } else {
      const { events = {} } = plugin;
      // Object.assign(plugin, {
      //   getGlobalConfig: this.getConfig.bind(this),
      //   setGlobalConfig: this.setConfig.bind(this),
      // });
      Object.keys(events).forEach(event => {
        const cbName = events[event];
        const fn = plugin[cbName];
        emitter.$on(event, fn.bind(plugin));
      });
      this.plugin[plugin.name] = plugin;
      console.log(`add plugin: ${plugin.name}`);
    }
  }

  // bindEvent(name, fn, ctx) {
  //   emitter.$on(event, fn.bind(ctx));
  // }

  create(options = {}, config = {}) {
    const { type, hooks, hooksFn, cb } = config;
    // 如果 options 没实现的方法，这里补上
    const newOpts = { ...hooksFn, ...options };
    // 只添加生命周期的 还是全加
    // Object.keys(newOpts).forEach((key, index) => {
    hooks.forEach((key, index) => {
      const oldFn = newOpts[key] || noop;
      newOpts[key] = function(opts) {
        // 这里应该使用 this 而不是 newOpts
        emitter.$emit(`pre${type}${upperFirst(key)}`, this);
        const result = oldFn.call(this, opts);
        emitter.$emit(`post${type}${upperFirst(key)}`, this);
        return result;
      };
    });

    cb(newOpts);
    return this;
  }

  xApp = options => {
    this.create(options, {
      type: 'App',
      cb: App,
      hooks: APP_HOOKS,
      hooksFn: appFns,
    });
  };
  xPage = options => {
    this.create(options, {
      type: 'Page',
      cb: Page,
      hooks: PAGE_HOOKS,
      hooksFn: pageFns,
    });
  };
}

// export const core = {
//   me,
//   getConfig() {
//     return { ...config };
//   },
//   setConfig(newConfig) {
//     return Object.assign(config, newConfig);
//   },
//   getSystemInfo(needString) {
//     return !needString ? { system: 'test' } : '{"system":"test"}';
//   },
//   getFn(fnName) {
//     return fnName && core.me[fnName];
//   },
// };

// let inited;
// xmini.initConfig = function(options) {
//   if (inited) return xmini;
//   const { plugins = [], ...rest } = options;
//   // this.setConfig(rest);
//   core.setConfig(rest);
//   plugins.forEach(plugin => {
//     // console.log(plugin.events);
//     const { events = {} } = plugin;
//     Object.keys(events).forEach(
//       function pluginFn(event) {
//         const cbName = events[event];
//         const fn = plugin[cbName];
//         emitter.$on(event, fn.bind(plugin));
//       }.bind(plugin)
//     );
//     console.log(`add plugin: ${plugin.name}`);
//   });
//   inited = true;
//   return xmini;
// };

// function xmini(options = {}) {
//   // console.log('plugins:', plugins)
//   // console.log('config:', rest);

//   return function xFn(type) {
//     // Object.assign(xFn.prototype, core);
//     const types = ['config', 'App', 'Page'];
//     if (types.indexOf(type) === -1) {
//       console.error(`不支持的 type 类型 ${type}`);
//       return;
//     }
//     // if (type === 'config') {

//     // }

//     // 页面调用
//     const isPage = type !== 'App';
//     const cb = isPage ? Page : App;
//     const hooks = isPage ? PAGE_HOOKS : APP_HOOKS;
//     const hooksFn = isPage ? pageFns : appFns;

//     // 如果 options 没实现的方法，这里补上
//     const newOpts = { ...hooksFn, ...options };
//     // 只添加生命周期的 还是全加
//     // Object.keys(newOpts).forEach((key, index) => {
//     hooks.forEach((key, index) => {
//       const oldFn = newOpts[key] || noop;
//       newOpts[key] = function(opts) {
//         // 这里应该使用 this 而不是 newOpts
//         emitter.$emit(`pre${upperFirst(key)}`, this);
//         const result = oldFn.call(this, opts);
//         emitter.$emit(`post${upperFirst(key)}`, this);
//         return result;
//       };
//     });

//     cb(newOpts);
//     return core;
//   };
// }

// export default xmini;
