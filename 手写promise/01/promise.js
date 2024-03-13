const RESOLVE = "resolved";
const REJECT = "rejected";
const PENDING = "pending";

const handlePromise = (result, newPromise, resolve, reject) => {
  if (result === newPromise) {
    throw new Error("can not return oneself");
  }
  if (
    (typeof result === "object" && typeof result !== null) ||
    typeof result === "function"
  ) {
    if (typeof then === "function") {
      let lock = false;
      try {
        const then = result.then;
        then.call(
          result,
          (r) => {
            if (lock) return;
            handlePromise(r, newPromise, resolve, reject);
            lock = true;
          },
          (e) => {
            if (lock) return;
            reject(e);
            lock = true;
          }
        );
      } catch (error) {
        reject(error);
      }
    } else {
      resolve(result);
    }
  } else {
    resolve(result);
  }
};

class JJPromise {
  status = PENDING;
  result = undefined;
  reason = undefined;
  onResolvedArr = [];
  onRejectedArr = [];
  constructor(excution) {
    const resolve = (result) => {
      if (this.status === PENDING) {
        this.result = result;
        this.status = RESOLVE;
        this.onResolvedArr.map((fn) => fn());
      }
    };
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.reason = reason;
        this.status = REJECT;
        this.onRejectedArr.map((fn) => fn());
      }
    };
    try {
      excution(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  then(onResolved, onRejected) {
    onResolved = typeof onResolved === "function" ? onResolved : (data) => data;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (err) => {
            throw new Error(err);
          };
    const newPromise = new JJPromise((resolve, reject) => {
      if (this.status === RESOLVE) {
        setTimeout(() => {
          try {
            const result = onResolved(this.result);
            handlePromise(result, newPromise, resolve, reject);
            lock = true;
          } catch (error) {
            reject(error);
          }
        }, 0);
      }
      if (this.status === REJECT) {
        setTimeout(() => {
          onRejected(this.reason);
        }, 0);
      }
      if (this.status === PENDING) {
        this.onResolvedArr.push(() => {
          onResolved(this.result);
        });
        this.onRejectedArr.push(() => {
          onRejected(this.reason);
        });
      }
    });
  }
}
