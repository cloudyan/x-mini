var obj = new Proxy(
  {},
  {
    get(target, key, receiver) {
      console.log(`getting ${key}!`);
      console.log(target, key);
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      console.log(`setting ${key}!`);
      return Reflect.set(target, key, value, receiver);
    },
  }
);

obj.count = 1;
//  setting count!
++obj.count;
