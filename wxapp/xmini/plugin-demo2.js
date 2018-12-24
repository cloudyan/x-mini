import PluginBase from './core/plugin-base';

class PluginDemo extends PluginBase {
  name = 'demo2';
  events = {
    prePageOnShow: 'preOnShow',
    postPageOnHide: 'postOnHide',
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
