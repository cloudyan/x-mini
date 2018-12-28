import xmini from './xmini';
import { APP_HOOKS, PAGE_HOOKS } from '../utils/index';

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

export default {
  xmini,
  xApp(options) {
    xmini.create(options, {
      type: 'App',
      hooks: APP_HOOKS,
      hooksFn: appFns,
    });
  },
  xPage(options) {
    xmini.create(options, {
      type: 'Page',
      hooks: PAGE_HOOKS,
      hooksFn: pageFns,
    });
  },
};
