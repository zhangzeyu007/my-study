const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function isPromise(value) {
  return value instanceof MyPromise;
}

function resolvePromise(promise, value, resolve, reject) {
  if (isPromise(value)) {
    value.then(resolve, reject);
  } else {
    if (value instanceof Error) {
      reject(value);
    } else {
      resolve(value);
    }
  }
}

class MyPromise {
  constructor(executor) {
    this.status = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.onFulfilledCallbacks.forEach((callback) => callback(this.value));
      }
    };
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach((callback) => callback(this.reason));
      }
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    const newPromise = new MyPromise((resolve, reject) => {
      const fulfilledCallback = () => {
        try {
          const value = onFulfilled ? onFulfilled(this.value) : this.value;
          resolvePromise(newPromise, value, resolve, reject);
        } catch (error) {
          reject(error);
        }
      };
      const rejectedCallback = () => {
        try {
          const reason = onRejected ? onRejected(this.reason) : this.reason;
          resolvePromise(newPromise, reason, resolve, reject);
        } catch (error) {
          reject(error);
        }
      };

      if (this.status === FULFILLED) {
        fulfilledCallback();
      } else if (this.status === REJECTED) {
        rejectedCallback();
      } else {
        this.onFulfilledCallbacks.push(fulfilledCallback);
        this.onRejectedCallbacks.push(rejectedCallback);
      }
    });
    return newPromise;
  }

  catch(onRejected) {
    return this.then(
      undefined,
      onRejected
        ? onRejected
        : (reason) => {
            console.error(reason); // 在这里打印出错误信息
            throw reason; // 继续抛出错误
          }
    );
  }

  static resolve(value) {
    return new MyPromise((resolve, reject) => {
      if (isPromise(value)) {
        value.then(resolve, reject);
      } else {
        resolve(value);
      }
    });
  }

  static reject(reason) {
    return new MyPromise((_, reject) => {
      reject(reason);
    });
  }

  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach((promise) => {
        promise.then(resolve, reject);
      });
    });
  }
}

const myPromise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    reject("reject myPromise");
  }, 1000);
});

console.log(myPromise);
myPromise
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.log(error); // 输出 "reject myPromise"
  });
