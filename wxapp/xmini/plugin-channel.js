import PluginBase from './core/plugin-base';

/**
 * 处理小程序参数
 * 支持配置必备业务参数透传
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
    this.initChannel(options);
    console.log(options);
  }
  preAppOnShow(options = {}) {
    this.initChannel(options);
    console.log(options);
  }
  prePageOnLoad(query = {}) {
    console.log(query);
  }
  prePageOnShow() {}

  initChannel(options = {}) {
    const { path = '', query, referrerInfo = {}, scene, shareTicket } = options;
    const { extraData } = referrerInfo;
    console.log(path, query, scene, shareTicket);
    console.log(extraData);
    this.updateChannel(query || extraData);
  }

  updateChannel(options) {
    // 内部变量全是用channel 而不要用channel_id
    if (typeof options !== 'object') return;
    // 此参数，在切换到后台后，再切换回来，参数丢失了
    // 更新业务渠道参数
    // 每次启动时，获取参数设置为默认值，之后透传当前页面的配置，若无则使用默认值替代
    // 其值为api、分享或页面使用
    // 仅仅取有效的参数值
    let { channel_id = '', spm = '' } = options;
    this.bizParams = compat({
      channel: channel_id,
      spm,
    });

    // 业务参数被更新，仅仅更新渠道参数
    // const oldParams = this.getChannel();
    // if(channel_id != oldParams.channel || spm != oldParams.spm){
    //   this.updateCurrentPage();
    // }
  }

  getChannel() {
    // 获取当前业务参数
    // 由默认参数 config、启动参数 bizParams 以及当前页面参数 pageQuery 叠加而成
    // return Object.assign({}, this.config, this.bizParams, current);
  }
}

export default Plugin;

// 注意事项
// 以下测试要以真机结果为准

// 支付宝小程序
// !!!如果当前已经打开蚂蚁会员小程序，在钉钉跳转到积分小程序，触发两次这个App 的 onShow();
// 第一次为从后台切到前台，参数为空
// 第二次为schema唤醒，传入参数
// 支付宝 schema 传参在 options.query 这里取
// alipay://platformapi/startApp?appId=2018051160096372&query=channel_id%3Dalipay_ant
// 小程序间跳转，在 referrerInfo，结构如下：
// options = { path: '', query: {}, referrerInfo: { appId: '', extraData: { channel_id: '', spm: '' } } };
// options = { path: "pages/index/index", referrerInfo: { appId: "2018051560091226", data: {} }, scene: undefined }
// my.alert({
//   title: 'onShow:' + JSON.stringify(options),
// });

// 微信小程序
// options = { path: "pages/index/index", query: {}, referrerInfo: {}, scene: 1001, shareTicket: undefined }
//
