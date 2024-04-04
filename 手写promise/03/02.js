/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2024-04-04 11:33:28
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-04-04 14:10:29
 * @FilePath: \my-study\手写promise\03\02.js
 */
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  #state = PENDING;
  #result = undefined;
  #handler = [];
  constructor(executor) {
    const resolve = (data) => {
      this.#changeSate(FULFILLED, data);
    };
    const reject = (reason) => {
      this.#changeSate(REJECTED, reason);
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  #changeSate(state, result) {
    if (this.#state !== PENDING) {
      return;
    }
    this.#state = state;
    this.#result = result;
    this.#run();
  }
  // 模拟微任务队列
  #runMicroTask(func) {
    if (process && process.nextTick === "function") {
      process.nextTick(func);
    } else if (typeof MutationObserver === "function") {
      const ob = new MutationObserver(func);
      const textNode = document.createTextNode("1");
      ob.observe(textNode);
      text.data = 2;
    } else {
      setTimeout(func, 0);
    }
  }

  #runOne(callback, resolve, reject) {
    this.#runMicroTask(() => {
      if (typeof callback !== "function") {
        const settled = this.#state === FULFILLED ? resolve : reject;
        settled(this.#result);
      } else {
        try {
          const data = callback(this.#result);
          if (this.#isPromiseLink(data)) {
            data.then(resolve, reject);
          } else {
            resolve(data);
          }
        } catch (error) {
          reject(error);
        }
      }
    });
  }

  #run() {
    if (this.#state === PENDING) return;
    while (this.#handler.length) {
      const { onFullFilled, onRejected, resolve, reject } =
        this.#handler.shift();
      if (this.#state === FULFILLED) {
        this.#runOne(onFullFilled, resolve, reject);
      }
      if (this.#state === REJECTED) {
        this.#runOne(onRejected, resolve, reject);
      }
    }
  }

  // 判断是否是promise对象
  #isPromiseLink(value) {
    return (
      value !== null &&
      (typeof value === "object" || typeof value === "function") &&
      typeof value.then === "function"
    );
  }

  /*
  1. 什么时候调用resolve和reject和onFullFilled和onRejected
  2. 用户传入onFullFilled和onRejected对应的回调不是函数的情况
  3. 返回的结果是proimse的情况
  */
  then(onFullFilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.#handler.push({
        onFullFilled,
        onRejected,
        resolve,
        reject,
      });
      this.#run();
    });
  }
}

const p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    reject(1222);
  }, 2000);
});

p.then(
  (data) => {
    console.log(data, "promise 完成1");
  },
  (error) => {
    console.log(error, "promise 失败1");
  }
);
p.then(null, (error) => {
  console.log(error, "promise 失败2");
  return 456;
}).then((data) => {
  console.log(data, "promise 完成2");
});
console.log(p);
