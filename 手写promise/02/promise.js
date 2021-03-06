/*
 * @Description: 组件
 * @Author: 海象
 * @Date: 2021-04-21 17:41:55
 * @LastEditors: 海象
 * @LastEditTime: 2021-04-23 12:34:30
 */

class zzPromise {
    static PENDING = 'pending'
    static FULFILLED = 'fulfilled'
    static REJECTED = "rejected"
    constructor(executor) {
        this.status = zzPromise.PENDING
        this.value = null;
        this.callbacks = []
        try {
            executor(this.resolve.bind(this), this.reject.bind(this));
        } catch (error) {
            this.reject(error)
        }
    }
    resolve(value) {
        if (this.status === zzPromise.PENDING) {
            this.status = zzPromise.FULFILLED
            this.value = value
            setTimeout(() => {
                this.callbacks.map(callbacks => {
                    callbacks.onFulfilled(this.value)
                })
            }, 0)
        }
    }
    reject(value) {
        if (this.status === zzPromise.PENDING) {
            this.status = zzPromise.REJECTED
            this.value = value;
            setTimeout(() => {
                this.callbacks.map(callbacks => {
                    callbacks.onRejected(value)
                })
            }, 0)
        }
    }
    then(onFulfilled, onRejected) {
        if (typeof onFulfilled != 'function') {
            onFulfilled = () => this.value
        }
        if (typeof onRejected != "function") {
            onRejected = () => this.value
        }

        return new zzPromise((resolve, reject) => {
            if (this.status === zzPromise.PENDING) {
                this.callbacks.push({
                    onFulfilled: value => {
                        this.parse(onFulfilled(value), resolve, reject)
                    },
                    onRejected: value => {
                        this.parse(onRejected(value), resolve, reject)
                        try {
                            let result = onRejected(value);
                            if (result instanceof zzPromise) {
                                result.then(resolve, reject)
                            } else {
                                resolve(result)
                            }
                        } catch (error) {
                            reject(error)
                        }
                    }
                })
            }
            if (this.status === zzPromise.FULFILLED) {
                setTimeout(() => {
                    this.parse(onFulfilled(this.value), resolve, reject)
                }, 0)
            }
            if (this.status === zzPromise.REJECTED) {
                setTimeout(() => {
                    this.parse(onRejected(this.value), resolve, reject)
                }, 0)
            }
        })
    }
    parse(result, resolve, reject) {
        if (zzPromise === result) {
            throw new TypeError('chaining cycle detected')
        }
        try {
            if (result instanceof zzPromise) {
                result.then(resolve, reject)
            } else {
                resolve(result)
            }
        } catch (error) {
            reject(error)
        }
    }
    static resolve(value) {
        return new zzPromise((resolve, reject) => {
            if (value instanceof zzPromise) {
                value.then(resolve, reject)
            } else {
                resolve(value)
            }
        })
    }
    static reject(reason) {
        return new zzPromise((resolve, reject) => {
            reject(reason)
        })
    }
    static all(promises) {
        let resolves = []
        return new zzPromise((resolve, reject) => {
            promises.forEach((promise, index) => {
                promise.then(
                    value => {
                        resolves.push(value)
                        if (resolves.length == promises.length) {
                            resolve(resolves)
                        }
                    },
                    reason => {
                        reject(reason);
                    }
                )
            })
        })
    }
    static race(promises) {
        return new zzPromise((resolve, reject) => {
            promises.map(promise => {
                promise.then(value => {
                    resolve(value)
                })
            })
        })
    }
}