import PluginBase from './plugin-base';

class PluginDemo extends PluginBase {
  events = {
    preOnShow: 'preOnShow',
  };

  constructor(config) {
    super(config);
  }

  preOnShow(e, ctx) {
    console.log(e);
  }
}

export default PluginDemo;
