/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2020-10-20 09:33:10
 * @LastEditors: 海象
 * @LastEditTime: 2020-10-22 16:04:25
 */

// 1. 替换数组原型中的7个方法
const orginalProto = Array.prototype;
// 备份一份,修改备份
const arrayProto = Object.create(orginalProto);
["push", "pop", "shift", "unshift"].forEach(method => {
  arrayProto[method] = function() {
    // 原始操作
    orginalProto[method].apply(this, arguments);
    // 覆盖操作: 通知更新
  };
});
// 对象响应式
// Object.defineProperty
function defineReactive(obj, key, val) {
  // 如果val 是对象, 需要递归处理
  observe(val);
  Object.defineProperty(obj, key, {
    get() {
      console.log("get", key);
      return val;
    },
    set(newVal) {
      if (val !== newVal) {
        // 如果newval是一个对象, 也要做响应式处理
        observe(newVal);
        val = newVal;
        console.log("set", key);
      }
    }
  });
}

// 遍历指定数据对象每个key, 拦截他们
function observe(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  // 判断传入obj类型
  if (Array.isArray(obj)) {
    // 覆盖原型,替换7个变更操作
    obj.__proto__ = arrayProto;
    // 对数组内部元素执行响应化
    const keys = Object.keys;
    for (let i = 0; i < obj.length; i++) {
      observe(obj[i]);
    }
  } else {
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key]);
    });
  }
}
function set(obj, key, val) {
  defineReactive(obj, key, val);
}

const obj = { foo: "foo", bar: "bar", go: { a: 1 } };
observe(obj);
// defineReactive(obj, "foo", "foo");
// obj.foo;
// obj.foo = "fooooo";
// obj.bar = "zzzz";
// obj.go.a = 10;
obj.go = { b: 2 };
obj.dong = "哈哈哈";
console.log(obj.go.b);
console.log(obj.dong);
