import PluginBase from './plugin-base';

class PluginDemo extends PluginBase {
  name = 'plugin-demo2';
  events = {
    preOnShow: 'preOnShow',
    postOnHide: 'postOnHide',
  };

  constructor(config) {
    super(config);
  }

  preOnShow(e, ctx) {
    console.log('plugin-2: preOnShow');
  }

  postOnHide(e, ctx) {
    // console.log('e', e);
  }
}

export default PluginDemo;
