// 基类

export default class Core {
  // 微信小程序不支持私有属性
  #config;

  constructor(config = {}) {
    if (new.target !== Core) {
      return throw new Error('必须使用 new 命令生成实例');
    }
    this.#config = config;
  }

  // 配置
  getConfig() {
    return this.#config;
  }
  setConfig(config) {
    return Object.assign(this.#config, config);
  }

  init(config = {}) {
    this.setConfig(config);
  }

  // 所有方法调用，都通过调度中心处理
}
