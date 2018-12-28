import { xApp } from './xmini/index';

// console.log(xApp);

xApp({
  onError(err) {},
  onShow() {
    console.log(121212);
  },
})(App);
