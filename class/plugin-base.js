import Emitter from './emitter';

class PluginBase extends Emitter {
  constructor(config = {}) {
    super();
    this.config = config;
    // this.init(config);
    // console.log('a', this.$on);
    this.bindEvents();
  }

  init(config) {
    // this.config = config;
  }

  bindEvents() {}
}

export default PluginBase;
