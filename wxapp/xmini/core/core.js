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
    console.warn('set plugin config:');
    return { ...this.config };
  }

  setConfig(newConfig = {}) {
    console.warn('set plugin config:');
    return Object.assign(this.config, newConfig);
  }

  getGlobalConfig() {
    console.warn('set global config:');
    return { ...globalConfig };
  }

  setGlobalConfig(newConfig = {}) {
    console.warn('set global config:');
    return Object.assign(globalConfig, newConfig);
  }
}
