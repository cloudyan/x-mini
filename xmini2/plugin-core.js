import Core from './Core';
// import xmini from './xmini';

export default class PluginCore extends Core {
  constructor(config = {}) {
    this.config = config;
  }

  // 不需要这种方法，而是都通过调度中心来处理所有通信
  // getGlobalCOnfig() {
  //   return xmini.getConfig();
  // }
}
