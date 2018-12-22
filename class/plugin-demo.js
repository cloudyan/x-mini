import PluginBase from './plugin-base';

class PluginDemo extends PluginBase {
  constructor(config) {
    super(config);
  }

  // events: {
  //   preOnShow: 'preOnShow',
  // };

  preOnShow(e, ctx) {
    console.log(e);
  }
}

export default PluginDemo;
