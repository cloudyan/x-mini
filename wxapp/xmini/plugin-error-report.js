import PluginBase from './core/plugin-base';
// import xmini from './core/xmini';

// https://tongji.doweidu.com/log.php

class PluginDemo extends PluginBase {
  name = 'error-report';
  events = {
    preAppOnError: 'preOnError',
  };

  constructor(config) {
    super(config);
  }

  preOnError(err, ctx) {
    if (!err) return;
    // const config = this.getConfig();
    // const config = this.getConfig();
    // const systemInfo = xmini.getSystemInfo('string');
    // const pluginConfig = this.getPluginConfig();
    // const request = xmini.getFn('request');

    console.log('error-report');
    // console.log(this.getGlobalConfig());
    console.log(this.getConfig());
    // 错误上报
    // console.log({
    //   url: pluginConfig.reportURI,
    //   method: 'POST',
    //   data: {
    //     platform: appName,
    //     value: JSON.stringify(err),
    //     // systemInfo: systemInfo,
    //   },
    //   dataType: 'json',
    //   success: function(res) {},
    //   fail: function(res) {},
    //   complete: function(res) {},
    // });
  }
}

export default PluginDemo;
