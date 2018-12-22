import Emitter from './emitter';
import { core } from './xmini';
class PluginBase extends Emitter {
  name = 'demo1';
  constructor(pluginConfig = {}) {
    super();
    // this.config = config;
    this.pluginConfig = pluginConfig;
    // this.init(config);
    // console.log('a', this.$on);
    this.bindEvents();
    this.getPluginConfig = function() {
      return { ...pluginConfig };
    };
  }

  bindEvents() {}

  getConfig() {
    return core.getConfig();
  }
}

export default PluginBase;
