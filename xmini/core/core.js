export default class Core {
  constructor(config = {}) {
    this.config = config;
  }

  getConfig() {
    return { ...this.config };
  }

  setConfig(newConfig = {}) {
    return Object.assign(this.config, newConfig);
  }
}
