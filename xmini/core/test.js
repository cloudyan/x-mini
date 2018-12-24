class Core {
  constructor(options = {}) {}
}

class XMini extends Core {
  constructor(options = {}) {
    super();
  }

  init(options) {
    console.log(options);
  }

  getConfig() {
    console.log('config');
    return this;
  }
}

const xmini = new XMini({
  a: '111',
});

console.log(xmini.init({}));

// xmini 是个函数，并且有属性
function xmini(options = {}) {
  console.log(options);
  function xFn(type) {
    console.log(type);
  }
  return xFn;
}

xmini.prototype.test = function() {
  console.log('this');
};

xmini({
  a: '111',
})('config');

// 需要 new 后，才能调用原型链上的方法 test
xmini.test();
