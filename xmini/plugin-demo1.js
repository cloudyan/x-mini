import PluginBase from './plugin-base';
class PluginDemo extends PluginBase {
  name = 'demo1';
  events = {
    preOnShow: 'preOnShow',
    postOnShow: 'postOnShow',
    postOnHide: 'postOnHide',
  };

  constructor(pluginConfig = {}) {
    super(pluginConfig);
  }

  preOnShow(e, ctx) {
    console.log('plugin-1: preOnShow');
    console.log(this);
    // console.log(PluginBase.getConfig());
    console.log(this.getConfig());
    console.log(this.setConfig({ appName: 'edited' }));
    console.log(this.getConfig());
    console.log(this.getPluginConfig());
    this.setPluginConfig({ ttt: 1 });
    console.log(this.getPluginConfig());

    const tt = [];
    for (let i = 0; i < 100000; i++) {
      tt.push(i);
    }
    console.log(tt.length);
  }

  postOnShow(e, ctx) {
    console.log('plugin-1: postOnShow');
  }

  postOnHide(e, ctx) {
    // console.log('plugin-1: postOnHide');
    // console.log('e', e);
  }
}

export default PluginDemo;
