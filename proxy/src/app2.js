// 小程序扩展核心
// const xmini = new xMini(config);
// xmini(options)('App');
// https://github.com/mqyqingfeng/Blog/issues/16


function xmini(options) {
  return (fnName) => {
    console.log(this.config)
    const newOptions = { ...options };
    return fnName === 'Page' ? Page(newOptions) : App(newOptions);
  };
}

xmini.prototype.init = function (config = {}) {
  this.config = config;
}


function App(opts) {
  opts.onLaunch();

  opts.data;

  opts.onShow();
};

function Page(opts) {
  opts.onLoad({});

  opts.data;

  opts.onShow();
};



xmini({
  data: {},
  onLaunch() {
    console.log('app onLaunch');
  },
  onShow() {
    console.log('app onShow');
  },
  onTest() {
    console.log('app test')
  },
})('App');


xmini({
  data: {},
  onLoad() {
    console.log('page onLoad');
  },
  onShow() {
    console.log('page onShow');
  },
  onTest() {
    console.log('page test')
  },
})('Page');
