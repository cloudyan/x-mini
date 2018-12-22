import { APP_HOOKS, PAGE_HOOKS } from './constants';
import { App, Page } from './miniapp';
import ev from './event';

// import { isFunction } from './is';
import { upperFirst } from './utils';

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

let inited;
const xminiConfig = {};
export default function xmini(options = {}) {
  // console.log('plugins:', plugins)
  // console.log('config:', rest);
  return type => {
    const types = ['config', 'App', 'Page'];
    if (types.indexOf(type) === -1) {
      console.error(`不支持的 type 类型 ${type}`);
      return;
    }
    if (type === 'config') {
      if (inited) return inited;
      const { plugins = [], ...rest } = options;
      // this.setConfig(rest);
      Object.assign(xminiConfig, rest);
      plugins.forEach(plugin => {
        // console.log(plugin.events);
        const { events = {} } = plugin;
        Object.keys(events).forEach(
          function pluginFn(event) {
            const fnName = events[event];
            const fn = plugin[fnName];
            ev.$on(event, fn);
          }.bind(plugin)
        );
      });
      inited = {
        getConfig() {
          return { ...xminiConfig };
        },
        setConfig(config) {
          Object.assign(xminiConfig, config);
        },
      };
      return inited;
    }

    // 页面调用
    const isPage = type !== 'App';
    const cb = isPage ? Page : App;
    const hooks = isPage ? PAGE_HOOKS : APP_HOOKS;
    const hooksFn = isPage ? pageFns : appFns;

    // 如果 options 没实现的方法，这里补上
    const newOpts = { ...hooksFn, ...options };
    // 只添加生命周期的 还是全加
    // Object.keys(newOpts).forEach((key, index) => {
    hooks.forEach((key, index) => {
      const oldFn = newOpts[key] || noop;
      newOpts[key] = function(opts) {
        ev.$emit(`pre${upperFirst(key)}`, newOpts);
        const result = oldFn.call(this, opts);
        ev.$emit(`post${upperFirst(key)}`, newOpts);
        return result;
      };
    });

    cb(newOpts);
  };
}
