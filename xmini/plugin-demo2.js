import PluginBase from './core/plugin-base';

class PluginDemo extends PluginBase {
  name = 'demo2';
  events = {
    preOnShow: 'preOnShow',
    postOnHide: 'postOnHide',
  };

  constructor(pluginConfig = {}) {
    super(pluginConfig);
  }

  preOnShow(e, ctx) {
    console.log('plugin-2: preOnShow');
  }

  postOnHide(e, ctx) {
    // console.log('e', e);
  }
}

export default PluginDemo;
