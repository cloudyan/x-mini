import PluginBase from './core/plugin-base';

/**
 * 处理小程序参数数据
 * 支持配置必备参数透传
 * 支持参数的 parse stringify merge 等操作
 *
 * @class Plugin
 * @extends {PluginBase}
 */
class Plugin extends PluginBase {
  name = 'channel';
  events = {
    preAppOnLaunch: 'preAppOnLaunch',
    preAppOnShow: 'preAppOnShow',
    prePageOnLoad: 'prePageOnLoad',
    prePageOnShow: 'prePageOnShow',
  };

  constructor(config) {
    super(config);
  }

  preAppOnLaunch(options = {}) {
    console.log(options);
  }
  preAppOnShow(options = {}) {
    console.log(options);
  }
  prePageOnLoad(query = {}) {
    console.log(query);
  }
  prePageOnShow() {}

  getChannel() {}
}

export default Plugin;

// 注意事项

// 支付宝小程序
// !!!如果当前已经打开蚂蚁会员小程序，在钉钉跳转到积分小程序，触发两次这个App 的 onShow();
// 第一次为从后台切到前台，参数为空
// 第二次为schema唤醒，传入参数
// 支付宝 schema 传参在 options.query 这里取
// alipay://platformapi/startApp?appId=2018051160096372&query=channel_id%3Dalipay_ant
// 小程序间跳转，在 referrerInfo，结构如下：
// options = { path: '', query: {}, referrerInfo: { appId: '', extraData: { channel_id: '', spm: '' } } };
// my.alert({
//   title: 'onShow:' + JSON.stringify(options),
// });

// 微信小程序
// options = { path: "pages/index/index", query: {}, referrerInfo: {}, scene: 1001, shareTicket: undefined }
//
