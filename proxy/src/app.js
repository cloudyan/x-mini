const proxyMap = {
  App: ['onLaunch', 'onShow'],
  Page: ['onLoad', 'onShow'],
};

// new xMini(config);

// xmini(options)('App');

function xMini(config) {
  const { plugins, ...rest } = config;

  console.log('this', this);
  return options => {
    return fnName => {
      console.log('config', this);

      // http://es6.ruanyifeng.com/#docs/proxy
      // new Proxy(target, handler)
      const newOptions = new Proxy(options, {
        get(target, key, receiver) {
          console.log(`pre getting ${key}!`);
          const result = Reflect.get(target, key, receiver);
          // console.log(result);
          console.log(`post getting ${key}!`);
          return Reflect.get(target, key, receiver);
        },
        set(target, key, value, receiver) {
          console.log(`setting ${key}!`);
          return Reflect.set(target, key, value, receiver);
        },
        has(target, propKey) {},
      });
      // const newOptions =

      return fnName === 'Page' ? Page(newOptions) : App(newOptions);
    };
  };
}

const xmini = xMini({
  appName: 'point',
  plugins: [],
});

// function xmini(options) {
//   return fnName => {

//   };
// }

function App(opts) {
  opts.onLaunch();

  opts.data;

  opts.onShow();
}

function Page(opts) {
  opts.onLoad({});

  opts.data;

  opts.onShow();
}

xmini({
  data: {},
  onLaunch() {
    console.log('app onLaunch');
  },
  onShow() {
    console.log('app onShow');
  },
  onTest() {
    console.log('app test');
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
    console.log('page test');
  },
})('Page');
