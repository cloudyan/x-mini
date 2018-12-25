const globalConfig = {};

export default class Core {
  constructor(config = {}, isGlobal) {
    this.config = config;
    if (isGlobal) {
      this.setGlobalConfig(config);
      this.setConfig = this.setGlobalConfig;
      this.getConfig = this.getGlobalConfig;
    }
  }

  getConfig() {
    console.log('plugin config:');
    return { ...this.config };
  }

  setConfig(newConfig = {}) {
    return Object.assign(this.config, newConfig);
  }

  getGlobalConfig() {
    console.log('global config:');
    return { ...globalConfig };
  }

  setGlobalConfig(newConfig = {}) {
    return Object.assign(globalConfig, newConfig);
  }
}
