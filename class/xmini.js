import PluginDemo from './plugin-demo';

let inited;
function xmini(options = {}) {
  // console.log('plugins:', plugins)
  // console.log('config:', rest);
  return type => {
    const types = ['config', 'App', 'Page'];
    if (types.indexOf(type) === -1) {
      console.error(`不支持的 type 类型 ${type}`);
      return;
    }
    if (type === 'config') {
      if (inited) return;
      const { plugins = [], ...rest } = options;
      // this.setConfig(rest);
      console.log('config', rest);
      plugins.forEach(plugin => {
        console.log(plugin.events);
        const { events = {} } = plugin;
        Object.keys(events).forEach(
          function pluginFn(event) {
            const fnName = events[event];
            const fn = plugin[fnName];
            this.$on(event, fn);
          }.bind(plugin)
        );
      });
      inited = true;
    }

    // 页面调用
  };
}

xmini({
  appId: 123,
  appName: 'test',
  plugins: [new PluginDemo({ siteId: 2 })],
})('config');

xmini({
  onShow() {
    console.log('onShow');
  },
})('Page');
