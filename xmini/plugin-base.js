import Emitter from './emitter';
import config from './config';

class PluginBase extends Emitter {
  config = config;
  constructor(pluginConfig = {}) {
    super();
    // this.config = config;
    this.pluginConfig = pluginConfig;
    // this.init(config);
    // console.log('a', this.$on);
    this.bindEvents();
  }

  bindEvents() {}
}

export default PluginBase;
