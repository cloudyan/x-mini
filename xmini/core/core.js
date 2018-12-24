export default class Core {
  constructor(config = {}, type = 'plugin') {
    this.config = config;
    // if (type === 'plugin') {
    //   this._config = config;
    // } else {
    //   this._pluginConfig = config;
    // }
  }

  // get config(bool) {
  //   return { ...(!bool ? this._pluginConfig : this._config) };
  // }
  // set config() {
  //   return Object.assign({!bool ? this._pluginConfig : this._config),  });
  // }

  getConfig() {
    return { ...this.config };
  }

  setConfig(newConfig = {}) {
    return Object.assign(this.config, newConfig);
  }
}
