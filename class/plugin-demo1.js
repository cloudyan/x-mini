import PluginBase from './plugin-base';

class PluginDemo extends PluginBase {
  events = {
    preOnShow: 'preOnShow',
    postOnShow: 'postOnShow',
    postOnHide: 'postOnHide',
  };

  constructor(config) {
    super(config);
  }

  preOnShow(e, ctx) {
    console.log('plugin-1: preOnShow');

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
